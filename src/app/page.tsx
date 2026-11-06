import Link from "next/link";

const PILLARS = [
  {
    niveau: "Débutant",
    titre: "Fondations",
    desc: "Réseaux, ligne de commande, hygiène numérique, premiers réflexes de défense.",
  },
  {
    niveau: "Intermédiaire",
    titre: "Sécurité applicative",
    desc: "OWASP Top 10, authentification, cryptographie appliquée, revue de code sécurisée.",
  },
  {
    niveau: "Avancé",
    titre: "Méthodologie pentest",
    desc: "Reconnaissance, reporting, sécurité Wi-Fi (WPA2/3), pratique en labo autorisé uniquement.",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16">
        <p className="text-signal font-mono text-sm mb-4">Cybersécurité, par la pratique encadrée</p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight max-w-2xl text-balance">
          Comprendre comment les systèmes tombent, pour mieux les défendre.
        </h1>
        <p className="mt-6 text-muted max-w-prose leading-relaxed">
          Des parcours structurés qui partent des bases réseau jusqu&apos;à la méthodologie de test
          d&apos;intrusion, toujours dans un cadre légal et autorisé. Chaque module combine théorie,
          exemples concrets et quiz de validation.
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href="/register"
            className="bg-signal text-ink px-5 py-3 rounded-md font-medium hover:opacity-90 transition-opacity"
          >
            Créer un compte gratuit
          </Link>
          <Link
            href="/courses"
            className="border border-line px-5 py-3 rounded-md font-medium text-text hover:border-muted transition-colors"
          >
            Voir les parcours
          </Link>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="max-w-5xl mx-auto px-6 py-16 grid sm:grid-cols-3 gap-8">
          {PILLARS.map((p) => (
            <div key={p.titre}>
              <p className="font-mono text-xs text-signal mb-2">{p.niveau}</p>
              <h3 className="font-semibold mb-2">{p.titre}</h3>
              <p className="text-sm text-muted leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
