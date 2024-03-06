import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import bcrypt from "bcrypt";
export async function POST(request: Request) {
  const data = await request.json();
  data.password = await bcrypt.hash(data.password, 10);
  const userFound = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (userFound)
    return NextResponse.json({ message: "Email already use" }, { status: 409 });
  const newUser = await prisma.user.create({
    data,
  });

  const { password, ...user } = newUser;

  console.log(data);
  return NextResponse.json(user, { status: 201 });
}
