import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { createSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password || password.length < 8) {
    return NextResponse.json(
      { error: "Nom, email et mot de passe (8 caractères min.) requis." },
      { status: 400 }
    );
  }

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Un compte existe déjà avec cet email." }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: { name, email, passwordHash },
  });

  await createSession({ userId: user.id, role: user.role, name: user.name });

  return NextResponse.json({ ok: true });
}
