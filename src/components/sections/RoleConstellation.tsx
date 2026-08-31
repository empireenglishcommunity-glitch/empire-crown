'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Kicker, Rise } from '@/components/ui';
import { useReducedMotion } from '@/lib/hooks';
import { IDENTITY } from '@/site.config';

/**
 * §3 THE CONSTELLATION — the harmony mechanism.
 *
 * This is the answer to the page's hardest problem. Ten public identities listed flat
 * read as scattered; ten identities orbiting one centre read as compounding. The
 * visitor doesn't get *told* the roles cohere — they operate a control that
 * demonstrates it. The centre never moves. That is the whole argument.
 *
 * And it isn't a stretch: MACAL literally stands for Multi-talented. Adaptive.
 * Creative. Ambitious. Leader. Multi-talent was the thesis from the beginning.
 *
 * Accessibility (R-CON-3): every node is a real <button> in a radiogroup, operable by
 * keyboard, with the active role announced via aria-live.
 * Responsive (R-CON-4): below md the orbit is replaced by a chip grid — no overlap,
 * no horizontal scroll, identical behaviour.
 */

type Role = {
  id: string;
  label: string;
  line: string;
  accent: string;
  orbit: 'inner' | 'outer';
};

const ROLES: Role[] = [
  {
    id: 'founder-eec',
    label: 'Founder — EEC',
    line: 'I built a six-level English system, week by week, and shipped every one.',
    accent: '#c9a84c',
    orbit: 'inner',
  },
  {
    id: 'ceo',
    label: 'CEO — MACAL Empire',
    line: 'I run the company. The strategy, the stack, and the consequences are mine.',
    accent: '#c9a84c',
    orbit: 'inner',
  },
  {
    id: 'ai-mentor',
    label: 'AI Mentor',
    line: 'I teach people to command AI instead of being replaced by it.',
    accent: '#ff6b35',
    orbit: 'inner',
  },
  {
    id: 'life-coach',
    label: 'Life Coach',
    line: 'Fluency is a mindset problem wearing a grammar costume.',
    accent: '#ff6b35',
    orbit: 'inner',
  },
  {
    id: 'marketing',
    label: 'Marketing Strategist',
    line: "I don't buy attention. I engineer reasons to pay attention.",
    accent: '#cd7f32',
    orbit: 'inner',
  },
  {
    id: 'social',
    label: 'Social Media Manager',
    line: 'Every channel I own, I built and I run. No agency, no ghost team.',
    accent: '#cd7f32',
    orbit: 'outer',
  },
  {
    id: 'trader',
    label: 'Trader',
    line: 'I trade my own book. I teach discipline — never signals.',
    accent: '#c0c0c0',
    orbit: 'outer',
  },
  {
    id: 'investor',
    label: 'Investor',
    line: 'Capital protection first. Legacy second. Hype never.',
    accent: '#c0c0c0',
    orbit: 'outer',
  },
  {
    id: 'model',
    label: 'Model',
    line: "Presence is a language. I'm fluent in that one too.",
    accent: '#c0c0c0',
    orbit: 'outer',
  },
  {
    id: 'influencer',
    label: 'Influencer',
    line: "Influence isn't reach. It's what people do after they listen.",
    accent: '#c0c0c0',
    orbit: 'outer',
  },
];

const INNER = ROLES.filter((r) => r.orbit === 'inner');
const OUTER = ROLES.filter((r) => r.orbit === 'outer');

/** Places nodes evenly around a circle of the given radius. */
function polar(index: number, count: number, radius: number, offsetDeg = 0) {
  const angle = (index / count) * 2 * Math.PI + (offsetDeg * Math.PI) / 180;
  return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
}

