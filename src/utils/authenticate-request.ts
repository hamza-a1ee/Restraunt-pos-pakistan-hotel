import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getToken, verifyToken } from "./verify-token.util";

export async function authenticateRequest() {
  const authorizationHeader = (await headers()).get("authorization");
  const token = getToken(authorizationHeader);

  if (!token) {
    return NextResponse.json(
      { status: 401, message: "Unauthorized User" },
      { status: 401 }
    );
  }

  const userVerifiedData = await verifyToken(token);

  if (!userVerifiedData) {
    return NextResponse.json(
      { status: 401, message: "Unauthorized User" },
      { status: 401 }
    );
  }

  return userVerifiedData;
}
