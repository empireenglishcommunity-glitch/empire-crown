import type { Metadata } from 'next';
import './globals.css';
import { CrownEmblem, ImperialButton } from '@/components/ui';
import { IDENTITY } from '@/site.config';
import { FONT_VARS } from './shared-layout';

/**
 * Branded 404.
 *
 * The default Next.js not-found page is black text on a WHITE background. On a site
 * that is otherwise gold-on-near-black, a mistyped URL — or any stale link, of which
 * there will be some, since a typo hostname was briefly live — dropped the visitor onto
 * a stark white system error. That is a jarring brand break at exactly the moment
 * someone is already slightly lost.
 *
 * Because this project uses TWO root layouts (route groups, so `lang`/`dir` can differ
 * per locale), there is no shared root layout for this file to inherit. A global
 * not-found must therefore render its own `<html>` and `<body>` — hence the fonts and
 * stylesheet import here rather than a `DocumentShell` reuse, which would drag locale
 * plumbing into a page that has no locale.
 *
 * Bilingual on purpose: a visitor who lands here may read either language, and we have
 * no locale context to tell us which.
 */
export const metadata: Metadata = {
  title: `Page not found | ${IDENTITY.company}`,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <html lang="en" className={FONT_VARS}>
      <body className="antialiased">
        <main className="flex min-h-[100svh] flex-col items-center justify-center px-6 py-24 text-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[min(760px,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(201,168,76,0.08)_0%,transparent_70%)]"
          />

          <div className="relative">
            <CrownEmblem size={72} className="mx-auto mb-8" />

            <p className="t-kicker mb-5 text-[#a08a63]">{IDENTITY.company}</p>

            <p
              className="font-[family-name:var(--font-data)] text-[clamp(3rem,12vw,6rem)] font-bold leading-none text-[#c9a84c] text-glow"
              aria-hidden="true"
            >
              404
            </p>

            <h1 className="t-display-m mt-6 text-[#e8e0d0]">This door doesn&rsquo;t open</h1>

            <p className="mx-auto mt-4 max-w-md font-[family-name:var(--font-body)] text-[15px] italic text-[#b8a88a]">
              The page you were looking for isn&rsquo;t here. Everything else still is.
            </p>

            <p
              lang="ar"
              dir="rtl"
              className="ar-text mx-auto mt-3 max-w-md text-[14px] text-[#a08a63]"
            >
              الصفحة التي تبحث عنها غير موجودة. أما بقية الإمبراطورية، فما زالت في مكانها.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <ImperialButton as="a" href="/" variant="primary" size="lg">
                Back to the Empire
              </ImperialButton>
              <ImperialButton as="a" href="/ar/" variant="outline" size="lg" className="ar-text">
                النسخة العربية
              </ImperialButton>
            </div>

            <div className="hairline mx-auto mt-12 w-24" aria-hidden="true" />
            <p className="mt-6 font-[family-name:var(--font-data)] text-[10px] uppercase tracking-[0.28em] text-[#7a6849]">
              {IDENTITY.brandMotto}
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}
