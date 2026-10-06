import Link from "next/link";
import type { Locale } from "@/lib/catalogue";
import { homePath } from "@/lib/i18n";
import { PHONE_DISPLAY, PHONE_E164 } from "@/lib/site";

// À faire valider par la direction : durée de conservation (12 mois) et destinataires.
const content = {
  fr: {
    back: "← Retour à l'accueil",
    title: "Politique de confidentialité",
    intro: "Cette page explique comment ECSEL Academy traite les informations que vous laissez dans le formulaire « Rappelez-moi », conformément à la loi n° 18-07 du 10 juin 2018 relative à la protection des personnes physiques dans le traitement des données à caractère personnel.",
    sections: [
      ["Données collectées", "Nom complet, numéro de téléphone, formation ou domaine qui vous intéresse, créneau de rappel souhaité, message facultatif et langue de la page."],
      ["Finalité", "Vous rappeler pour vous présenter nos formations et vous aider à choisir votre session. Rien d'autre."],
      ["Base légale", "Votre consentement, donné en envoyant le formulaire."],
      ["Destinataires", "Uniquement l'équipe ECSEL Academy. Nous ne vendons ni ne partageons vos données."],
      ["Durée de conservation", "12 mois après votre dernier échange avec nous, puis suppression."],
      ["Vos droits", "Vous pouvez demander à tout moment l'accès à vos données, leur rectification ou leur suppression, et retirer votre consentement. Vous pouvez aussi saisir l'Autorité nationale de protection des données à caractère personnel (ANPDP)."],
    ],
    contact: "Pour exercer vos droits : appelez-nous ou écrivez-nous sur WhatsApp au",
    address: "ECSEL Academy — Cité Soummam, Lot 15 N°5, Bab Ezzouar, Alger.",
  },
  ar: {
    back: "→ العودة إلى الصفحة الرئيسية",
    title: "سياسة الخصوصية",
    intro: "توضح هذه الصفحة كيف تعالج ECSEL Academy المعلومات التي تتركها في نموذج «اتصلوا بي»، وفقًا للقانون رقم 18-07 المؤرخ في 10 يونيو 2018 المتعلق بحماية الأشخاص الطبيعيين في مجال معالجة المعطيات ذات الطابع الشخصي.",
    sections: [
      ["المعطيات المجمّعة", "الاسم الكامل، رقم الهاتف، التكوين أو المجال الذي يهمك، الوقت المفضل للاتصال، رسالة اختيارية، ولغة الصفحة."],
      ["الغرض", "الاتصال بك لتقديم تكويناتنا ومساعدتك في اختيار دورتك. لا شيء غير ذلك."],
      ["الأساس القانوني", "موافقتك عند إرسال النموذج."],
      ["الجهات المطّلعة", "فريق ECSEL Academy فقط. لا نبيع بياناتك ولا نشاركها."],
      ["مدة الحفظ", "12 شهرًا بعد آخر تواصل معنا، ثم تُحذف."],
      ["حقوقك", "يمكنك في أي وقت طلب الاطلاع على بياناتك أو تصحيحها أو حذفها، وسحب موافقتك. كما يمكنك اللجوء إلى السلطة الوطنية لحماية المعطيات ذات الطابع الشخصي (ANPDP)."],
    ],
    contact: "لممارسة حقوقك: اتصل بنا أو راسلنا على واتساب على الرقم",
    address: "ECSEL Academy — حي الصومام، القطعة 15 رقم 5، باب الزوار، الجزائر العاصمة.",
  },
} as const;

export function PrivacyPage({ locale }: { locale: Locale }) {
  const c = content[locale];
  return (
    <main className="site legal">
      <div className="wrap">
        <Link href={homePath(locale)} className="back">
          {c.back}
        </Link>
        <h1>{c.title}</h1>
        <p>{c.intro}</p>
        {c.sections.map(([h, p]) => (
          <section key={h}>
            <h2>{h}</h2>
            <p>{p}</p>
          </section>
        ))}
        <p>
          {c.contact}{" "}
          <a href={`tel:${PHONE_E164}`}>
            <bdi className="iso">{PHONE_DISPLAY}</bdi>
          </a>
          .
        </p>
        <p>{c.address}</p>
      </div>
    </main>
  );
}
