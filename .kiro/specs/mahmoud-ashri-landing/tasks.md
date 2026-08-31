# Implementation Plan — Mahmoud Ashri Personal Brand Landing Page

**Status header (trust this, not the checkboxes below):**

> ## ✅ SHIPPED AND LIVE — https://mahmoud-ashri.empireenglish.online
>
> **Phases 1–6a COMPLETE. Phase 6b (full Arabic route) COMPLETE. Phase 8 (audit
> remediation) COMPLETE.** All six PRs merged as of **2026-08-31**.
>
> Live: English at `/`, Arabic at `/ar/`. Deployed on Cloudflare Pages, custom domain
> resolving, TLS valid, Cloudflare Web Analytics active (edge-injected, zero bundle cost).
>
> **Nothing is blocked on engineering.** The three things outstanding all need the owner:
> 1. **Review the ~130 Arabic strings** in `src/i18n/content.ts` (owner is a native speaker)
> 2. **Re-export the four photographs larger** — all are below the ~1200px a panel wants,
>    so they are soft on retina. Drop into `photos-source/`, re-run `import_photos.py`
> 3. **Rotate the Cloudflare API token** — it was pasted into a chat log
>
> **Phase 7 (enhancements) remains a deliberate backlog**, not oversight — see its notes.
>
> Per standing ecosystem rule, checkbox state in a `tasks.md` is **not** a reliable progress
> signal. This header is.

---

## Session record — what actually shipped, in order

| PR | Delivered |
|---|---|
| **#1** | Scaffold, design system, all 12 sections, Concierge, SEO, verified build |
| **#2** | Both Instagram accounts wired and grouped by brand; deploy recorded |
| **#3** | Real OG share card; Arabic bilingual spine (Phase 6a) |
| **#4** | Domain typo corrected; Direct Line section; ambient audio; font trim |
| **#5** | Full Arabic locale at `/ar` with true RTL (Phase 6b) |
| **#6** | Audit remediation: caching, sitemap, branded 404, Arabic OG card (Phase 8) |

**Defects found in my own work and fixed during this session** — recorded because the
pattern matters more than the individual bugs:

1. A **privacy leak**: the business email's local part sat in plaintext in a JS chunk. The
   assembled address was absent but the surname was greppable.
2. **Two photographs transposed**, putting the Dubai skyline under "Authority is quiet".
   All four photos are the same man in the same suit, so the page rendered perfectly and
   simply meant the wrong thing.
3. **Duplicate hreflang** — manual `<link>` tags plus Next's metadata produced six per page.
4. **English left in the Arabic UI** — the audio invitation still read "Turn on the sound".
5. **Arabic OG card broken twice** — first by using legacy presentation forms a modern font
   does not contain, then by double-reversing the word order.

**Every one was caught by looking at rendered output, not by a green build.** Four of the
five would have passed CI indefinitely. That is the single most important lesson in this
spec: for a visual, bilingual page, *render it and look at it.*

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
- [x] 3.10 §10 `Concierge` — five intents, two-step, deep links
- [x] 3.10b §9b `DirectLine` — **added 2026-08-31 at the owner's request.** The fast path:
      WhatsApp, personal Telegram (`@macal_emperor`, distinct from the EEC announcement
      group), and both phone numbers, in the clear, zero clicks. Sits immediately BEFORE
      the Concierge because the two serve different intents — "I want to reach him" versus
      "I'm not sure which door is mine".
      **This reversed the earlier obfuscation of the phone numbers**, at the owner's
      explicit and repeated instruction. A deliberate, owner-owned trade: reach beats
      scrape-resistance. The cost is real (harvesting → spam) and is documented in
      `site.config.ts` so it reads as a known consequence later, not a mystery. The
      business email stays assembled-on-click — email harvesting is far more automated.
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
- [x] 5.5 ✅ **Custom domain LIVE.** Two-step story worth keeping:
      the first token was **Pages-scoped only**, which can create the Pages custom-domain
      binding but leaves it stuck `pending` **forever with no error**, because it cannot
      create the CNAME. Once the owner added `Zone:DNS:Edit` + `Zone:Read` (editing an
      existing token keeps the same secret, so nothing had to be re-sent), the record was
      created and Cloudflare validated it in ~3 minutes.
      **Then the hostname turned out to have a typo** — `mahmoud-ashr`, missing the final
      `i`. Corrected to `mahmoud-ashri.empireenglish.online`, all 8 referencing files
      updated, and the typo domain **unbound and its DNS record deleted** once the owner
      confirmed. Verified live: 200, valid TLS, ~240 ms.
