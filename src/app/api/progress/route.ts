import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Non connecté." }, { status: 401 });

  const { lessonId, completed } = await req.json();

  await db.progress.upsert({
    where: { userId_lessonId: { userId: session.userId, lessonId } },
    update: { completed },
    create: { userId: session.userId, lessonId, completed },
  });

  return NextResponse.json({ ok: true });
}
