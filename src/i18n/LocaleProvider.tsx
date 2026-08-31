'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { getContent, type Dict } from './content';
import { isRtl, type Locale } from './types';

/**
 * Locale via context rather than prop-threading.
 *
 * Every section is already a client component, so context costs nothing and keeps
 * `page.tsx` readable: the route declares its locale once and the tree reads it. The
 * alternative — passing `locale` down through thirteen sections — adds noise to every
 * call site and makes it easy to forget one.
 */

type LocaleValue = {
  locale: Locale;
  t: Dict;
  rtl: boolean;
};

const LocaleContext = createContext<LocaleValue | null>(null);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <LocaleContext.Provider value={{ locale, t: getContent(locale), rtl: isRtl(locale) }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleValue {
  const ctx = useContext(LocaleContext);
  // Throw rather than silently defaulting to English — a section rendered outside the
  // provider would otherwise ship English copy onto the Arabic page and nobody would
  // notice until a reader complained.
  if (!ctx) throw new Error('useLocale must be used inside <LocaleProvider>');
  return ctx;
}

/**
 * Arabic must never inherit the design's letter-spacing (it fractures joined letters)
 * or its uppercase transforms (Arabic has no case). Sections apply this to any node
 * whose text comes from the dictionary.
 */
export function localeTextClass(rtl: boolean): string {
  return rtl ? 'ar-text' : '';
}
