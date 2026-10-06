# Reverse engineering — ECSEL Academy (`/ar`)

> **Source analysée** : HTML rendu de `https://ecsel-academy.vercel.app/ar` (outerHTML + payload RSC Next.js), capturé le 06/10/2026.
> **Légende** : **[Fait]** = lu dans le code · **[Estimation]** = déduit avec bonne confiance · **[Hypothèse]** = à confirmer.

---

## 1. Synthèse en 30 secondes

| Élément | Constat |
|---|---|
| Nature | **Landing page de génération de leads** (pas un LMS, pas de paiement en ligne) |
| Contexte | Campagne liée au salon **ECSEL Expo (07 → 10 octobre)** + offre « Passport » 30 000 DA |
| Conversion | Formulaire « اتصلوا بي » (rappel) + WhatsApp + appel direct |
| Stack | **Next.js App Router (RSC) + React 19 Server Actions + Tailwind + Vercel** |
| Back-office | Existe : route `/login` (« فضاء الفريق » = espace équipe) |
| Statut | **Pré-production** : `robots: noindex, nofollow` |
| Catalogue | 4 domaines · 6 formations · **0 date publiée · 0 prix publié** |

---

## 2. Stack technique

| Couche | Technologie | Niveau | Indice dans le code |
|---|---|---|---|
| Framework | Next.js **App Router** | Fait | `self.__next_f.push(...)` (flux RSC), chunk `app/(site)/ar/page-*.js` |
| Version | Next.js 15.x (≥ 15.4 probable) | Estimation | composants internes `AsyncMetadataOutlet`, `IconMark` |
| React | React 19 + **Server Actions** | Fait | `action="javascript:throw new Error('React form unexpectedly submitted.')"` + script `$$reactFormReplay` |
| Hébergement | Vercel | Fait | domaine `*.vercel.app`, paramètre `?dpl=dpl_7cgVt…` |
| CSS | **Tailwind CSS** (formulaire) + **CSS custom** (sections) | Fait | `min-h-12 border-ink/20 bg-ecsel-red-deep` vs `.hero .prism .grain .voucher` |
| Design tokens | `ink`, `paper-2`, `muted`, `ecsel-red-deep`, `theme-color #0b0b0c` | Fait | classes Tailwind personnalisées |
| Polices | `next/font` — 5 familles auto-hébergées (3 globales + 2 sur le site) | Fait (noms inconnus) | `__variable_7e736b`, `__variable_a483d3`… |
| Notifications | **Sonner** (toasts, position `top-center`) | Fait | `[data-sonner-toaster]`, composant `Toaster` |
| Accessibilité | React Aria (probable) | Estimation | `data-react-aria-top-layer="true"` |
| Base de données | PostgreSQL (Supabase probable) | Estimation | tous les IDs sont des **UUID v4** ; `/login` |
| Auth équipe | Supabase Auth / NextAuth | Hypothèse | route `/login` |
| Analytics / Pixel | **Aucun visible** dans le HTML | Fait | ni Meta Pixel, ni GA, ni GTM |

### Arborescence probable du projet
```
app/
├─ layout.tsx                 # <html lang="fr">, polices, <Toaster/>
├─ (site)/                    # route group : site public
│  ├─ layout.tsx              # polices du site + CSS 63f6f3c6…
│  ├─ page.tsx                # "/"   → version FR
│  └─ ar/page.tsx             # "/ar" → version AR (dir="rtl")
└─ login/page.tsx             # "/login" → espace équipe (back-office)
```
**[Estimation]** L'i18n n'utilise pas de segment `[locale]` ni de librairie (next-intl…) : deux pages statiques FR/AR qui partagent les composants avec une prop `locale`.

---

## 3. Plan du site & parcours

| Route | Rôle | Statut |
|---|---|---|
| `/` | Landing FR | Fait (lien « FR ») |
| `/ar` | Landing AR (RTL) | Fait |
| `/login` | Espace équipe (gestion leads/catalogue) | Fait (lien footer) |
| `/og.png` | Image de partage social | Fait |

**Parcours utilisateur** (page unique, ancres) :
```
Hero (prisme 3D des domaines) ──► #formations (chips + panneaux)
        │                                   │
        └── CTA "أريد أن يُتصل بي" ─────────┴── bouton "rappel pour cette formation"
                                                │ (pré-sélectionne la formation)
                                                ▼
                                  #rappel (formulaire) ──► Server Action ──► table leads
                                                │                         └► toast Sonner
                                                ▼
                                  Footer : WhatsApp · Appel · Google Maps
```

---

## 4. Sections de la page (ordre d'affichage)

