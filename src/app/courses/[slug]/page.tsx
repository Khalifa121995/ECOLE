import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = await db.course.findUnique({
    where: { slug: params.slug },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: { lessons: { orderBy: { order: "asc" } } },
      },
    },
  });

  if (!course || !course.published) notFound();

  const session = await getSession();
  let completedLessonIds = new Set<string>();

  if (session) {
    const progress = await db.progress.findMany({
      where: { userId: session.userId, completed: true },
      select: { lessonId: true },
    });
    completedLessonIds = new Set(progress.map((p) => p.lessonId));
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">{course.title}</h1>
      <p className="text-muted mb-10 max-w-prose">{course.summary}</p>

      <div className="space-y-8">
        {course.modules.map((m) => (
          <div key={m.id}>
            <h2 className="font-semibold mb-3">{m.title}</h2>
            <ul className="space-y-1">
              {m.lessons.map((l) => {
                const done = completedLessonIds.has(l.id);
                return (
                  <li key={l.id}>
                    <Link
                      href={`/courses/${course.slug}/${m.id}/${l.slug}`}
                      className="flex items-center gap-3 py-2 px-3 -mx-3 rounded-md hover:bg-surface text-sm"
                    >
                      <span
                        className={`w-4 h-4 rounded-full border flex-shrink-0 ${
                          done ? "bg-signal border-signal" : "border-line"
                        }`}
                        aria-hidden
                      />
                      <span className={done ? "text-muted" : "text-text"}>{l.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
