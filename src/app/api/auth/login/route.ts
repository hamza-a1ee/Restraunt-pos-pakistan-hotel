import prisma from "@/dbconfig/primsa";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await prisma
      .$connect()
      .then(() => console.log(`Db connected successfully`));

    const body = await req.json();
    if (Object.keys(body).length === 0)
      return NextResponse.json({ status: 400, message: "Invalid Body Type" });

    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user)
      return NextResponse.json({ status: 404, message: "No User Found" });

    return NextResponse.json({
      status: 200,
      message: "Login Successfull",
    });
    {
    }
  } catch (error) {
    let message = "Internal Server Error";
    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ status: 500, message });
  }
}
