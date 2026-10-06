import type { Locale } from "./catalogue";

/** Accord du nom après un nombre, selon les règles de l'arabe (1, 2, 3–10, 11+). */
function arCount(n: number, one: string, two: string, few: string, many: string) {
  if (n === 1) return one;
  if (n === 2) return two;
  if (n >= 3 && n <= 10) return `${n} ${few}`;
  return `${n} ${many}`;
}

export function formationCount(locale: Locale, n: number) {
  if (locale === "ar") return arCount(n, "تكوين واحد", "تكوينان", "تكوينات", "تكوينًا");
  return n === 1 ? "1 formation" : `${n} formations`;
}

/** Libellé seul (sans le nombre), pour les compteurs du hero. */
export function formationNoun(locale: Locale, n: number) {
  if (locale === "ar") return n >= 3 && n <= 10 ? "تكوينات" : "تكوينًا";
  return n === 1 ? "formation" : "formations";
}

export function duration(locale: Locale, days: number) {
  if (locale === "ar") return arCount(days, "يوم واحد", "يومان", "أيام", "يومًا");
  return days === 1 ? "1 jour" : `${days} jours`;
}

export const dict = {
  fr: {
    meta: {
      title: "ECSEL Academy — Formations en présentiel à Alger",
      description:
        "Formations 100 % en présentiel à Bab Ezzouar : entrepreneuriat, e-commerce, IA & automatisation, marketing & contenu.",
    },
    logoLabel: "ECSEL Academy, accueil",
    langSwitch: { label: "عرض الصفحة بالعربية", text: "AR" },
    hero: {
      eyebrow: "Académie de formation en présentiel — Alger",
      slogan: ["Vends", "Grandis", "Dure"],
      h1: ["Deviens acteur du ", "business digital", " en Algérie."],
      lede: "Des formations 100 % pratiques et en présentiel : entrepreneuriat, e-commerce, IA & automatisation, marketing & contenu.",
      ctaPrimary: "Je veux être rappelé",
      ctaSecondary: "Voir les formations",
      statDomains: "domaines",
      statPresence: "présentiel",
    },
    prism: {
      group: "Domaines de formation",
      prev: "Domaine précédent",
      next: "Domaine suivant",
      prevGlyph: "‹",
      nextGlyph: "›",
      arrow: "→",
    },
    formations: {
      eyebrow: "Nos formations",
      chips: "Domaines",
      parcours: "Parcours",
      callback: "Être rappelé pour cette formation",
    },
    why: {
      eyebrow: "Pourquoi ECSEL",
      title: "Pourquoi choisir ECSEL Academy",
      items: [
        ["100 % présentiel", "En salle, dans notre centre de Bab Ezzouar."],
        ["Tous les domaines du business", "De l'entrepreneuriat à l'e-commerce, en passant par l'IA et le marketing."],
        ["Des programmes clairs", "Les objectifs et le contenu de chaque formation, expliqués simplement."],
        ["Inscription simple", "On vous rappelle, vous payez au stand ou au centre."],
      ],
    },
    passport: {
      tag: "Offre Passport ECSEL Expo",
      title: "Vous avez le Passport ECSEL Expo ?",
      body: "Profitez d'un bon de 30 000 DA sur une formation ECSEL Academy, valable jusqu'au 31/12/2026.",
      conditions: "Réservé au titulaire du Passport, une seule fois, sur présentation du Passport au stand ou au centre.",
      event: "Rendez-vous au salon ECSEL Expo du 07 au 10 octobre.",
      value: "30 000 DA",
    },
    form: {
      eyebrow: "Rappelez-moi",
      title: "Laissez votre numéro, on vous rappelle.",
      intro: "L'équipe ECSEL vous appelle pour vous aider à choisir votre formation et votre session.",
      name: "Nom complet",
      phone: "Numéro de téléphone",
      phoneHint: "Exemple : 0770 40 13 65",
      interest: "Formation ou domaine qui vous intéresse",
      undecided: "Pas encore décidé",
      wholeDomain: "tout le domaine",
      when: "Quand vous rappeler ?",
      times: { "": "À tout moment", morning: "Le matin", afternoon: "L'après-midi", evening: "Le soir" },
      message: "Message (facultatif)",
      consent: "En envoyant ce formulaire, vous acceptez qu'ECSEL Academy vous contacte au sujet de ses formations. Nous ne vendons ni ne partageons vos données.",
      privacy: "Politique de confidentialité",
      submit: "Rappelez-moi",
      sending: "Envoi…",
      errors: {
        name: "Indiquez votre nom (2 caractères minimum).",
        phone: "Numéro algérien invalide. Exemple : 0770 40 13 65.",
      },
      success: "Merci ! L'équipe ECSEL vous rappelle très vite.",
      failure: "L'envoi n'a pas abouti. Écrivez-nous sur WhatsApp, on vous répond.",
      whatsappAction: "WhatsApp",
      whatsappText: (name: string, interest: string) =>
        `Bonjour, je suis ${name}. Je souhaite être rappelé(e)${interest ? ` au sujet de : ${interest}` : ""}.`,
    },
    contact: {
      eyebrow: "Nous trouver",
      title: "Centre ECSEL Academy",
      address: "Cité Soummam, Lot 15 N°5 — Bab Ezzouar, Alger",
      whatsapp: "WhatsApp",
      call: "Appeler",
      maps: "Ouvrir dans Maps",
      motto: "BUILD · LEARN · SCALE",
    },
  },
  ar: {
    meta: {
      title: "ECSEL Academy — تكوينات حضورية في الجزائر العاصمة",
      description:
        "تكوينات حضورية 100٪ في باب الزوار: ريادة الأعمال، التجارة الإلكترونية، الذكاء الاصطناعي والأتمتة، التسويق والمحتوى.",
    },
    logoLabel: "ECSEL Academy، الصفحة الرئيسية",
    langSwitch: { label: "عرض الصفحة بالفرنسية", text: "FR" },
    hero: {
      eyebrow: "أكاديمية تكوين حضوري — الجزائر العاصمة",
      slogan: ["بيع", "كبر", "دوم"],
      h1: ["كن فاعلاً في ", "الأعمال الرقمية", " بالجزائر."],
      lede: "تكوينات تطبيقية 100٪ حضورية: ريادة الأعمال، التجارة الإلكترونية، الذكاء الاصطناعي والأتمتة، التسويق والمحتوى.",
      ctaPrimary: "أريد أن يُتصل بي",
      ctaSecondary: "تصفّح التكوينات",
      statDomains: "مجالات",
      statPresence: "حضوري",
    },
    prism: {
      group: "مجالات التكوين",
      prev: "المجال السابق",
      next: "المجال التالي",
      prevGlyph: "›",
      nextGlyph: "‹",
      arrow: "←",
    },
    formations: {
      eyebrow: "تكويناتنا",
      chips: "المجالات",
      parcours: "مسار",
      callback: "أريد أن يُتصل بي بخصوص هذا التكوين",
    },
    why: {
      eyebrow: "لماذا ECSEL",
      title: "لماذا تختار ECSEL Academy",
      items: [
        ["100٪ حضوري", "في القاعة، بمركزنا في باب الزوار."],
        ["كل مجالات الأعمال", "من ريادة الأعمال إلى التجارة الإلكترونية، مرورًا بالذكاء الاصطناعي والتسويق."],
        ["برامج واضحة", "أهداف ومحتوى كل تكوين، مشروحة ببساطة."],
        ["تسجيل بسيط", "نتصل بك، وتدفع في الجناح أو في المركز."],
      ],
    },
    passport: {
      tag: "عرض Passport ECSEL Expo",
      title: "عندك Passport ECSEL Expo؟",
      body: "استفد من قسيمة بقيمة ⁨30 000 دج⁩ على تكوين في ECSEL Academy، صالحة حتى ⁨31/12/2026⁩.",
      conditions: "لصاحب الـ Passport فقط، مرة واحدة، عند تقديم الـ Passport في الجناح أو في المركز.",
      event: "نلتقي في صالون ECSEL Expo من 07 إلى 10 أكتوبر.",
      value: "30 000 دج",
    },
    form: {
      eyebrow: "اتصلوا بي",
      title: "اترك رقمك ونتصل بك.",
      intro: "يتصل بك فريق ECSEL لمساعدتك في اختيار تكوينك ودورتك.",
      name: "الاسم الكامل",
      phone: "رقم الهاتف",
      phoneHint: "مثال: ⁦0770 40 13 65⁩",
      interest: "التكوين أو المجال الذي يهمك",
      undecided: "لم أقرر بعد",
      wholeDomain: "المجال كله",
      when: "متى نتصل بك؟",
      times: { "": "في أي وقت", morning: "صباحًا", afternoon: "بعد الظهر", evening: "مساءً" },
      message: "رسالة (اختياري)",
      consent: "بإرسال هذا النموذج، توافق على أن تتصل بك ECSEL Academy بخصوص تكويناتها. لا نبيع بياناتك ولا نشاركها.",
      privacy: "سياسة الخصوصية",
      submit: "اتصلوا بي",
      sending: "جارٍ الإرسال…",
      errors: {
        name: "اكتب اسمك (حرفان على الأقل).",
        phone: "رقم جزائري غير صالح. مثال: 0770 40 13 65.",
      },
      success: "شكرًا! سيتصل بك فريق ECSEL قريبًا.",
      failure: "لم يتم الإرسال. راسلنا على واتساب وسنرد عليك.",
      whatsappAction: "واتساب",
      whatsappText: (name: string, interest: string) =>
        `السلام عليكم، أنا ${name}. أريد أن يُتصل بي${interest ? ` بخصوص: ${interest}` : ""}.`,
    },
    contact: {
      eyebrow: "تجدنا هنا",
      title: "مركز ECSEL Academy",
      address: "حي الصومام، القطعة 15 رقم 5 — باب الزوار، الجزائر العاصمة",
      whatsapp: "واتساب",
      call: "اتصل",
      maps: "افتح في الخرائط",
      motto: "BUILD · LEARN · SCALE",
    },
  },
} as const;

export type Dict = (typeof dict)[Locale];

export const homePath = (locale: Locale) => (locale === "ar" ? "/ar" : "/");
export const privacyPath = (locale: Locale) => (locale === "ar" ? "/ar/confidentialite" : "/confidentialite");
