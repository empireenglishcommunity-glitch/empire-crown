'use client';

import { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Briefcase,
  CalendarCheck,
  Compass,
  Mail,
  Mic,
  MessageCircle,
  Send,
  Linkedin,
  Instagram,
  Target,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
  Arabic,
  GlowingBorder,
  ImperialButton,
  Kicker,
  KickerClose,
  MetallicCard,
  Rise,
} from '@/components/ui';
import {
  CONTACT,
  PROPERTIES,
  assembleEmail,
  assemblePhone,
  channel,
} from '@/site.config';
import { AR } from '@/i18n/ar';

/**
 * §10 THE CONCIERGE — the primary CTA and the page's whole conversion mechanism.
 *
 * WHY A ROUTER INSTEAD OF A CONTACT BLOCK
 * The page serves five different audiences (learners, brands, mentorship prospects,
 * business peers, press). A single "Contact me" serves none of them well, and dumping
 * six phone numbers and two emails on a public page has two costs: it looks cheap, and
 * the numbers get scraped within days.
 *
 * So: ask the intent first, reveal only that intent's channels, and pre-fill the
 * WhatsApp message so the owner can triage from the first line.
 *
 * NO BACKEND (R-CNC-4). Every route is a deep link. This keeps the page a pure static
 * export with zero running cost, which is a hard architectural constraint here.
 *
 * PRIVACY (R-CNC-5/6). The business email and the two regional phone numbers are
 * *assembled at click time* from parts held separately in site.config.ts. They never
 * appear as a complete string in the exported HTML, so the cheap harvesters get
 * nothing. This is not real security — it is friction, deliberately chosen over
 * publishing the owner's personal number in plain text.
 */

type Intent = {
  id: string;
  icon: LucideIcon;
  label: string;
  sub: string;
  accent: string;
  /** Pre-filled WhatsApp subject, or null if this intent has no WhatsApp route. */
  waSubject: string | null;
  /** Which gated channels this intent may reveal. */
  showBusinessEmail: boolean;
  showPublicEmail: boolean;
  showTelegram: boolean;
  showPlacement: boolean;
  showLinkedIn: boolean;
  showRegional: boolean;
  /** Which Instagram account this intent should be sent to, if any. */
  instagram: 'eec' | 'personal' | null;
  /** Arabic label + sub-copy. The Concierge is the conversion surface, so it is
   *  the single most important place on the page to be readable in Arabic. */
  labelAr: string;
  subAr: string;
};

const INTENTS: Intent[] = [
  {
    id: 'learn',
    icon: BookOpen,
    label: 'Learn English',
    sub: 'Join EEC and start at your real level.',
    accent: '#c9a84c',
    waSubject: null,
    showBusinessEmail: false,
    showPublicEmail: true,
    showTelegram: true,
    showPlacement: true,
    showLinkedIn: false,
    showRegional: false,
    instagram: 'eec',
    labelAr: AR.concierge.labels.learn,
    subAr: AR.concierge.intents.learn,
  },
  {
    id: 'consult',
    icon: CalendarCheck,
    label: 'Book a consultation',
    sub: 'One conversation. Bring a real problem.',
    accent: '#cd7f32',
    waSubject: 'Consultation request — ',
    showBusinessEmail: false,
    showPublicEmail: true,
    showTelegram: false,
    showPlacement: false,
    showLinkedIn: false,
    showRegional: true,
    instagram: null,
    labelAr: AR.concierge.labels.consult,
    subAr: AR.concierge.intents.consult,
  },
  {
    id: 'business',
    icon: Briefcase,
    label: 'Business & collaboration',
    sub: 'Brand deals, partnerships, ventures.',
    accent: '#c0c0c0',
    waSubject: 'Business enquiry — ',
    showBusinessEmail: true,
    showPublicEmail: false,
    showTelegram: false,
    showPlacement: false,
    showLinkedIn: true,
    showRegional: true,
    instagram: 'personal',
    labelAr: AR.concierge.labels.business,
    subAr: AR.concierge.intents.business,
  },
  {
    id: 'mentorship',
    icon: Compass,
    label: 'Mentorship & coaching',
    sub: 'AI fluency, discipline, direction.',
    accent: '#ff6b35',
    waSubject: 'Mentorship enquiry — ',
    showBusinessEmail: false,
    showPublicEmail: true,
    showTelegram: false,
    showPlacement: false,
    showLinkedIn: false,
    showRegional: false,
    instagram: null,
    labelAr: AR.concierge.labels.mentorship,
    subAr: AR.concierge.intents.mentorship,
  },
  {
    id: 'media',
    icon: Mic,
    label: 'Media & speaking',
    sub: 'Press, interviews, stages, panels.',
    accent: '#e74c3c',
    waSubject: null,
    showBusinessEmail: true,
    showPublicEmail: false,
    showTelegram: false,
    showPlacement: false,
    showLinkedIn: true,
    showRegional: false,
    instagram: 'personal',
    labelAr: AR.concierge.labels.media,
    subAr: AR.concierge.intents.media,
  },
];

