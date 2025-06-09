import prisma from "@/dbconfig/primsa";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await prisma
    .$connect()
    .then((res) => console.log(`Db connected successfully`, res))
    .catch((error) => console.log(error));
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
}
