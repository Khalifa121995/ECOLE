import Link from "next/link";
import AuthForm from "@/components/AuthForm";

export default function RegisterPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight mb-1">Créer un compte</h1>
      <p className="text-muted text-sm mb-8">
        Déjà inscrit ?{" "}
        <Link href="/login" className="text-signal">
          Connecte-toi
        </Link>
      </p>
      <AuthForm mode="register" />
    </div>
  );
}
