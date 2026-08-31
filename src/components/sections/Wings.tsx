'use client';

import { Compass, Crown, Flame, Settings2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { KickerClose, MetallicCard, Rise, SectionShell } from '@/components/ui';
import { AR } from '@/i18n/ar';

/**
 * §4 THE FOUR WINGS — one spine, four wings.
 *
 * Each wing absorbs a cluster of the ten roles and gives it a *job* plus a *proof*.
 * The accent colours are the same ones used in the Constellation, so colour becomes a
 * wayfinding system across the page rather than decoration (design.md §2.2).
 */

type Wing = {
  name: string;
  icon: LucideIcon;
  accent: string;
  roles: string[];
  body: string;
  proof: string;
};

const WINGS: Wing[] = [
  {
    name: 'The Architect',
    icon: Crown,
    accent: '#c9a84c',
    roles: ['Founder', 'CEO'],
    body: 'I build the system before I sell the seat. Empire English Community is six CEFR levels, ninety weeks and four hundred and fifty content modules — designed, written and shipped.',
    proof: 'A working curriculum, a live assessment engine, and an audio pipeline of 9,360 clips.',
  },
  {
    name: 'The Operator',
    icon: Settings2,
    accent: '#cd7f32',
    roles: ['Marketing Manager', 'Social Media Manager', 'AI Mentor'],
    body: "Strategy is worthless if you can't run it yourself. I write the copy, cut the content, build the automation and read the numbers. Then I teach the same stack to the people I mentor.",
    proof: 'Every channel under this name was built and is run by one person.',
  },
  {
    name: 'The Mentor',
    icon: Flame,
    accent: '#ff6b35',
    roles: ['AI Mentor', 'Life Coach'],
    body: "Most people don't lack ability. They lack a system and a reason. I hand them both, then get out of the way.",
    proof: 'A method built on mindset first, mechanics second — the reason our students finish.',
  },
  {
    name: 'The Standard',
    icon: Compass,
    accent: '#c0c0c0',
    roles: ['Model', 'Influencer', 'Trader', 'Investor'],
    body: "You cannot teach a standard you don't hold. I trade my own capital, I show up on camera, and I walk into rooms I wasn't invited to.",
    proof: "Discipline is visible. That's the point of showing it.",
  },
];

export function Wings() {
  return (
    <SectionShell
      id="wings"
      kicker="One Spine · Four Wings"
      title="THE ARCHITECTURE OF A PERSON"
      lead="&ldquo;Ten titles is not ten careers. It&rsquo;s one system with four wings.&rdquo;"
      leadAr={AR.wings}
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {WINGS.map((wing, i) => (
          <Rise key={wing.name} index={i}>
            <MetallicCard brackets className="h-full p-7 sm:p-9">
              {/* Icon */}
              <div
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border-2"
                style={{
                  borderColor: `${wing.accent}55`,
                  boxShadow: `0 0 18px ${wing.accent}22, inset 0 0 12px ${wing.accent}14`,
                }}
              >
                <wing.icon className="h-6 w-6" style={{ color: wing.accent }} aria-hidden="true" />
              </div>

              <h3
                className="mb-4 font-[family-name:var(--font-display)] text-xl font-bold uppercase tracking-[0.14em] sm:text-2xl"
                style={{ color: wing.accent }}
              >
                {wing.name}
              </h3>

              {/* Absorbed roles */}
              <div className="mb-5 flex flex-wrap gap-2">
                {wing.roles.map((r) => (
                  <span
                    key={r}
                    className="rounded-full border px-2.5 py-1 font-[family-name:var(--font-data)] text-[10px] uppercase tracking-[0.14em]"
                    style={{
                      borderColor: `${wing.accent}38`,
                      color: wing.accent,
                      backgroundColor: `${wing.accent}0f`,
                    }}
                  >
                    {r}
                  </span>
                ))}
              </div>

              <p className="mb-5 text-[15px] leading-relaxed text-[#cfc4ae]">{wing.body}</p>

              <div
                className="border-l-2 pl-4"
                style={{ borderColor: `${wing.accent}66` }}
              >
                <p className="font-[family-name:var(--font-data)] text-[10px] uppercase tracking-[0.24em] text-[#a08a63]">
                  Proof
                </p>
                <p className="mt-1.5 text-[14px] italic leading-relaxed text-[#e8e0d0]">
                  {wing.proof}
                </p>
              </div>
            </MetallicCard>
          </Rise>
        ))}
      </div>

      <KickerClose>Four wings. One roof.</KickerClose>
    </SectionShell>
  );
}
