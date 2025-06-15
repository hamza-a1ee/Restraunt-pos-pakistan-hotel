import prisma from "@/dbconfig/primsa";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const salt = await bcrypt.genSalt(10);
    const body = await req.json();
    if (Object.keys(body).length === 0)
      return NextResponse.json(
        { status: 400, message: "Invalid Body Type" },
        { status: 400 }
      );
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existingUser)
      return NextResponse.json(
        { status: 409, message: "User Already Exists" },
        { status: 409 }
      );

    const hashedPassword = await bcrypt.hash(body.password, salt);

    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        password: hashedPassword,
      },
    });

    if (!newUser)
      return NextResponse.json(
        { status: 400, message: "Failed to Create User" },
        { status: 400 }
      );
    return NextResponse.json(
      {
        status: 200,
        message: "User Created Successfully",
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    let errorMessage = "Internal Server Error";
    if (e instanceof Error) {
      errorMessage = e.message;
    }
    return NextResponse.json(
      {
        status: 500,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
