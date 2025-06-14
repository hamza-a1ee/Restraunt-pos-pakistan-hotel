import prisma from "@/dbconfig/primsa";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const salt = await bcrypt.genSalt(10);
    const body = await req.json();
    const email = req.nextUrl.pathname.split("/").pop();
    console.log({ email });
    if (!email)
      return NextResponse.json(
        { status: 400, message: "No email was sent" },
        { status: 400 }
      );
    if (Object.keys(body).length === 0)
      return NextResponse.json(
        { status: 400, message: "Invalid body type" },
        { status: 400 }
      );

    const otpExists = await prisma.otp.findFirst({
      where: {
        user: {
          email,
        },
        otp: Number(body.otp),
        status: "VERIFIED",
      },
      include: {
        user: true,
      },
    });

    if (!otpExists)
      return NextResponse.json(
        {
          status: 404,
          message: "User Not Found with this Email",
        },
        { status: 404 }
      );
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const updatedUser = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        password: hashedPassword,
      },
    });

    const updatedOtp = await prisma.otp.update({
      where: {
        userId: updatedUser.id,
        otp: Number(body.otp),
        status: "VERIFIED",
      },
      data: {
        status: "USED",
      },
    });
    if (!updatedUser || !updatedOtp)
      return NextResponse.json(
        { status: 400, message: "Failed to Update Password" },
        { status: 400 }
      );

    return NextResponse.json(
      { status: 200, message: "Password Updated Successfully" },
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
