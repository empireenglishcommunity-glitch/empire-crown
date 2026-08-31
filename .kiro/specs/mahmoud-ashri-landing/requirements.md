# Requirements — Mahmoud Ashri Personal Brand Landing Page

**Spec status:** APPROVED — implementation in progress (Phases 1–4 built in the opening PR).
**Deploy target:** `mahmoud-ashri.empireenglish.online` (Cloudflare Pages, static export)
**Repo:** `empire-crown` — the founder/crown layer that sits above the product repos.

> Read this file with `design.md` (the visual + copy system) and `tasks.md` (the phased
> plan). Where they disagree, **this file wins on intent**, `design.md` wins on execution.

---

## 1. Purpose

One page that converts a cold visitor into a routed lead in under 90 seconds, while
establishing that Mahmoud Ashri operates a **real system**, not a personal brand collage.

### 1.1 The governing sentence

Every decision on this page is measured against the owner's own eight-second sentence:

> **"This is not a portfolio. It's an operating system for power and self-mastery, built and lived by one man."**

If a section does not advance that sentence, it does not ship.

### 1.2 The strategic problem this page solves

The owner holds ten public identities: model, influencer, CEO, founder (MACAL Empire),
founder (Empire English Community), trader, investor, social media manager, marketing
manager/specialist, AI mentor, life coach.

Listed flat, ten titles read as **scattered** — the exact opposite of the desired effect.
The page must make them read as **compounding**.

The resolution is already encoded in the brand name, per
`empire-nexus/content/brand/macal-brand-bible.md`:

> **MACAL = Multi-talented. Adaptive. Creative. Ambitious. Leader.**

Multi-talent is not a liability to be excused. It is the brand's stated thesis. The page
argues it as a **deliberate architecture**: one spine, four wings.

---

## 2. Audiences and their jobs-to-be-done

| # | Audience | Arrives from | Wants to know | Their exit |
|---|---|---|---|---|
| A1 | **Arabic-speaking English learner** (Egypt, UAE, Gulf) | TikTok, Instagram, YouTube | "Can this man actually get me to fluency?" | EEC / Telegram |
| A2 | **Brand / agency / collaborator** | LinkedIn, Instagram | "Is he professional, and does he have reach?" | Concierge → collab |
| A3 | **Mentorship / coaching prospect** | TikTok, referral | "Will he change how I operate?" | Concierge → mentorship |
| A4 | **Business peer, investor, operator** | LinkedIn, in person | "Is there substance behind the suit?" | Concierge → business |
| A5 | **Recruiter / media / event booker** | Search, direct link | "Who is this and what is verifiable?" | Concierge → media |

**R-AUD-1** The page MUST serve all five without a menu that forces a choice before the
value is established. Self-sorting happens **after** the proof, never before it.

---

## 3. Functional requirements

### 3.1 Structure

**R-STR-1** Single-page application, one route (`/`), with in-page anchor navigation.
**R-STR-2** Section order is fixed, because it is an argument and arguments have order:

| # | Section | The job it does |
|---|---|---|
| 1 | **The Vault** (hero) | Stop the scroll. Establish scale and seriousness. |
| 2 | **The Spine** | State the governing sentence. One claim, no hedging. |
| 3 | **The Constellation** | Resolve the ten identities into one center. |
| 4 | **The Four Wings** | Give each identity cluster a role and a proof. |
| 5 | **The Proof** | Verified numbers. Kill "he's all talk" outright. |
| 6 | **The Ecosystem** | Show the actual working architecture he owns. |
| 7 | **The Chapters** | Four photographs, four manifesto lines. Humanize. |
| 8 | **Empire English** | The flagship offer, with its honest framing. |
| 9 | **The Doctrine** | Operating principles. Show *how* he thinks. |
| 10 | **The Concierge** | Route the visitor. **Primary CTA.** |
| 11 | **The Channels** | Social proof + follow. Secondary CTA. |
| 12 | **Footer** | Identity, legal, honest disclaimers. |

**R-STR-3** The Concierge MUST be reachable at any scroll depth via a persistent control
(sticky header action and/or a floating action button), not only by scrolling to §10.

### 3.2 The Constellation (the harmony mechanism)

**R-CON-1** All ten roles MUST be presented as nodes arranged around a single center
occupied by the owner's portrait — a visual argument that the roles orbit one person
rather than competing for billing.
**R-CON-2** Selecting or hovering a node MUST reframe a single shared manifesto line to
that role's lens. The line changes; the center does not. That is the entire point.
**R-CON-3** MUST be fully operable by keyboard (tab to each node, Enter/Space to select)
and MUST expose the active role to assistive technology.
**R-CON-4** On viewports too narrow for a radial layout (< 768px), it MUST degrade to a
legible stacked or chip layout with the same reframing behaviour. It MUST NOT scroll
horizontally or overlap text.
**R-CON-5** With `prefers-reduced-motion: reduce`, orbital motion MUST stop. Content MUST
remain fully available.

