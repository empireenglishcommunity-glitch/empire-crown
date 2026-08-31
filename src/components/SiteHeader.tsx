'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { CrownEmblem, ImperialButton } from '@/components/ui';
import { useScrollProgress } from '@/lib/hooks';
import { IDENTITY } from '@/site.config';
import { useLocale } from '@/i18n/LocaleProvider';
import { localePath } from '@/i18n/types';

/**
 * Sticky header with a scroll-progress rule and a persistent Concierge action.
 *
 * R-STR-3 requires the Concierge to be reachable at any scroll depth — a visitor who
 * is convinced at 30% should not have to scroll to 93% to act on it.
 *
 * The header is transparent over the hero and only gains its backdrop once the
 * visitor has scrolled, so it never competes with the vault opening.
 */

const NAV_KEYS = [
  { key: 'roles', href: '#constellation' },
  { key: 'proof', href: '#proof' },
  { key: 'system', href: '#ecosystem' },
  { key: 'english', href: '#eec' },
  { key: 'contact', href: '#direct' },
] as const;

export function SiteHeader() {
  const { locale, t, rtl } = useLocale();
  const progress = useScrollProgress();
  // The toggle points at the OTHER locale, and keeps the reader near the same content.
  const otherLocale = locale === 'ar' ? 'en' : 'ar';
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
          href={localePath(locale)}
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
          {NAV_KEYS.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`text-[11px] text-[#b8a88a] transition-colors hover:text-[#c9a84c] ${rtl ? 'ar-text text-[13px]' : 'font-[family-name:var(--font-display)] uppercase tracking-[0.18em]'}`}
            >
              {t.nav[n.key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Language toggle. A real link to a real URL — never a client-side-only
              switch — so the Arabic page is shareable and hreflang has something to
              point at. */}
          <a
            href={localePath(otherLocale)}
            hrefLang={otherLocale}
            aria-label={t.langSwitchAria}
            className={`rounded-full border border-[rgba(201,168,76,0.3)] px-3 py-1.5 text-[11px] text-[#c9a84c] transition-all duration-300 hover:border-[rgba(201,168,76,0.6)] hover:bg-[rgba(201,168,76,0.08)] ${otherLocale === 'ar' ? 'ar-text' : 'font-[family-name:var(--font-display)] tracking-[0.12em]'}`}
          >
            {t.langSwitch}
          </a>

          {/* Persistent primary action (R-STR-3) */}
          <ImperialButton
            as="a"
            href="#concierge"
            variant="primary"
            size="md"
            className={`hidden sm:inline-flex ${rtl ? 'ar-text' : ''}`}
          >
            {t.connect}
          </ImperialButton>

          {/* The open sheet covers the header and carries its own close button, so
              this trigger only ever needs the "open" affordance. */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-label={t.menuOpen}
            className="cursor-pointer p-2 text-[#c9a84c] lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Scroll progress rule */}
      <div
        aria-hidden="true"
        className={`h-px ${rtl ? 'origin-right' : 'origin-left'}`}
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
              aria-label={t.menuClose}
              className="cursor-pointer p-2 text-[#c9a84c]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav
            aria-label="Sections"
            className="shell flex flex-col gap-1 pt-8"
          >
            {NAV_KEYS.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setMenuOpen(false)}
                className={`border-b border-[rgba(201,168,76,0.12)] py-4 text-base text-[#e8e0d0] transition-colors hover:text-[#c9a84c] ${rtl ? 'ar-text' : 'font-[family-name:var(--font-display)] uppercase tracking-[0.14em]'}`}
              >
                {t.nav[n.key]}
              </a>
            ))}

            <div className="pt-8">
              <ImperialButton
                as="a"
                href="#concierge"
                variant="primary"
                size="lg"
                className={`w-full ${rtl ? 'ar-text' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {t.connect}
              </ImperialButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
