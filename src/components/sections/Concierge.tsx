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
  channel,
  whatsappLink,
} from '@/site.config';
import { AR } from '@/i18n/ar';
import { useLocale } from '@/i18n/LocaleProvider';

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
  accent: string;
  /** Whether this intent offers a WhatsApp route. The pre-filled subject itself is
   *  localised in the dictionary (concierge.waSubjects) so the first line of the
   *  message arrives in the reader's own language. */
  hasWhatsapp: boolean;
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
};

const INTENTS: Intent[] = [
  {
    id: 'learn',
    icon: BookOpen,
    accent: '#c9a84c',
    hasWhatsapp: false,
    showBusinessEmail: false,
    showPublicEmail: true,
    showTelegram: true,
    showPlacement: true,
    showLinkedIn: false,
    showRegional: false,
    instagram: 'eec',
  },
  {
    id: 'consult',
    icon: CalendarCheck,
    accent: '#cd7f32',
    hasWhatsapp: true,
    showBusinessEmail: false,
    showPublicEmail: true,
    showTelegram: false,
    showPlacement: false,
    showLinkedIn: false,
    showRegional: true,
    instagram: null,
  },
  {
    id: 'business',
    icon: Briefcase,
    accent: '#c0c0c0',
    hasWhatsapp: true,
    showBusinessEmail: true,
    showPublicEmail: false,
    showTelegram: false,
    showPlacement: false,
    showLinkedIn: true,
    showRegional: true,
    instagram: 'personal',
  },
  {
    id: 'mentorship',
    icon: Compass,
    accent: '#ff6b35',
    hasWhatsapp: true,
    showBusinessEmail: false,
    showPublicEmail: true,
    showTelegram: false,
    showPlacement: false,
    showLinkedIn: false,
    showRegional: false,
    instagram: null,
  },
  {
    id: 'media',
    icon: Mic,
    accent: '#e74c3c',
    hasWhatsapp: false,
    showBusinessEmail: true,
    showPublicEmail: false,
    showTelegram: false,
    showPlacement: false,
    showLinkedIn: true,
    showRegional: false,
    instagram: 'personal',
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
  rtl,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  accent: string;
  onReveal?: () => void;
  rtl: boolean;
}) {
  const inner = (
    <>
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border"
        style={{ borderColor: `${accent}44`, backgroundColor: `${accent}12` }}
      >
        <Icon className="h-[17px] w-[17px]" style={{ color: accent }} aria-hidden="true" />
      </span>
      <span className={`min-w-0 ${rtl ? 'text-right' : 'text-left'}`}>
        <span className={`block text-[10px] text-[#a08a63] ${rtl ? 'ar-text text-[12px]' : 'font-[family-name:var(--font-data)] uppercase tracking-[0.2em]'}`}>
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
  const { t, rtl } = useLocale();
  const [selected, setSelected] = useState<Intent | null>(null);

  /** Gated values, populated only when the visitor explicitly asks (R-CNC-6). */
  const [businessEmail, setBusinessEmail] = useState<string | null>(null);

  const waHref = whatsappLink;

  const reset = () => {
    setSelected(null);
    setBusinessEmail(null);
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
            <Kicker className={`mb-4 ${rtl ? 'ar-text' : ''}`}>{t.concierge.kicker}</Kicker>
            <h2 className={`mb-5 text-[#c9a84c] text-glow ${rtl ? 'ar-text ar-display text-[clamp(1.6rem,4.5vw,2.8rem)]' : 't-display-l'}`}>
              {t.concierge.title}
            </h2>
            <p className={`t-body-l mx-auto max-w-2xl text-[#b8a88a] ${rtl ? 'ar-text' : 'italic'}`}>
              {t.concierge.lead}
            </p>
            {!rtl && (
              <>
                <Arabic display className="mx-auto mt-5 max-w-2xl text-lg text-[#c9a84c]">
                  {AR.concierge.title}
                </Arabic>
                <Arabic className="mx-auto mt-2 max-w-2xl text-[15px] text-[#b8a88a]">
                  {AR.concierge.lead}
                </Arabic>
              </>
            )}
          </div>
        </Rise>

        <Rise index={1}>
          <GlowingBorder intensity="high" className="mx-auto max-w-3xl rounded-xl">
            <MetallicCard hover={false} className="p-7 sm:p-10">
              {/* ══ Step 1 — choose an intent ══ */}
              {!selected && (
                <div className="space-y-3" role="group" aria-label={t.concierge.ariaGroup}>
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
                          className={`block text-sm font-bold sm:text-base ${rtl ? 'ar-text ar-display' : 'font-[family-name:var(--font-display)] uppercase tracking-[0.12em]'}`}
                          style={{ color: intent.accent }}
                        >
                          {t.concierge.intents[intent.id].label}
                        </span>
                        <span className={`mt-1 block text-[14px] text-[#b8a88a] ${rtl ? 'ar-text' : ''}`}>
                          {t.concierge.intents[intent.id].sub}
                        </span>
                        {!rtl && (
                          <Arabic
                            as="span"
                            className="mt-2 block text-[13.5px] leading-relaxed text-[#a08a63]"
                          >
                            <span className="font-bold text-[#b8a88a]">
                              {AR.concierge.labels[intent.id as keyof typeof AR.concierge.labels]}
                            </span>
                            {' — '}
                            {AR.concierge.intents[intent.id as keyof typeof AR.concierge.intents]}
                          </Arabic>
                        )}
                      </span>
                      <span
                        className={`shrink-0 font-[family-name:var(--font-data)] text-lg text-[#8f7a58] transition-transform duration-300 ${rtl ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}
                        aria-hidden="true"
                      >
                        {rtl ? '←' : '→'}
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
                    className={`mb-6 inline-flex cursor-pointer items-center gap-2 text-[10px] text-[#a08a63] transition-colors hover:text-[#c9a84c] ${rtl ? 'ar-text text-[12px]' : 'font-[family-name:var(--font-data)] uppercase tracking-[0.22em]'}`}
                  >
                    <ArrowLeft
                      className={`h-3.5 w-3.5 ${rtl ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                    {t.concierge.back}
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
                        className={`text-lg font-bold sm:text-xl ${rtl ? 'ar-text ar-display' : 'font-[family-name:var(--font-display)] uppercase tracking-[0.12em]'}`}
                        style={{ color: selected.accent }}
                      >
                        {t.concierge.intents[selected.id].label}
                      </h3>
                      <p className={`mt-0.5 text-[14px] text-[#b8a88a] ${rtl ? 'ar-text' : ''}`}>
                        {t.concierge.intents[selected.id].sub}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {selected.hasWhatsapp && (
                      <Route
                        icon={MessageCircle}
                        label={t.concierge.routes.whatsapp}
                        value={CONTACT.whatsapp.display}
                        href={waHref(
                          t.concierge.waSubjects[selected.id] ?? t.whatsappGreeting,
                        )}
                        accent="#25d366"
                        rtl={rtl}
                      />
                    )}

                    {selected.showPlacement && (
                      <Route
                        icon={Target}
                        label={t.concierge.routes.placement}
                        value="assessment.empireenglish.online"
                        href={PROPERTIES.assessment}
                        accent="#c9a84c"
                        rtl={rtl}
                      />
                    )}

                    {selected.showTelegram && (
                      <Route
                        icon={Send}
                        label={t.concierge.routes.telegramCommunity}
                        value={telegram.handle}
                        href={telegram.url}
                        accent={telegram.accent}
                        rtl={rtl}
                      />
                    )}

                    {selected.showPublicEmail && (
                      <Route
                        icon={Mail}
                        label={t.concierge.routes.email}
                        value={CONTACT.emailPublic.address}
                        href={`mailto:${CONTACT.emailPublic.address}`}
                        accent="#cd7f32"
                        rtl={rtl}
                      />
                    )}

                    {/* Gated: assembled on click, never in the initial HTML. */}
                    {selected.showBusinessEmail &&
                      (businessEmail ? (
                        <Route
                          icon={Mail}
                          label={t.concierge.routes.businessEmail}
                          value={businessEmail}
                          href={`mailto:${businessEmail}`}
                          accent="#cd7f32"
                        rtl={rtl}
                      />
                      ) : (
                        <Route
                          icon={Mail}
                          label={t.concierge.routes.businessEmail}
                          value={t.concierge.reveal}
                          accent="#cd7f32"
                          onReveal={() =>
                            setBusinessEmail(assembleEmail(CONTACT.emailBusinessEncoded))
                          }
                        rtl={rtl}
                      />
                      ))}

                    {selected.showLinkedIn && (
                      <Route
                        icon={Linkedin}
                        label={t.concierge.routes.linkedin}
                        value={linkedin.handle}
                        href={linkedin.url}
                        accent={linkedin.accent}
                        rtl={rtl}
                      />
                    )}

                    {selected.instagram === 'eec' && (
                      <Route
                        icon={Instagram}
                        label={t.concierge.routes.instagramEec}
                        value={instagramEec.handle}
                        href={instagramEec.url}
                        accent={instagramEec.accent}
                        rtl={rtl}
                      />
                    )}

                    {selected.instagram === 'personal' && (
                      <Route
                        icon={Instagram}
                        label={t.concierge.routes.instagramPersonal}
                        value={instagramPersonal.handle}
                        href={instagramPersonal.url}
                        accent={instagramPersonal.accent}
                        rtl={rtl}
                      />
                    )}
                  </div>

                  {/* Regional numbers are no longer gated here — they are shown in
                      full in the Direct Line block above (§9b), at the owner's
                      instruction. Repeating them behind a disclosure would be both
                      redundant and a weaker call to action. */}
                  {selected.showRegional && (
                    <div className="mt-6 border-t border-[rgba(201,168,76,0.15)] pt-5">
                      <a
                        href="#direct"
                        className={`text-[10px] text-[#a08a63] underline decoration-[rgba(201,168,76,0.35)] underline-offset-4 transition-colors hover:text-[#c9a84c] ${rtl ? 'ar-text text-[12px]' : 'font-[family-name:var(--font-data)] uppercase tracking-[0.22em]'}`}
                      >
                        {t.concierge.preferCall}
                      </a>
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
              href={waHref(t.whatsappGreeting)}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              size="md"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {t.concierge.fallback}
            </ImperialButton>
          </div>
        </Rise>

        <KickerClose>{t.concierge.close}</KickerClose>
      </div>
    </section>
  );
}
