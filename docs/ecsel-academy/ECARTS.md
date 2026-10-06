# Site ↔ Catalogue B2C 2026 : écarts et plan d'adaptation

> Sources : `Catalogue_B2C_ECSEL_Expo_2026.pptx` (16 slides) et le HTML de `/ar` (voir [README.md](./README.md)).
> Données cibles : [`catalogue-2026.json`](./catalogue-2026.json) (FR + AR).

---

## A. Ce que le site affiche aujourd'hui, comparé au catalogue

| Domaine | Site | Catalogue | Manquantes sur le site |
|---|---|---|---|
| Entrepreneuriat | 1 (R13) | **10** | Mindset · Business model algérien · Stratégie d'entreprise · Démarches administratives · Label Startup/Scale-up · Stratégie commerciale · Finance de démarrage · Financement & levée de fonds · **Micro-importation (cabas)** |
| E-commerce | 2 (F05, F04) | 3 | **Scaler son e-commerce** |
| IA & automatisation | 2 (R09, R11) | 3 | **Chatbot et vibe coding** (niveau 2, ce qui casse la progression 1 → 3) |
| Marketing & contenu | 1 (R12) | 5 (4 + parcours) | Le digital au service du marketing (R15) · Marketing digital · Vidéos UGC (R14) · **Parcours Marketing 10 j** |
| **Total** | **6** | **21** | **15 formations absentes** |

Le site présente donc **moins d'un tiers de l'offre**. Les compteurs du hero (« 6 formations ») sont à corriger.

### Données à corriger sur les 6 formations existantes
| Code | Champ | Site | Catalogue |
|---|---|---|---|
| F04 | Durée | 3 j | **2 j** |
| F04 | Statut | Bientôt | **Disponible** (slide) |
| F04 | Titre FR | Créer sa marque (White Label) | Branding et création d'un White Label |
| R12 | Titre | Stratégie marketing et publicité | **Stratégie publicitaire & Ads : Meta et TikTok** |
| R09 / R11 | Résumé | version courte | ajouter les outils cités (Google Sheets, Gmail, WhatsApp / RAG, orchestration) |

---

## B. Incohérences internes du catalogue : à arbitrer avant publication

Je ne les ai **pas** tranchées seul. Le JSON suit ce que montrent les slides et signale chaque cas par un champ `_alerte`.

| # | Problème | Pourquoi c'est risqué | Proposition |
|---|---|---|---|
| **B1** | **Parcours Entrepreneuriat R13 = « 8 jours »**, mais ses 8 modules font **17 jours** pris séparément (2+3+2+2+2+2+2+2) | Un visiteur fera le calcul et on vendrait 8 jours au prix de 17 ? | Confirmer : version **condensée** (1 j/module, à expliquer) **ou** durée réelle de 17 j |
| B2 | Couverture « **20** formations », note « **19** », décompte réel **21** (10 + 3 + 3 + 5) | Chiffre affiché en gros sur le site | Fixer une règle : les parcours comptent-ils ? (21 avec, 19 sans) |
| B3 | F04 White Label : slide = 2 j, Disponible, Amri ; note = « formateur à définir », domaine « 3 formations bientôt » | Promettre une formation sans formateur | Si le formateur est confirmé, garder Disponible ; sinon Bientôt |
| B4 | R15 : slide = Disponible 2 j ; note = « bientôt, durée à confirmer » | Idem | Confirmer le statut et la durée |
| B5 | Parcours Marketing « Disponible » alors que le module UGC (R14) est « Bientôt » ; titre « Partie 1 à 3 » pour 4 modules | Un parcours ne peut pas démarrer avec un module manquant | Passer le parcours en Bientôt **ou** R14 en Disponible |
| B6 | 11 formations sans code interne (seuls R09, R11–R15, F04, F05 sont connus) | Le formulaire de rappel affiche « code — titre » | Me fournir les codes ; sinon je les masque pour ces formations |
| B7 | Notes interne de la slide « Parcours Marketing » = copie de celle de R13 | Mineur (interne) | — |

---

## C. Plan d'adaptation du site (une fois le dépôt accessible)

### C1. Contenu : avant le salon (priorité P0)
| Élément | Actuel | Nouveau |
|---|---|---|
| Stats hero | 6 formations · 4 domaines · 100 % | **21** (ou 20/19, selon B2) · 4 · 100 % |
| Prisme | « تكوين واحد / تكوينان » | 10 · 3 · 3 · 5 |
| Phrase d'accroche | cite 6 domaines (gestion, branding…) | les **4 domaines réels** |
| Pourquoi #3 « tout est affiché » | contredit par la page | « Programme détaillé, formateurs identifiés » (vrai **aujourd'hui**) |
| Catalogue | 6 fiches | 21 fiches + slogans darija/EN |
| `<select>` du formulaire | 6 options | 21 options, groupées par domaine |

### C2. Structure : ce que le catalogue apporte et que le site ne sait pas afficher
| Besoin | Changement de données | Changement d'interface |
|---|---|---|
| Entrepreneuriat = 10 fiches | `group` (Partie 1/2/3, Formation spéciale, Parcours) | sous-titres dans le panneau du domaine |
| Progression IA niveau 1 → 3 | `level`, `prerequisites` | badges « Niveau 1/2/3 » + prérequis |
| Parcours (R13, Marketing) | `kind = parcours` + liste `modules` | carte « Parcours » mise en avant, modules listés |
| Slogans par formation | `tagline_darija`, `tagline_en` | ligne sous le titre (comme sur les slides) |
| Formateurs | `trainers` | **Recommandation : ne pas afficher** de noms de famille seuls. Afficher « Prénom Nom, fonction » ou rien |

### C3. Ce qui reste bloqué
- **Prix et dates** : toujours absents du catalogue. Le site garde « Prix au stand / Dates bientôt » jusqu'à ce que vous les fournissiez.
- **Accès au dépôt** du site : nécessaire pour appliquer C1 et C2.
