# Site ECSEL Academy

Landing bilingue FR (`/`) et AR (`/ar`), reconstruite à l'identique de la structure de `ecsel-academy.vercel.app`, avec le catalogue B2C ECSEL Expo 2026.

**Stack** : Next.js 15 (App Router, Server Actions) · React 19 · Sonner · CSS pur · aucune base de données.

## Lancer en local
```bash
cd site
npm install
cp .env.example .env.local   # renseigner LEADS_WEBHOOK_URL
npm run dev                  # http://localhost:3000 et /ar
```
Vérifications : `npm run lint` (TypeScript) puis `npm run build`.

## Modifier le contenu
| Quoi | Fichier |
|---|---|
| Domaines et formations (FR + AR) | `lib/catalogue.ts` |
| Textes de la page (hero, pourquoi, Passport, formulaire, contact) | `lib/i18n.ts` |
| Téléphone, WhatsApp, adresse Maps | `lib/site.ts` |
| Politique de confidentialité | `components/PrivacyPage.tsx` |

Le compteur « formations » et les libellés du prisme se calculent seuls. Les **parcours** (`kind: "parcours"`) sont affichés sans être comptés : 19 formations.
Pour ajouter une durée à un parcours, remplacer `null` par le nombre de jours.

## Recevoir les demandes de rappel
Le formulaire envoie chaque demande en JSON (POST) à `LEADS_WEBHOOK_URL`. **Sans cette variable, aucune demande n'est enregistrée.** Le visiteur voit alors un message d'erreur avec un bouton WhatsApp pré-rempli.

Exemple de demande reçue :
```json
{ "created_at": "2026-10-06T10:04:08.068Z", "full_name": "…", "phone": "+213550123456",
  "interest": "f:chatbot-vibe-coding", "domain": "IA & automatisation", "formation": "Chatbot et vibe coding",
  "preferred_time": "evening", "message": null, "locale": "fr", "source": "site", "user_agent": "…" }
```

### Option la plus simple : Google Sheet (gratuit, 10 min)
1. Créer une Google Sheet, puis ouvrir **Extensions → Apps Script** et coller :
   ```js
   const SECRET = "changer-ce-secret";
   function doPost(e) {
     if (e.parameter.key !== SECRET) return ContentService.createTextOutput("forbidden");
     const d = JSON.parse(e.postData.contents);
     SpreadsheetApp.getActiveSheet().appendRow([
       d.created_at, d.full_name, "'" + d.phone, d.domain, d.formation, d.preferred_time, d.message, d.locale, d.source,
     ]);
     return ContentService.createTextOutput("ok");
   }
   ```
2. **Déployer → Nouveau déploiement → Application Web**, exécuter en tant que « Moi », accès « Tout le monde ».
3. `LEADS_WEBHOOK_URL = <URL de l'application web>?key=changer-ce-secret`. Apps Script ne lit pas les en-têtes HTTP, d'où le secret passé dans l'URL.

Un webhook **n8n** ou **Make** fonctionne aussi. Dans ce cas, `LEADS_WEBHOOK_SECRET` est envoyé dans l'en-tête `X-Webhook-Secret`.

## Mesure et provenance des contacts
- **Meta Pixel / GA4** : renseigner `NEXT_PUBLIC_META_PIXEL_ID` et/ou `NEXT_PUBLIC_GA_ID` dans Vercel, puis redéployer. Rien n'est chargé tant que ces variables sont vides. Chaque demande envoyée déclenche `Lead` (Meta) et `generate_lead` (GA4).
- **Provenance** : ajouter `?src=…` aux liens pour savoir d'où vient chaque contact (colonne `source` de la Sheet). À défaut, le site lit `utm_source`. Exemples :

| Support | Lien |
|---|---|
| QR code du stand ECSEL Expo | `https://<site>/ar?src=stand` |
| Flyer / roll-up | `https://<site>/?src=flyer` |
| Bio Instagram | `https://<site>/?src=instagram` |
| Publicité Meta | `https://<site>/?utm_source=meta_ads` |

## Déployer sur Vercel
1. Importer le dépôt dans Vercel et régler **Root Directory = `site`**.
2. Variable d'environnement obligatoire : `LEADS_WEBHOOK_URL`. Le domaine de production est détecté automatiquement ; `NEXT_PUBLIC_SITE_URL` ne sert que pour un domaine personnalisé.
3. Après le déploiement, envoyer une demande test et vérifier qu'elle arrive dans la Sheet.
4. Ouvrir `https://<site>/qr` et imprimer les QR codes du stand. Ils pointent automatiquement vers le bon domaine.

## Différences avec le site d'origine (corrections)
- Catalogue complet : 19 formations et 2 parcours, au lieu de 6. Durées et intitulés alignés sur le PPTX.
- Retirés : codes de formation, formateurs, disponibilités, prix, dates. Le parcours Entrepreneuriat n'affiche pas de durée (à décider).
- `lang` et `dir` corrects sur chaque page (`<html lang="ar" dir="rtl">`), balises `hreflang`, plus de `noindex`, ajout de `sitemap.xml` et `robots.txt`.
- Les textes qui promettaient « dates, lieux et prix affichés » ou « la plus grande académie d'Algérie » ont été corrigés. L'accroche cite les 4 domaines réels.
- Politique de confidentialité (loi 18-07) liée au formulaire. Le lien « Espace équipe » (`/login`, sans back-office) est remplacé par ce lien.
- Validation des numéros algériens (côté client et serveur) et normalisation au format +213.
