"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch(`/api/auth/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mode === "register" ? { name, email, password } : { email, password }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Une erreur est survenue.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
      {mode === "register" && (
        <div>
          <label className="block text-sm text-muted mb-1.5" htmlFor="name">
            Nom
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full bg-surface border border-line rounded-md px-3 py-2 text-sm focus:outline-none focus:border-signal"
          />
        </div>
      )}

      <div>
        <label className="block text-sm text-muted mb-1.5" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-surface border border-line rounded-md px-3 py-2 text-sm focus:outline-none focus:border-signal"
        />
      </div>

      <div>
        <label className="block text-sm text-muted mb-1.5" htmlFor="password">
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          className="w-full bg-surface border border-line rounded-md px-3 py-2 text-sm focus:outline-none focus:border-signal"
        />
      </div>

      {error && <p className="text-danger text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-signal text-ink px-4 py-2.5 rounded-md font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? "Patiente…" : mode === "register" ? "Créer mon compte" : "Se connecter"}
      </button>
    </form>
  );
}
