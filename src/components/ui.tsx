'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { useReducedMotion } from '@/lib/hooks';

/* ── Motion presets ────────────────────────────────────────── */

export const riseVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.09, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

/** Wraps children in a "rise" reveal that collapses to a fade under reduced motion. */
export function Rise({
  children,
  index = 0,
  className,
}: {
  children: ReactNode;
  index?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      custom={index}
      initial={reduced ? { opacity: 0 } : 'hidden'}
      whileInView={reduced ? { opacity: 1 } : 'visible'}
      viewport={{ once: true, margin: '-60px' }}
      variants={reduced ? undefined : riseVariants}
      transition={reduced ? { duration: 0.35 } : undefined}
    >
      {children}
    </motion.div>
  );
}

/* ── Kicker ────────────────────────────────────────────────── */

export function Kicker({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  // 13px minimum and muted gold is permitted here only because this is a
  // tracked-out label, not a sentence (design.md §2.1).
  return (
    <p className={`t-kicker text-[#a08a63] ${className}`}>{children}</p>
  );
}

/* ── Section shell ─────────────────────────────────────────── */

export function SectionShell({
  id,
  kicker,
  title,
  lead,
  children,
  className = '',
  align = 'center',
}: {
  id?: string;
  kicker?: string;
  title?: string;
  lead?: string;
  children: ReactNode;
  className?: string;
  align?: 'center' | 'left';
}) {
  const alignCls = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <section id={id} className={`relative py-20 sm:py-28 ${className}`}>
      <div className="shell">
        {(kicker || title || lead) && (
          <Rise>
            <div className={`flex flex-col ${alignCls} mb-12 sm:mb-16`}>
              {kicker && <Kicker className="mb-4">{kicker}</Kicker>}
              {title && (
                <h2 className="t-display-l text-[#c9a84c] text-glow mb-5">{title}</h2>
              )}
              {lead && (
                <p
                  className={`t-body-l italic text-[#b8a88a] max-w-2xl ${
                    align === 'center' ? 'mx-auto' : ''
                  }`}
                >
                  {lead}
                </p>
              )}
              <div
                className={`hairline w-24 mt-7 ${align === 'center' ? 'mx-auto' : ''}`}
                aria-hidden="true"
              />
            </div>
          </Rise>
        )}
        {children}
      </div>
    </section>
  );
}

/* ── Kicker close ("the kicker" line, per brand bible) ─────── */

export function KickerClose({ children }: { children: ReactNode }) {
  return (
    <Rise>
      <p className="mt-14 text-center font-[family-name:var(--font-display)] text-[#c9a84c] text-lg sm:text-xl tracking-[0.12em] uppercase">
        {children}
      </p>
    </Rise>
  );
}

/* ── Card ──────────────────────────────────────────────────── */

export function MetallicCard({
  children,
  className = '',
  hover = true,
  brackets = false,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  brackets?: boolean;
}) {
  return (
    <div
      className={[
        'relative rounded-xl metallic transition-all duration-500',
        hover ? 'metallic-hover' : '',
        brackets ? 'brackets' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}

/* ── Glowing border ────────────────────────────────────────── */

export function GlowingBorder({
  children,
  className = '',
  intensity = 'medium',
}: {
  children: ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}) {
  const reduced = useReducedMotion();
  const pad = { low: 1, medium: 1.5, high: 2 }[intensity];
  const opacity = { low: 0.2, medium: 0.32, high: 0.48 }[intensity];

  return (
    <div className={`relative rounded-xl ${className}`} style={{ padding: pad }}>
      <div
        aria-hidden="true"
        className={`absolute inset-0 rounded-xl ${reduced ? '' : 'glow-pulse'}`}
        style={{
          background: `linear-gradient(135deg, rgba(201,168,76,${opacity}), rgba(201,168,76,0.05), rgba(205,127,50,${opacity}))`,
        }}
      />
      <div className="relative rounded-[inherit]">{children}</div>
    </div>
  );
}

/* ── Button ────────────────────────────────────────────────── */

type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'md' | 'lg';
  className?: string;
} & (
  | ({ as?: 'button' } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  | ({ as: 'a' } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
);

export function ImperialButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...rest
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 font-[family-name:var(--font-display)] uppercase tracking-[0.16em] rounded-md transition-all duration-300 cursor-pointer text-center';

  const sizes = {
    md: 'px-6 py-3 text-xs sm:text-sm',
    lg: 'px-8 py-4 text-sm sm:text-base',
  }[size];

  const variants = {
    primary:
      'bg-gradient-to-b from-[#c9a84c] to-[#a8873a] text-[#0a0a0a] font-bold shadow-[0_4px_20px_rgba(201,168,76,0.28)] hover:shadow-[0_6px_30px_rgba(201,168,76,0.45)] hover:-translate-y-0.5',
    outline:
      'border border-[rgba(201,168,76,0.45)] text-[#c9a84c] hover:bg-[rgba(201,168,76,0.09)] hover:border-[#c9a84c] hover:-translate-y-0.5',
    ghost: 'text-[#c9a84c] hover:bg-[rgba(201,168,76,0.08)]',
  }[variant];

  const cls = `${base} ${sizes} ${variants} ${className}`;

  // `as` is our own discriminator and must not be forwarded to the DOM.
  if (rest.as === 'a') {
    const anchorProps = { ...rest } as { as?: 'a' } & React.AnchorHTMLAttributes<HTMLAnchorElement>;
    delete anchorProps.as;
    return (
      <a className={cls} {...anchorProps}>
        {children}
      </a>
    );
  }

  const buttonProps = { ...rest } as { as?: 'button' } & React.ButtonHTMLAttributes<HTMLButtonElement>;
  delete buttonProps.as;
  return (
    <button className={cls} {...buttonProps}>
      {children}
    </button>
  );
}

/* ── Divider ───────────────────────────────────────────────── */

export function GoldDivider() {
  return (
    <div className="flex items-center justify-center py-2" aria-hidden="true">
      <div className="hairline w-1/4 max-w-[220px]" />
      <div className="mx-4 text-[#c9a84c] opacity-60 text-sm tracking-widest">✦</div>
      <div className="hairline w-1/4 max-w-[220px]" />
    </div>
  );
}

/* ── M-crown emblem ────────────────────────────────────────────
 * Inline SVG rather than the 1.9 MB PNG from the product site: it scales to any
 * size, inherits colour, costs no network request, and cannot 404.
 * ───────────────────────────────────────────────────────────── */

export function CrownEmblem({
  size = 72,
  className = '',
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      role="img"
      aria-label="MACAL Empire emblem"
    >
      <defs>
        <linearGradient id="crown-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e8d48b" />
          <stop offset="50%" stopColor="#c9a84c" />
          <stop offset="100%" stopColor="#a8873a" />
        </linearGradient>
      </defs>

      {/* Shield */}
      <path
        d="M50 8 L86 20 V52 C86 72 70 86 50 93 C30 86 14 72 14 52 V20 Z"
        stroke="url(#crown-gold)"
        strokeWidth="2.2"
        fill="rgba(201,168,76,0.05)"
      />

      {/* Crown above the M */}
      <path
        d="M32 34 L38 26 L44 33 L50 23 L56 33 L62 26 L68 34 Z"
        fill="url(#crown-gold)"
        opacity="0.92"
      />

      {/* The M */}
      <path
        d="M33 72 V44 L42 58 L50 46 L58 58 L67 44 V72"
        stroke="url(#crown-gold)"
        strokeWidth="4"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
      />
    </svg>
  );
}
