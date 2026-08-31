'use client';

import { MessageCircle, Phone, Send } from 'lucide-react';
import { Arabic, GlowingBorder, Kicker, MetallicCard, Rise } from '@/components/ui';
import { CONTACT, whatsappLink } from '@/site.config';
import { AR } from '@/i18n/ar';

/**
 * THE DIRECT LINE — owner-requested, deliberately unmissable.
 *
 * WHY THIS EXISTS ALONGSIDE THE CONCIERGE
 * The Concierge (§10) is a *router*: it asks what you need, then reveals only the
 * relevant channel. That is the right design for five different audiences, but it costs
 * one interaction before any contact detail appears — and a visitor who already knows
 * they want to speak to Mahmoud should not have to answer a question first.
 *
 * So the two coexist by design and serve different intents:
 *   DirectLine  — "I want to reach him." Zero clicks. Numbers on screen.
 *   Concierge   — "I'm not sure which door is mine." Guided.
 *
 * Placed immediately BEFORE the Concierge so the fast path is offered first and the
 * router catches everyone else.
 *
 * PRIVACY NOTE: the phone numbers here are rendered in the clear, in the initial HTML,
 * at the owner's explicit instruction. That is a real trade — see the comment on
 * CONTACT.phones in site.config.ts. Do not "restore" the obfuscation without asking;
 * it was removed on purpose.
 */
export function DirectLine() {
  const wa = whatsappLink('Hello Mahmoud — ');

  return (
    <section id="direct" className="relative py-16 sm:py-20">
      {/* Warm gold pool — this section should feel like the brightest thing nearby. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[440px] w-[min(1000px,95vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(201,168,76,0.1)_0%,transparent_70%)]"
      />

      <div className="shell relative">
        <Rise>
          <div className="mb-10 text-center">
            <Kicker className="mb-4">No Forms · No Gatekeepers</Kicker>
            <h2 className="t-display-l mb-4 text-[#c9a84c] text-glow">TALK TO ME DIRECTLY</h2>
            <p className="t-body-l mx-auto max-w-2xl italic text-[#e8e0d0]">
              &ldquo;You don&rsquo;t need an assistant, a form, or a funnel. Here are my
              actual numbers.&rdquo;
            </p>
            <Arabic className="mx-auto mt-4 max-w-2xl text-[15px] text-[#b8a88a]">
              {AR.direct.lead}
            </Arabic>
          </div>
        </Rise>

        <Rise index={1}>
          <GlowingBorder intensity="high" className="mx-auto max-w-4xl rounded-xl">
            <MetallicCard hover={false} brackets className="p-7 sm:p-10">
              {/* ── Primary: WhatsApp + Telegram ── */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-lg border p-5 transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    borderColor: 'rgba(37,211,102,0.35)',
                    backgroundColor: 'rgba(37,211,102,0.07)',
                  }}
                >
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border transition-transform duration-300 group-hover:scale-110"
                    style={{
                      borderColor: 'rgba(37,211,102,0.45)',
                      backgroundColor: 'rgba(37,211,102,0.12)',
                    }}
                  >
                    <MessageCircle
                      className="h-5 w-5"
                      style={{ color: '#25d366' }}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-[family-name:var(--font-data)] text-[10px] uppercase tracking-[0.22em] text-[#a08a63]">
                      WhatsApp — fastest reply
                    </span>
                    <span className="mt-1 block font-[family-name:var(--font-data)] text-[17px] font-bold text-[#e8e0d0]">
                      {CONTACT.whatsapp.display}
                    </span>
                  </span>
                </a>

                <a
                  href={CONTACT.telegramDirect.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-lg border p-5 transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    borderColor: 'rgba(42,171,238,0.35)',
                    backgroundColor: 'rgba(42,171,238,0.07)',
                  }}
                >
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border transition-transform duration-300 group-hover:scale-110"
                    style={{
                      borderColor: 'rgba(42,171,238,0.45)',
                      backgroundColor: 'rgba(42,171,238,0.12)',
                    }}
                  >
                    <Send className="h-5 w-5" style={{ color: '#2aabee' }} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-[family-name:var(--font-data)] text-[10px] uppercase tracking-[0.22em] text-[#a08a63]">
                      Telegram — direct to me
                    </span>
                    <span className="mt-1 block font-[family-name:var(--font-data)] text-[17px] font-bold text-[#e8e0d0]">
                      {CONTACT.telegramDirect.handle}
                    </span>
                  </span>
                </a>
              </div>

              <div className="hairline my-7" aria-hidden="true" />

              {/* ── Phone numbers, in the clear, tap-to-call ── */}
              <p className="mb-4 text-center font-[family-name:var(--font-data)] text-[10px] uppercase tracking-[0.24em] text-[#a08a63]">
                Or call directly
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {CONTACT.phones.map((p) => (
                  <a
                    key={p.label}
                    href={`tel:${p.dial}`}
                    className="group flex items-center justify-between gap-4 rounded-lg border border-[rgba(201,168,76,0.25)] bg-[rgba(17,17,24,0.7)] px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(201,168,76,0.55)]"
                  >
                    <span className="flex items-center gap-3">
                      <Phone
                        className="h-4 w-4 text-[#c9a84c] transition-transform duration-300 group-hover:scale-110"
                        aria-hidden="true"
                      />
                      <span className="font-[family-name:var(--font-display)] text-[11px] uppercase tracking-[0.2em] text-[#b8a88a]">
                        {p.label}
                      </span>
                    </span>
                    <span
                      dir="ltr"
                      className="font-[family-name:var(--font-data)] text-[16px] font-bold text-[#e8e0d0] transition-colors group-hover:text-[#c9a84c]"
                    >
                      {p.display}
                    </span>
                  </a>
                ))}
              </div>

              <p className="mt-6 text-center font-[family-name:var(--font-body)] text-[14px] italic text-[#b8a88a]">
                I read my own messages. Bring something real and you&rsquo;ll get a real
                answer.
              </p>
              <Arabic className="mx-auto mt-2 max-w-lg text-center text-[13.5px] text-[#a08a63]">
                {AR.direct.note}
              </Arabic>
            </MetallicCard>
          </GlowingBorder>
        </Rise>
      </div>
    </section>
  );
}
