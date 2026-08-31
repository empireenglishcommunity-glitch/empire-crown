import type { Metadata, Viewport } from 'next';
import '../globals.css';
import { DocumentShell } from '../shared-layout';
import { IDENTITY } from '@/site.config';
import { getContent } from '@/i18n/content';

const t = getContent('en');
const TITLE = t.meta.title;
const DESCRIPTION = t.meta.description;

/**
 * ENGLISH root layout — owns `<html lang="en" dir="ltr">`.
 *
 * One of two root layouts (see `app/(ar)/layout.tsx`). Route groups are how the App
 * Router permits more than one, and more than one is required here because `lang` and
 * `dir` belong on `<html>` and differ per locale.
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
    canonical: `${IDENTITY.url}/`,
    languages: {
      en: `${IDENTITY.url}/`,
      ar: `${IDENTITY.url}/ar/`,
      'x-default': `${IDENTITY.url}/`,
    },
  },
  openGraph: {
    type: 'website',
    url: `${IDENTITY.url}/`,
    siteName: IDENTITY.company,
    title: TITLE,
    description: DESCRIPTION,
    locale: 'en_US',
    alternateLocale: ['ar_AE'],
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

export default function EnglishRootLayout({ children }: { children: React.ReactNode }) {
  return <DocumentShell locale="en">{children}</DocumentShell>;
}
