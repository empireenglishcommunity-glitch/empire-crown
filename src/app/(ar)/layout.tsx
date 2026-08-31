import type { Metadata, Viewport } from 'next';
import '../globals.css';
import { DocumentShell } from '../shared-layout';
import { IDENTITY } from '@/site.config';
import { getContent } from '@/i18n/content';

const t = getContent('ar');
const TITLE = t.meta.title;
const DESCRIPTION = t.meta.description;

/**
 * ARABIC root layout — owns `<html lang="ar" dir="rtl">`.
 *
 * The second of two root layouts. This is why the Arabic page genuinely mirrors rather
 * than merely containing right-aligned text: `dir="rtl"` on the document flips every
 * logical property, flex direction and scroll axis in one place.
 *
 * Keywords are Arabic search terms, which is the point of having this route at all —
 * Arabic search demand for learning English is very large and entirely untapped here.
 */


export const metadata: Metadata = {
  metadataBase: new URL(IDENTITY.url),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: IDENTITY.company,
  authors: [{ name: IDENTITY.name, url: IDENTITY.url }],
  creator: IDENTITY.name,
  publisher: IDENTITY.company,
  keywords: t.meta.keywords,
  alternates: {
    canonical: `${IDENTITY.url}/ar/`,
    languages: {
      en: `${IDENTITY.url}/`,
      ar: `${IDENTITY.url}/ar/`,
      'x-default': `${IDENTITY.url}/`,
    },
  },
  openGraph: {
    type: 'website',
    url: `${IDENTITY.url}/ar/`,
    siteName: IDENTITY.company,
    title: TITLE,
    description: DESCRIPTION,
    locale: 'ar_AE',
    alternateLocale: ['en_US'],
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: t.meta.ogAlt,
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

export default function ArabicRootLayout({ children }: { children: React.ReactNode }) {
  return <DocumentShell locale="ar">{children}</DocumentShell>;
}
