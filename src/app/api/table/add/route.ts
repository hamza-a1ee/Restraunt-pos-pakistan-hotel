import prisma from "@/dbconfig/primsa";
import { authenticateRequest } from "@/utils/authenticate-request";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (Object.keys(body).length === 0)
      return NextResponse.json(
        { status: 400, message: "Invalid Body" },
        { status: 400 }
      );
    const userVerifiedData = await authenticateRequest();

    if (userVerifiedData instanceof Response) {
      return userVerifiedData;
    }

    const tableExists = await prisma.table.findUnique({
      where: {
        name: body.name,
      },
    });

    if (tableExists)
      return NextResponse.json(
        {
          status: 409,
          message: "Table Name Already Exists",
        },
        { status: 409 }
      );

    const createdTable = await prisma.table.create({
      data: { name: body.name },
    });

    if (!createdTable)
      return NextResponse.json(
        { status: 400, message: "Failed to Create Table" },
        { status: 400 }
      );

    return NextResponse.json(
      { status: 200, message: "Table Created Successfully" },
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
