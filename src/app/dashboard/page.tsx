import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) return null; // protégé par middleware

  const [totalLessons, completedCount] = await Promise.all([
    db.lesson.count(),
    db.progress.count({ where: { userId: session.userId, completed: true } }),
  ]);

  const pct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight mb-1">Bonjour {session.name}</h1>
      <p className="text-muted text-sm mb-10">Voici ta progression générale.</p>

      <div className="border border-line rounded-lg p-6 max-w-sm">
        <p className="font-mono text-3xl text-signal mb-1">{pct}%</p>
        <p className="text-sm text-muted">
          {completedCount} leçon{completedCount > 1 ? "s" : ""} terminée{completedCount > 1 ? "s" : ""} sur{" "}
          {totalLessons}
        </p>
      </div>
    </div>
  );
}
