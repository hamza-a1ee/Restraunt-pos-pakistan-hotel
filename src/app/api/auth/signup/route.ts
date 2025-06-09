import prisma from "@/dbconfig/primsa";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (Object.keys(body).length === 0)
      return NextResponse.json({ status: 400, message: "Invalid Body Type" });
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existingUser)
      return NextResponse.json({ status: 409, message: "User Already Exists" });

    const newUser = await prisma.user.create({
      data: { email: body.email, name: body.name, password: body.password },
    });
    return NextResponse.json({
      status: 200,
      message: "User Created Successfully",
      data: newUser,
    });
  } catch (e) {
    let errorMessage = "Internal Server Error";
    if (e instanceof Error) {
      errorMessage = e.message;
    }
    return NextResponse.json({
      status: 500,
      error: errorMessage,
    });
  }
}
