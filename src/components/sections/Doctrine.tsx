'use client';

import { KickerClose, Rise, SectionShell } from '@/components/ui';
import { AR } from '@/i18n/ar';

/**
 * §9 THE DOCTRINE — six operating principles.
 *
 * Adapted directly from the worldview in `empire-nexus/content/brand/macal-brand-bible.md`
 * so the page's philosophy matches the one the content engine already publishes. This
 * section exists to make the right visitor feel *aligned* — that is what converts
 * mentorship and coaching leads, not a feature list.
 *
 * Tone taken from the bible: short sentences, no jargon, each one closing hard.
 */

const PRINCIPLES: { n: string; title: string; body: string }[] = [
  {
    n: '01',
    title: 'Hard work beats hype',
    body: 'Every time. No exceptions, no shortcuts, no weekend seminar that changes your life.',
  },
  {
    n: '02',
    title: 'If it sounds too good to be true, hold your wallet',
    body: 'Especially in this market. Especially when someone is in a hurry for your money.',
  },
  {
    n: '03',
    title: 'Respect is earned in public, paid for in private',
    body: 'Show up. Deliver. Repeat until your name does the introductions for you.',
  },
  {
    n: '04',
    title: 'Complexity is usually a hiding place',
    body: "If I can't explain it simply, I don't understand it yet. So I go back and learn it properly.",
  },
  {
    n: '05',
    title: 'Own the mistake, fix it, move',
    body: 'Excuses are just deferred costs. They always come due, and they always cost more.',
  },
  {
    n: '06',
    title: 'Legacy is what outlasts you',
    body: "I'm not building a following. I'm building a foundation that works when I'm not in the room.",
  },
];

export function Doctrine() {
  return (
    <SectionShell
      id="doctrine"
      kicker="How I Operate"
      title="THE DOCTRINE"
      lead="&ldquo;Six rules. I didn&rsquo;t read them in a book — I paid for each one.&rdquo;"
      leadAr={AR.doctrine}
    >
      <div className="grid grid-cols-1 gap-x-12 gap-y-9 lg:grid-cols-2">
        {PRINCIPLES.map((p, i) => (
          <Rise key={p.n} index={i}>
            <div className="flex gap-5 border-l-2 border-[rgba(201,168,76,0.3)] pl-5 transition-colors duration-500 hover:border-[#c9a84c]">
              <span
                className="shrink-0 font-[family-name:var(--font-data)] text-sm font-bold tabular-nums text-[#c9a84c] opacity-70"
                aria-hidden="true"
              >
                {p.n}
              </span>
              <div>
                <h3 className="mb-2 font-[family-name:var(--font-display)] text-base font-bold uppercase leading-snug tracking-[0.1em] text-[#e8e0d0] sm:text-lg">
                  {p.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-[#cfc4ae]">{p.body}</p>
              </div>
            </div>
          </Rise>
        ))}
      </div>

      <KickerClose>You can have excuses. Or results. Not both.</KickerClose>
    </SectionShell>
  );
}
