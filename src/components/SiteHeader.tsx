'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { CrownEmblem, ImperialButton } from '@/components/ui';
import { useScrollProgress } from '@/lib/hooks';
import { IDENTITY } from '@/site.config';

/**
 * Sticky header with a scroll-progress rule and a persistent Concierge action.
 *
 * R-STR-3 requires the Concierge to be reachable at any scroll depth — a visitor who
 * is convinced at 30% should not have to scroll to 93% to act on it.
 *
 * The header is transparent over the hero and only gains its backdrop once the
 * visitor has scrolled, so it never competes with the vault opening.
 */

const NAV = [
  { label: 'Roles', href: '#constellation' },
  { label: 'Proof', href: '#proof' },
  { label: 'System', href: '#ecosystem' },
  { label: 'English', href: '#eec' },
  { label: 'Contact', href: '#direct' },
];

export function SiteHeader() {
  const progress = useScrollProgress();
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? 'border-b border-[rgba(201,168,76,0.16)] bg-[rgba(6,6,6,0.86)] backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-4 sm:h-18">
        {/* Brand */}
        <a
          href="#vault"
          className="flex shrink-0 items-center gap-2.5"
          aria-label={`${IDENTITY.name} — top of page`}
        >
          <CrownEmblem size={30} />
          <span className="hidden font-[family-name:var(--font-display)] text-[11px] font-bold uppercase tracking-[0.24em] text-[#c9a84c] sm:block">
            {IDENTITY.company}
          </span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Sections" className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="font-[family-name:var(--font-display)] text-[11px] uppercase tracking-[0.18em] text-[#b8a88a] transition-colors hover:text-[#c9a84c]"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Persistent primary action (R-STR-3) */}
          <ImperialButton as="a" href="#concierge" variant="primary" size="md" className="hidden sm:inline-flex">
            Connect
          </ImperialButton>

          {/* The open sheet covers the header and carries its own close button, so
              this trigger only ever needs the "open" affordance. */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-label="Open menu"
            className="cursor-pointer p-2 text-[#c9a84c] lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Scroll progress rule */}
      <div
        aria-hidden="true"
        className="h-px origin-left"
        style={{
          transform: `scaleX(${progress})`,
          background: 'linear-gradient(90deg, #c9a84c, #e8d48b)',
          transition: 'transform 90ms linear',
        }}
      />

      {/* Mobile sheet */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-[rgba(6,6,6,0.97)] backdrop-blur-lg lg:hidden">
          <div className="shell flex h-16 items-center justify-between sm:h-18">
            <div className="flex items-center gap-2.5">
              <CrownEmblem size={30} />
              <span className="font-[family-name:var(--font-display)] text-[11px] font-bold uppercase tracking-[0.24em] text-[#c9a84c]">
                {IDENTITY.company}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="cursor-pointer p-2 text-[#c9a84c]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav
            aria-label="Sections"
            className="shell flex flex-col gap-1 pt-8"
          >
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-[rgba(201,168,76,0.12)] py-4 font-[family-name:var(--font-display)] text-base uppercase tracking-[0.14em] text-[#e8e0d0] transition-colors hover:text-[#c9a84c]"
              >
                {n.label}
              </a>
            ))}

            <div className="pt-8">
              <ImperialButton
                as="a"
                href="#concierge"
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => setMenuOpen(false)}
              >
                Connect
              </ImperialButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
