'use client';

import { Kicker, Rise } from '@/components/ui';

/**
 * §2 THE SPINE — the governing sentence, stated once, with nothing around it.
 *
 * The whitespace is the argument. A page that crowds its own thesis doesn't believe
 * it. This section deliberately contains no card, no icon and no CTA.
 */
export function Spine() {
  return (
    <section
      id="spine"
      className="relative flex min-h-[70svh] items-center justify-center px-4 py-24"
    >
      {/* Soft gold pool behind the statement */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[min(900px,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(201,168,76,0.07)_0%,transparent_70%)]"
      />

      <div className="shell relative text-center">
        <Rise>
          <Kicker className="mb-10">The Thesis</Kicker>
        </Rise>

        <Rise index={1}>
          <p className="mx-auto max-w-4xl font-[family-name:var(--font-display)] text-[clamp(1.5rem,4.2vw,3rem)] font-bold uppercase leading-[1.3] tracking-[0.04em]">
            <span className="text-[#e8e0d0]">This is not a portfolio.</span>
            <br />
            <span className="text-[#c9a84c] text-glow">
              It&rsquo;s an operating system for power and self-mastery
            </span>
            <br />
            <span className="text-[#e8e0d0]">— built and lived by one man.</span>
          </p>
        </Rise>

        <Rise index={2}>
          <div className="hairline mx-auto mt-12 w-32" aria-hidden="true" />
        </Rise>
      </div>
    </section>
  );
}
