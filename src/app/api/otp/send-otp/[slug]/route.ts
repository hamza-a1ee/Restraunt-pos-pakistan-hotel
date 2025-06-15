import prisma from "@/dbconfig/primsa";
import {
  getMailOptions,
  transporter,
} from "@/utils/nodemailer-transporter.util";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const email = req.nextUrl.pathname.split("/").pop();
 
    if (!email)
      return NextResponse.json(
        { status: 400, message: "No email was sent in params" },
        { status: 400 }
      );
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return NextResponse.json(
        { status: 404, message: "No User Found", email },
        { status: 404 }
      );

    const generatedOtp = await prisma.otp.create({
      data: {
        otp: Math.floor(1000 + Math.random() * 9000),
        userId: user.id,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      },
    });
    transporter.sendMail(
      getMailOptions(user.email, "Checking", `You otp is ${generatedOtp.otp}`),
      (error, info) => {
        if (error) {
          console.error("Error sending email: ", error);
        } else {
          console.log("Email sent: ", info.response);
        }
      }
    );
    return NextResponse.json({
      status: 200,
      message: "Email sent successfully",
    });
  } catch (error) {
    let message = "Internal Server error";
    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ status: 500, message }, { status: 500 });
  }
}
