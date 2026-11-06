"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LessonComplete({
  lessonId,
  initialCompleted,
}: {
  lessonId: string;
  initialCompleted: boolean;
}) {
  const [completed, setCompleted] = useState(initialCompleted);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function toggle() {
    setSaving(true);
    const next = !completed;
    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lessonId, completed: next }),
    });
    setCompleted(next);
    setSaving(false);
    router.refresh();
  }

  return (
    <button
      onClick={toggle}
      disabled={saving}
      className={`px-5 py-2.5 rounded-md text-sm font-medium transition-colors ${
        completed ? "bg-surface2 text-muted border border-line" : "bg-signal text-ink"
      }`}
    >
      {completed ? "Leçon terminée ✓" : "Marquer comme terminée"}
    </button>
  );
}
