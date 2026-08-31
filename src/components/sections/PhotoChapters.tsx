'use client';

import Image from 'next/image';
import { ArabicSub, Kicker, Rise } from '@/components/ui';
import { AR } from '@/i18n/ar';

/**
 * §7 THE CHAPTERS — the four photographs, each carrying one manifesto line.
 *
 * Deliberately not a gallery grid. A grid says "here are some photos of me"; four
 * full-bleed chapters with a line each say "here is what I stand for, illustrated".
 * The images alternate side so the eye keeps moving down the page.
 *
 * Image paths are CONTRACTUAL (R-PHO-3) — the owner overwrites the committed
 * placeholders in place. Renaming these files breaks the page.
 */

type Chapter = {
  numeral: string;
  title: string;
  src: string;
  alt: string;
  line: string;
  body: string;
  /** object-position, tuned per photograph so the crop never cuts the face. */
  focus: string;
};

const CHAPTERS: Chapter[] = [
  {
    numeral: 'I',
    title: 'Diplomacy',
    src: '/photos/chapter-01-diplomacy.jpg',
    alt: 'Mahmoud Ashri in a black suit standing before national flags at an official reception',
    line: 'I represent something bigger than myself.',
    body: 'When you carry a name, you stop making decisions for yourself alone. Everything I build has to survive being looked at.',
    focus: 'center 22%',
  },
  {
    numeral: 'II',
    title: 'Authority',
    src: '/photos/chapter-02-authority.jpg',
    alt: 'Mahmoud Ashri seated in a leather chair in a marble lobby, hands clasped',
    line: 'Authority is quiet.',
    body: "The loudest man in the room is usually the one with the least to show. I'd rather the work did the talking.",
    focus: 'center 25%',
  },
  {
    numeral: 'III',
    title: 'Presence',
    src: '/photos/chapter-03-presence.jpg',
    alt: 'Mahmoud Ashri at an evening industry event, guests gathered behind him',
    line: "I move in rooms I was told I'd never enter.",
    body: 'Nobody handed me access. I built something worth letting in.',
    focus: 'center 20%',
  },
  {
    numeral: 'IV',
    title: 'Vision',
    src: '/photos/chapter-04-vision.jpg',
    alt: 'Mahmoud Ashri on a terrace at dusk with the Dubai skyline behind him',
    line: 'I build where the skyline is still going up.',
    body: "Dubai doesn't reward nostalgia. Neither do I. Build for the version of the world that's arriving.",
    focus: 'center 18%',
  },
];

export function PhotoChapters() {
  return (
    <section id="chapters" className="relative py-20 sm:py-28">
      <div className="shell">
        <Rise>
          <div className="mb-16 text-center">
            <Kicker className="mb-4">Four Frames</Kicker>
            <h2 className="t-display-l mb-5 text-[#c9a84c] text-glow">THE CHAPTERS</h2>
            <p className="t-body-l mx-auto max-w-2xl italic text-[#b8a88a]">
              &ldquo;A photograph is a claim. These are the four I&rsquo;m willing to
              defend.&rdquo;
            </p>
            <ArabicSub className="mx-auto max-w-2xl">{AR.chapters}</ArabicSub>
          </div>
        </Rise>
      </div>

      <div className="space-y-16 sm:space-y-24">
        {CHAPTERS.map((c, i) => {
          const imageRight = i % 2 === 1;
          return (
            <Rise key={c.numeral}>
              <div className="shell">
                <div
                  className={`flex flex-col items-center gap-8 lg:gap-14 ${
                    imageRight ? 'lg:flex-row-reverse' : 'lg:flex-row'
                  }`}
                >
                  {/* ── Image ── */}
                  <div className="w-full lg:w-[46%]">
                    <div
                      className="relative aspect-[3/4] w-full overflow-hidden rounded-lg"
                      style={{
                        border: '1px solid rgba(201,168,76,0.28)',
                        boxShadow:
                          '0 18px 60px rgba(0,0,0,0.7), 0 0 30px rgba(201,168,76,0.07)',
                      }}
                    >
                      <Image
                        src={c.src}
                        alt={c.alt}
                        fill
                        loading="lazy"
                        sizes="(max-width: 1024px) 100vw, 46vw"
                        className="object-cover"
                        style={{ objectPosition: c.focus }}
                      />
                      {/* Cinematic bottom scrim + gold top edge */}
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.6)] via-transparent to-transparent"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-px"
                        style={{
                          background:
                            'linear-gradient(90deg, transparent, rgba(201,168,76,0.7), transparent)',
                        }}
                      />
                      {/* Numeral plate */}
                      <div
                        className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-full"
                        style={{
                          background: 'rgba(10,10,10,0.82)',
                          border: '1px solid rgba(201,168,76,0.5)',
                          backdropFilter: 'blur(4px)',
                        }}
                      >
                        <span className="font-[family-name:var(--font-display)] text-sm font-bold text-[#c9a84c]">
                          {c.numeral}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ── Text ── */}
                  <div className="w-full text-center lg:w-[54%] lg:text-left">
                    <Kicker className="mb-5">{`Chapter ${c.numeral} — ${c.title}`}</Kicker>
                    <p className="mb-6 font-[family-name:var(--font-display)] text-[clamp(1.5rem,3.6vw,2.6rem)] font-bold uppercase leading-[1.22] tracking-[0.03em] text-[#e8e0d0]">
                      &ldquo;{c.line}&rdquo;
                    </p>
                    <div
                      className="hairline mx-auto mb-6 w-20 lg:mx-0"
                      aria-hidden="true"
                    />
                    <p className="t-body-l mx-auto max-w-xl text-[#cfc4ae] lg:mx-0">
                      {c.body}
                    </p>
                  </div>
                </div>
              </div>
            </Rise>
          );
        })}
      </div>
    </section>
  );
}
