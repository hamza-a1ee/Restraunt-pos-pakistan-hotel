import { NextResponse } from "next/server";


export default function POST() {
  return NextResponse.json({ status: 200, message: "Email sent successfully" });
}
