import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { Newsreader } from "next/font/google";
export async function POST(request: Request) {
  const data = await request.json();

  const newUser = await prisma.user.create({
    data,
  });
  console.log(data);
  return NextResponse.json(newUser, { status: 201 });
}
