import { PageBody } from '@/components/PageBody';

/**
 * Arabic route — /ar/
 *
 * Metadata, `<html lang="ar" dir="rtl">` and hreflang are owned by the (ar) root
 * layout. Structure and section order live in PageBody, shared with the English route,
 * so the two pages cannot drift apart.
 */
export default function ArabicHome() {
  return <PageBody locale="ar" />;
}
