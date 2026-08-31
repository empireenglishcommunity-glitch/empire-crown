import { Arabic, CrownEmblem } from '@/components/ui';
import { AR } from '@/i18n/ar';
import { IDENTITY, PROPERTIES } from '@/site.config';
import { getContent } from '@/i18n/content';
import { isRtl, type Locale } from '@/i18n/types';

/**
 * §12 FOOTER.
 *
 * The disclaimer block is deliberately plain-spoken rather than legal boilerplate.
 * The MACAL brand bible's own forbidden list includes "no guaranteed returns — we
 * educate, we don't sell fantasy", so saying it out loud is *on-brand*, not a
 * concession. It also happens to be the correct regulatory posture for anyone
 * describing themselves as a trader and investor in the UAE.
 */
export function SiteFooter({ locale = 'en' }: { locale?: Locale }) {
  const t = getContent(locale);
  const rtl = isRtl(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[rgba(201,168,76,0.16)] bg-[rgba(6,6,6,0.92)]">
      <div className="shell py-14">
        {/* Brand block */}
        <div className="flex flex-col items-center text-center">
          <CrownEmblem size={56} className="mb-5" />
          <p className="font-[family-name:var(--font-display)] text-lg font-bold uppercase tracking-[0.24em] text-[#c9a84c]">
            {IDENTITY.company}
          </p>
          <p className="mt-3 font-[family-name:var(--font-data)] text-[10px] uppercase tracking-[0.3em] text-[#a08a63]">
            {IDENTITY.brandMotto}
          </p>
          <p className={`mt-5 text-sm text-[#b8a88a] ${rtl ? 'ar-text' : 'font-[family-name:var(--font-body)] italic'}`}>
            {t.eec.tagline}
          </p>
        </div>

        <div className="hairline my-10" aria-hidden="true" />

        {/* Properties */}
        <nav aria-label="Empire properties" className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          {[
            { label: t.footer.properties.english, href: PROPERTIES.root },
            { label: t.footer.properties.placement, href: PROPERTIES.assessment },
            { label: t.footer.properties.practice, href: PROPERTIES.practice },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[11px] text-[#a08a63] transition-colors hover:text-[#c9a84c] ${rtl ? 'ar-text text-[13px]' : 'font-[family-name:var(--font-display)] uppercase tracking-[0.18em]'}`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hairline my-10" aria-hidden="true" />

        {/* Honest disclaimers */}
        <div className="mx-auto max-w-2xl space-y-2.5 text-center">
          <p className={`text-[11px] leading-relaxed text-[#8f7a58] ${rtl ? 'ar-text text-[12.5px]' : 'font-[family-name:var(--font-data)] tracking-[0.04em]'}`}>
            {t.footer.cefr}
          </p>
          {!rtl && <Arabic className="text-[12px] text-[#8f7a58]">{AR.footer.cefr}</Arabic>}
          <p className={`text-[11px] leading-relaxed text-[#8f7a58] ${rtl ? 'ar-text text-[12.5px]' : 'font-[family-name:var(--font-data)] tracking-[0.04em]'}`}>
            {t.footer.finance}
          </p>
          {!rtl && <Arabic className="text-[12px] text-[#8f7a58]">{AR.footer.finance}</Arabic>}
        </div>

        <p className={`mt-9 text-center text-[10px] text-[#7a6849] ${rtl ? 'ar-text text-[12px]' : 'font-[family-name:var(--font-data)] uppercase tracking-[0.22em]'}`}>
          © {year} {IDENTITY.company} · {IDENTITY.name} · {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
