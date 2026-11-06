# CyberAcadémie

Plateforme de cours en cybersécurité éthique (comptes utilisateurs, progression, parcours
par niveau). Next.js 14 (App Router) + Prisma + PostgreSQL (Neon) + sessions JWT en cookie.

## 1. Installation locale

```bash
npm install
cp .env.example .env
```

Remplis `.env` avec :
- `DATABASE_URL` et `DIRECT_URL` : récupère-les depuis le dashboard Neon (onglet "Connection string"). Neon fournit normalement une URL "pooled" (pour `DATABASE_URL`) et une URL directe (pour `DIRECT_URL`, utile aux migrations).
- `AUTH_SECRET` : génère une valeur aléatoire avec `openssl rand -base64 32`.

## 2. Base de données

```bash
npx prisma migrate dev --name init
npm run seed
```

Le seed crée :
- un compte admin : `admin@cyberacademie.local` / `ChangeMoi123!` (**à changer en production**)
- un premier cours "Fondations réseau" avec une leçon d'exemple

## 3. Lancer en local

```bash
npm run dev
```

Site disponible sur http://localhost:3000

## 4. Déploiement sur Vercel

1. Pousse ce dossier sur un dépôt GitHub.
2. Sur Vercel, importe le dépôt.
3. Dans les variables d'environnement du projet Vercel, ajoute `DATABASE_URL`, `DIRECT_URL` et `AUTH_SECRET` (mêmes valeurs que ton `.env`, ou une base Neon de production séparée).
4. Vercel détecte Next.js automatiquement. Avant le premier déploiement, exécute les migrations contre la base de prod :
   ```bash
   DATABASE_URL="..." DIRECT_URL="..." npx prisma migrate deploy
   ```
5. Déploie.

## Structure du projet

```
src/app/              pages (App Router)
  page.tsx             accueil
  courses/             catalogue + détail cours + leçon
  dashboard/           espace utilisateur connecté (protégé)
  admin/               back-office (protégé, rôle ADMIN uniquement)
  login/ register/     authentification
  api/auth/            routes d'inscription/connexion/déconnexion
  api/progress/        enregistrement de la progression
  api/admin/courses/   création de parcours (admin)
src/lib/
  db.ts                client Prisma
  auth.ts              sessions JWT (cookie httpOnly)
middleware.ts          protège /dashboard et /admin
prisma/schema.prisma   modèle de données
prisma/seed.ts         admin + cours de démonstration
```

## Modèle de données

`User` (rôle STUDENT/ADMIN) · `Course` → `Module` → `Lesson` · `Progress` (suivi par utilisateur/leçon)
· `Quiz` → `QuizQuestion` · `QuizResult`.

## Gérer le contenu des cours

Pour l'instant, la création de modules/leçons se fait via **Prisma Studio** :

```bash
npx prisma studio
```

Cela ouvre une interface web pour ajouter des modules, des leçons (le champ `content` accepte du
HTML simple) et publier un cours (`published: true`). Un éditeur de contenu intégré à l'admin
peut être ajouté dans une prochaine itération.

## Important — cadre d'usage

Ce site est conçu comme plateforme **pédagogique** : il explique des concepts de sécurité et de
méthodologie de test d'intrusion, sans embarquer d'outil fonctionnel d'attaque (pas de crack
Wi-Fi, pas de scanner d'exploitation automatisé). La pratique technique doit être orientée vers
des environnements que l'utilisateur contrôle ou des plateformes d'entraînement autorisées
(labos Docker personnels, TryHackMe, HackTheBox, PortSwigger Web Security Academy, etc.).
