import { Cinzel, Playfair_Display, JetBrains_Mono, Tajawal } from 'next/font/google';
import { IDENTITY, CHANNELS, PROPERTIES } from '@/site.config';
import { getContent, ALT_NAMES } from '@/i18n/content';
import { dirFor, localePath, type Locale } from '@/i18n/types';

/**
 * The shared document shell for both locale root layouts.
 *
 * There are TWO root layouts — `app/(en)/layout.tsx` and `app/(ar)/layout.tsx` — because
 * `lang` and `dir` belong on `<html>`, and in the App Router only a root layout can own
 * that element. Route groups are the sanctioned way to have more than one.
 *
 * Setting them on a wrapper `<div>` instead does work for layout and for screen readers,
 * but leaves `<html lang="en">` on the Arabic page, which is a real signal to hand a
 * crawler incorrectly. Everything genuinely shared lives here so the two layouts stay
 * one line apart.
 *
 * A side benefit: two root layouts mean switching language is a full document load, not
 * a client transition. That is the correct behaviour here — the whole document
 * direction changes.
 */

/* ── Fonts ──
 * `display: swap` plus explicit fallbacks, so a slow font fetch on Egyptian or UAE 4G
 * never blocks first paint or shifts layout (R-PERF-4). */

const cinzel = Cinzel({
  subsets: ['latin'],
  // 900 was declared and never used. 400 IS used — outline/ghost buttons and the nav
  // links inherit it — so it stays.
  weight: ['400', '600', '700'],
  variable: '--font-cinzel',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  style: ['normal', 'italic'],
  fallback: ['Georgia', 'serif'],
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  fallback: ['ui-monospace', 'SFMono-Regular', 'monospace'],
});

/**
 * Arabic display face — required, not decorative.
 *
 * Cinzel and Playfair Display contain no Arabic glyphs at all (verified against their
 * Google Fonts unicode-ranges: neither declares the U+0600 block). Without a real
 * Arabic face the Arabic layer silently renders in the system UI font, which reads as
 * cheap beside gold-on-black.
 *
 * Arabic subset ONLY. Tajawal never renders Latin here — the bidi rule keeps Latin out
 * of Arabic strings — so shipping its latin subset was font nobody would ever see.
 */
const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-tajawal',
  display: 'swap',
  fallback: ['Segoe UI', 'Tahoma', 'sans-serif'],
});

export const FONT_VARS = `${cinzel.variable} ${playfair.variable} ${mono.variable} ${tajawal.variable}`;

/* ── Structured data (R-SEO-3) ── */

export function StructuredData() {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${IDENTITY.url}/#person`,
        name: IDENTITY.name,
        alternateName: [...ALT_NAMES.person],
        url: IDENTITY.url,
        jobTitle: 'Founder & Chief Executive Officer',
        knowsLanguage: ['en', 'ar'],
        knowsAbout: [
          'English language teaching',
          'CEFR curriculum design',
          'Educational technology',
          'Marketing strategy',
          'Artificial intelligence literacy',
          'Personal development coaching',
        ],
        worksFor: { '@id': `${IDENTITY.url}/#macal` },
        founder: [{ '@id': `${IDENTITY.url}/#macal` }, { '@id': `${IDENTITY.url}/#eec` }],
        sameAs: CHANNELS.map((c) => c.url),
      },
      {
        '@type': 'Organization',
        '@id': `${IDENTITY.url}/#macal`,
        name: IDENTITY.company,
        description:
          'MACAL Empire — Multi-talented. Adaptive. Creative. Ambitious. Leader. A holding identity spanning education, media and investment.',
        url: IDENTITY.url,
        founder: { '@id': `${IDENTITY.url}/#person` },
        slogan: IDENTITY.brandMotto,
      },
      {
        '@type': 'EducationalOrganization',
        '@id': `${IDENTITY.url}/#eec`,
        name: IDENTITY.platform,
        alternateName: [...ALT_NAMES.eec],
        description:
          'Empire English Community — a six-level (CEFR A1–C2) English learning system built around mindset first and mechanics second. CEFR-aligned; not a certifying body.',
        url: PROPERTIES.root,
        inLanguage: ['en', 'ar'],
        founder: { '@id': `${IDENTITY.url}/#person` },
        slogan: IDENTITY.eecTagline,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Static, developer-authored object — no user input reaches this string.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

/** The `<html>`/`<body>` shell, parameterised by locale. */
export function DocumentShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const t = getContent(locale);

  return (
    <html lang={locale} dir={dirFor(locale)} className={FONT_VARS}>
      <head>
        {/*
          hreflang is NOT emitted here. Each root layout declares it via
          `metadata.alternates.languages`, and Next renders those into <head>. Adding
          manual <link rel="alternate"> tags on top produced SIX hreflang links instead
          of three — a duplicate set that a crawler has to reconcile. Metadata is the
          single source; verified in the export.
        */}
        <StructuredData />
      </head>
      <body className="antialiased">
        <a
          href={`${localePath(locale)}#spine`}
          className={`sr-only focus:not-sr-only focus:absolute focus:top-4 focus:z-[100] focus:rounded focus:bg-[#c9a84c] focus:px-4 focus:py-2 focus:font-bold focus:text-[#0a0a0a] ${
            locale === 'ar' ? 'focus:right-4 ar-text' : 'focus:left-4'
          }`}
        >
          {t.skipToContent}
        </a>
        {children}
      </body>
    </html>
  );
}
