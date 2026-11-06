import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Accès refusé." }, { status: 403 });
  }

  const { title, slug, summary, level } = await req.json();

  const course = await db.course.create({
    data: { title, slug, summary, level, published: false },
  });

  return NextResponse.json({ ok: true, course });
}
