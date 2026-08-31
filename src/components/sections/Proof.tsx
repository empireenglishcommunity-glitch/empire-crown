'use client';

import { ArabicSub, KickerClose, Kicker, MetallicCard, Rise } from '@/components/ui';
import { useCountUp, useInViewOnce } from '@/lib/hooks';
import { STATS_PRIMARY, STATS_SECONDARY, type Stat } from '@/site.config';
import { useLocale } from '@/i18n/LocaleProvider';
import { AR } from '@/i18n/ar';

/**
 * §5 THE PROOF — the pivot of the whole page.
 *
 * Everything above earns the right to be believed; everything below spends it. If this
 * section is weak the page fails however beautiful the rest is (design.md §1.1).
 *
 * Every number was re-derived from source code — see the `derivation` field on each stat
 * in site.config.ts, and scripts/derive_stats.py. Figures that existed only in
 * documentation were rejected: one widely-repeated internal number ("630 passages") was
 * wrong by 7x.
 *
 * Digits stay mono and LTR in both locales. Arabic uses Western digits here (matching
 * the rest of the ecosystem's reporting), and a number is not text to be mirrored — so
 * each value carries dir="ltr" even on the RTL page.
 */

function StatBlock({
  stat,
  large,
  label,
  sub,
  rtl,
}: {
  stat: Stat;
  large: boolean;
  label: string;
  sub?: string;
  rtl: boolean;
}) {
  const { ref, seen } = useInViewOnce<HTMLDivElement>(0.4);
  const value = useCountUp(stat.value, seen);

  return (
    <div ref={ref} className={large ? 'text-center' : rtl ? 'text-center sm:text-right' : 'text-center sm:text-left'}>
      <p
        dir="ltr"
        className={
          large
            ? 't-data text-[#c9a84c]'
            : 'font-[family-name:var(--font-data)] text-2xl font-bold tabular-nums text-[#c9a84c] sm:text-3xl'
        }
      >
        {value.toLocaleString('en-US')}
        {stat.suffix ?? ''}
      </p>
      <p
        className={`mt-2 text-[#e8e0d0] ${
          rtl
            ? 'ar-text text-[13px]'
            : `font-[family-name:var(--font-data)] uppercase ${
                large ? 'text-[11px] tracking-[0.24em] sm:text-xs' : 'text-[10px] tracking-[0.16em]'
              }`
        }`}
      >
        {label}
      </p>
      {sub && large && (
        <p className={`mt-1.5 text-[13px] text-[#b8a88a] ${rtl ? 'ar-text' : 'italic'}`}>{sub}</p>
      )}
    </div>
  );
}

/** Dictionary keys, in the same order as the stat arrays in site.config. */
const PRIMARY_KEYS = ['levels', 'weeks', 'modules', 'clips'];
const SECONDARY_KEYS = ['listening', 'descriptors', 'questions', 'broadcast', 'tests', 'loc'];

export function Proof() {
  const { t, rtl } = useLocale();

  return (
    <section id="proof" className="relative py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[min(1000px,95vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(201,168,76,0.08)_0%,rgba(201,168,76,0.02)_45%,transparent_72%)]"
      />

      <div className="shell relative">
        <Rise>
          <div className="mb-14 text-center">
            <Kicker className="mb-4">{t.proof.kicker}</Kicker>
            <h2
              className={`mb-5 text-[#c9a84c] text-glow ${rtl ? 'ar-text ar-display text-[clamp(1.8rem,5vw,3.2rem)]' : 't-display-l'}`}
            >
              {t.proof.title}
            </h2>
            <p
              className={`t-body-l mx-auto max-w-2xl text-[#b8a88a] ${rtl ? 'ar-text' : 'italic'}`}
            >
              {t.proof.lead}
            </p>
            {!rtl && <ArabicSub className="mx-auto max-w-2xl">{AR.proof}</ArabicSub>}
          </div>
        </Rise>

        <Rise index={1}>
          <MetallicCard hover={false} className="p-8 sm:p-12">
            <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
              {STATS_PRIMARY.map((s, i) => (
                <StatBlock
                  key={s.label}
                  stat={s}
                  large
                  rtl={rtl}
                  label={t.proof.labels[PRIMARY_KEYS[i]]}
                  sub={t.proof.subs[PRIMARY_KEYS[i]]}
                />
              ))}
            </div>
          </MetallicCard>
        </Rise>

        <Rise index={2}>
          <div
            className={`mt-6 rounded-lg p-7 sm:p-9 ${rtl ? 'tactical-rtl' : 'tactical'}`}
          >
            <div className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3">
              {STATS_SECONDARY.map((s, i) => (
                <StatBlock
                  key={s.label}
                  stat={s}
                  large={false}
                  rtl={rtl}
                  label={t.proof.labels[SECONDARY_KEYS[i]]}
                />
              ))}
            </div>
          </div>
        </Rise>

        {/* Pre-empts "prove it" AND keeps the CEFR claim truthful (R-BRD-6). */}
        <Rise index={3}>
          <p
            className={`mx-auto mt-8 max-w-2xl text-center text-[11px] leading-relaxed text-[#a08a63] ${
              rtl ? 'ar-text text-[12.5px]' : 'font-[family-name:var(--font-data)] tracking-[0.1em]'
            }`}
          >
            {t.proof.footnote}
          </p>
        </Rise>

        <KickerClose>{t.proof.close}</KickerClose>
      </div>
    </section>
  );
}