export function RoleConstellation() {
  const [active, setActive] = useState<Role | null>(null);
  const reduced = useReducedMotion();

  const node = (role: Role, pos: { x: number; y: number }, counterSpin: string) => {
    const isActive = active?.id === role.id;
    return (
      <div
        key={role.id}
        className="absolute left-1/2 top-1/2"
        style={{ transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))` }}
      >
        {/* Counter-rotate so labels stay upright while the orbit turns. */}
        <div style={reduced ? undefined : { animation: counterSpin }}>
          <button
            type="button"
            role="radio"
            aria-checked={isActive}
            onMouseEnter={() => setActive(role)}
            onFocus={() => setActive(role)}
            onClick={() => setActive(isActive ? null : role)}
            className="whitespace-nowrap rounded-full border px-3.5 py-2 font-[family-name:var(--font-data)] text-[10.5px] uppercase tracking-[0.14em] transition-all duration-300 hover:scale-105 sm:text-[11.5px]"
            style={{
              borderColor: isActive ? role.accent : 'rgba(201,168,76,0.28)',
              color: isActive ? '#0a0a0a' : role.accent,
              backgroundColor: isActive ? role.accent : 'rgba(10,10,10,0.88)',
              boxShadow: isActive ? `0 0 22px ${role.accent}70` : 'none',
            }}
          >
            {role.label}
          </button>
        </div>
      </div>
    );
  };

  return (
    <section id="constellation" className="relative overflow-hidden py-20 sm:py-28">
      <div className="shell">
        <Rise>
          <div className="mb-14 text-center">
            <Kicker className="mb-4">Ten Roles · One Operator</Kicker>
            <h2 className="t-display-l mb-5 text-[#c9a84c] text-glow">THE CONSTELLATION</h2>
            <p className="t-body-l mx-auto max-w-2xl italic text-[#b8a88a]">
              &ldquo;People ask which one I really am. All of them. That was the
              plan.&rdquo;
            </p>
          </div>
        </Rise>

        {/* ══ Desktop: orbital layout ══ */}
        <div className="relative mx-auto hidden h-[640px] w-full max-w-[720px] md:block">
          {/* Orbit rings */}
          {[190, 285].map((r) => (
            <div
              key={r}
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 rounded-full border border-[rgba(201,168,76,0.13)]"
              style={{
                width: r * 2,
                height: r * 2,
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}

          {/* Centre portrait — the fixed point of the argument */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
              aria-hidden="true"
              className="absolute -inset-5 rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.22)_0%,transparent_70%)] blur-md"
            />
            <div
              className="relative h-[200px] w-[200px] overflow-hidden rounded-full"
              style={{
                border: '3px solid rgba(201,168,76,0.55)',
                boxShadow: '0 0 44px rgba(201,168,76,0.2), inset 0 0 26px rgba(0,0,0,0.6)',
              }}
            >
              <Image
                src="/photos/chapter-02-authority.jpg"
                alt={`${IDENTITY.name}, founder of ${IDENTITY.company}`}
                fill
                sizes="200px"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.35)] to-transparent" />
            </div>
          </div>

          {/* Orbits */}
          <div
            role="radiogroup"
            aria-label="Select a role to see how it fits the whole"
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0"
              style={reduced ? undefined : { animation: 'orbit-cw 68s linear infinite' }}
            >
              {INNER.map((r, i) =>
                node(r, polar(i, INNER.length, 190, -90), 'orbit-ccw 68s linear infinite'),
              )}
            </div>
            <div
              className="absolute inset-0"
              style={reduced ? undefined : { animation: 'orbit-ccw 92s linear infinite' }}
            >
              {OUTER.map((r, i) =>
                node(r, polar(i, OUTER.length, 285, -54), 'orbit-cw 92s linear infinite'),
              )}
            </div>
          </div>
        </div>

        {/* ══ Mobile: portrait + chip grid (R-CON-4) ══ */}
        <div className="md:hidden">
          <div className="mb-9 flex justify-center">
            <div
              className="relative h-[168px] w-[168px] overflow-hidden rounded-full"
              style={{
                border: '3px solid rgba(201,168,76,0.55)',
                boxShadow: '0 0 34px rgba(201,168,76,0.18)',
              }}
            >
              <Image
                src="/photos/chapter-02-authority.jpg"
                alt={`${IDENTITY.name}, founder of ${IDENTITY.company}`}
                fill
                sizes="168px"
                className="object-cover object-top"
              />
            </div>
          </div>

          <div
            role="radiogroup"
            aria-label="Select a role to see how it fits the whole"
            className="grid grid-cols-2 gap-2.5"
          >
            {ROLES.map((role) => {
              const isActive = active?.id === role.id;
              return (
                <button
                  key={role.id}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => setActive(isActive ? null : role)}
                  className="rounded-lg border px-3 py-2.5 text-center font-[family-name:var(--font-data)] text-[10px] uppercase leading-tight tracking-[0.1em] transition-all duration-300"
                  style={{
                    borderColor: isActive ? role.accent : 'rgba(201,168,76,0.25)',
                    color: isActive ? '#0a0a0a' : role.accent,
                    backgroundColor: isActive ? role.accent : 'rgba(17,17,24,0.9)',
                  }}
                >
                  {role.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ══ The reframing line ══
            Fixed min-height so swapping text never shifts the layout. */}
        <div
          className="mx-auto mt-12 flex min-h-[132px] max-w-3xl items-center justify-center px-2 text-center"
          aria-live="polite"
          aria-atomic="true"
        >
          {active ? (
            <div>
              <p
                className="mb-3 font-[family-name:var(--font-data)] text-[11px] uppercase tracking-[0.3em]"
                style={{ color: active.accent }}
              >
                {active.label}
              </p>
              <p className="t-body-l italic text-[#e8e0d0]">&ldquo;{active.line}&rdquo;</p>
            </div>
          ) : (
            <div>
              <p className="mb-3 font-[family-name:var(--font-display)] text-xl uppercase tracking-[0.14em] text-[#c9a84c] sm:text-2xl">
                Ten roles. One operator. Zero contradictions.
              </p>
              <p className="font-[family-name:var(--font-data)] text-[11px] uppercase tracking-[0.22em] text-[#a08a63]">
                MACAL — {IDENTITY.companyExpanded}
              </p>
            </div>
          )}
        </div>

        <p className="mt-4 text-center font-[family-name:var(--font-data)] text-[10px] uppercase tracking-[0.24em] text-[#8b7355] md:hidden">
          Tap a role
        </p>
        <p className="mt-4 hidden text-center font-[family-name:var(--font-data)] text-[10px] uppercase tracking-[0.24em] text-[#8b7355] md:block">
          Hover or tab through the roles
        </p>
      </div>
    </section>
  );
}
