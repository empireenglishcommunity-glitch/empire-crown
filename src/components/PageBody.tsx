import { AmbientAudio } from '@/components/AmbientAudio';
import { ParticleField } from '@/components/ParticleField';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { GoldDivider } from '@/components/ui';
import { LocaleProvider } from '@/i18n/LocaleProvider';
import type { Locale } from '@/i18n/types';

import { VaultHero } from '@/components/sections/VaultHero';
import { Spine } from '@/components/sections/Spine';
import { RoleConstellation } from '@/components/sections/RoleConstellation';
import { Wings } from '@/components/sections/Wings';
import { Proof } from '@/components/sections/Proof';
import { EcosystemMap } from '@/components/sections/EcosystemMap';
import { PhotoChapters } from '@/components/sections/PhotoChapters';
import { EmpireEnglish } from '@/components/sections/EmpireEnglish';
import { Doctrine } from '@/components/sections/Doctrine';
import { DirectLine } from '@/components/sections/DirectLine';
import { Concierge } from '@/components/sections/Concierge';
import { Channels } from '@/components/sections/Channels';

/**
 * The page body, shared by BOTH locales.
 *
 * `/` renders it with locale="en" and `/ar/` with locale="ar". One composition, two
 * routes — so a structural change lands on both pages at once and they cannot drift.
 *
 * ── The section order is an ARGUMENT, and arguments have order (R-STR-2) ──
 *
 *   1  Vault         stop the scroll
 *   2  Spine         state the claim
 *   3  Constellation resolve ten identities into one
 *   4  Wings         give each cluster a job
 *   5  Proof         ← the pivot. Above it earns belief; below it spends belief.
 *   6  Ecosystem     show the wiring
 *   7  Chapters      humanise
 *   8  Empire English the offer
 *   9  Doctrine      how he thinks
 *   9b DirectLine    the fast path — real numbers, zero clicks
 *  10  Concierge     route the undecided
 *  11  Channels      follow
 *  12  Footer        identity + honest disclaimers
 *
 * Do not reorder without re-reading design.md §1.1. Moving Proof later breaks the page:
 * the emotional turn has to land before the offer.
 *
 * DirectLine sits immediately before Concierge deliberately. Someone who already knows
 * they want to reach Mahmoud should not have to answer a routing question first, and
 * everyone still deciding is caught by the Concierge right after.
 */
export function PageBody({ locale }: { locale: Locale }) {
  return (
    <LocaleProvider locale={locale}>
      <ParticleField />
      <AmbientAudio />
      <SiteHeader />

      <main className="relative z-10">
        <VaultHero />
        <Spine />

        <GoldDivider />
        <RoleConstellation />

        <GoldDivider />
        <Wings />

        <GoldDivider />
        <Proof />

        <GoldDivider />
        <EcosystemMap />

        <GoldDivider />
        <PhotoChapters />

        <GoldDivider />
        <EmpireEnglish />

        <GoldDivider />
        <Doctrine />

        <GoldDivider />
        <DirectLine />

        <GoldDivider />
        <Concierge />

        <GoldDivider />
        <Channels />
      </main>

      <SiteFooter locale={locale} />
    </LocaleProvider>
  );
}
