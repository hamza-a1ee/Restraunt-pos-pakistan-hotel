import prisma from "@/dbconfig/primsa";
import { authenticateRequest } from "@/utils/authenticate-request";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const authenticatedResponse = await authenticateRequest();
    if (authenticatedResponse instanceof Response) return authenticatedResponse;
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "10", 10);
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);

    if (!limit || !page)
      return NextResponse.json(
        { status: 400, message: "Invalid Query Params" },
        { status: 400 }
      );
    const customer = await prisma.customer.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
    const totalCustomer = await prisma.customer.count();

    const meta = {
      page,
      limit,
      totalPages: Math.ceil(totalCustomer / limit),
      total: totalCustomer,
    };
    if (customer.length === 0)
      return NextResponse.json(
        {
          status: 200,
          customer,
          meta,
        },
        { status: 200 }
      );

    return NextResponse.json({ status: 200, customer, meta }, { status: 200 });
  } catch (error) {
    let message = "Internal Server Error";
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ status: 500, message }, { status: 500 });
  }
}
