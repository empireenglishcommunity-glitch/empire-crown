'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { CrownEmblem, ImperialButton, Kicker } from '@/components/ui';
import { useReducedMotion } from '@/lib/hooks';
import { IDENTITY } from '@/site.config';

/**
 * §1 THE VAULT — the cold open.
 *
 * A visitor's default assumption on a personal site is "another link-in-bio".
 * The vault gesture contradicts that in the first second: a gold seam draws down
 * the centre, then two dark panels slide apart to reveal the content. Something was
 * kept in here, and it was closed until you arrived.
 *
 * Under reduced motion the vault is simply already open (design.md §4.1).
 */
export function VaultHero() {
  const reduced = useReducedMotion();

  const panelTransition = { duration: 1.1, ease: [0.16, 1, 0.3, 1] as const, delay: 0.55 };

  return (
    <section
      id="vault"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 py-24"
    >
      {/* ── Backdrop: Dubai skyline, heavily darkened ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/photos/chapter-04-vision.jpg"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-[0.28]"
        />
        {/* Scrims: vertical for text legibility, radial to focus the centre. */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/85 via-[#0a0a0a]/60 to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.75)_75%)]" />
      </div>

      {/* ── Vault panels ── */}
      {!reduced && (
        <>
          <motion.div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 z-20 w-1/2 bg-[#050505]"
            initial={{ x: 0 }}
            animate={{ x: '-100%' }}
            transition={panelTransition}
          />
          <motion.div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 z-20 w-1/2 bg-[#050505]"
            initial={{ x: 0 }}
            animate={{ x: '100%' }}
            transition={panelTransition}
          />
          {/* The seam: draws first, then fades as the panels part. */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-y-0 left-1/2 z-30 w-[2px] -translate-x-1/2 origin-top"
            style={{
              background:
                'linear-gradient(to bottom, transparent, #e8d48b 18%, #c9a84c 50%, #e8d48b 82%, transparent)',
              boxShadow: '0 0 24px rgba(201,168,76,0.8)',
            }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: [0, 1, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 1.7, times: [0, 0.4, 1], ease: 'easeInOut' }}
          />
        </>
      )}

      {/* ── Content ── */}
      <motion.div
        className="relative z-10 mx-auto max-w-4xl text-center"
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
        animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: reduced ? 0 : 1.1, ease: 'easeOut' }}
      >
        <motion.div
          className="mb-7 flex justify-center"
          animate={reduced ? undefined : { y: [0, -9, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <CrownEmblem size={88} />
        </motion.div>

        <Kicker className="mb-6">{`${IDENTITY.company} · ${IDENTITY.locations}`}</Kicker>

        <h1 className="t-display-xl mb-5">
          <span className="gold-shimmer">{IDENTITY.nameUpper}</span>
        </h1>

        <p className="mb-8 font-[family-name:var(--font-display)] text-sm tracking-[0.3em] text-[#b8a88a] sm:text-base">
          {IDENTITY.roleLine}
        </p>

        <p className="t-body-l mx-auto mb-11 max-w-2xl italic text-[#e8e0d0]">
          &ldquo;{IDENTITY.heroLead}&rdquo;
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <ImperialButton as="a" href="#concierge" variant="primary" size="lg">
            Enter the Empire
          </ImperialButton>
          <ImperialButton as="a" href="#proof" variant="outline" size="lg">
            See the Proof
          </ImperialButton>
        </div>
      </motion.div>

      {/* ── Scroll cue ── */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <ChevronDown
          className="scroll-cue h-6 w-6 text-[#c9a84c] opacity-70"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
