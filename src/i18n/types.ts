/**
 * Locale plumbing for the bilingual site.
 *
 * ARCHITECTURE DECISION
 * Two real routes (`/` and `/ar/`) sharing ONE set of section components, with copy
 * selected from a dictionary by locale. The alternative — a second set of Arabic
 * components — was rejected: it doubles the number of places a layout bug has to be
 * fixed, and the two pages would drift within a month.
 *
 * Two routes rather than a client-side toggle, because:
 *   - `hreflang` needs distinct URLs to point at
 *   - an Arabic URL has to be shareable; a toggle that lives in state is not
 *   - Arabic content can then actually rank for Arabic queries
 *
 * Static export emits `/index.html` and `/ar/index.html`. No server involved.
 */

export type Locale = 'en' | 'ar';

export const LOCALES: Locale[] = ['en', 'ar'];

/** Path prefix for a locale. English is the root; Arabic lives under /ar. */
export function localePath(locale: Locale, hash = ''): string {
  const base = locale === 'ar' ? '/ar/' : '/';
  return hash ? `${base}${hash}` : base;
}

export function isRtl(locale: Locale): boolean {
  return locale === 'ar';
}

/** `dir` attribute for a locale. */
export function dirFor(locale: Locale): 'ltr' | 'rtl' {
  return isRtl(locale) ? 'rtl' : 'ltr';
}

/**
 * Direction-aware helpers.
 *
 * Tailwind's logical utilities (`ps-`/`pe-`/`ms-`/`me-`) handle most cases, but a few
 * places in this design use explicit sides for visual composition (the tactical panel's
 * left rule, the doctrine list's left border, the chapter numeral plate). Those need to
 * flip, and these helpers make that explicit rather than scattering ternaries.
 */
export function startBorder(locale: Locale): string {
  return isRtl(locale) ? 'border-r-2 pr-5' : 'border-l-2 pl-5';
}

export function textStart(locale: Locale): string {
  return isRtl(locale) ? 'text-right' : 'text-left';
}
