"use server";
import prisma from "@/dbconfig/primsa";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    await prisma
      .$connect()
      .then(() => console.log(`Db connected successfully`));

    const body = await req.json();
    if (Object.keys(body).length === 0)
      return NextResponse.json(
        { status: 400, message: "Invalid Body Type" },
        { status: 400 }
      );

    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user)
      return NextResponse.json(
        { status: 400, message: "Invalid Credentials" },
        { status: 400 }
      );

    const passCompared = await bcrypt.compare(body.password, user?.password);

    if (!passCompared)
      return NextResponse.json(
        { status: 400, message: "Invalid Credentials" },
        { status: 400 }
      );

    const token = jwt.sign(
      {
        email: user.email,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      process.env.JWT_TOKEN_KEY as string,
      { expiresIn: "1d" }
    );

    return NextResponse.json(
      {
        status: 200,
        message: "Login Successfull",
        data: {
          token,
        },
      },
      { status: 200 }
    );
    {
    }
  } catch (error) {
    let message = "Internal Server Error";
    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json(
      { status: 500, message, key: process.env.JWT_KEY },
      { status: 500 }
    );
  }
}
