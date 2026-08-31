# empire-crown

**Mahmoud Ashri — personal brand landing page.**
The founder/crown layer that sits above the product repos in the Empire ecosystem.

> **This is not a portfolio. It's an operating system for power and self-mastery —
> built and lived by one man.**

| | |
|---|---|
| **Live target** | `mahmoud-ashr.empireenglish.online` |
| **Stack** | Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · framer-motion |
| **Hosting** | Cloudflare Pages — **static export**, zero running cost |
| **Spec** | [`.kiro/specs/mahmoud-ashri-landing/`](.kiro/specs/mahmoud-ashri-landing/) |

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export → ./out
npm run lint
```

## What this page is arguing

The owner holds ten public identities — founder, CEO, marketer, social media manager,
AI mentor, life coach, trader, investor, model, influencer. Listed flat, ten titles
read as **scattered**. The entire design problem was making them read as
**compounding** instead.

The resolution was already in the brand: **MACAL = Multi-talented. Adaptive. Creative.
Ambitious. Leader.** Multi-talent is the stated thesis, not a liability. So the page
argues it as deliberate architecture — one spine, four wings — and renders that
argument as an interactive control (the Constellation) rather than a paragraph.

### Section order is an argument

```
 1  The Vault          cinematic cold open
 2  The Spine          the governing sentence, alone on the page
 3  The Constellation  ten roles orbiting one centre  ← the harmony mechanism
 4  The Four Wings     each cluster gets a job and a proof
 5  The Proof          verified numbers               ← THE PIVOT
 6  The Ecosystem      the real system architecture
 7  The Chapters       four photographs, four manifesto lines
 8  Empire English     the flagship offer
 9  The Doctrine       six operating principles
