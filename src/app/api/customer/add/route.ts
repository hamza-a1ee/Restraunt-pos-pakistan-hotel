import prisma from "@/dbconfig/primsa";
import { authenticateRequest } from "@/utils/authenticate-request";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const authenticatedResponse = await authenticateRequest();
    if (authenticatedResponse instanceof Response) return authenticatedResponse;
    const body = await req.json();
    if (Object.keys(body).length === 0)
      return NextResponse.json(
        { status: 400, message: "Invalid Body Type" },
        { status: 200 }
      );
    const customerExists = await prisma.customer.findUnique({
      where: { email: body.email },
    });

    if (customerExists)
      return NextResponse.json(
        { status: 409, message: "User Already Exists" },
        { status: 409 }
      );
    const createdCustomer = await prisma.customer.create({
      data: {
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        gender: body.gender,
        phone: body.phone,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    if (!createdCustomer)
      return NextResponse.json(
        { status: 400, message: "Failed to Create Customer" },
        { status: 400 }
      );
    return NextResponse.json(
      { status: 200, message: "Customer Created Successfully" },
      { status: 200 }
    );
  } catch (error) {
    let message = "Internal Server Error";
    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ status: 500, message }, { status: 500 });
  }
}
