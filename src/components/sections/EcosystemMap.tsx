'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bot,
  GraduationCap,
  Headphones,
  Radio,
  ScrollText,
  Target,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ArabicSub, KickerClose, Kicker, MetallicCard, Rise } from '@/components/ui';
import { AR } from '@/i18n/ar';
import { useLocale } from '@/i18n/LocaleProvider';
import { useInViewOnce, useReducedMotion } from '@/lib/hooks';

/**
 * §6 THE ECOSYSTEM — the single most differentiating section on the page.
 *
 * It is a category error for a personal landing page to contain a systems
 * architecture diagram. That is exactly why it works here: it's true, it's specific,
 * and it cannot be copied by anyone selling the same positioning. Most people in this
 * niche show a logo wall of clients. This shows the wiring of something owned.
 *
 * Implemented as a CSS grid with an SVG wire layer rather than a full SVG canvas, so
 * the node text stays real selectable HTML — better for a11y and for SEO than <text>.
 */

/** Structural metadata only — copy comes from the dictionary. */
const NODE_META: { key: string; icon: LucideIcon; accent: string }[] = [
  { key: 'eec', icon: GraduationCap, accent: '#c9a84c' },
  { key: 'engine', icon: Bot, accent: '#cd7f32' },
  { key: 'practice', icon: ScrollText, accent: '#cd7f32' },
  { key: 'assessment', icon: Target, accent: '#c9a84c' },
  { key: 'audio', icon: Headphones, accent: '#ff6b35' },
  { key: 'broadcast', icon: Radio, accent: '#c0c0c0' },
];

export function EcosystemMap() {
  const { t, rtl } = useLocale();
  const [open, setOpen] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const { ref, seen } = useInViewOnce<HTMLDivElement>(0.25);

  return (
    <section id="ecosystem" className="relative py-20 sm:py-28">
      <div className="shell">
        <Rise>
          <div className="mb-14 text-center">
            <Kicker className={`mb-4 ${rtl ? 'ar-text' : ''}`}>{t.ecosystem.kicker}</Kicker>
            <h2 className={`mb-5 text-[#c9a84c] text-glow ${rtl ? 'ar-text ar-display text-[clamp(1.8rem,5vw,3.2rem)]' : 't-display-l'}`}>
              {t.ecosystem.title}
            </h2>
            <p className={`t-body-l mx-auto max-w-2xl text-[#b8a88a] ${rtl ? 'ar-text' : 'italic'}`}>
              {t.ecosystem.lead}
            </p>
            {!rtl && <ArabicSub className="mx-auto max-w-2xl">{AR.ecosystem}</ArabicSub>}
          </div>
        </Rise>

        {/* ── Hub ── */}
        <Rise index={1}>
          <div ref={ref} className="relative mb-10 flex justify-center">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.16)_0%,transparent_70%)] blur-lg"
              />
              <div
                className="relative rounded-full border-2 px-9 py-7 text-center"
                style={{
                  borderColor: 'rgba(201,168,76,0.55)',
                  background: 'linear-gradient(145deg,#111118,#1a1a2e)',
                  boxShadow: '0 0 40px rgba(201,168,76,0.16)',
                }}
              >
                <p className={`text-base font-bold text-[#c9a84c] sm:text-lg ${rtl ? 'ar-text ar-display' : 'font-[family-name:var(--font-display)] uppercase tracking-[0.2em]'}`}>
                  {t.ecosystem.hub}
                </p>
                <p className={`mt-1 text-[10px] text-[#a08a63] ${rtl ? 'ar-text text-[12px]' : 'font-[family-name:var(--font-data)] uppercase tracking-[0.2em]'}`}>
                  {t.ecosystem.hubSub}
                </p>
              </div>
            </div>

            {/* Wire descending from the hub into the grid */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-full h-10 w-px -translate-x-1/2 overflow-visible"
            >
              <motion.line
                x1="0.5"
                y1="0"
                x2="0.5"
                y2="40"
                stroke="#c9a84c"
                strokeWidth="1"
                strokeOpacity="0.45"
                initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
                animate={seen || reduced ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />
            </svg>
          </div>
        </Rise>

        {/* ── Nodes ── */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {NODE_META.map((meta, i) => {
            const n = t.ecosystem.nodes[meta.key];
            const isOpen = open === meta.key;
            return (
              <Rise key={meta.key} index={i}>
                <MetallicCard className="h-full">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : meta.key)}
                    aria-expanded={isOpen}
                    aria-controls={`eco-detail-${meta.key}`}
                    className={`w-full cursor-pointer p-6 ${rtl ? 'text-right' : 'text-left'}`}
                  >
                    <div className="mb-4 flex items-start gap-3.5">
                      <span
                        className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border"
                        style={{
                          borderColor: `${meta.accent}44`,
                          backgroundColor: `${meta.accent}12`,
                        }}
                      >
                        <meta.icon
                          className="h-[18px] w-[18px]"
                          style={{ color: meta.accent }}
                          aria-hidden="true"
                        />
                      </span>
                      <span className="min-w-0">
                        <span className={`block text-[13px] font-bold leading-snug text-[#e8e0d0] sm:text-sm ${rtl ? 'ar-text' : 'font-[family-name:var(--font-display)] uppercase tracking-[0.1em]'}`}>
                          {n.name}
                        </span>
                        <span
                          className={`mt-1.5 block text-[10.5px] ${rtl ? 'ar-text text-[12px]' : 'font-[family-name:var(--font-data)] uppercase tracking-[0.1em]'}`}
                          style={{ color: meta.accent }}
                        >
                          {n.short}
                        </span>
                      </span>
                    </div>

                    <div
                      id={`eco-detail-${meta.key}`}
                      className="grid transition-all duration-500"
                      style={{
                        gridTemplateRows: isOpen ? '1fr' : '0fr',
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <p className={`overflow-hidden text-[14px] leading-relaxed text-[#cfc4ae] ${rtl ? 'ar-text' : ''}`}>
                        {n.detail}
                      </p>
                    </div>

                    <span className={`mt-3 inline-block text-[9.5px] text-[#a08a63] ${rtl ? 'ar-text text-[11px]' : 'font-[family-name:var(--font-data)] uppercase tracking-[0.22em]'}`}>
                      {isOpen ? t.ecosystem.closeDetail : t.ecosystem.detail}
                    </span>
                  </button>
                </MetallicCard>
              </Rise>
            );
          })}
        </div>

        <KickerClose>{t.ecosystem.close}</KickerClose>
      </div>
    </section>
  );
}
