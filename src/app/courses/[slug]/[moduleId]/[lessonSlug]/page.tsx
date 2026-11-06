import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import LessonComplete from "@/components/LessonComplete";

export default async function LessonPage({
  params,
}: {
  params: { slug: string; moduleId: string; lessonSlug: string };
}) {
  const lesson = await db.lesson.findFirst({
    where: { moduleId: params.moduleId, slug: params.lessonSlug },
    include: { quiz: { include: { questions: true } } },
  });

  if (!lesson) notFound();

  const session = await getSession();
  let completed = false;
  if (session) {
    const p = await db.progress.findUnique({
      where: { userId_lessonId: { userId: session.userId, lessonId: lesson.id } },
    });
    completed = p?.completed ?? false;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="max-w-prose">
        <h1 className="text-2xl font-semibold tracking-tight mb-8">{lesson.title}</h1>
        <article className="prose-lesson" dangerouslySetInnerHTML={{ __html: lesson.content }} />

        {session && (
          <div className="mt-10 pt-8 border-t border-line">
            <LessonComplete lessonId={lesson.id} initialCompleted={completed} />
          </div>
        )}
      </div>
    </div>
  );
}
