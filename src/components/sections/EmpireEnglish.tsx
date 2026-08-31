'use client';

import { Brain, Languages, Lock } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
  Arabic,
  ArabicSub,
  GlowingBorder,
  ImperialButton,
  Kicker,
  KickerClose,
  MetallicCard,
  Rise,
} from '@/components/ui';
import { PROPERTIES } from '@/site.config';
import { AR } from '@/i18n/ar';
import { useLocale } from '@/i18n/LocaleProvider';

/**
 * §8 EMPIRE ENGLISH COMMUNITY — the flagship offer.
 *
 * Note on the headline claim: this says "the number one thing I've built", which is a
 * statement about the owner's own portfolio and therefore true and defensible. It
 * deliberately replaces "the number one platform in the world" (rejected under
 * R-PRF-4) — an unverifiable superlative that a sophisticated visitor discounts on
 * sight, and which is strictly weaker than the real numbers in §5.
 *
 * The CEFR honesty line is required by R-BRD-6 and is not negotiable copy.
 */

/** Structural metadata only — copy comes from the dictionary. */
const PILLAR_META: { key: string; icon: LucideIcon; accent: string }[] = [
  { key: 'real', icon: Languages, accent: '#c9a84c' },
  { key: 'mindset', icon: Brain, accent: '#ff6b35' },
  { key: 'exclusive', icon: Lock, accent: '#cd7f32' },
];

export function EmpireEnglish() {
  const { t, rtl } = useLocale();

  return (
    <section id="eec" className="relative py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[min(900px,95vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(201,168,76,0.06)_0%,transparent_70%)]"
      />

      <div className="shell relative">
        <Rise>
          <div className="mb-14 text-center">
            <Kicker className={`mb-4 ${rtl ? 'ar-text' : ''}`}>{t.eec.kicker}</Kicker>
            <h2 className={`mb-5 text-[#c9a84c] text-glow ${rtl ? 'ar-text ar-display text-[clamp(1.8rem,5vw,3.2rem)]' : 't-display-l'}`}>
              {t.eec.title}
            </h2>
            <p className={`t-body-l mx-auto max-w-2xl text-[#b8a88a] ${rtl ? 'ar-text' : 'italic'}`}>
              {t.eec.lead}
            </p>
            {!rtl && <ArabicSub className="mx-auto max-w-2xl">{AR.eec.lead}</ArabicSub>}
          </div>
        </Rise>

        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PILLAR_META.map((meta, i) => {
            const p = t.eec.pillars[meta.key];
            return (
            <Rise key={meta.key} index={i}>
              <MetallicCard className="h-full p-7 text-center">
                <div
                  className="mx-auto mb-5 flex h-13 w-13 items-center justify-center rounded-full border-2"
                  style={{
                    width: 52,
                    height: 52,
                    borderColor: `${meta.accent}55`,
                    boxShadow: `0 0 16px ${meta.accent}20`,
                  }}
                >
                  <meta.icon className="h-5 w-5" style={{ color: meta.accent }} aria-hidden="true" />
                </div>
                <h3
                  className={`mb-3 text-base font-bold sm:text-lg ${rtl ? 'ar-text ar-display' : 'font-[family-name:var(--font-display)] uppercase tracking-[0.16em]'}`}
                  style={{ color: meta.accent }}
                >
                  {p.title}
                </h3>
                <p className={`text-[15px] leading-relaxed text-[#cfc4ae] ${rtl ? 'ar-text' : ''}`}>
                  {p.body}
                </p>
                {!rtl && (
                  <Arabic className="mt-3 text-[13.5px] text-[#a08a63]">
                    {AR.eec.pillars[meta.key as keyof typeof AR.eec.pillars]}
                  </Arabic>
                )}
              </MetallicCard>
            </Rise>
            );
          })}
        </div>

        {/* CTA panel */}
        <Rise index={3}>
          <GlowingBorder intensity="high" className="rounded-xl">
            <MetallicCard hover={false} brackets className="p-9 text-center sm:p-12">
              <p className={`mx-auto mb-3 max-w-2xl text-xl font-bold text-[#e8e0d0] sm:text-2xl ${rtl ? 'ar-text ar-display' : 'font-[family-name:var(--font-display)] uppercase tracking-[0.1em]'}`}>
                {t.eec.ctaTitle}
              </p>
              <p className={`mx-auto mb-4 max-w-xl text-[15px] leading-relaxed text-[#b8a88a] ${rtl ? 'ar-text' : 'italic'}`}>
                {t.eec.ctaSub}
              </p>
              {!rtl && (
                <>
                  <Arabic display className="mx-auto mb-2 max-w-xl text-base text-[#c9a84c]">
                    {AR.eec.cta}
                  </Arabic>
                  <Arabic className="mx-auto mb-8 max-w-xl text-[14px] text-[#b8a88a]">
                    {AR.eec.ctaSub}
                  </Arabic>
                </>
              )}

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <ImperialButton
                  as="a"
                  href={PROPERTIES.assessment}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="lg"
                >
                  {t.eec.ctaPrimary}
                </ImperialButton>
                <ImperialButton as="a" href="#concierge" variant="outline" size="lg">
                  {t.eec.ctaSecondary}
                </ImperialButton>
              </div>

              {/* R-BRD-6 — required honesty line. Do not remove or soften. */}
              <p className="mx-auto mt-8 max-w-xl font-[family-name:var(--font-data)] text-[11px] leading-relaxed tracking-[0.08em] text-[#a08a63]">
                {t.eec.honesty}
              </p>
              {!rtl && (
                <Arabic className="mx-auto mt-3 max-w-xl text-[12.5px] text-[#a08a63]">
                  {AR.eec.honesty}
                </Arabic>
              )}

              <p className="mt-6 font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.3em] text-[#8b7355]">
                {t.eec.tagline}
              </p>
            </MetallicCard>
          </GlowingBorder>
        </Rise>

        <KickerClose>{t.eec.close}</KickerClose>
      </div>
    </section>
  );
}
