import Link from "next/link";
import LogoutButton from "./LogoutButton";
import type { SessionPayload } from "@/lib/auth";

export default function Header({ session }: { session: SessionPayload | null }) {
  return (
    <header className="border-b border-line">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-signal" aria-hidden />
          <span className="font-semibold tracking-tight">CyberAcadémie</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link href="/courses" className="text-muted hover:text-text transition-colors">
            Parcours
          </Link>

          {session ? (
            <>
              <Link href="/dashboard" className="text-muted hover:text-text transition-colors">
                Mon espace
              </Link>
              {session.role === "ADMIN" && (
                <Link href="/admin" className="text-muted hover:text-text transition-colors">
                  Admin
                </Link>
              )}
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login" className="text-muted hover:text-text transition-colors">
                Connexion
              </Link>
              <Link
                href="/register"
                className="bg-signal text-ink px-4 py-2 rounded-md font-medium hover:opacity-90 transition-opacity"
              >
                Commencer
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
