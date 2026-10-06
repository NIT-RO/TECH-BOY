// Catalogue B2C ECSEL Expo 2026 : 4 domaines, 19 formations + 2 parcours.
// Pas de codes, formateurs, disponibilités, prix ni dates (décision du 06/10/2026).

export type Locale = "fr" | "ar";
type L10n = Record<Locale, string>;

export type Formation = {
  slug: string;
  kind: "formation" | "parcours";
  /** null = durée non affichée (à décider) */
  days: number | null;
  title: L10n;
  summary: L10n;
};

export type Domain = {
  slug: string;
  name: L10n;
  tagline: string;
  formations: Formation[];
};

const f = (
  slug: string,
  days: number | null,
  title: L10n,
  summary: L10n,
  kind: Formation["kind"] = "formation",
): Formation => ({ slug, kind, days, title, summary });

export const domains: Domain[] = [
  {
    slug: "entrepreneuriat",
    name: { fr: "Entrepreneuriat", ar: "ريادة الأعمال" },
    tagline: "MEL FIKRA LEL KHEDMA",
    formations: [
      f("mindset-entrepreneur", 2,
        { fr: "Mindset entrepreneur", ar: "عقلية رائد الأعمال" },
        {
          fr: "Développer les réflexes et la posture de l'entrepreneur : prise de risque, résilience et passage à l'action.",
          ar: "تطوير ردود الفعل وموقف رائد الأعمال: روح المبادرة، الصمود، والانتقال إلى الفعل.",
        }),
      f("business-model-algerien", 3,
        { fr: "Business model algérien", ar: "نموذج أعمال جزائري" },
        {
          fr: "Construire un modèle économique viable en tenant compte des réalités du marché algérien.",
          ar: "بناء نموذج اقتصادي قابل للاستمرار يراعي واقع السوق الجزائري.",
        }),
      f("strategie-entreprise", 2,
        { fr: "Définir sa stratégie d'entreprise", ar: "تحديد استراتيجية مؤسستك" },
        {
          fr: "Poser les bases d'une stratégie d'entreprise : positionnement, priorités et avantage concurrentiel.",
          ar: "وضع أسس استراتيجية المؤسسة: التموضع، الأولويات، والميزة التنافسية.",
        }),
      f("demarches-administratives", 2,
        { fr: "Démarches administratives et législation", ar: "الإجراءات الإدارية والتشريع" },
        {
          fr: "Les démarches administratives, fiscales et douanières pour créer légalement son entreprise en Algérie, et les bases de la propriété intellectuelle pour protéger une idée, une marque ou une invention.",
          ar: "الإجراءات الإدارية والجبائية والجمركية لإنشاء مؤسستك قانونيًا في الجزائر، وأساسيات الملكية الفكرية لحماية فكرة أو علامة أو اختراع.",
        }),
      f("label-startup", 2,
        { fr: "Obtenir son label Startup ou Scale-up", ar: "الحصول على وسم Startup أو Scale-up" },
        {
          fr: "Comprendre les critères et la procédure pour obtenir le label Startup ou Scale-up auprès des autorités algériennes.",
          ar: "فهم المعايير والإجراءات للحصول على وسم Startup أو Scale-up لدى السلطات الجزائرية.",
        }),
      f("strategie-commerciale", 2,
        { fr: "Stratégie commerciale et marketing", ar: "الاستراتيجية التجارية والتسويقية" },
        {
          fr: "Construire un plan commercial et marketing pour les premiers mois d'activité.",
          ar: "بناء خطة تجارية وتسويقية للأشهر الأولى من النشاط.",
        }),
      f("finance-demarrage", 2,
        { fr: "Finance et gestion de démarrage", ar: "المالية والتسيير في مرحلة الانطلاق" },
        {
          fr: "Les bases de la gestion financière pour une entreprise en phase de démarrage.",
          ar: "أساسيات التسيير المالي لمؤسسة في مرحلة الانطلاق.",
        }),
      f("financement-levee-fonds", 2,
        { fr: "Financement et levée de fonds", ar: "التمويل وجمع الأموال" },
        {
          fr: "Dispositifs publics (ANADE/NESDA, ANGEM, CNAC, AAPI), dossier d'investissement, pitch investisseurs, crowdfunding COSOB.",
          ar: "أجهزة الدعم العمومية (ANADE، ANGEM، CNAC، AAPI)، ملف الاستثمار، العرض أمام المستثمرين، والتمويل التشاركي عبر COSOB.",
        }),
      f("micro-importation", 3,
        { fr: "Micro-importation en Algérie", ar: "الاستيراد المصغّر في الجزائر" },
        {
          fr: "En 3 jours (18 h), maîtrisez le cadre légal, les démarches ANAE et douanières, le choix du produit et le calcul de votre prix de revient, et repartez avec votre fiche de rentabilité prête à l'emploi.",
          ar: "في 3 أيام (18 ساعة): الإطار القانوني، إجراءات ANAE والجمارك، اختيار المنتج وحساب سعر التكلفة، وتخرج ببطاقة مردودية جاهزة للاستعمال.",
        }),
      f("parcours-entrepreneuriat", null,
        { fr: "Parcours Entrepreneuriat complet", ar: "المسار الكامل لريادة الأعمال" },
        {
          fr: "Les 8 modules enchaînés, de l'idée à l'entreprise structurée et financée.",
          ar: "الوحدات الثماني متتابعة، من الفكرة إلى مؤسسة منظمة وممولة.",
        },
        "parcours"),
    ],
  },
  {
    slug: "ecommerce",
    name: { fr: "E-commerce", ar: "التجارة الإلكترونية" },
    tagline: "BI3, KBER, DOUM",
    formations: [
      f("product-research-sourcing", 2,
        { fr: "Product Research et Sourcing", ar: "البحث عن المنتجات والتوريد" },
        {
          fr: "Identifier un produit gagnant : analyse de tendances, validation de la demande et sélection du fournisseur.",
          ar: "إيجاد منتج رابح: تحليل الاتجاهات، التحقق من الطلب، واختيار المورّد.",
        }),
      f("scaler-ecommerce", 3,
        { fr: "Scaler son e-commerce", ar: "توسيع نشاط تجارتك الإلكترونية" },
        {
          fr: "Faire grandir son business pour augmenter sa marge.",
          ar: "تنمية نشاطك لرفع هامش ربحك.",
        }),
      f("white-label", 2,
        { fr: "Branding et création d'un White Label", ar: "إنشاء علامتك الخاصة (White Label)" },
        {
          fr: "Sourcer des produits génériques, les rebrander sous sa propre marque et les vendre en ligne.",
          ar: "توريد منتجات عامة وإعادة تسميتها وبيعها تحت علامتك.",
        }),
    ],
  },
  {
    slug: "ia-automatisation",
    name: { fr: "IA & automatisation", ar: "الذكاء الاصطناعي والأتمتة" },
    tagline: "AUTOMATISI KHEDEMTEK O ARBEH LWE9T",
    formations: [
      f("no-code-generation-ia", 3,
        { fr: "No-code / Low-code et génération IA", ar: "أدوات بدون برمجة والتوليد بالذكاء الاصطناعي" },
        {
          fr: "Automatiser un workflow complet avec n8n, générer du contenu par IA et connecter Google Sheets, Gmail et WhatsApp — sans prérequis en programmation.",
          ar: "أتمتة سير عمل كامل باستخدام n8n، توليد المحتوى بالذكاء الاصطناعي وربط Google Sheets وGmail وWhatsApp، دون أي معرفة مسبقة بالبرمجة.",
        }),
      f("chatbot-vibe-coding", 3,
        { fr: "Chatbot et vibe coding", ar: "روبوت المحادثة والـ Vibe Coding" },
        {
          fr: "Déployer un chatbot omnicanal avec mémoire vectorielle, et développer une mini-application par vibe coding.",
          ar: "نشر روبوت محادثة متعدد القنوات بذاكرة شعاعية، وتطوير تطبيق مصغّر بتقنية Vibe Coding.",
        }),
      f("agents-ia", 3,
        { fr: "Création d'agents IA", ar: "إنشاء وكلاء الذكاء الاصطناعي" },
        {
          fr: "Concevoir et déployer un système multi-agents autonome en production, du RAG à l'orchestration.",
          ar: "تصميم ونشر نظام وكلاء متعددين مستقل في بيئة الإنتاج، من RAG إلى التنسيق بين الوكلاء.",
        }),
    ],
  },
  {
    slug: "marketing-contenu",
    name: { fr: "Marketing & contenu", ar: "التسويق والمحتوى" },
    tagline: "BANE 9BEL MA TBI3",
    formations: [
      f("digital-service-marketing", 2,
        { fr: "Le digital au service du marketing", ar: "الرقمي في خدمة التسويق" },
        {
          fr: "Le marketing fondamental — étude de marché, positionnement, connaissance client, stratégie de marque — réalisé avec des outils digitaux, hors acquisition payante.",
          ar: "أساسيات التسويق — دراسة السوق، التموضع، معرفة الزبون، استراتيجية العلامة — باستعمال أدوات رقمية، دون الإعلانات المدفوعة.",
        }),
      f("marketing-digital", 3,
        { fr: "Marketing digital", ar: "التسويق الرقمي" },
        {
          fr: "Les fondamentaux du marketing digital : panorama des canaux, création de contenus, acquisition et mesure de la performance.",
          ar: "أساسيات التسويق الرقمي: نظرة شاملة على القنوات، إنشاء المحتوى، الاستقطاب وقياس الأداء.",
        }),
      f("videos-ugc", 2,
        { fr: "Vidéos UGC qui convertissent", ar: "فيديوهات UGC التي تبيع" },
        {
          fr: "Concevoir des vidéos UGC orientées conversion, avec des outils accessibles sans formation graphique.",
          ar: "تصميم فيديوهات UGC موجّهة للتحويل، بأدوات في المتناول دون تكوين في التصميم الجرافيكي.",
        }),
      f("ads-meta-tiktok", 3,
        { fr: "Stratégie publicitaire & Ads : Meta et TikTok", ar: "الاستراتيجية الإعلانية: إعلانات Meta وTikTok" },
        {
          fr: "Construire une stratégie publicitaire efficace et maîtriser les leviers d'acquisition payante (Meta et TikTok Ads).",
          ar: "بناء استراتيجية إعلانية فعّالة والتحكم في وسائل الاستقطاب المدفوع (إعلانات Meta وTikTok).",
        }),
      f("parcours-marketing", 10,
        { fr: "Parcours Marketing et contenu", ar: "المسار الكامل للتسويق والمحتوى" },
        {
          fr: "Les 4 modules enchaînés, de la base à l'expertise.",
          ar: "الوحدات الأربع متتابعة، من الأساسيات إلى الاحتراف.",
        },
        "parcours"),
    ],
  },
];

/** Les parcours regroupent des formations existantes : ils ne sont pas comptés. */
export const countFormations = (d: Domain) =>
  d.formations.filter((x) => x.kind === "formation").length;

export const totalFormations = domains.reduce((n, d) => n + countFormations(d), 0);
