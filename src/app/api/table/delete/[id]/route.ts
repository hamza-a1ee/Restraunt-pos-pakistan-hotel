import prisma from "@/dbconfig/primsa";
import { authenticateRequest } from "@/utils/authenticate-request";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const segments = req.nextUrl.pathname.split("/");
    const tableId = parseInt(segments[segments.length - 1], 10);

    const authenticatedUser = await authenticateRequest();
    if (authenticatedUser instanceof Response) return authenticatedUser;
    if (tableId <= 0 || !tableId)
      return NextResponse.json(
        { status: 404, message: "Table Not Found" },
        { status: 404 }
      );

    const tableExists = await prisma.table.findUnique({
      where: {
        id: tableId,
      },
    });

    if (!tableExists)
      return NextResponse.json(
        { status: 404, message: "Table Does Not Exists" },
        { status: 404 }
      );

    const deletedTable = await prisma.table.delete({
      where: {
        id: tableId,
      },
    });

    if (!deletedTable)
      return NextResponse.json(
        { status: 400, message: "Failed to Delete Table" },
        { status: 400 }
      );
    return NextResponse.json(
      { status: 200, message: "Table Deleted Successfully" },
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
