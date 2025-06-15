import prisma from "@/dbconfig/primsa";
import { authenticateRequest } from "@/utils/authenticate-request";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const segments = req.nextUrl.pathname.split("/");
    const tableId = Number(segments[segments.length - 1]);
    const body = await req.json();
    if (Object.keys(body).length === 0)
      return NextResponse.json(
        { status: 400, message: "Invalid Body Type" },
        { status: 400 }
      );

    const authenticatedResponse = await authenticateRequest();
    if (authenticatedResponse instanceof Response) return authenticatedResponse;

    const tableExists = await prisma.table.findFirst({
      where: {
        name: body.name,
      },
    });

    if (tableExists)
      return NextResponse.json(
        { status: 409, message: "Table Already Exists with Same Name" },
        { status: 409 }
      );

    const updatedTable = await prisma.table.update({
      where: {
        id: tableId,
      },
      data: {
        name: body.name,
        updatedAt: new Date(),
      },
    });

    if (!updatedTable)
      return NextResponse.json(
        { status: 400, message: "Failed to Update Table" },
        { status: 400 }
      );

    return NextResponse.json(
      { status: 200, message: "Table Updated Successfully" },
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
