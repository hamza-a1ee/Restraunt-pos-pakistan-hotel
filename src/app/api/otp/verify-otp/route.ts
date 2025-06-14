import prisma from "@/dbconfig/primsa";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = req.nextUrl.searchParams.get("email");
    if (!email)
      return NextResponse.json(
        { status: 400, message: "No Email was Sent" },
        { status: 400 }
      );
    const userOtpRecord = await prisma.otp.findFirst({
      where: {
        user: {
          email,
        },

        otp: Number(body.otp),
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!userOtpRecord)
      return NextResponse.json(
        { status: 400, message: "Invalid OTP or OTP has expired" },
        { status: 400 }
      );

    const updatedOtpRecord = await prisma.otp.update({
      data: {
        expiresAt: new Date(0),
      },
      where: {
        id: userOtpRecord.id,
      },
    });

    if (!updatedOtpRecord)
      return NextResponse.json(
        { status: 400, message: "Error occurred" },
        { status: 400 }
      );
    return NextResponse.json(
      { status: 200, message: "Otp Verified Successfully" },
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
