import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db"; // ✅ using shared db instance

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating user:", error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
