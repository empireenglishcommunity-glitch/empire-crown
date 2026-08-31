'use client';

import { ArabicSub, KickerClose, Kicker, MetallicCard, Rise } from '@/components/ui';
import { AR } from '@/i18n/ar';
import { useCountUp, useInViewOnce } from '@/lib/hooks';
import { STATS_PRIMARY, STATS_SECONDARY, type Stat } from '@/site.config';

/**
 * §5 THE PROOF — the pivot of the whole page.
 *
 * Everything before this section earns the right to be believed. Everything after it
 * spends that belief. If this section is weak the page fails no matter how beautiful
 * the rest is (design.md §1.1).
 *
 * Every number here was re-derived from source code — see site.config.ts, where each
 * stat carries its own `derivation` string, and scripts/derive_stats.py, which
 * re-runs the counts. Numbers that appeared only in documentation were rejected:
 * one widely-repeated internal figure ("630 passages") turned out to be wrong by 7x.
 *
 * Mono digits, deliberately: this section makes an engineering argument, and serif
 * numerals undercut it.
 */

function StatBlock({ stat, large }: { stat: Stat; large: boolean }) {
  const { ref, seen } = useInViewOnce<HTMLDivElement>(0.4);
  const value = useCountUp(stat.value, seen);

  return (
    <div ref={ref} className={large ? 'text-center' : 'text-center sm:text-left'}>
      <p
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
        className={`mt-2 font-[family-name:var(--font-data)] uppercase text-[#e8e0d0] ${
          large ? 'text-[11px] tracking-[0.24em] sm:text-xs' : 'text-[10px] tracking-[0.16em]'
        }`}
      >
        {stat.label}
      </p>
      {stat.sub && large && (
        <p className="mt-1.5 text-[13px] italic text-[#b8a88a]">{stat.sub}</p>
      )}
    </div>
  );
}

export function Proof() {
  return (
    <section id="proof" className="relative py-20 sm:py-28">
      {/* Stronger gold field — this is the section that has to land. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[min(1000px,95vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(201,168,76,0.08)_0%,rgba(201,168,76,0.02)_45%,transparent_72%)]"
      />

      <div className="shell relative">
        <Rise>
          <div className="mb-14 text-center">
            <Kicker className="mb-4">Every Number Re-Derived From Source Code</Kicker>
            <h2 className="t-display-l mb-5 text-[#c9a84c] text-glow">THE RECEIPTS</h2>
            <p className="t-body-l mx-auto max-w-2xl italic text-[#b8a88a]">
              &ldquo;Anyone can claim a system. Here is mine, counted.&rdquo;
            </p>
            <ArabicSub className="mx-auto max-w-2xl">{AR.proof}</ArabicSub>
          </div>
        </Rise>

        {/* Primary row */}
        <Rise index={1}>
          <MetallicCard hover={false} className="p-8 sm:p-12">
            <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
              {STATS_PRIMARY.map((s) => (
                <StatBlock key={s.label} stat={s} large />
              ))}
            </div>
          </MetallicCard>
        </Rise>

        {/* Secondary row */}
        <Rise index={2}>
          <div className="tactical mt-6 rounded-lg p-7 sm:p-9">
            <div className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3">
              {STATS_SECONDARY.map((s) => (
                <StatBlock key={s.label} stat={s} large={false} />
              ))}
            </div>
          </div>
        </Rise>

        {/* Honest footnote — pre-empts "prove it" AND keeps the CEFR claim truthful. */}
        <Rise index={3}>
          <p className="mx-auto mt-8 max-w-2xl text-center font-[family-name:var(--font-data)] text-[11px] leading-relaxed tracking-[0.1em] text-[#a08a63]">
            Derived from source, not from a brochure. Empire English Community is
            CEFR-aligned — not a certifying body.
          </p>
        </Rise>

        <KickerClose>I don&rsquo;t ask you to trust me. I ask you to count.</KickerClose>
      </div>
    </section>
  );
}
