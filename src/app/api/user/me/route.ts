import { NextResponse } from "next/server";
import prisma from "@/dbconfig/primsa";
import { authenticateRequest } from "@/utils/authenticate-request";

export async function GET() {
  try {
    const userVerifiedData = await authenticateRequest();

    if (userVerifiedData instanceof Response) {
      return userVerifiedData;
    }
    const user = await prisma.user.findUnique({
      where: { id: userVerifiedData.id },
    });

    if (!user)
      return NextResponse.json(
        { status: 400, message: "No user found" },
        { status: 400 }
      );

    return NextResponse.json({
      status: 200,
      message: "User Fetched Successfully",
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    let message = "Internal Server Error";
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ status: 500, message }, { status: 500 });
  }
}
