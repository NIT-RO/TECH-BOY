import Link from "next/link";
import { countFormations, domains, totalFormations, type Locale } from "@/lib/catalogue";
import { dict, duration, formationCount, formationNoun, homePath, privacyPath } from "@/lib/i18n";
import { MAPS_URL, PHONE_DISPLAY, PHONE_E164, WHATSAPP_URL } from "@/lib/site";
import { CountUp } from "./CountUp";
import { CallbackButton, DomainChips, DomainPanels } from "./Domains";
import { FlapSlogan } from "./FlapSlogan";
import { LandingStateProvider } from "./LandingState";
import { LeadForm } from "./LeadForm";
import { Prism } from "./Prism";

export function LandingPage({ locale }: { locale: Locale }) {
  const t = dict[locale];
  const other: Locale = locale === "ar" ? "fr" : "ar";

  return (
    <div className="site">
      <LandingStateProvider count={domains.length}>
        <section className="grain hero-section">
          <div className="wrap">
            <header className="site-header">
              <Link className="logo" href={homePath(locale)} aria-label={t.logoLabel}>
                <b>ECSEL</b>
                <span>ACADEMY</span>
              </Link>
              <a className="lang-switch" lang={other} hrefLang={other} href={homePath(other)} aria-label={t.langSwitch.label}>
                {t.langSwitch.text}
              </a>
            </header>

            <div className="hero">
              <div className="hero-head">
                <p className="eyebrow">{t.hero.eyebrow}</p>
                <FlapSlogan words={t.hero.slogan} />
                <h1>
                  {t.hero.h1[0]}
                  <em>{t.hero.h1[1]}</em>
                  {t.hero.h1[2]}
                </h1>
              </div>

              <div className="stage-wrap">
                <Prism
                  faces={domains.map((d) => ({
                    name: d.name[locale],
                    tagline: d.tagline,
                    countLabel: formationCount(locale, countFormations(d)),
                  }))}
                  labels={t.prism}
                  rtl={locale === "ar"}
                />
              </div>

              <div className="hero-rest">
                <p className="lede">{t.hero.lede}</p>
                <div className="ctas">
                  <a href="#rappel" className="btn primary">
                    {t.hero.ctaPrimary}
                    <span aria-hidden="true" className="arrow">
                      {t.prism.arrow}
                    </span>
                  </a>
                  <a href="#formations" className="btn ghost">
                    {t.hero.ctaSecondary}
                  </a>
                </div>
                <div className="stats">
                  <div>
                    <b>
                      <CountUp value={totalFormations} />
                    </b>
                    <span>{formationNoun(locale, totalFormations)}</span>
                  </div>
                  <div>
                    <b>
                      <CountUp value={domains.length} />
                    </b>
                    <span>{t.hero.statDomains}</span>
                  </div>
                  <div>
                    <b>
                      <CountUp value={100} suffix=" %" />
                    </b>
                    <span>{t.hero.statPresence}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="formations" className="formations">
          <div className="wrap">
            <p className="eyebrow">{t.formations.eyebrow}</p>
            <DomainChips label={t.formations.chips} names={domains.map((d) => d.name[locale])} />
            <DomainPanels
              panels={domains.map((d) => ({
                slug: d.slug,
                content: (
                  <>
                    <div className="panel-head">
                      <h2>{d.name[locale]}</h2>
                      <span className="panel-tag">{d.tagline}</span>
                    </div>
                    <div className="list">
                      {d.formations.map((f, i) => (
                        <article key={f.slug} className={f.kind === "parcours" ? "item parcours" : "item"} style={{ ["--i" as string]: i }}>
                          <div className="item-main">
                            {(f.kind === "parcours" || f.days) && (
                              <p className="item-meta">
                                {f.kind === "parcours" && <span className="badge">{t.formations.parcours}</span>}
                                {f.days && <bdi className="iso">{duration(locale, f.days)}</bdi>}
                              </p>
                            )}
                            <h3>{f.title[locale]}</h3>
                            <p className="item-summary">{f.summary[locale]}</p>
                          </div>
                          <div className="item-side">
                            <CallbackButton value={`f:${f.slug}`} label={t.formations.callback} />
                          </div>
                        </article>
                      ))}
                    </div>
                  </>
                ),
              }))}
            />
          </div>
        </section>

        <section className="why grain">
          <div className="wrap">
            <p className="eyebrow">{t.why.eyebrow}</p>
            <h2>{t.why.title}</h2>
            <ol className="why-list">
              {t.why.items.map(([title, body], i) => (
                <li key={title}>
                  <span className="why-num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="passport">
          <div className="wrap">
            <div className="voucher">
              <div>
                <p className="voucher-tag">{t.passport.tag}</p>
                <h2>{t.passport.title}</h2>
                <p>{t.passport.body}</p>
                <p className="conditions">{t.passport.conditions}</p>
                <p>{t.passport.event}</p>
              </div>
              <bdi className="voucher-value iso">{t.passport.value}</bdi>
            </div>
          </div>
        </section>

        <section id="rappel" className="form-section">
          <div className="wrap form-grid">
            <div className="intro">
              <p className="eyebrow">{t.form.eyebrow}</p>
              <h2>{t.form.title}</h2>
              <p>{t.form.intro}</p>
            </div>
            <LeadForm
              locale={locale}
              privacyHref={privacyPath(locale)}
              groups={domains.map((d) => ({
                slug: d.slug,
                name: d.name[locale],
                formations: d.formations.map((f) => ({ slug: f.slug, title: f.title[locale] })),
              }))}
            />
          </div>
        </section>

        <footer className="contact grain">
          <div className="wrap">
            <p className="eyebrow">{t.contact.eyebrow}</p>
            <h2>{t.contact.title}</h2>
            <div className="contact-grid">
              <address>{t.contact.address}</address>
              <div className="contact-actions">
                <a className="btn primary" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  {t.contact.whatsapp}
                </a>
                <a className="btn ghost" href={`tel:${PHONE_E164}`}>
                  {t.contact.call} <bdi className="iso">{PHONE_DISPLAY}</bdi>
                </a>
                <a className="btn ghost" href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                  {t.contact.maps}
                </a>
              </div>
            </div>
            <div className="site-footer">
              <span>{t.contact.motto}</span>
              <Link href={privacyPath(locale)}>{t.form.privacy}</Link>
            </div>
          </div>
        </footer>
      </LandingStateProvider>
    </div>
  );
}
