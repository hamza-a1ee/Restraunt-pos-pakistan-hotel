import { getToken, verifyToken } from "@/utils/verify-token.util";
import {  NextResponse } from "next/server";
import { headers } from "next/headers";
import prisma from "@/dbconfig/primsa";

export async function GET() {
  try {
    const authorizationHeader = (await headers()).get("authorization");
    const token = getToken(authorizationHeader);

    if (!token)
      return NextResponse.json(
        { status: 401, message: "Unauthorized User" },
        { status: 401 }
      );
    const userVerifiedData = await verifyToken(token);

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
        name: user.name,
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
