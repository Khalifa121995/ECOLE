"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewCourseForm() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [level, setLevel] = useState("DEBUTANT");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/admin/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, slug, summary, level }),
    });
    setLoading(false);
    setTitle("");
    setSlug("");
    setSummary("");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md border border-line rounded-lg p-6">
      <h2 className="font-semibold">Nouveau parcours</h2>
      <div>
        <label className="block text-sm text-muted mb-1.5">Titre</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full bg-surface border border-line rounded-md px-3 py-2 text-sm focus:outline-none focus:border-signal"
        />
      </div>
      <div>
        <label className="block text-sm text-muted mb-1.5">Slug (URL)</label>
        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          placeholder="securite-reseau"
          className="w-full bg-surface border border-line rounded-md px-3 py-2 text-sm focus:outline-none focus:border-signal"
        />
      </div>
      <div>
        <label className="block text-sm text-muted mb-1.5">Résumé</label>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
          rows={3}
          className="w-full bg-surface border border-line rounded-md px-3 py-2 text-sm focus:outline-none focus:border-signal"
        />
      </div>
      <div>
        <label className="block text-sm text-muted mb-1.5">Niveau</label>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="w-full bg-surface border border-line rounded-md px-3 py-2 text-sm focus:outline-none focus:border-signal"
        >
          <option value="DEBUTANT">Débutant</option>
          <option value="INTERMEDIAIRE">Intermédiaire</option>
          <option value="AVANCE">Avancé</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-signal text-ink px-4 py-2.5 rounded-md font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? "Création…" : "Créer le parcours"}
      </button>
      <p className="text-xs text-muted">
        Le parcours est créé non publié. Ajoute des modules/leçons via Prisma Studio, puis publie-le.
      </p>
    </form>
  );
}