- [x] 5.6 **Visually verified in a real browser** (first time — see the note below).
      Confirmed rendering: hero, Spine, Constellation (orbit + portrait), Proof
      (stats + kicker), Chapter I, and the two grouped Channels rows with both
      Instagram accounts. `body` background resolves to `rgb(10,10,10)`,
      `h1` = "MAHMOUD ASHRI", 10 body children.
- [x] 5.7 **Measured on the live site** rather than estimated: 472 KB total transfer over
      23 requests, DOMContentLoaded ~450–710 ms, hero image already preloaded by Next.
      A formally throttled-4G Lighthouse run has **not** been done — the numbers above are
      from an unthrottled headless browser, so treat them as a ceiling, not a 4G result.
- [x] 5.8 **Recorded in `empire-chronicle/SYSTEM-MAP.md` §16** (chronicle PR #136),
      then **corrected** in a follow-up once the hostname typo was fixed and the phone
      numbers became public — §16 had briefly described a deleted domain as live.
- [x] 5.9 **Cloudflare Web Analytics confirmed active** — edge-injected, so it adds zero
      JavaScript to the bundle. Verified in-browser: `beaconPresent: true`,
      `cfBeaconGlobal: true`. (The owner's screenshot never reached the session, so this
      was established empirically instead of by reviewing the setup screen.)

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

## Phase 6a — Arabic bilingual spine ✅ SHIPPED

English-first page, Arabic on the **load-bearing moments only**. A large share of the
audience are native Arabic speakers who are not yet fluent in English; the moments that
carry meaning and drive action must be readable by them.

- [x] 6a.1 Tajawal wired via `next/font` (`--font-tajawal`, `subsets: ['arabic','latin']`)
- [x] 6a.2 `.ar-text` / `.ar-sub` / `.ar-display` typographic system in `globals.css`
- [x] 6a.3 `<Arabic>` + `<ArabicSub>` — the only sanctioned way to render Arabic
- [x] 6a.4 All Arabic copy centralised in `src/i18n/ar.ts` (30 strings)
- [x] 6a.5 Arabic on: thesis, 7 section leads, all 5 Concierge intents, the EEC offer
      (lead + 3 pillars + CTA + honesty line), both footer disclaimers
- [x] 6a.6 `scripts/check_arabic.py` — automated guard, passes on source **and** export
- [x] 6a.7 Verified in a live browser: `dir=rtl`, `lang=ar`,
      `letter-spacing: normal`, `text-transform: none`, **Tajawal actually loaded**

### The three traps, and why they are enforced in code

1. **`letter-spacing` destroys Arabic.** Arabic letters *join*; this design tracks text
   0.06–0.35em, and that tracking pulls joined forms apart so words visibly **fracture**.
   `.ar-text` forces `letter-spacing: 0 !important`. This is the single most common way an
   Arabic layer looks broken, and a non-Arabic reader will not notice it in review.
2. **Arabic has no uppercase.** `text-transform: uppercase` is a silent no-op, so
   hierarchy in Arabic must come from weight and size — never caps.
3. **Cinzel and Playfair Display have ZERO Arabic glyphs.** Verified against their Google
   Fonts unicode-ranges: neither declares the `U+0600` block. Without Tajawal, Arabic
   silently falls back to the system UI font and the premium look collapses.

Plus the standing **bidi rule**: never an Arabic line with ≥2 embedded Latin tokens — the
bidirectional algorithm reorders them differently across browsers. `check_arabic.py`
enforces it, and also rejects Arabic hand-written inline in a `.tsx` instead of `ar.ts`.

## Phase 6b — full `/ar` route ✅ SHIPPED

Register: **Modern Standard Arabic**, confirmed with the owner. Formal, authoritative, and
it travels across both Egypt and the Gulf. Dialect would be warmer but would pick a side.
The register is **not mixed** anywhere — MSA headings with dialect buttons reads as careless
rather than friendly.

- [x] 6b.1 Two real routes sharing ONE set of components: `/` and `/ar/`, both rendering
      `PageBody` with a locale. Copy lives in one dictionary (`src/i18n/content.ts`) read
      through a `LocaleProvider` context
- [x] 6b.2 **Two root layouts** via route groups — `app/(en)/` and `app/(ar)/` — because
      `lang` and `dir` belong on `<html>` and only a root layout can own that element
- [x] 6b.3 Full Arabic parity across all twelve sections
- [x] 6b.4 Language toggle: a real link to a real URL, in the header
- [x] 6b.5 `hreflang` pair + `x-default`, canonical and `og:locale` per locale
- [x] 6b.6 Arabic WhatsApp prefills, per Concierge intent
- [x] 6b.7 RTL audit — no horizontal overflow; direction-sensitive details flipped
- [x] 6b.8 `check_arabic.py` extended to audit both exported pages

### Why two routes and not a toggle

`hreflang` needs distinct URLs to point at; an Arabic page has to be **shareable**, and
state is not shareable; and Arabic content can then actually rank for Arabic search demand,
which is large and entirely untapped for this audience.

### What made this more than a translation

- **The Arabic is not literal.** "Hold your wallet", "the long game" and "receipts" have no
  Arabic equivalent that lands, so those lines make the same *point* with Arabic idiom.
- **His name stays Latin on both pages.** It is a proper noun and the brand mark; an Arabic
  transliteration of his own name reads as a different person.
- **Numbers stay LTR and mono** inside the RTL document, with explicit `dir="ltr"`. A figure
  is not text to be mirrored.
- **Direction-sensitive details flip:** the tactical panel's accent rule (added
  `.tactical-rtl`), the doctrine border, the Concierge chevron, scroll-progress origin,
  photo-chapter alternation, and the audio control corner.

