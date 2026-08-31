'use client';

import { Compass, Crown, Flame, Settings2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { KickerClose, MetallicCard, Rise, SectionShell } from '@/components/ui';
import { useLocale } from '@/i18n/LocaleProvider';
import { AR } from '@/i18n/ar';

/**
 * §4 THE FOUR WINGS — one spine, four wings.
 *
 * Each wing absorbs a cluster of the ten roles and gives it a *job* plus a *proof*.
 * Accent colours match the Constellation, so colour becomes wayfinding across the page
 * rather than decoration (design.md §2.2).
 *
 * Icons and accents are structural and locale-independent; only copy comes from the
 * dictionary.
 */

const WING_META: { key: string; icon: LucideIcon; accent: string }[] = [
  { key: 'architect', icon: Crown, accent: '#c9a84c' },
  { key: 'operator', icon: Settings2, accent: '#cd7f32' },
  { key: 'mentor', icon: Flame, accent: '#ff6b35' },
  { key: 'standard', icon: Compass, accent: '#c0c0c0' },
];

export function Wings() {
  const { t, rtl } = useLocale();

  return (
    <SectionShell
      id="wings"
      kicker={t.wings.kicker}
      title={t.wings.title}
      lead={t.wings.lead}
      leadAr={rtl ? undefined : AR.wings}
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {WING_META.map((meta, i) => {
          const w = t.wings.items[meta.key];
          return (
            <Rise key={meta.key} index={i}>
              <MetallicCard brackets className="h-full p-7 sm:p-9">
                <div
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border-2"
                  style={{
                    borderColor: `${meta.accent}55`,
                    boxShadow: `0 0 18px ${meta.accent}22, inset 0 0 12px ${meta.accent}14`,
                  }}
                >
                  <meta.icon
                    className="h-6 w-6"
                    style={{ color: meta.accent }}
                    aria-hidden="true"
                  />
                </div>

                <h3
                  className={`mb-4 text-xl font-bold sm:text-2xl ${
                    rtl
                      ? 'ar-text ar-display'
                      : 'font-[family-name:var(--font-display)] uppercase tracking-[0.14em]'
                  }`}
                  style={{ color: meta.accent }}
                >
                  {w.name}
                </h3>

                <div className="mb-5 flex flex-wrap gap-2">
                  {w.roles.map((r) => (
                    <span
                      key={r}
                      className={`rounded-full border px-2.5 py-1 text-[10px] ${
                        rtl
                          ? 'ar-text text-[11px]'
                          : 'font-[family-name:var(--font-data)] uppercase tracking-[0.14em]'
                      }`}
                      style={{
                        borderColor: `${meta.accent}38`,
                        color: meta.accent,
                        backgroundColor: `${meta.accent}0f`,
                      }}
                    >
                      {r}
                    </span>
                  ))}
                </div>

                <p
                  className={`mb-5 text-[15px] leading-relaxed text-[#cfc4ae] ${rtl ? 'ar-text' : ''}`}
                >
                  {w.body}
                </p>

                <div
                  className={rtl ? 'border-r-2 pr-4' : 'border-l-2 pl-4'}
                  style={{ borderColor: `${meta.accent}66` }}
                >
                  <p
                    className={`text-[10px] text-[#a08a63] ${
                      rtl
                        ? 'ar-text text-[11px]'
                        : 'font-[family-name:var(--font-data)] uppercase tracking-[0.24em]'
                    }`}
                  >
                    {t.wings.proofLabel}
                  </p>
                  <p
                    className={`mt-1.5 text-[14px] leading-relaxed text-[#e8e0d0] ${
                      rtl ? 'ar-text' : 'italic'
                    }`}
                  >
                    {w.proof}
                  </p>
                </div>
              </MetallicCard>
            </Rise>
          );
        })}
      </div>

      <KickerClose>{t.wings.close}</KickerClose>
    </SectionShell>
  );
}