### 3.3 The Proof (verified numbers)

**R-PRF-1** Every number displayed MUST be re-derived from source code before publication.
Numbers found only in documentation are **claims, not facts**, per standing ecosystem rule.
**R-PRF-2** Each stat MUST carry, in the repo, the exact command used to derive it. See
§7 of `design.md` for the recorded derivations.
**R-PRF-3** The following are verified and MAY ship:

| Stat | Value | Source |
|---|---|---|
| CEFR levels | 6 (A1–C2) | `content/{a1..c2}/` |
| Curriculum weeks | 90 | 10+12+14+16+18+20 |
| Content modules | 450 | 5 tracks × 90 weeks |
| Extended-listening segments | 465 | `content/*/broadcast/*.json` |
| Reading passages | 90 | `content/*/reading/*.json` |
| Comprehension questions | 360 | `questions[]` |
| Glossary entries | 360 | `glossary[]` |
| Can-do descriptors | 112 | `content/cefr/can_do.json` |
| Narrated speech clips | 9,360 | `scripts/speech-rendered.json` |
| Broadcast audio clips | 1,095 | `scripts/audio-manifest.json` |
| Automated tests | 1,370 across 113 files | `grep -c "def test_"` |
| Engine size | 44 modules / 34,777 lines | `src/*.py` |

**R-PRF-4** The following MUST NOT ship:
- **"630 passages"** — did not reproduce. Actual reading passages: **90**. Each file is one
  passage. This is exactly the class of error the derivation rule exists to catch.
- **"6,948 pages"** — not independently verified in this session. Do not publish unverified.
- **Student headcount.** The live figure is small and early. Next to a claim of leadership it
  *subtracts* credibility. Lead with system scale; never with headcount.
- **"The number one platform."** Unverifiable superlative. Discounted instantly by exactly
  the sophisticated visitor this page targets, and weaker than the true numbers.

**R-PRF-5** "Exclusive", "built different", and "no one else has this system" are permitted —
they are positioning, not measurable claims.

### 3.4 The Concierge (primary CTA)

**R-CNC-1** The Concierge is the page's primary conversion mechanism. It MUST ask what the
visitor needs **before** exposing any contact channel.
**R-CNC-2** It MUST offer exactly five intents, each routing to the correct channel:

| Intent | Routes to |
|---|---|
| Learn English with EEC | Telegram community + EEC assessment |
| Book a consultation | WhatsApp, pre-filled subject line |
| Business / collaboration | WhatsApp + business email |
| Mentorship & coaching | WhatsApp, pre-filled subject line |
| Media, speaking & press | Email (press), LinkedIn |

**R-CNC-3** WhatsApp links MUST use `wa.me` with a pre-filled, intent-specific message so
the owner can triage from the first line of the chat.
**R-CNC-4** No backend, no form handler, no database. Every route is a deep link. This keeps
the page a pure static export and adds zero running cost.
**R-CNC-5 (privacy)** Contact exposure MUST be tiered, because raw contact strings on a
public page are scraped within days:

| Tier | Channel | Exposure |
|---|---|---|
| Public | WhatsApp `+971 56 586 8882` | Deep link, obfuscated in markup |
| Public | `empireenglishcommunity@gmail.com` | EEC / general |
| Public | Telegram, TikTok ×2, Instagram, YouTube, LinkedIn, Facebook | Direct links |
| Gated | `m.nasserashri@gmail.com` | Business/press intents only |
| Gated | Egypt `+20 104 121 5787`, UAE `+971 50 703 9573` | Revealed on explicit click only |

**R-CNC-6** No contact string may appear as a plain crawlable `mailto:`/`tel:` in the initial
HTML for gated tier items. They MUST be assembled at interaction time.
**R-CNC-7** Every external link MUST carry `target="_blank"` and `rel="noopener noreferrer"`.

### 3.5 Photography

**R-PHO-1** Four owner-supplied photographs, each with a fixed narrative role:

| Slot | File | Scene | Manifesto line |
|---|---|---|---|
| 1 | `public/photos/chapter-01-diplomacy.jpg` | Standing before flags | "I represent something bigger than myself." |
| 2 | `public/photos/chapter-02-authority.jpg` | Seated, marble lobby | "Authority is quiet." |
| 3 | `public/photos/chapter-03-presence.jpg` | Event, crowd behind | "I move in rooms I was told I'd never enter." |
| 4 | `public/photos/chapter-04-vision.jpg` | Dubai skyline at dusk | "I build where the skyline is still going up." |

