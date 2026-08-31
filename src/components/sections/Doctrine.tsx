'use client';

import { KickerClose, Rise, SectionShell } from '@/components/ui';
import { useLocale } from '@/i18n/LocaleProvider';
import { AR } from '@/i18n/ar';

/**
 * §9 THE DOCTRINE — six operating principles.
 *
 * Adapted from the worldview in `empire-nexus/content/brand/macal-brand-bible.md`, so
 * the page's philosophy matches what the content engine already publishes. Its job is
 * to make the right visitor feel *aligned* — that is what converts mentorship leads,
 * not a feature list.
 *
 * The Arabic is not a literal translation. "Hold your wallet" has no Arabic equivalent
 * that lands, so it becomes «أمسك محفظتك» inside a reframed sentence that keeps the
 * warning rather than the idiom.
 */
export function Doctrine() {
  const { t, rtl } = useLocale();

  return (
    <SectionShell
      id="doctrine"
      kicker={t.doctrine.kicker}
      title={t.doctrine.title}
      lead={t.doctrine.lead}
      leadAr={rtl ? undefined : AR.doctrine}
    >
      <div className="grid grid-cols-1 gap-x-12 gap-y-9 lg:grid-cols-2">
        {t.doctrine.items.map((p, i) => (
          <Rise key={p.title} index={i}>
            <div
              className={`flex gap-5 transition-colors duration-500 hover:border-[#c9a84c] ${
                rtl
                  ? 'border-r-2 border-[rgba(201,168,76,0.3)] pr-5'
                  : 'border-l-2 border-[rgba(201,168,76,0.3)] pl-5'
              }`}
            >
              <span
                className="shrink-0 font-[family-name:var(--font-data)] text-sm font-bold tabular-nums text-[#c9a84c] opacity-70"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3
                  className={`mb-2 text-base font-bold leading-snug text-[#e8e0d0] sm:text-lg ${
                    rtl
                      ? 'ar-text'
                      : 'font-[family-name:var(--font-display)] uppercase tracking-[0.1em]'
                  }`}
                >
                  {p.title}
                </h3>
                <p className={`text-[15px] leading-relaxed text-[#cfc4ae] ${rtl ? 'ar-text' : ''}`}>
                  {p.body}
                </p>
              </div>
            </div>
          </Rise>
        ))}
      </div>

      <KickerClose>{t.doctrine.close}</KickerClose>
    </SectionShell>
  );
}