### Decided against: locale auto-detection

Detection informs a *suggestion* at most; it must never redirect. Many Arabic speakers run
English-language phones, so `navigator.language` reports `en-US` for exactly the
low-fluency learner this is for, while switching people who never asked. It also breaks
shared links, which matters when distribution *is* sharing.

### Defects caught during this phase

1. **Duplicate hreflang** — manual `<link>` tags in the shared head **plus** Next's
   `metadata.alternates` produced six per page. Metadata is now the single source.
2. **Stray Arabic hand-written in four `.tsx` files** (OG alt, WhatsApp greetings, country
   labels, JSON-LD `alternateName`). `check_arabic.py` flagged all four.
3. **Intent WhatsApp prefills were still English** on the Arabic page.
4. **The audio invitation still read "Turn on the sound"** in English — spotted in a
   screenshot of the live site, because `check_arabic.py` catches Arabic *leaking into* a
   `.tsx` but **not English failing to leave one.** That asymmetry is worth remembering.

## Phase 7 — Ambient audio ✅ SHIPPED (was 7.2)

Deliberately **not** a port of `empire-oracle`'s implementation, which attempts autoplay
and — when the browser blocks it, as all of them do — renders a full-screen "ACTIVATE
EXPERIENCE" interstitial. Defensible on a product a visitor already chose; on a landing
page converting cold traffic it is a tax paid in exactly the leads the page exists to
capture. It also fetched 2.2 MB with `preload="auto"` **before** the visitor consented.

- [x] 7.2.1 No autoplay, no interstitial, ever
- [x] 7.2.2 `preload="none"` — audio fetched only on opt-in
- [x] 7.2.3 Re-encoded: stripped an embedded 360×360 album-art JPEG from the source, then
      mono + loudness-normalised. **2,199 KB → 453 KB Opus** (743 KB mp3 fallback); the
      browser fetches exactly one
- [x] 7.2.4 Choice persisted in `localStorage`; declining is never re-asked
- [x] 7.2.5 One self-dismissing invitation after 5 s; auto-pause on tab blur
- [x] 7.2.6 Localised, and the control anchors to the reading-END corner (left under RTL)
- [x] 7.2.7 **Verified in a live browser:** `preload="none"`, `autoplay: false`,
      `paused: true`, and `performance.getEntriesByType('resource')` shows **zero**
      `/audio/` requests on load

> **A planned decision revised, and recorded.** The plan called for Web Audio `GainNode`
> ramps. `MediaElementSource` adds AudioContext lifecycle management (suspended states,
> iOS resume quirks) for no audible gain over a `requestAnimationFrame` ramp at ~16 ms
> steps — versus the 66 ms `setInterval` steps that make the product site's fade audibly
> steppy. Simpler won.

## Phase 8 — Audit remediation ✅ SHIPPED

Audited the **live** site rather than reasoning about the source. Accessibility came back
clean (0 images without alt, 0 unlabelled controls, 0 heading-level skips, `h1→h2→h3` in
order) and the hero image was already preloaded. Four real defects, three of them
unfinished edges of earlier work in this same spec.

- [x] 8.1 **Caching.** Pages defaults every asset to `max-age=14400, must-revalidate`.
      `/_next/static/*` filenames are content-hashed and cannot change without the URL
      changing, so a returning visitor was re-validating ~470 KB that could not have
      changed. `public/_headers` now makes hashed output `immutable` for a year and media
      30 days with `stale-while-revalidate`; HTML still must-revalidate so deploys appear
      immediately.
- [x] 8.2 **Audio content-type.** Pages sniffed the `.webm` container and served
      `video/webm`. It holds an Opus stream and no video; the correct type lets a browser
      skip allocating a video decode path.
