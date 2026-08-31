'use client';

import { ArabicSub, Kicker, KickerClose, Rise } from '@/components/ui';
import { AR } from '@/i18n/ar';
import { useLocale } from '@/i18n/LocaleProvider';
import { EEC_CHANNELS, PERSONAL_CHANNELS, type Channel } from '@/site.config';

/** Brand marks kept as inline SVG paths — no icon-library dependency for logos. */
const MARKS: Record<string, string> = {
  tiktok:
    'M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.81a8.24 8.24 0 004.76 1.5v-3.4a4.85 4.85 0 01-1-.22z',
  youtube:
    'M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 00.5 6.19C0 8.08 0 12 0 12s0 3.92.5 5.81a3.02 3.02 0 002.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 002.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z',
  instagram:
    'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  telegram:
    'M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-.9-.593-.317-.92.198-1.452.135-.14 2.478-2.27 2.524-2.464.006-.024.011-.117-.044-.165-.055-.049-.137-.032-.196-.019-.084.019-1.42.902-4.008 2.65-.379.26-.723.387-1.03.38-.34-.007-.992-.191-1.477-.348-.594-.193-1.064-.294-1.045-.62.01-.17.245-.344.704-.522 2.755-1.2 4.591-1.991 5.508-2.373 2.62-1.09 3.165-1.28 3.52-1.287z',
  linkedin:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z',
  facebook:
    'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
};

function markFor(id: string): string {
  if (id.startsWith('tiktok')) return MARKS.tiktok;
  return MARKS[id] ?? MARKS.instagram;
}

function ChannelCard({ c, reason, rtl }: { c: Channel; reason: string; rtl: boolean }) {
  return (
    <a href={c.url} target="_blank" rel="noopener noreferrer" className="group block h-full">
      <div className="relative h-full overflow-hidden rounded-xl border border-[rgba(201,168,76,0.15)] bg-gradient-to-br from-[#111118] to-[#1a1a2e] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[rgba(201,168,76,0.4)]">
        {/* Top edge in the platform's colour */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[2px] opacity-40 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `linear-gradient(90deg, transparent, ${c.accent}, transparent)`,
          }}
        />
        {/* Colour wash on hover */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background: `radial-gradient(ellipse at top right, ${c.accent}14, transparent 65%)`,
          }}
        />

        <div className="relative">
          <div className="mb-4 flex items-center gap-3.5">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border transition-transform duration-500 group-hover:scale-110"
              style={{
                borderColor: `${c.accent}44`,
                backgroundColor: `${c.accent}12`,
                color: c.accent,
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                <path d={markFor(c.id)} />
              </svg>
            </span>
            <span className="min-w-0">
              <span className={`block text-[13px] font-bold text-[#e8e0d0] ${rtl ? 'ar-text' : 'font-[family-name:var(--font-display)] uppercase tracking-[0.12em]'}`}>
                {c.platform}
              </span>
              <span
                className="mt-0.5 block truncate font-[family-name:var(--font-data)] text-[11px]"
                style={{ color: c.accent }}
              >
                {c.handle}
              </span>
            </span>
          </div>
          <p className={`text-[14px] leading-relaxed text-[#cfc4ae] ${rtl ? 'ar-text' : ''}`}>{reason}</p>
        </div>
      </div>
    </a>
  );
}

/**
 * §11 THE CHANNELS — the distribution layer, presented as owned infrastructure.
 *
 * GROUPED BY BRAND, deliberately. There are two parallel account sets: the Empire
 * English teaching brand and the personal / MACAL Empire brand. An earlier version
 * flattened them into one list, which quietly made the page harder to use — a learner
 * hunting for daily English lessons had to guess which account taught and which one
 * posted business content.
 *
 * Splitting them also turns a potential weakness into the argument the page is already
 * making: two brands, run by one operator, is *evidence* of an ecosystem rather than a
 * scattered social presence.
 *
 * Note the framing on each card: a *reason to follow*, never a follower count. Counts
 * age badly and invite comparison; a reason is an argument.
 */
export function Channels() {
  const { t, rtl } = useLocale();

  const groups = [
    {
      key: 'eec',
      label: t.channels.groupEec,
      note: t.channels.groupEecNote,
      channels: EEC_CHANNELS.filter((c) => c.primary),
    },
    {
      key: 'personal',
      label: t.channels.groupPersonal,
      note: t.channels.groupPersonalNote,
      channels: PERSONAL_CHANNELS.filter((c) => c.primary),
    },
  ];

  const secondary = [...EEC_CHANNELS, ...PERSONAL_CHANNELS].filter((c) => !c.primary);

  return (
    <section id="channels" className="relative py-20 sm:py-28">
      <div className="shell">
        <Rise>
          <div className="mb-14 text-center">
            <Kicker className={`mb-4 ${rtl ? 'ar-text' : ''}`}>{t.channels.kicker}</Kicker>
            <h2 className={`mb-5 text-[#c9a84c] text-glow ${rtl ? 'ar-text ar-display text-[clamp(1.8rem,5vw,3.2rem)]' : 't-display-l'}`}>
              {t.channels.title}
            </h2>
            <p className={`t-body-l mx-auto max-w-2xl text-[#b8a88a] ${rtl ? 'ar-text' : 'italic'}`}>
              {t.channels.lead}
            </p>
            {!rtl && <ArabicSub className="mx-auto max-w-2xl">{AR.channels}</ArabicSub>}
          </div>
        </Rise>

        <div className="space-y-14">
          {groups.map((group) => (
            <div key={group.key}>
              <Rise>
                <div className={`mb-7 flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between ${rtl ? 'sm:text-right' : 'sm:text-left'}`}>
                  <div>
                    <h3 className={`text-base font-bold text-[#c9a84c] sm:text-lg ${rtl ? 'ar-text ar-display' : 'font-[family-name:var(--font-display)] uppercase tracking-[0.2em]'}`}>
                      {group.label}
                    </h3>
                    <p className={`mt-1.5 text-[14px] text-[#b8a88a] ${rtl ? 'ar-text' : 'italic'}`}>
                      {group.note}
                    </p>
                  </div>
                  <div
                    className={`hidden h-px flex-1 sm:block ${rtl ? 'sm:mr-8' : 'sm:ml-8'}`}
                    style={{
                      background: rtl
                        ? 'linear-gradient(270deg, rgba(201,168,76,0.35), transparent)'
                        : 'linear-gradient(90deg, rgba(201,168,76,0.35), transparent)',
                    }}
                    aria-hidden="true"
                  />
                </div>
              </Rise>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {group.channels.map((c, i) => (
                  <Rise key={c.id} index={i}>
                    <ChannelCard c={c} reason={t.channels.reasons[c.id]} rtl={rtl} />
                  </Rise>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Secondary links */}
        {secondary.length > 0 && (
          <Rise>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {secondary.map((c) => (
                <a
                  key={c.id}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded-full border border-[rgba(201,168,76,0.2)] px-4 py-2 text-[10px] text-[#a08a63] transition-all duration-300 hover:border-[rgba(201,168,76,0.45)] hover:text-[#c9a84c] ${rtl ? 'ar-text text-[12px]' : 'font-[family-name:var(--font-data)] uppercase tracking-[0.18em]'}`}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
                    <path d={markFor(c.id)} />
                  </svg>
                  {c.platform}
                </a>
              ))}
            </div>
          </Rise>
        )}

        <KickerClose>{t.channels.close}</KickerClose>
      </div>
    </section>
  );
}
