import type { Metadata, Viewport } from 'next';
import { Cinzel, Playfair_Display, JetBrains_Mono, Tajawal } from 'next/font/google';
import './globals.css';
import { IDENTITY, CHANNELS, PROPERTIES } from '@/site.config';

/* ── Fonts ─────────────────────────────────────────────────────
 * `display: swap` + explicit fallbacks so a slow font fetch on Egyptian/UAE 4G
 * never blocks first paint or shifts layout (R-PERF-4).
 * ───────────────────────────────────────────────────────────── */

const cinzel = Cinzel({
  subsets: ['latin'],
  // 900 was declared and never used. 400 IS used — outline/ghost buttons and
  // the nav links inherit it — so it stays.
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
 * Arabic display face.
 *
 * Required, not optional: Cinzel and Playfair Display contain no Arabic glyphs at all
 * (verified against their Google Fonts unicode-ranges — neither declares the U+0600
 * block). Without a real Arabic face the Arabic layer silently renders in the system
 * UI font, which reads as cheap next to gold-on-black and undoes the whole aesthetic.
 *
 * Tajawal is geometric and modern, and sits naturally beside Cinzel without trying to
 * imitate it — which is the right relationship between two scripts on one page.
 */
const tajawal = Tajawal({
  // Arabic subset ONLY. Tajawal never renders Latin on this page — the bidi rule
  // keeps Latin out of Arabic strings — so shipping its latin subset was ~20 KB
  // of font nobody ever sees. Weight 500 was also declared and never used.
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-tajawal',
  display: 'swap',
  fallback: ['Segoe UI', 'Tahoma', 'sans-serif'],
});

/* ── Metadata (R-SEO-1/2) ──────────────────────────────────── */

const TITLE = `${IDENTITY.name} — Founder, Operator, Mentor | ${IDENTITY.company}`;
const DESCRIPTION =
  "Founder of Empire English Community and CEO of MACAL Empire. I build systems that turn potential into power — a six-level English curriculum, a live learning engine, and the discipline to run them. This is not a portfolio.";

export const metadata: Metadata = {
  metadataBase: new URL(IDENTITY.url),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: IDENTITY.company,
  authors: [{ name: IDENTITY.name, url: IDENTITY.url }],
  creator: IDENTITY.name,
  publisher: IDENTITY.company,
  keywords: [
    'Mahmoud Ashri',
    'MACAL Empire',
    'Empire English Community',
    'English learning system',
    'CEFR English course',
    'AI mentor',
    'life coach Dubai',
    'founder Dubai',
    'learn English Arabic speakers',
    'business coach Egypt UAE',
  ],
  alternates: { canonical: IDENTITY.url },
  openGraph: {
    type: 'website',
    url: IDENTITY.url,
    siteName: IDENTITY.company,
    title: TITLE,
    description: DESCRIPTION,
    locale: 'en_US',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${IDENTITY.name} — ${IDENTITY.company}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/favicon.svg' }],
  },
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

/* ── Structured data (R-SEO-3) ─────────────────────────────── */

function StructuredData() {
  const sameAs = CHANNELS.map((c) => c.url);

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${IDENTITY.url}/#person`,
        name: IDENTITY.name,
        alternateName: 'Mahmoud Nasser Ashri',
        url: IDENTITY.url,
        jobTitle: 'Founder & Chief Executive Officer',
        description: DESCRIPTION,
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
        sameAs,
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
        alternateName: IDENTITY.platformShort,
        description:
          'Empire English Community — a six-level (CEFR A1–C2) English learning system built around mindset first and mechanics second. CEFR-aligned; not a certifying body.',
        url: PROPERTIES.root,
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${playfair.variable} ${mono.variable} ${tajawal.variable}`}
    >
      <head>
        <StructuredData />
      </head>
      <body className="antialiased">
        <a
          href="#spine"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-[#c9a84c] focus:px-4 focus:py-2 focus:font-bold focus:text-[#0a0a0a]"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
