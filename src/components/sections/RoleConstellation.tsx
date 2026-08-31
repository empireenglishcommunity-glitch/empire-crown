'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ArabicSub, Kicker, Rise } from '@/components/ui';
import { AR } from '@/i18n/ar';
import { useLocale } from '@/i18n/LocaleProvider';
import { useReducedMotion } from '@/lib/hooks';

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

/** Structural metadata only — labels and lines come from the dictionary. */
type RoleMeta = { id: string; accent: string; orbit: 'inner' | 'outer' };

const ROLES: RoleMeta[] = [
  { id: 'founder-eec', accent: '#c9a84c', orbit: 'inner' },
  { id: 'ceo', accent: '#c9a84c', orbit: 'inner' },
  { id: 'ai-mentor', accent: '#ff6b35', orbit: 'inner' },
  { id: 'life-coach', accent: '#ff6b35', orbit: 'inner' },
  { id: 'marketing', accent: '#cd7f32', orbit: 'inner' },
  { id: 'social', accent: '#cd7f32', orbit: 'outer' },
  { id: 'trader', accent: '#c0c0c0', orbit: 'outer' },
  { id: 'investor', accent: '#c0c0c0', orbit: 'outer' },
  { id: 'model', accent: '#c0c0c0', orbit: 'outer' },
  { id: 'influencer', accent: '#c0c0c0', orbit: 'outer' },
];

const INNER = ROLES.filter((r) => r.orbit === 'inner');
const OUTER = ROLES.filter((r) => r.orbit === 'outer');

/** Places nodes evenly around a circle of the given radius. */
function polar(index: number, count: number, radius: number, offsetDeg = 0) {
  const angle = (index / count) * 2 * Math.PI + (offsetDeg * Math.PI) / 180;
  return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
}

export function RoleConstellation() {
  const { t, rtl } = useLocale();
  const [active, setActive] = useState<RoleMeta | null>(null);
  const reduced = useReducedMotion();

  const activeCopy = active ? t.constellation.roles[active.id] : null;

  const node = (role: RoleMeta, pos: { x: number; y: number }, counterSpin: string) => {
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
            className={`whitespace-nowrap rounded-full border px-3.5 py-2 text-[10.5px] transition-all duration-300 hover:scale-105 sm:text-[11.5px] ${rtl ? 'ar-text' : 'font-[family-name:var(--font-data)] uppercase tracking-[0.14em]'}`}
            style={{
              borderColor: isActive ? role.accent : 'rgba(201,168,76,0.28)',
              color: isActive ? '#0a0a0a' : role.accent,
              backgroundColor: isActive ? role.accent : 'rgba(10,10,10,0.88)',
              boxShadow: isActive ? `0 0 22px ${role.accent}70` : 'none',
            }}
          >
            {t.constellation.roles[role.id].label}
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
            <Kicker className={`mb-4 ${rtl ? 'ar-text' : ''}`}>{t.constellation.kicker}</Kicker>
            <h2 className={`mb-5 text-[#c9a84c] text-glow ${rtl ? 'ar-text ar-display text-[clamp(1.8rem,5vw,3.2rem)]' : 't-display-l'}`}>
              {t.constellation.title}
            </h2>
            <p className={`t-body-l mx-auto max-w-2xl text-[#b8a88a] ${rtl ? 'ar-text' : 'italic'}`}>
              {t.constellation.lead}
            </p>
            {!rtl && <ArabicSub className="mx-auto max-w-2xl">{AR.constellation}</ArabicSub>}
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
              {/* Dedicated square head-and-shoulders crop — a circle filled with a
                  full-length 3:4 frame reads as a tiny figure lost in a ring. */}
              <Image
                src="/photos/portrait-constellation.jpg"
                alt="Mahmoud Ashri"
                fill
                sizes="200px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.35)] to-transparent" />
            </div>
          </div>

          {/* Orbits */}
          <div
            role="radiogroup"
            aria-label={t.constellation.ariaGroup}
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
                src="/photos/portrait-constellation.jpg"
                alt="Mahmoud Ashri"
                fill
                sizes="168px"
                className="object-cover"
              />
            </div>
          </div>

          <div
            role="radiogroup"
            aria-label={t.constellation.ariaGroup}
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
                  className={`rounded-lg border px-3 py-2.5 text-center text-[10px] leading-tight transition-all duration-300 ${rtl ? 'ar-text text-[12px]' : 'font-[family-name:var(--font-data)] uppercase tracking-[0.1em]'}`}
                  style={{
                    borderColor: isActive ? role.accent : 'rgba(201,168,76,0.25)',
                    color: isActive ? '#0a0a0a' : role.accent,
                    backgroundColor: isActive ? role.accent : 'rgba(17,17,24,0.9)',
                  }}
                >
                  {t.constellation.roles[role.id].label}
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
          {active && activeCopy ? (
            <div>
              <p
                className={`mb-3 text-[11px] ${rtl ? 'ar-text text-[13px]' : 'font-[family-name:var(--font-data)] uppercase tracking-[0.3em]'}`}
                style={{ color: active.accent }}
              >
                {activeCopy.label}
              </p>
              <p className={`t-body-l text-[#e8e0d0] ${rtl ? 'ar-text' : 'italic'}`}>
                {rtl ? `\u00AB${activeCopy.line}\u00BB` : `\u201C${activeCopy.line}\u201D`}
              </p>
            </div>
          ) : (
            <div>
              <p className={`mb-3 text-xl text-[#c9a84c] sm:text-2xl ${rtl ? 'ar-text ar-display' : 'font-[family-name:var(--font-display)] uppercase tracking-[0.14em]'}`}>
                {t.constellation.defaultTitle}
              </p>
              <p className={`text-[11px] text-[#a08a63] ${rtl ? 'ar-text text-[13px]' : 'font-[family-name:var(--font-data)] uppercase tracking-[0.22em]'}`}>
                {t.constellation.acronym}
              </p>
            </div>
          )}
        </div>

        <p className={`mt-4 text-center text-[10px] text-[#8f7a58] md:hidden ${rtl ? 'ar-text text-[12px]' : 'font-[family-name:var(--font-data)] uppercase tracking-[0.24em]'}`}>
          {t.constellation.hintMobile}
        </p>
        <p className={`mt-4 hidden text-center text-[10px] text-[#8f7a58] md:block ${rtl ? 'ar-text text-[12px]' : 'font-[family-name:var(--font-data)] uppercase tracking-[0.24em]'}`}>
          {t.constellation.hintDesktop}
        </p>
      </div>
    </section>
  );
}
