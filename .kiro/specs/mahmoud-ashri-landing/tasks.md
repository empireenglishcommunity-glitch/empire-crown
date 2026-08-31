# Implementation Plan — Mahmoud Ashri Personal Brand Landing Page

**Status header (trust this, not the checkboxes below):**

> **Phases 1–4 COMPLETE. Phase 5 is LIVE except DNS.**
> The site is deployed and visually verified at **https://empire-crown.pages.dev**.
> Real photographs are imported; both Instagram accounts are wired.
> **One thing is outstanding and it needs the owner:** the custom domain
> `mahmoud-ashr.empireenglish.online` is attached to the Pages project but cannot
> validate until a `CNAME mahmoud-ashr → empire-crown.pages.dev` DNS record exists — the
> supplied API token was Pages-scoped, with no DNS permission. See task 5.5.
> **Phase 6 (Arabic) and Phase 7 (enhancements) are specified but not started.**
>
> Per standing ecosystem rule, checkbox state in a `tasks.md` is **not** a reliable progress
> signal. This header is.

---

## Phase 1 — Foundation

- [x] 1.1 Scaffold Next.js 15 + TypeScript, `output: 'export'`, `images.unoptimized`
- [x] 1.2 Tailwind v4 via `@theme inline`; PostCSS wiring
- [x] 1.3 Fonts: Cinzel, Playfair Display, JetBrains Mono via `next/font/google`, `display: swap`
- [x] 1.4 Full colour/type/motion token set in `globals.css` (per `design.md` §2–4)
- [x] 1.5 `useReducedMotion` + `useCountUp` hooks
- [x] 1.6 ESLint clean; `npm run build` green
- [x] 1.7 `site.config.ts` — every contact, handle and link in ONE typed place

> 1.7 matters more than it looks. Contact details scattered through JSX is how a page ends up
> with a stale phone number in three places. One config object, one edit.

## Phase 2 — Design system primitives

- [x] 2.1 `MetallicCard`, `GlowingBorder`, `ImperialButton`
- [x] 2.2 `SectionShell`, `Kicker`, `GoldDivider`
- [x] 2.3 `ParticleField` — canvas, capped particle count, pauses off-screen, off under reduced motion
- [x] 2.4 Contrast audit: no `#8b7355` below 16px anywhere (R-A11Y-1)
- [x] 2.5 Global focus-visible gold ring

## Phase 3 — Sections

- [x] 3.1 §1 `VaultHero` — seam draw, panel split, hero CTAs
- [x] 3.2 §2 `Spine` — the governing sentence
- [x] 3.3 §3 `RoleConstellation` — 10 nodes, orbit, reframing line, keyboard + mobile fallback
- [x] 3.4 §4 `Wings` — four cards with absorbed roles and proof lines
- [x] 3.5 §5 `Proof` — verified stats only, count-up, honest footnote
- [x] 3.6 §6 `EcosystemMap` — interactive SVG, wire draw, expandable nodes
- [x] 3.7 §7 `PhotoChapters` — four panels, manifesto lines, parallax
- [x] 3.8 §8 `EmpireEnglish` — flagship offer + CEFR honesty line
- [x] 3.9 §9 `Doctrine` — six operating principles
- [x] 3.10 §10 `Concierge` — five intents, two-step, deep links, gated regional numbers
- [x] 3.11 §11 `Channels` — six social cards
- [x] 3.12 §12 `SiteFooter` — brand, taglines, disclaimers
- [x] 3.13 `SiteHeader` — sticky nav, scroll progress, persistent Concierge action

## Phase 4 — Assets, SEO, verification

- [x] 4.1 Placeholder photos at all four contractual paths + `docs/PHOTOS.md`
- [x] 4.2 M-crown emblem as inline SVG (no binary dependency, scales, themeable)
- [x] 4.3 Metadata: title, description, canonical, OG, Twitter card
- [x] 4.4 JSON-LD `Person` + `Organization` with full `sameAs`
- [x] 4.5 `robots.txt`, `sitemap.xml`, favicon, web manifest
- [x] 4.6 `scripts/derive_stats.py` — re-derives every published number on demand
- [x] 4.7 Production build + static export verified; gated contacts absent from `out/` HTML
- [x] 4.8 `README.md` + `.kiro/steering/` project rules

## Phase 5 — Deploy (OWNER-GATED)

- [x] 5.1 ~~**Owner:** commit the four real photographs over the placeholders~~ —
      **DONE 2026-08-31.** Owner uploaded four HEIC files to `main`; they are converted
      to the five web-ready assets by `scripts/import_photos.py`. Originals kept in
      `photos-source/` for reproducibility. See `docs/PHOTOS.md`.
      **Still open:** all four are below the ~1200px width target and will look soft on
      retina. Re-export larger and re-run the script.
