import Link from "next/link";
import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight mb-1">Connexion</h1>
      <p className="text-muted text-sm mb-8">
        Pas encore de compte ?{" "}
        <Link href="/register" className="text-signal">
          Inscris-toi
        </Link>
      </p>
      <AuthForm mode="login" />
    </div>
  );
}