const telegram = channel('telegram');
const linkedin = channel('linkedin');

/**
 * There are two Instagram accounts and they serve different people, so each intent gets
 * the right one rather than a generic "Instagram" link:
 *   - learners  → the Empire English teaching account
 *   - press/media/brands → the personal / MACAL Empire account
 * Sending a journalist to a grammar-lesson feed, or a student to a business feed, is a
 * small mistake that loses the lead entirely.
 */
const instagramEec = channel('instagram-eec');
const instagramPersonal = channel('instagram-personal');

/** A single revealed channel row. */
function Route({
  icon: Icon,
  label,
  value,
  href,
  accent,
  onReveal,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  accent: string;
  onReveal?: () => void;
}) {
  const inner = (
    <>
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border"
        style={{ borderColor: `${accent}44`, backgroundColor: `${accent}12` }}
      >
        <Icon className="h-[17px] w-[17px]" style={{ color: accent }} aria-hidden="true" />
      </span>
      <span className="min-w-0 text-left">
        <span className="block font-[family-name:var(--font-data)] text-[10px] uppercase tracking-[0.2em] text-[#a08a63]">
          {label}
        </span>
        <span className="mt-0.5 block truncate text-[15px] text-[#e8e0d0]">{value}</span>
      </span>
    </>
  );

  const cls =
    'flex w-full items-center gap-4 rounded-lg border border-[rgba(201,168,76,0.18)] bg-[rgba(17,17,24,0.75)] p-3.5 transition-all duration-300 hover:border-[rgba(201,168,76,0.45)] hover:bg-[rgba(26,26,46,0.75)]';

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }

  return (
    <button type="button" onClick={onReveal} className={`${cls} cursor-pointer`}>
      {inner}
    </button>
  );
}

