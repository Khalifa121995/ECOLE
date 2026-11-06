import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

async function main() {
  const adminEmail = "admin@cyberacademie.local";
  const passwordHash = await bcrypt.hash("ChangeMoi123!", 10);

  await db.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: "Admin",
      email: adminEmail,
      passwordHash,
      role: "ADMIN",
    },
  });

  const course = await db.course.upsert({
    where: { slug: "fondations-reseau" },
    update: {},
    create: {
      slug: "fondations-reseau",
      title: "Fondations réseau",
      summary: "Les bases indispensables avant toute notion de sécurité : TCP/IP, DNS, ports, pare-feu.",
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

  console.log("Seed terminé. Admin:", adminEmail, "/ mot de passe: ChangeMoi123!");
  console.log("Cours créé:", course.slug);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