10  The Concierge      intent router                  ← PRIMARY CTA
11  The Channels       follow
12  Footer             identity + honest disclaimers
```

**Do not reorder without reading `design.md` §1.1.** The emotional turn is at §5:
everything above it earns belief, everything below it spends belief. Moving the Proof
later breaks the page.

---

## Three rules that are not style preferences

### 1. Every published number is derived from source code

A number in a document is a claim. A number produced by counting the files behind it is
a fact. An internal doc in this ecosystem asserted **"630 passages"** for a long time;
the real count is **90** — each reading JSON is one passage, not seven. That would have
shipped onto a public page and been quotable back at the owner.

```bash
python3 scripts/derive_stats.py --nexus ../empire-nexus/bots/discord-learning-bot --dojo ../empire-dojo
```

Every stat in `src/site.config.ts` carries a `derivation` field. **No number ships
without one.** If the script and the config disagree, the config is wrong.

Also deliberately **not** published:
- **Student headcount** — currently small and early. Next to a leadership claim it
  *subtracts* credibility. Lead with system scale.
- **"The number one platform"** — an unverifiable superlative, discounted instantly by
  the sophisticated visitor this page targets, and strictly weaker than the real
  numbers. §8 says "the number one thing I've built", which is about the owner's own
  portfolio and therefore true.

### 2. Contact details are tiered

Six raw contact strings on a public page get scraped within days.

| Tier | What | How it is exposed |
|---|---|---|
| Public | WhatsApp, EEC email, all social links | Rendered as links |
| **Gated** | Business email, Egypt number, UAE number | **Assembled from parts at click time** |

The gated values never appear as complete strings in the exported HTML. This is
friction, not security — deliberately chosen over publishing the owner's personal
number in plain text. See `assembleEmail()` / `assemblePhone()` in `src/site.config.ts`.

Verify after any change:

```bash
npm run build
grep -ric "m\.nasserashri" out/ || echo "PASS — gated email absent from export"
```

### 3. Compliance copy is load-bearing

Per `empire-nexus/content/brand/macal-brand-bible.md`, whose forbidden list includes
*"no guaranteed returns — we educate, we don't sell fantasy"*:

- **No returns, no performance figures, no signals, no managed money.** The
  trader/investor identity is presented as identity only. This is both brand law and
  the correct regulatory posture in the UAE.
- **Empire English Community is "CEFR-aligned, not a certifying body."** This wording
  appears in §5, §8 and the footer. It is not padding — do not soften or remove it.

---

## Project layout

```
src/
  site.config.ts          SINGLE SOURCE for identity, contacts, channels, stats
  app/
    layout.tsx            fonts, metadata, JSON-LD, skip link
    page.tsx              section assembly (the argument's order)
    globals.css           design tokens, type scale, motion, reduced-motion
  lib/hooks.ts            useReducedMotion, useInViewOnce, useCountUp, useScrollProgress
  components/
    ui.tsx                Rise, Kicker, SectionShell, MetallicCard, GlowingBorder,
                          ImperialButton, GoldDivider, CrownEmblem
    ParticleField.tsx     ambient canvas, perf-hardened
    SiteHeader.tsx        sticky nav + persistent Concierge action
    SiteFooter.tsx        brand + disclaimers
    sections/             the twelve sections
public/
  photos/                 ← the four contractual photo paths (see photos/README.md)
scripts/
  derive_stats.py         re-derives every published number
  make_placeholders.py    regenerates placeholder art
```

**No contact string, handle or URL belongs in a component.** It goes in
`site.config.ts`. That is how a site avoids a stale phone number in three places.

## Design system

Inherited verbatim from `empire-oracle` (`assessment.empireenglish.online`) so the two
properties read as one empire.

| Token | Value |
|---|---|
| Base | `#0a0a0a` · cards `#111118` → `#1a1a2e` |
| Gold | `#c9a84c` · shimmer `#e8d48b` |
| Bronze / Fire / Silver | `#cd7f32` · `#ff6b35` · `#c0c0c0` |
| Body text | cream `#e8e0d0` |
| Display / Body / Data | Cinzel · Playfair Display · JetBrains Mono |

**Accessibility law:** muted gold `#8b7355` is an atmosphere colour for large text
only — it fails AA below 16px. It is never the colour of a sentence someone has to
read. The product site does this in a few places; that defect is not inherited here.

JetBrains Mono for numbers is a deliberate addition: §5 and §6 make an engineering
argument, and serif numerals undercut it.

## Deploying

```bash
npm run build
npx wrangler pages deploy out --project-name=empire-crown --branch=main
```

Then map the custom domain in the Cloudflare Pages project. Needs
`CLOUDFLARE_API_TOKEN` (permission: *Account · Cloudflare Pages · Edit*) — owner-supplied
per session, **never committed**.

**Merging is not deploying.** As with `empire-dojo`, the deploy is a separate command.

## Before going live

- [x] Real photographs imported (2026-08-31) — see `docs/PHOTOS.md`
- [x] Instagram handle confirmed: **`@empireenglishcommunity`** (2026-08-31). Follow-up:
      `empire-oracle` still ships `@macals_empire_official` and should be corrected there
- [ ] **Re-export the photographs at higher resolution.** All four are currently below
      ~1200px wide, so they look slightly soft on a retina display. Drop larger files
      into `photos-source/` under the same names and re-run the import script — no code
      change needed
- [ ] Replace `public/og-image.jpg` with a designed share card
- [x] **Deployed and visually verified** 2026-08-31 — https://empire-crown.pages.dev
- [ ] **Add the DNS record** so the custom domain works: Cloudflare → DNS for
      `empireenglish.online` → `CNAME  mahmoud-ashr → empire-crown.pages.dev`,
      **Proxied**. The Pages custom domain is already attached and will validate itself
      once the record exists
- [ ] Merge PR #1 so `main` matches what is deployed
- [ ] Record the subdomain in `empire-chronicle/SYSTEM-MAP.md` once DNS resolves
- [ ] Record the new subdomain in `empire-chronicle/SYSTEM-MAP.md`

## Contributing

Feature branch and a PR. **Never push to `main`.** Commit messages follow
`type(scope): description`.