- [x] 5.2 ~~**Owner:** confirm the canonical Instagram handle~~ — **RESOLVED 2026-08-31:**
      `@empireenglishcommunity` is canonical. `empire-oracle` now holds the stale
      `@macals_empire_official` and should be corrected in a follow-up PR.
- [x] 5.3 ~~**Owner:** supply `CLOUDFLARE_API_TOKEN`~~ — supplied 2026-08-31.
      **The token was Pages-scoped only** (no Zone permission), which matters for 5.5.
- [x] 5.4 **DEPLOYED 2026-08-31.** Pages project `empire-crown` created
      (production branch `main`), 49 files uploaded.
      **Live at https://empire-crown.pages.dev** → HTTP 200.
- [ ] 5.5 🟡 **Custom domain registered but PENDING.** The domain is attached to the Pages
      project, but it cannot validate because **no DNS record exists** and the supplied
      token had no `Zone:DNS:Edit` permission, so Cloudflare could not create one
      automatically. `mahmoud-ashr.empireenglish.online` does not resolve.
      **Fix (owner, ~30s):** Cloudflare → DNS for `empireenglish.online` → add
      `CNAME  mahmoud-ashr → empire-crown.pages.dev`, **Proxied**. The Pages domain then
      validates on its own within about a minute.
- [x] 5.6 **Visually verified in a real browser** (first time — see the note below).
      Confirmed rendering: hero, Spine, Constellation (orbit + portrait), Proof
      (stats + kicker), Chapter I, and the two grouped Channels rows with both
      Instagram accounts. `body` background resolves to `rgb(10,10,10)`,
      `h1` = "MAHMOUD ASHRI", 10 body children.
- [ ] 5.7 Lighthouse on throttled 4G — confirm LCP < 2.5s (R-PERF-1)
- [ ] 5.8 Record the new subdomain in `empire-chronicle/SYSTEM-MAP.md` — **do this once
      5.5 resolves**, so the map records a working hostname rather than a pending one.

> **A tooling trap worth recording.** The first screenshot of the live site came back
> **blank white**, and an in-page probe reported `document.body.children.length === 0`.
> Both were false: the headless browser CLI does **not** keep the page between separate
> invocations, so the probe and the screenshot were running against `about:blank`.
> `location.href` confirmed it. Navigate **and** capture inside a single invocation, and
> use a URL fragment (`/#proof`) rather than an in-page scroll — in-page scrolling does
> not survive between invocations either.
> Nearly logged a critical rendering bug against a site that was fine.

> 5.8 is not optional bookkeeping. An undocumented subdomain is how the ecosystem accumulated
> two shipped initiatives that appeared in no document.

## Phase 6 — Arabic (specified, not started)

- [ ] 6.1 `/ar` route with `dir="rtl"`, mirrored layout
- [ ] 6.2 Full Arabic copy for all twelve sections
- [ ] 6.3 Arabic display face (Tajawal or Cairo) — Cinzel has no Arabic coverage
- [ ] 6.4 Language toggle, persisted
- [ ] 6.5 Bidi check: no Arabic line with ≥2 embedded LTR tokens (R-I18N-2)
- [ ] 6.6 `hreflang` pair + per-locale OG

> 6.3 is the trap here. Cinzel simply has no Arabic glyphs, so an Arabic page inherits a
> fallback face and instantly looks cheap. The Arabic locale needs its own display face chosen
> deliberately, not a `font-family` swap.

## Phase 7 — Enhancements (backlog, deliberately deferred)

- [ ] 7.1 Signature SVG path-draw divider — needs a signature asset from the owner
- [ ] 7.2 Optional soundtrack, default OFF (asset exists in `empire-oracle`)
- [ ] 7.3 TikTok/YouTube live embed rail — adds third-party JS; measure LCP cost first
- [ ] 7.4 Testimonials — **blocked on purpose.** None are verified. Fabricating social proof
      would violate R-BRD and the ecosystem's honesty discipline. Ships only with real, attributable quotes.
- [ ] 7.5 Analytics — owner picks the tool; privacy-respecting only
- [ ] 7.6 Press/media kit download

---

## Definition of done (mirrors requirements.md §6)

- [x] `npm run build` — zero errors, zero lint errors
- [x] Static export self-contained in `out/`
- [x] All twelve sections in spec order
- [x] Constellation reframes for all ten roles, mouse + keyboard
- [x] Only R-PRF-3 verified numbers published; nothing from R-PRF-4 anywhere
- [x] Concierge routes five intents to working deep links
- [x] Gated contacts absent from exported HTML (grep-proven)
- [x] Build succeeds with placeholder photos
- [x] Reduced motion disables all motion, loses no content
- [x] Keyboard traversal with visible focus ring
- [x] JSON-LD + OG present
- [x] No secrets in tracked files
- [x] Feature branch + PR, never a direct push to main