**R-PHO-2** Slot 4 doubles as the hero backdrop. Slot 2 doubles as the Constellation center.
**R-PHO-3** The build MUST NOT fail or render broken images when real photos are absent.
Committed placeholders occupy every path; the owner overwrites them in place. Filenames are
therefore **contractual** and MUST NOT be renamed.
**R-PHO-4** Every image MUST have descriptive alt text. Decorative treatments MUST be
`aria-hidden`.

### 3.6 Internationalisation

**R-I18N-1** Ship English first. Arabic is specified but sequenced to a later phase.
**R-I18N-2** Where Arabic appears in v1 (accent lines, section kickers), it MUST NOT place
two or more embedded LTR tokens inside one Arabic line — a standing ecosystem bidi rule.
**R-I18N-3** `<html lang>` MUST be correct, and any Arabic block MUST carry `dir="rtl"`.

---

## 4. Non-functional requirements

### 4.1 Performance
**R-PERF-1** LCP < 2.5s on a mid-tier Android over 4G (Egypt/UAE conditions). The audience
is not on fibre in San Francisco.
**R-PERF-2** Total initial JS < 200 KB gzipped.
**R-PERF-3** Hero image MUST be `priority`; every other image lazy-loaded.
**R-PERF-4** No layout shift from font swap — CLS < 0.1. Fonts via `next/font` with
`display: swap` and explicit fallbacks.
**R-PERF-5** No animation may run when off-screen.

### 4.2 Accessibility
**R-A11Y-1** WCAG 2.1 AA contrast for all text. Gold `#c9a84c` on `#0a0a0a` passes for large
text; small body copy MUST use cream `#e8e0d0` or a lightened gold, **never** muted gold
`#8b7355` below 16px.
**R-A11Y-2** Full keyboard operability with a visible gold focus ring on every interactive
element.
**R-A11Y-3** Every animation MUST respect `prefers-reduced-motion: reduce`.
**R-A11Y-4** Semantic landmarks and one `<h1>`. Section headings in order.
**R-A11Y-5** No information conveyed by colour alone.

### 4.3 Cost and infrastructure
**R-INF-1** Static export only. **No server, no database, no API route.** The ecosystem runs
under a hard ~$7/month ceiling and the Hetzner box is already saturated.
**R-INF-2** Cloudflare Pages. Zero incremental hosting cost.
**R-INF-3** Zero paid dependencies; no usage-capped SaaS.
**R-INF-4** No AI on any request path.

### 4.4 SEO
**R-SEO-1** Unique title + meta description; canonical URL.
**R-SEO-2** OG + Twitter card images (1200×630).
**R-SEO-3** JSON-LD `Person` schema with `sameAs` for every social profile, plus
`Organization` for MACAL Empire and EEC.
**R-SEO-4** `sitemap.xml` and `robots.txt`.

### 4.5 Brand compliance
Per `macal-brand-bible.md`, the following are **forbidden** and are treated as build-blocking
copy defects:

**R-BRD-1** No guaranteed returns, no performance figures, no implied financial advice. The
trader/investor identity is presented as *identity only* — own book, no signals, no managed
money, no returns. This is both brand law and the correct regulatory posture in the UAE.
**R-BRD-2** No jargon without immediate plain-language translation.
**R-BRD-3** No dense paragraphs. Short sentences, ideally under 20 words.
**R-BRD-4** No profanity, no attacks on individuals.
**R-BRD-5** Sections should close on a **kicker** — a short, sharp final line.
**R-BRD-6** EEC claims MUST stay "CEFR-aligned, not certified." Never imply accreditation.

---

## 5. Explicitly out of scope for v1

- Arabic locale (specified, Phase 6)
- Blog, newsletter, CMS
- Booking calendar integration
- Analytics (deliberate — no third-party tracker until the owner picks one)
- Testimonials (none verified yet; fabricating them would violate R-BRD and the ecosystem's
  honesty discipline)
- Background soundtrack (asset exists in `empire-oracle`; deferred, and would be default-OFF)

---

## 6. Acceptance criteria

The page is done when all of the following hold:

- [ ] `npm run build` completes with **zero** errors and zero lint errors.
- [ ] Static export produces a self-contained `out/` directory.
- [ ] All twelve sections render in the order given in R-STR-2.
- [ ] The Constellation reframes its manifesto line for all ten roles, by mouse **and** keyboard.
- [ ] Every published number appears in the R-PRF-3 verified table. Nothing from R-PRF-4 appears anywhere.
- [ ] The Concierge routes all five intents to correct, working deep links.
- [ ] Gated contacts are absent from the initial HTML source (`grep` the export to prove it).
- [ ] Placeholders exist at all four photo paths; the build succeeds without real photos.
- [ ] `prefers-reduced-motion` disables all motion with no loss of content.
- [ ] Keyboard-only traversal reaches every interactive element with a visible focus ring.
- [ ] JSON-LD validates; OG tags present.
- [ ] No secret, token, or credential in any tracked file.
- [ ] Shipped via feature branch + PR. Never a direct push to `main`.
