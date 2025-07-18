import prisma from "@/dbconfig/primsa";
import { authenticateRequest } from "@/utils/authenticate-request";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const authenticatedResponse = await authenticateRequest();
    if (authenticatedResponse instanceof Response) return authenticatedResponse;
    const segments = req.nextUrl.pathname.split("/");
    const customerId = parseInt(segments[segments.length - 1], 10);
    if (customerId <= 0 || !customerId)
      return NextResponse.json(
        { status: 400, message: "Invalid Customer Id" },
        { status: 400 }
      );
    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
    });
    if (!customer)
      return NextResponse.json(
        { status: 404, message: "Customer Does not Exists" },
        { status: 404 }
      );
    return NextResponse.json({ status: 200, customer });
  } catch (error) {
    let message = "Internal Server Error";
    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ status: 500, message }, { status: 500 });
  }
}
