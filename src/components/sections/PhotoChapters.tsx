'use client';

import Image from 'next/image';
import { ArabicSub, Kicker, Rise } from '@/components/ui';
import { AR } from '@/i18n/ar';
import { useLocale } from '@/i18n/LocaleProvider';

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

/** Structural metadata only — copy comes from the dictionary. */
const CHAPTER_META: { key: string; numeral: string; src: string; focus: string }[] = [
  { key: 'diplomacy', numeral: 'I', src: '/photos/chapter-01-diplomacy.jpg', focus: 'center 22%' },
  { key: 'authority', numeral: 'II', src: '/photos/chapter-02-authority.jpg', focus: 'center 25%' },
  { key: 'presence', numeral: 'III', src: '/photos/chapter-03-presence.jpg', focus: 'center 20%' },
  { key: 'vision', numeral: 'IV', src: '/photos/chapter-04-vision.jpg', focus: 'center 18%' },
];

export function PhotoChapters() {
  const { t, rtl } = useLocale();

  return (
    <section id="chapters" className="relative py-20 sm:py-28">
      <div className="shell">
        <Rise>
          <div className="mb-16 text-center">
            <Kicker className="mb-4">{t.chapters.kicker}</Kicker>
            <h2 className={`mb-5 text-[#c9a84c] text-glow ${rtl ? 'ar-text ar-display text-[clamp(1.8rem,5vw,3.2rem)]' : 't-display-l'}`}>
              {t.chapters.title}
            </h2>
            <p className={`t-body-l mx-auto max-w-2xl text-[#b8a88a] ${rtl ? 'ar-text' : 'italic'}`}>
              {t.chapters.lead}
            </p>
            {!rtl && <ArabicSub className="mx-auto max-w-2xl">{AR.chapters}</ArabicSub>}
          </div>
        </Rise>
      </div>

      <div className="space-y-16 sm:space-y-24">
        {CHAPTER_META.map((meta, i) => {
          const c = t.chapters.items[meta.key];
          const imageRight = rtl ? i % 2 === 0 : i % 2 === 1;
          return (
            <Rise key={meta.key}>
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
                        src={meta.src}
                        alt={c.alt}
                        fill
                        loading="lazy"
                        sizes="(max-width: 1024px) 100vw, 46vw"
                        className="object-cover"
                        style={{ objectPosition: meta.focus }}
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
                          {meta.numeral}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ── Text ── */}
                  <div className={`w-full text-center lg:w-[54%] ${rtl ? 'lg:text-right' : 'lg:text-left'}`}>
                    <Kicker className="mb-5">{`Chapter ${meta.numeral} — ${c.title}`}</Kicker>
                    <p className={`mb-6 text-[clamp(1.5rem,3.6vw,2.6rem)] font-bold leading-[1.22] text-[#e8e0d0] ${rtl ? 'ar-text ar-display' : 'font-[family-name:var(--font-display)] uppercase tracking-[0.03em]'}`}>
                      {rtl ? `\u00AB${c.line}\u00BB` : `\u201C${c.line}\u201D`}
                    </p>
                    <div
                      className={`hairline mx-auto mb-6 w-20 ${rtl ? 'lg:mr-0 lg:ml-auto' : 'lg:mx-0'}`}
                      aria-hidden="true"
                    />
                    <p className={`t-body-l mx-auto max-w-xl text-[#cfc4ae] lg:mx-0 ${rtl ? 'ar-text' : ''}`}>
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
