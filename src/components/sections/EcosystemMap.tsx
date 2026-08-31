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
import { useInViewOnce, useReducedMotion } from '@/lib/hooks';
import { IDENTITY } from '@/site.config';

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

type Node = {
  id: string;
  name: string;
  icon: LucideIcon;
  short: string;
  detail: string;
  accent: string;
};

const NODES: Node[] = [
  {
    id: 'eec',
    name: 'Empire English Community',
    icon: GraduationCap,
    short: 'Six CEFR levels. The flagship.',
    detail:
      'A complete A1→C2 programme: 90 weeks of curriculum across five parallel tracks — reading, grammar, accent, mediation and extended listening.',
    accent: '#c9a84c',
  },
  {
    id: 'engine',
    name: 'The Learning Engine',
    icon: Bot,
    short: 'Teaches, tracks and promotes — daily.',
    detail:
      'A Discord-based system that delivers daily practice, records submissions, scores progress against can-do descriptors and promotes students between levels on evidence.',
    accent: '#cd7f32',
  },
  {
    id: 'practice',
    name: 'The Practice Site',
    icon: ScrollText,
    short: 'Thousands of generated pages.',
    detail:
      'Every curriculum week compiles into drill, reading and listening pages, verified by an automated build before anything reaches a student.',
    accent: '#cd7f32',
  },
  {
    id: 'assessment',
    name: 'The Assessment Engine',
    icon: Target,
    short: 'Adaptive placement, four skills.',
    detail:
      'Reading, listening, speaking and writing, scored adaptively into a per-skill CEFR profile. Built to resist memorisation: no two sessions share a question path.',
    accent: '#c9a84c',
  },
  {
    id: 'audio',
    name: 'The Audio Pipeline',
    icon: Headphones,
    short: '9,360 clips. Seven voices. Pace-verified.',
    detail:
      'Every spoken line is pre-rendered, hash-addressed and speed-checked against a target words-per-minute for its level, so no lesson is delivered too fast or too slow.',
    accent: '#ff6b35',
  },
  {
    id: 'broadcast',
    name: 'The Broadcast Network',
    icon: Radio,
    short: 'Owned and operated.',
    detail:
      'TikTok, YouTube, Instagram and Telegram — the distribution layer. Built, filmed, written and scheduled in-house. No agency.',
    accent: '#c0c0c0',
  },
];

export function EcosystemMap() {
  const [open, setOpen] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const { ref, seen } = useInViewOnce<HTMLDivElement>(0.25);

  return (
    <section id="ecosystem" className="relative py-20 sm:py-28">
      <div className="shell">
        <Rise>
          <div className="mb-14 text-center">
            <Kicker className="mb-4">Not A Logo Wall</Kicker>
            <h2 className="t-display-l mb-5 text-[#c9a84c] text-glow">THE ARCHITECTURE</h2>
            <p className="t-body-l mx-auto max-w-2xl italic text-[#b8a88a]">
              &ldquo;Most people show you a client list. I&rsquo;ll show you the
              wiring.&rdquo;
            </p>
            <ArabicSub className="mx-auto max-w-2xl">{AR.ecosystem}</ArabicSub>
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
                <p className="font-[family-name:var(--font-display)] text-base font-bold uppercase tracking-[0.2em] text-[#c9a84c] sm:text-lg">
                  {IDENTITY.company}
                </p>
                <p className="mt-1 font-[family-name:var(--font-data)] text-[10px] uppercase tracking-[0.2em] text-[#a08a63]">
                  One Operator
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
          {NODES.map((n, i) => {
            const isOpen = open === n.id;
            return (
              <Rise key={n.id} index={i}>
                <MetallicCard className="h-full">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : n.id)}
                    aria-expanded={isOpen}
                    aria-controls={`eco-detail-${n.id}`}
                    className="w-full cursor-pointer p-6 text-left"
                  >
                    <div className="mb-4 flex items-start gap-3.5">
                      <span
                        className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border"
                        style={{
                          borderColor: `${n.accent}44`,
                          backgroundColor: `${n.accent}12`,
                        }}
                      >
                        <n.icon
                          className="h-[18px] w-[18px]"
                          style={{ color: n.accent }}
                          aria-hidden="true"
                        />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-[family-name:var(--font-display)] text-[13px] font-bold uppercase leading-snug tracking-[0.1em] text-[#e8e0d0] sm:text-sm">
                          {n.name}
                        </span>
                        <span
                          className="mt-1.5 block font-[family-name:var(--font-data)] text-[10.5px] uppercase tracking-[0.1em]"
                          style={{ color: n.accent }}
                        >
                          {n.short}
                        </span>
                      </span>
                    </div>

                    <div
                      id={`eco-detail-${n.id}`}
                      className="grid transition-all duration-500"
                      style={{
                        gridTemplateRows: isOpen ? '1fr' : '0fr',
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <p className="overflow-hidden text-[14px] leading-relaxed text-[#cfc4ae]">
                        {n.detail}
                      </p>
                    </div>

                    <span className="mt-3 inline-block font-[family-name:var(--font-data)] text-[9.5px] uppercase tracking-[0.22em] text-[#a08a63]">
                      {isOpen ? '— Close' : '+ Detail'}
                    </span>
                  </button>
                </MetallicCard>
              </Rise>
            );
          })}
        </div>

        <KickerClose>One operator. Six systems. Zero outsourcing.</KickerClose>
      </div>
    </section>
  );
}
