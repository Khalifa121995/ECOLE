import { db } from "@/lib/db";
import NewCourseForm from "@/components/NewCourseForm";

export default async function AdminPage() {
  const [courses, userCount] = await Promise.all([
    db.course.findMany({ orderBy: { createdAt: "desc" } }),
    db.user.count(),
  ]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight mb-1">Administration</h1>
      <p className="text-muted text-sm mb-10">{userCount} utilisateur(s) inscrit(s).</p>

      <div className="grid sm:grid-cols-[1fr_320px] gap-10">
        <div>
          <h2 className="font-semibold mb-4">Parcours existants</h2>
          <ul className="divide-y divide-line border border-line rounded-lg">
            {courses.map((c) => (
              <li key={c.id} className="px-4 py-3 flex items-center justify-between text-sm">
                <span>{c.title}</span>
                <span className={c.published ? "text-signal" : "text-muted"}>
                  {c.published ? "Publié" : "Brouillon"}
                </span>
              </li>
            ))}
            {courses.length === 0 && <li className="px-4 py-3 text-sm text-muted">Aucun parcours.</li>}
          </ul>
        </div>

        <NewCourseForm />
      </div>
    </div>
  );
}