- [x] 8.3 **Security headers** — free on a static site: `Referrer-Policy`,
      `X-Frame-Options`, CSP `frame-ancestors` (stops the page being framed and passed off
      as someone else's), `Permissions-Policy` denying APIs the page never uses, HSTS.
- [x] 8.4 **Sitemap omitted `/ar` entirely** — the Arabic route shipped linked, with
      correct hreflang, and absent from the sitemap. Both locales now listed with
      cross-declaring `xhtml:link` alternates.
- [x] 8.5 **404 was Next's default: black on WHITE.** On a gold-on-near-black site any
      mistyped or stale link — and there are some, since a typo hostname was briefly live
      — dropped visitors onto a stark white system error. Now branded and bilingual, since
      there is no locale context to know which language the visitor reads.
- [x] 8.6 **`/ar` previewed an ENGLISH OG card.** Now a mirrored Arabic card
      (`og-image-ar.jpg`, portrait right, text right-aligned).

> **The Arabic OG card took two attempts, and both failures are instructive.**
>
> 1. First used `arabic_reshaper` + `python-bidi`, which convert text into legacy **Arabic
>    Presentation Forms** (`U+FE70–FEFF`). Modern fonts — Tajawal included — implement
>    joining through OpenType GSUB on the **base** codepoints and do not contain that block
>    at all, so every glyph fell back to notdef and the card rendered as disconnected,
>    reversed letters. Pillow here is built with **raqm/HarfBuzz/FriBiDi** and shapes
>    Arabic natively from the original string — what a browser does, and the correct tool.
> 2. Then the word-wrap prepended each word to reverse the line by hand, which
>    **double-reversed** it. FriBiDi already reorders for display, so the output was
>    correctly-joined Arabic with its **words scrambled** — subtly wrong in a way that
>    still "looks Arabic" to a non-reader.
>
> `make_og_card.py` now refuses to write an Arabic card at all if raqm is unavailable: a
> broken card is worse than reusing the English one.

## Phase 9 — Remaining backlog (deliberate, not oversight)

**Owner-gated:**
- [ ] 9.1 **Re-export the four photographs larger.** All are below the ~1200 px a panel
      wants on a 2× display, so they are soft. Deliberately **not** upscaled — enlarging
      adds bytes, not detail. Drop full-size files into `photos-source/` under the same
      names and re-run `scripts/import_photos.py`. No code change needed.
- [ ] 9.2 **Review the ~130 Arabic strings** in `src/i18n/content.ts`. Register is MSA,
      confirmed with the owner. The owner is a native speaker and a better judge of tone.
- [ ] 9.3 **Rotate the Cloudflare API token** — it was pasted into a chat log.

**Engineering, ranked by measured value:**
- [ ] 9.4 **Photos → WebP.** Measured: 391 KB → ~243 KB (−38%), no visible loss. The
      largest remaining payload.
- [ ] 9.5 **Language toggle loses the reader's place** — it links to `/`, so someone
      reading the Doctrine in Arabic lands back at the hero. Preserve the section anchor.
- [ ] 9.6 Formal throttled-4G Lighthouse run to confirm LCP < 2.5 s (R-PERF-1).
- [ ] 9.7 Signature SVG path-draw divider — needs a signature asset from the owner.
- [ ] 9.8 TikTok/YouTube embed rail — adds third-party JS; measure LCP cost first.
- [ ] 9.9 Press/media kit download.

**Blocked on purpose:**
- [ ] 9.10 **Testimonials.** Still the single strongest possible addition to §5, and still
      blocked: none are verified. Fabricating social proof would violate R-BRD and the
      ecosystem's honesty discipline. Ships only with real, attributable quotes. A
      collection script was offered and the owner parked it for later — **that is a
      deliberate deferral, not a forgotten task.**

**Fixed, no longer applicable:** analytics (Phase 5.9) and the soundtrack (Phase 7) were
in this backlog and have shipped.

**Follow-up in another repo:** `empire-oracle` ships `@macals_empire_official` as its only
Instagram. The owner has asked that the old site not be changed, so **that divergence is
intentional, not drift** — do not "fix" it without asking.

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
- [x] JSON-LD + OG present (per-locale OG images)
- [x] No secrets in tracked files
- [x] Feature branch + PR, never a direct push to main

**Added after the original spec, and also met:**

- [x] Full Arabic locale at `/ar` with `<html lang="ar" dir="rtl">`; 94% Arabic by
      character count vs 16% on the English page
- [x] `scripts/check_arabic.py` passes on source **and** both exported pages, and fails if
      `/ar` ever drops below 2,000 Arabic characters
- [x] Exactly 3 hreflang links per page; canonical and `og:locale` correct per locale
- [x] Ambient audio fetches **zero bytes** unless opted into (verified in-browser)
- [x] Direct-contact section reachable in zero clicks
- [x] Immutable caching on content-hashed assets; 5 security headers live
- [x] Branded, bilingual 404
