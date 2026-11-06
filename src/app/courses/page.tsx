import Link from "next/link";
import { db } from "@/lib/db";

const LEVEL_LABEL: Record<string, string> = {
  DEBUTANT: "Débutant",
  INTERMEDIAIRE: "Intermédiaire",
  AVANCE: "Avancé",
};

export default async function CoursesPage() {
  const courses = await db.course.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Parcours</h1>
      <p className="text-muted mb-10">Choisis un parcours adapté à ton niveau actuel.</p>

      {courses.length === 0 ? (
        <p className="text-muted text-sm">
          Aucun parcours publié pour le moment. Reviens bientôt, ou connecte-toi en admin pour en créer un.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {courses.map((c) => (
            <Link
              key={c.id}
              href={`/courses/${c.slug}`}
              className="border border-line rounded-lg p-6 hover:border-signal transition-colors"
            >
              <p className="font-mono text-xs text-signal mb-3">{LEVEL_LABEL[c.level]}</p>
              <h2 className="font-semibold text-lg mb-2">{c.title}</h2>
              <p className="text-sm text-muted leading-relaxed">{c.summary}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
