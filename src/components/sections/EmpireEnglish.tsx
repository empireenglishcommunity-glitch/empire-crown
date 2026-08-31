'use client';

import { Brain, Languages, Lock } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
  GlowingBorder,
  ImperialButton,
  Kicker,
  KickerClose,
  MetallicCard,
  Rise,
} from '@/components/ui';
import { IDENTITY, PROPERTIES } from '@/site.config';

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

type Pillar = {
  icon: LucideIcon;
  title: string;
  body: string;
  accent: string;
};

const PILLARS: Pillar[] = [
  {
    icon: Languages,
    title: 'Real English',
    body: 'Not exam tricks. The English that works in a meeting, an interview, and a life you actually want.',
    accent: '#c9a84c',
  },
  {
    icon: Brain,
    title: 'Right Mindset',
    body: 'We fix the fear first. Grammar is the easy half — the hard half is believing you can speak.',
    accent: '#ff6b35',
  },
  {
    icon: Lock,
    title: 'Exclusive System',
    body: 'Six levels, ninety weeks, one path. Built here, from scratch. Available nowhere else.',
    accent: '#cd7f32',
  },
];

export function EmpireEnglish() {
  return (
    <section id="eec" className="relative py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[min(900px,95vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(201,168,76,0.06)_0%,transparent_70%)]"
      />

      <div className="shell relative">
        <Rise>
          <div className="mb-14 text-center">
            <Kicker className="mb-4">Empire English Community</Kicker>
            <h2 className="t-display-l mb-5 text-[#c9a84c] text-glow">THE FLAGSHIP</h2>
            <p className="t-body-l mx-auto max-w-2xl italic text-[#b8a88a]">
              &ldquo;The number one thing I&rsquo;ve built. Not a course — a system.&rdquo;
            </p>
          </div>
        </Rise>

        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Rise key={p.title} index={i}>
              <MetallicCard className="h-full p-7 text-center">
                <div
                  className="mx-auto mb-5 flex h-13 w-13 items-center justify-center rounded-full border-2"
                  style={{
                    width: 52,
                    height: 52,
                    borderColor: `${p.accent}55`,
                    boxShadow: `0 0 16px ${p.accent}20`,
                  }}
                >
                  <p.icon className="h-5 w-5" style={{ color: p.accent }} aria-hidden="true" />
                </div>
                <h3
                  className="mb-3 font-[family-name:var(--font-display)] text-base font-bold uppercase tracking-[0.16em] sm:text-lg"
                  style={{ color: p.accent }}
                >
                  {p.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-[#cfc4ae]">{p.body}</p>
              </MetallicCard>
            </Rise>
          ))}
        </div>

        {/* CTA panel */}
        <Rise index={3}>
          <GlowingBorder intensity="high" className="rounded-xl">
            <MetallicCard hover={false} brackets className="p-9 text-center sm:p-12">
              <p className="mx-auto mb-3 max-w-2xl font-[family-name:var(--font-display)] text-xl font-bold uppercase tracking-[0.1em] text-[#e8e0d0] sm:text-2xl">
                Start at your real level — not the one you guessed
              </p>
              <p className="mx-auto mb-8 max-w-xl text-[15px] italic leading-relaxed text-[#b8a88a]">
                The placement test is free, adaptive, and built so it cannot be gamed. It
                takes about thirty minutes and tells you the truth.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <ImperialButton
                  as="a"
                  href={PROPERTIES.assessment}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="lg"
                >
                  Take the free placement test
                </ImperialButton>
                <ImperialButton as="a" href="#concierge" variant="outline" size="lg">
                  Join the community
                </ImperialButton>
              </div>

              {/* R-BRD-6 — required honesty line. Do not remove or soften. */}
              <p className="mx-auto mt-8 max-w-xl font-[family-name:var(--font-data)] text-[11px] leading-relaxed tracking-[0.08em] text-[#a08a63]">
                CEFR-aligned, not a certifying body. We measure ability, not attendance.
              </p>

              <p className="mt-6 font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.3em] text-[#8b7355]">
                {IDENTITY.eecTagline}
              </p>
            </MetallicCard>
          </GlowingBorder>
        </Rise>

        <KickerClose>Your English isn&rsquo;t broken. Your system is.</KickerClose>
      </div>
    </section>
  );
}
