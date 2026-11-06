import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSession } from "@/lib/auth";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "CyberAcadémie — Apprendre la cybersécurité, étape par étape",
  description:
    "Parcours guidés en cybersécurité éthique : réseaux, sécurité web, pentesting méthodologique. Pour tous les niveaux.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <html lang="fr">
      <body className={`${sans.variable} ${mono.variable} font-sans bg-ink text-text min-h-screen flex flex-col`}>
        <Header session={session} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
