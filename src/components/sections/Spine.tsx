'use client';

import { Arabic, Kicker, Rise } from '@/components/ui';
import { useLocale } from '@/i18n/LocaleProvider';
import { AR } from '@/i18n/ar';

/**
 * §2 THE SPINE — the governing sentence, alone on the page.
 *
 * The whitespace is the argument. A page that crowds its own thesis doesn't believe it,
 * so this section deliberately contains no card, no icon and no CTA.
 *
 * On the English page the Arabic translation is shown *beneath* the English (the
 * bilingual spine). On the Arabic page the Arabic IS the statement, so the sub-line is
 * dropped — repeating it would be noise.
 */
export function Spine() {
  const { t, rtl } = useLocale();

  return (
    <section
      id="spine"
      className="relative flex min-h-[70svh] items-center justify-center px-4 py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[min(900px,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(201,168,76,0.07)_0%,transparent_70%)]"
      />

      <div className="shell relative text-center">
        <Rise>
          <Kicker className="mb-10">{t.spine.kicker}</Kicker>
        </Rise>

        <Rise index={1}>
          <p
            className={`mx-auto max-w-4xl font-bold leading-[1.3] ${
              rtl
                ? 'ar-text ar-display text-[clamp(1.35rem,3.6vw,2.6rem)]'
                : 'font-[family-name:var(--font-display)] text-[clamp(1.5rem,4.2vw,3rem)] uppercase tracking-[0.04em]'
            }`}
          >
            <span className="text-[#e8e0d0]">{t.spine.l1}</span>
            <br />
            <span className="text-[#c9a84c] text-glow">{t.spine.l2}</span>
            <br />
            <span className="text-[#e8e0d0]">{t.spine.l3}</span>
          </p>
        </Rise>

        {/* Bilingual spine — English page only. */}
        {!rtl && (
          <Rise index={2}>
            <Arabic
              display
              className="mx-auto mt-9 max-w-2xl text-[clamp(1rem,2.2vw,1.4rem)] text-[#b8a88a]"
            >
              {AR.thesis}
            </Arabic>
          </Rise>
        )}

        <Rise index={3}>
          <div className="hairline mx-auto mt-12 w-32" aria-hidden="true" />
        </Rise>
      </div>
    </section>
  );
}