export function Concierge() {
  const [selected, setSelected] = useState<Intent | null>(null);

  /** Gated values, populated only when the visitor explicitly asks (R-CNC-6). */
  const [businessEmail, setBusinessEmail] = useState<string | null>(null);
  const [regionalShown, setRegionalShown] = useState(false);

  const waHref = (subject: string) =>
    `https://wa.me/${CONTACT.whatsapp.digits}?text=${encodeURIComponent(subject)}`;

  const reset = () => {
    setSelected(null);
    setBusinessEmail(null);
    setRegionalShown(false);
  };

  return (
    <section id="concierge" className="relative py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[min(1000px,95vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(201,168,76,0.08)_0%,transparent_70%)]"
      />

      <div className="shell relative">
        <Rise>
          <div className="mb-14 text-center">
            <Kicker className="mb-4">The Concierge</Kicker>
            <h2 className="t-display-l mb-5 text-[#c9a84c] text-glow">
              HOW DO YOU WANT TO CONNECT?
            </h2>
            <p className="t-body-l mx-auto max-w-2xl italic text-[#b8a88a]">
              &ldquo;Tell me what you need. I&rsquo;ll be on the other end.&rdquo;
            </p>
            <Arabic display className="mx-auto mt-5 max-w-2xl text-lg text-[#c9a84c]">
              {AR.concierge.title}
            </Arabic>
            <Arabic className="mx-auto mt-2 max-w-2xl text-[15px] text-[#b8a88a]">
              {AR.concierge.lead}
            </Arabic>
          </div>
        </Rise>

        <Rise index={1}>
          <GlowingBorder intensity="high" className="mx-auto max-w-3xl rounded-xl">
            <MetallicCard hover={false} className="p-7 sm:p-10">
              {/* ══ Step 1 — choose an intent ══ */}
              {!selected && (
                <div className="space-y-3" role="group" aria-label="Choose what you need">
                  {INTENTS.map((intent) => (
                    <button
                      key={intent.id}
                      type="button"
                      onClick={() => setSelected(intent)}
                      className="group flex w-full cursor-pointer items-center gap-4 rounded-lg border border-[rgba(201,168,76,0.18)] bg-[rgba(17,17,24,0.6)] p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(201,168,76,0.45)] hover:bg-[rgba(26,26,46,0.7)]"
                    >
                      <span
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border transition-transform duration-300 group-hover:scale-110"
                        style={{
                          borderColor: `${intent.accent}44`,
                          backgroundColor: `${intent.accent}12`,
                        }}
                      >
                        <intent.icon
                          className="h-[19px] w-[19px]"
                          style={{ color: intent.accent }}
                          aria-hidden="true"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className="block font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-[0.12em] sm:text-base"
                          style={{ color: intent.accent }}
                        >
                          {intent.label}
                        </span>
                        <span className="mt-1 block text-[14px] text-[#b8a88a]">
                          {intent.sub}
                        </span>
                        {/* Arabic label + sub. A learner who cannot read the English
                            above must still be able to pick the right door. */}
                        <Arabic
                          as="span"
                          className="mt-2 block text-[13.5px] leading-relaxed text-[#a08a63]"
                        >
                          <span className="font-bold text-[#b8a88a]">{intent.labelAr}</span>
                          {' — '}
                          {intent.subAr}
                        </Arabic>
                      </span>
                      <span
                        className="shrink-0 font-[family-name:var(--font-data)] text-lg text-[#8b7355] transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* ══ Step 2 — reveal only that intent's channels ══ */}
              {selected && (
                <div>
                  <button
                    type="button"
                    onClick={reset}
                    className="mb-6 inline-flex cursor-pointer items-center gap-2 font-[family-name:var(--font-data)] text-[10px] uppercase tracking-[0.22em] text-[#a08a63] transition-colors hover:text-[#c9a84c]"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                    All options
                  </button>

                  <div className="mb-7 flex items-center gap-4">
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border"
                      style={{
                        borderColor: `${selected.accent}55`,
                        backgroundColor: `${selected.accent}15`,
                      }}
                    >
                      <selected.icon
                        className="h-5 w-5"
                        style={{ color: selected.accent }}
                        aria-hidden="true"
                      />
                    </span>
                    <div>
                      <h3
                        className="font-[family-name:var(--font-display)] text-lg font-bold uppercase tracking-[0.12em] sm:text-xl"
                        style={{ color: selected.accent }}
                      >
                        {selected.label}
                      </h3>
                      <p className="mt-0.5 text-[14px] text-[#b8a88a]">{selected.sub}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {selected.waSubject && (
                      <Route
                        icon={MessageCircle}
                        label="WhatsApp — fastest"
                        value={CONTACT.whatsapp.display}
                        href={waHref(selected.waSubject)}
                        accent="#25d366"
                      />
                    )}

                    {selected.showPlacement && (
                      <Route
                        icon={Target}
                        label="Free placement test"
                        value="assessment.empireenglish.online"
                        href={PROPERTIES.assessment}
                        accent="#c9a84c"
                      />
                    )}

                    {selected.showTelegram && (
                      <Route
                        icon={Send}
                        label="Telegram community"
                        value={telegram.handle}
                        href={telegram.url}
                        accent={telegram.accent}
                      />
                    )}

                    {selected.showPublicEmail && (
                      <Route
                        icon={Mail}
                        label="Email"
                        value={CONTACT.emailPublic.address}
                        href={`mailto:${CONTACT.emailPublic.address}`}
                        accent="#cd7f32"
                      />
                    )}

                    {/* Gated: assembled on click, never in the initial HTML. */}
                    {selected.showBusinessEmail &&
                      (businessEmail ? (
                        <Route
                          icon={Mail}
                          label="Business email"
                          value={businessEmail}
                          href={`mailto:${businessEmail}`}
                          accent="#cd7f32"
                        />
                      ) : (
                        <Route
                          icon={Mail}
                          label="Business email"
                          value="Tap to reveal"
                          accent="#cd7f32"
                          onReveal={() =>
                            setBusinessEmail(assembleEmail(CONTACT.emailBusinessEncoded))
                          }
                        />
                      ))}

                    {selected.showLinkedIn && (
                      <Route
                        icon={Linkedin}
                        label="LinkedIn"
                        value={linkedin.handle}
                        href={linkedin.url}
                        accent={linkedin.accent}
                      />
                    )}

                    {selected.instagram === 'eec' && (
                      <Route
                        icon={Instagram}
                        label="Instagram — Empire English"
                        value={instagramEec.handle}
                        href={instagramEec.url}
                        accent={instagramEec.accent}
                      />
                    )}

                    {selected.instagram === 'personal' && (
                      <Route
                        icon={Instagram}
                        label="Instagram — MACAL Empire"
                        value={instagramPersonal.handle}
                        href={instagramPersonal.url}
                        accent={instagramPersonal.accent}
                      />
                    )}
                  </div>

                  {/* Gated regional numbers */}
                  {selected.showRegional && (
                    <div className="mt-6 border-t border-[rgba(201,168,76,0.15)] pt-5">
                      {!regionalShown ? (
                        <button
                          type="button"
                          onClick={() => setRegionalShown(true)}
                          className="cursor-pointer font-[family-name:var(--font-data)] text-[10px] uppercase tracking-[0.22em] text-[#a08a63] underline decoration-[rgba(201,168,76,0.35)] underline-offset-4 transition-colors hover:text-[#c9a84c]"
                        >
                          Show regional numbers
                        </button>
                      ) : (
                        <div className="space-y-2.5">
                          {CONTACT.regionalEncoded.map((r) => {
                            const number = assemblePhone(r.encoded);
                            return (
                              <div
                                key={r.label}
                                className="flex items-center justify-between gap-4 rounded-lg border border-[rgba(201,168,76,0.15)] bg-[rgba(17,17,24,0.6)] px-4 py-3"
                              >
                                <span className="font-[family-name:var(--font-data)] text-[10px] uppercase tracking-[0.2em] text-[#a08a63]">
                                  {r.label}
                                </span>
                                <a
                                  href={`tel:${number.replace(/\s/g, '')}`}
                                  className="font-[family-name:var(--font-data)] text-[15px] text-[#e8e0d0] transition-colors hover:text-[#c9a84c]"
                                >
                                  {number}
                                </a>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </MetallicCard>
          </GlowingBorder>
        </Rise>

        {/* Always-available fallback for anyone who refuses to choose. */}
        <Rise index={2}>
          <div className="mt-8 text-center">
            <ImperialButton
              as="a"
              href={waHref('Hello Mahmoud — ')}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              size="md"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Or just message me directly
            </ImperialButton>
          </div>
        </Rise>

        <KickerClose>One message is enough. Make it a real one.</KickerClose>
      </div>
    </section>
  );
}
