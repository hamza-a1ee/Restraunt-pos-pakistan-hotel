import prisma from "@/dbconfig/primsa";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    if (!page || !limit)
      return NextResponse.json(
        { status: 400, message: "Invalid Params" },
        { status: 400 }
      );

    const tables = await prisma.table.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalTables = await prisma.table.count();
    if (tables.length === 0)
      return NextResponse.json(
        {
          status: 200,
          tables: [],
          meta: {
            total: totalTables,
            page,
            limit,
            totalPages: Math.ceil(totalTables / limit),
          },
        },
        {
          status: 200,
        }
      );

    return NextResponse.json({
      status: 200,
      tables,
      meta: {
        total: totalTables,
        limit,
        page,
        totalPages: Math.ceil(totalTables / limit),
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