| # | Section | Contenu clé |
|---|---|---|
| 1 | Header | Logo `ECSEL ACADEMY` + switch `FR` |
| 2 | Hero | Eyebrow « أكاديمية تكوين حضوري — الجزائر العاصمة » · slogan animé **بيع · كبر · دوم** · H1 « كن فاعلاً في الأعمال الرقمية بالجزائر » · prisme 3D (4 faces = 4 domaines) · 2 CTA · stats animées **6 / 4 / 100 %** |
| 3 | `#formations` | Chips de domaines + panneau actif listant les formations |
| 4 | Pourquoi ECSEL | 4 arguments : 100 % présentiel · tous les domaines business · tout est affiché · inscription simple (paiement au stand ou au centre) |
| 5 | Passport | Bon de **30 000 DA** valable jusqu'au **31/12/2026**, 1 fois, sur présentation du Passport ECSEL Expo |
| 6 | `#rappel` | Formulaire de rappel |
| 7 | Footer | Adresse : Cité Soummam, Lot 15 N°5, Bab Ezzouar · WhatsApp/tel `+213 770 40 13 65` · Maps · « BUILD · LEARN · SCALE » · lien `/login` |

---

## 5. Composants React (client) identifiés

| Composant | Fonction | Détail technique |
|---|---|---|
| `LandingStateProvider` | Contexte partagé | Synchronise **prisme ↔ chips ↔ panneaux** (domaine actif) |
| `FlapSlogan` | Animation « split-flap » (tableau d'aéroport) | props `words=["بيع","كبر","دوم"]` |
| `Prism` | Carrousel 3D CSS | 4 faces `rotateY(n×90deg) translateZ(88px)`, variables `--lit` (éclairage) et `--shift`, contrôles ‹ › + `<output aria-live>` |
| `CountUp` | Compteurs animés | `value`, `suffix` |
| `DomainChips` / `DomainPanels` | Filtre par domaine | `aria-pressed`, panneaux `hidden` / `data-active` |
| `CallbackButton` | « Rappel pour cette formation » | prop `formationId` → pré-remplit le `<select>` et scrolle vers `#rappel` **[Estimation]** |
| `LeadForm` | Formulaire de rappel | props `locale`, `academyWhatsapp`, `groups` (domaines → formations) |
| `Toaster` (Sonner) | Feedback après envoi | — |

---

## 6. Formulaire de lead — spécification exacte

| Champ (`name`) | Type | Contraintes | Remarque |
|---|---|---|---|
| `full_name` | text | requis, max 80 | `autocomplete="name"` |
| `phone` | tel | requis | `dir="ltr"`, police mono, exemple `0770 40 13 65` |
| `interest` | select | optionnel | **valeur polymorphe** : `d:<uuid>` = domaine entier, `f:<uuid>` = formation, `""` = pas encore décidé |
| `preferred_time` | radio | `""` / `morning` / `afternoon` / `evening` | « quand vous rappeler ? » |
| `message` | textarea | max 500 | optionnel |
| `locale` | hidden | `ar` / `fr` | langue du lead → langue du rappel |
| `source` | hidden | `site` | prévu pour d'autres sources (stand, Expo, campagne) |
| `website` | **honeypot** | doit rester vide | anti-spam sans captcha |

- `novalidate` → validation côté client personnalisée (probablement Zod, aussi côté serveur) **[Estimation]**.
- Envoi par **Server Action** : aucun endpoint `/api/...` public.
- Mention de consentement présente, mais **pas de lien vers une politique de confidentialité**.

---

## 7. Modèle de données déduit

Voir [`schema.sql`](./schema.sql) et [`catalogue.json`](./catalogue.json).

```
domains 1───n formations 1───n sessions
   ▲               ▲
   └──── leads.interest (d:uuid | f:uuid)
users (équipe, /login) ──► gèrent leads + catalogue
```

| Entité | Attributs observés | Attributs déduits |
|---|---|---|
| **Domain** | id, name (AR/FR), tagline (darija latine), ordre | slug |
| **Formation** | id, code (`R13`, `F05`…), title, summary, durée en jours, badge « bientôt », prix affiché | price_dzd (nullable), is_published |
| **Session** | « التواريخ قريبًا » (dates à venir), classe CSS `seats none` | start/end date, salle, capacité, places restantes (états `none` / `few` / `ok` probables) |
| **Lead** | full_name, phone, interest, preferred_time, message, locale, source | status (nouveau / rappelé / inscrit), assigned_to, created_at |

**Codes formation** : deux séries, `R09 R11 R12 R13` et `F04 F05`. Seules les `F` portent le badge « قريبًا ». **[Hypothèse]** `R` = programme récurrent/régulier, `F` = nouvelle formation. Le code est sans doute repris d'un catalogue interne plus large (numéros non contigus).

---

## 8. Catalogue publié

| Code | Formation | Domaine | Durée | Statut | Prix | Dates |
|---|---|---|---|---|---|---|
| R13 | Parcours complet entrepreneuriat (8 modules) | Entrepreneuriat | 8 j | Actif | Au stand | À venir |
| F05 | Recherche de produits & sourcing | E-commerce | 2 j | Bientôt | Au stand | À venir |
| F04 | Créer sa marque (White Label) | E-commerce | 3 j | Bientôt | Au stand | À venir |
| R09 | No-code & génération IA (n8n) | IA & automatisation | 3 j | Actif | Au stand | À venir |
| R11 | Créer des agents IA (multi-agents en production) | IA & automatisation | 3 j | Actif | Au stand | À venir |
| R12 | Stratégie marketing & publicité (Meta, TikTok) | Marketing & contenu | 3 j | Actif | Au stand | À venir |

Taglines en darija latine : *MEL FIKRA LEL KHEDMA* · *BI3, KBER, DOUM* · *AUTOMATISI KHEDEMTEK O ARBEH LWE9T* · *BANE 9BEL MA TBI3*.

---

## 9. Audit critique : forces et faiblesses

### Forces
- **Positionnement local fort** : darija, mention du salon, paiement au stand, WhatsApp, adresse précise.
- **Friction minimale** : 2 champs obligatoires, rappel au lieu d'une inscription.
- **Accessibilité soignée** : `aria-*`, `<bdi>` pour les chiffres en RTL, `aria-live`, honeypot plutôt que captcha.
- **Architecture saine** : catalogue en base de données, Server Actions, composants réutilisés en FR et AR.

### Incohérences et risques
| # | Problème | Impact | Correction |
|---|---|---|---|
| 1 | La promesse « التواريخ والأماكن والأسعار معروضة » (dates, lieux et prix affichés : meta + argument n°3) est **contredite** par la page : aucun prix, aucune date | Crédibilité, frustration | Publier au moins un « à partir de X DA » + un mois indicatif, ou retirer la promesse |
| 2 | Le texte d'accroche cite 6 domaines (gestion, contenu, branding…) mais seuls **4 domaines** existent | Incohérence | Aligner le texte sur le catalogue réel |
| 3 | `noindex, nofollow` | Aucune visibilité Google | Normal en pré-prod, **à retirer avant le salon** |
| 4 | `<html lang="fr">` sur la page AR (le RTL est porté par une `div`) | SEO, lecteurs d'écran | `lang`/`dir` dynamiques dans le layout |
| 5 | Pas de `hreflang` alternates dans le `<head>` | SEO bilingue | `alternates.languages` dans les metadata |
| 6 | Aucun pixel ou outil d'analytics visible | **Impossible de mesurer le ROI du salon** | Meta Pixel + GA4/Vercel Analytics + UTM dans `source` |
| 7 | Pas de politique de confidentialité alors que des données personnelles sont collectées | Conformité **Loi 18-07** (protection des données, ANPDP) | Page « Confidentialité » + lien sous le bouton |
| 8 | « أكبر أكاديمية للتكوين في الجزائر » (« la plus grande académie de formation en Algérie ») | Affirmation invérifiable | Remplacer par une preuve chiffrée |
| 9 | Catalogue mince (6 formations, dont 2 « bientôt ») | Faible profondeur d'offre | Normal pour un MVP lié au salon |

---

## 10. Reproduire l'équivalent (cahier des charges condensé)

**Périmètre MVP** : landing FR/AR + catalogue administrable + capture de leads + back-office minimal.

| Bloc | Choix recommandé | Alternative no-code |
|---|---|---|
| Front | Next.js 15 + Tailwind + Sonner | Framer / Webflow |
| Données + auth | Supabase (Postgres + Auth + RLS) | Airtable |
| Formulaire | Server Action + Zod + honeypot | Tally / Fillout |
| Notification équipe | Webhook → n8n → WhatsApp/Telegram/Email | Make |
| Back-office | `/login` + table de leads (statut, assignation) | Interface Airtable |
| Hébergement | Vercel (offre gratuite suffisante au départ) | — |

| Lot | Charge estimée (1 développeur) |
|---|---|
| Landing bilingue + design | 4–6 j |
| Effets premium (prisme 3D, split-flap, count-up) | 2–3 j |
| Schéma BDD + catalogue | 1–2 j |
| Formulaire de lead + notifications | 1–2 j |
| Back-office leads | 3–5 j |
| **Total** | **≈ 11–18 jours** (**[Estimation]**) |

**Suggestions — non incluses dans le périmètre initial** : envoi automatique d'un message WhatsApp de confirmation, scan du QR Passport au stand, statut de lead → tableau de bord de conversion par source (stand / site / campagne).
