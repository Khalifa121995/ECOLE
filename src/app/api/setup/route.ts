import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

// Route d'initialisation à usage unique : crée le compte admin et un premier
// cours de démonstration. Protégée par SETUP_SECRET pour éviter qu'elle soit
// appelée par n'importe qui. Une fois utilisée, supprime SETUP_SECRET des
// variables d'environnement Vercel (ou laisse-la, l'appel est idempotent).
export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key");

  if (!process.env.SETUP_SECRET || key !== process.env.SETUP_SECRET) {
    return NextResponse.json({ error: "Clé invalide." }, { status: 403 });
  }

  const adminEmail = "admin@cyberacademie.local";
  const existingAdmin = await db.user.findUnique({ where: { email: adminEmail } });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash("ChangeMoi123!", 10);
    await db.user.create({
      data: { name: "Admin", email: adminEmail, passwordHash, role: "ADMIN" },
    });
  }

  const existingCourse = await db.course.findUnique({ where: { slug: "fondations-reseau" } });

  if (!existingCourse) {
    await db.course.create({
      data: {
        slug: "fondations-reseau",
        title: "Fondations réseau",
        summary:
          "Les bases indispensables avant toute notion de sécurité : TCP/IP, DNS, ports, pare-feu.",
        level: "DEBUTANT",
        published: true,
        order: 1,
        modules: {
          create: [
            {
              title: "Introduction aux réseaux",
              order: 1,
              lessons: {
                create: [
                  {
                    slug: "comment-circulent-les-donnees",
                    title: "Comment circulent les données sur un réseau",
                    order: 1,
                    content:
                      "<h2>Le modèle TCP/IP</h2><p>Chaque échange sur internet passe par plusieurs couches...</p>",
                  },
                ],
              },
            },
          ],
        },
      },
    });
  }

  return NextResponse.json({
    ok: true,
    message: "Compte admin et cours de démonstration prêts.",
    adminEmail,
    adminPassword: existingAdmin ? "(déjà existant, inchangé)" : "ChangeMoi123!",
  });
}
