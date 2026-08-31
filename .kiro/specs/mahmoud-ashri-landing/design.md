# Design — Mahmoud Ashri Personal Brand Landing Page

**Companion to** `requirements.md` (intent) and `tasks.md` (sequence).
This document is the single source of truth for **tokens, section architecture, and copy**.

> **Status: DELIVERED 2026-08-31.** Sections §13–§15 below were added *after* the original
> design and describe what actually shipped: the Direct Line block, the bilingual
> architecture, and the ambient-audio design. Copy now lives in
> **`src/i18n/content.ts`**, not in this document — the copy tables in §5 are the design
> record, the dictionary is the implementation. If they disagree, the dictionary is what
> visitors see.

---

## 1. Design thesis

> The assessment site (`assessment.empireenglish.online`) proves the *product* is serious.
> This page proves the *person* is.

It therefore inherits the assessment site's visual language exactly — same gold, same black,
same Cinzel — so a visitor moving between them feels **one empire, not two vendors**. Then it
pushes further in three ways the product site cannot:

1. **Cinematic entry.** The product site opens on a logo. This one opens on a *vault*.
2. **Interactive argument.** The Constellation and the Ecosystem Map *make a case*; they are
   not decoration.
3. **Photographic authorship.** Four portraits carrying four manifesto lines.

### 1.1 Emotional arc

| Scroll depth | Section | Intended feeling |
|---|---|---|
| 0% | The Vault | *"…who is this."* |
| 8% | The Spine | *"That's a real claim."* |
| 15% | The Constellation | *"Oh — it's all one thing."* |
| 30% | Four Wings | *"He's thought about this."* |
| 42% | The Proof | *"Wait. These are real numbers."* |
| 55% | The Ecosystem | *"He actually built this. Alone."* |
| 68% | The Chapters | *"I want to be in that room."* |
| 78% | Empire English | *"This is for me."* |
| 86% | The Doctrine | *"I think like this too — or I want to."* |
| 93% | The Concierge | *"I know exactly what to do next."* |

The turn is at **42%**. Everything before it earns the right to be believed; everything after
it spends that belief. If the Proof section is weak, the page fails regardless of its beauty.

---

## 2. Colour tokens

Inherited verbatim from `empire-oracle/src/app/globals.css` so the two properties are
pixel-consistent.

```
--empire-void        #000000   /* vault seam, deepest letterbox */
--empire-dark        #0a0a0a   /* page base */
--empire-card        #111118   /* card base */
--empire-charcoal    #1a1a2e   /* card gradient end, secondary surface */
--empire-metal       #16213e   /* cool metal accent */
--empire-midnight    #0c0c24   /* deep panel */

--empire-gold        #c9a84c   /* PRIMARY — headings, rules, focus */
--empire-gold-lit    #e8d48b   /* shimmer highlight */
--empire-bronze      #cd7f32   /* secondary accent */
--empire-fire        #ff6b35   /* tertiary / energy */
--empire-ember       #e74c3c   /* alert / rare emphasis */

--empire-cream       #e8e0d0   /* body text on dark — DEFAULT for small copy */
--empire-muted       #8b7355   /* muted gold — LARGE TEXT / >=16px ONLY (a11y) */
--empire-silver      #c0c0c0
```

### 2.1 Contrast law (R-A11Y-1)

| Pair | Ratio | Verdict |
|---|---|---|
| `#e8e0d0` on `#0a0a0a` | ~15.9:1 | ✅ any size |
| `#c9a84c` on `#0a0a0a` | ~8.2:1 | ✅ any size |
| `#8b7355` on `#0a0a0a` | ~4.6:1 | ⚠️ **≥16px only** |
| `#8b7355` on `#111118` | ~4.4:1 | ❌ **do not use for body copy** |

**Rule:** muted gold is an *atmosphere* colour for large italic pull-quotes and section
kickers. It is never the colour of a sentence a visitor must actually read. The assessment
site uses `#8b7355` for small body copy in places; that is a defect we do **not** inherit.

### 2.2 Wing accent mapping

Each of the Four Wings owns one accent, reused consistently in the Constellation, the Wings
cards, and the Ecosystem Map so colour becomes a wayfinding system.

| Wing | Accent | Token |
|---|---|---|
| The Architect | Gold `#c9a84c` | primary — the flagship |
| The Operator | Bronze `#cd7f32` | machinery |
| The Mentor | Fire `#ff6b35` | transformation |
| The Standard | Silver `#c0c0c0` | presence, restraint |

---

## 3. Typography

| Role | Family | Treatment |
|---|---|---|
| Display / headings | **Cinzel** (serif) | UPPERCASE, `letter-spacing: 0.08–0.2em`, weight 600–700 |
| Body / quotes | **Playfair Display** (serif) | regular + italic |
| Data / labels / counters | **JetBrains Mono** | uppercase micro-labels, tabular counters |

**Addition beyond the assessment site:** a monospace face for numbers and technical labels.
The Proof and Ecosystem sections make an engineering argument; serif digits undercut it.
Mono digits read as *measured*.

### 3.1 Scale

```
display-xl  clamp(2.75rem, 9vw, 7rem)     Cinzel 700  tracking .06em   — name in hero
display-l   clamp(2rem, 5.5vw, 3.75rem)   Cinzel 700  tracking .08em   — section titles
display-m   clamp(1.5rem, 3.5vw, 2.25rem) Cinzel 600  tracking .1em    — card titles
kicker      .6875rem–.8125rem             Mono 500    tracking .35em   — eyebrow labels
body-l      clamp(1.0625rem, 2vw, 1.25rem) Playfair   line-height 1.75 — lead paragraphs
body        1rem                          Playfair   line-height 1.7  — default
data        clamp(2.25rem, 6vw, 4rem)     Mono 700   tabular-nums     — counters
```

---

## 4. Motion system

| Name | Use | Spec |
|---|---|---|
`vault-open` | Hero reveal | seam scaleY 0→1 (900ms) → panels slide apart (1100ms, `cubic-bezier(.16,1,.3,1)`) |
`rise` | Section entry | y 28px→0, opacity 0→1, 600ms, stagger 90ms |
`orbit` | Constellation | 60s linear infinite rotation, counter-rotated labels |
`shimmer` | Gold text | background-position sweep, 3s linear infinite |
`glow-pulse` | Emphasis borders | box-shadow 5→20px, 3s ease-in-out |
`count-up` | Proof stats | 1.6s ease-out, triggered once on 40% viewport entry |
`draw` | Signature / map wires | `stroke-dashoffset` → 0, 1.4s ease-in-out |

### 4.1 Reduced motion (R-A11Y-3)

Under `prefers-reduced-motion: reduce`:
- `vault-open` → instant opened state
- `orbit` → static arrangement
- `count-up` → final value rendered immediately
- `draw` → fully drawn
- `shimmer`, `glow-pulse` → disabled
- All `rise` → opacity only, no translation

Implemented **both** in CSS (`@media (prefers-reduced-motion: reduce)`) and in JS (a
`useReducedMotion` hook gating framer-motion), because CSS alone cannot stop a JS counter.

---

## 5. Section architecture and copy

Copy below is **final** unless marked `[OWNER TO CONFIRM]`.

### §1 The Vault — hero

**Layout.** Full-viewport. `chapter-04-vision.jpg` (Dubai skyline) full-bleed, darkened to
~28% with a vertical gradient scrim. A 2px vertical gold seam at centre. On load: seam draws
top-to-bottom, then the two dark panels slide apart to reveal the content.

Content, centred:
- M-crown emblem, 88px
- Kicker: `MACAL EMPIRE · DUBAI · CAIRO`
- H1: **MAHMOUD ASHRI** (`display-xl`, gold shimmer)
- Sub: `FOUNDER · OPERATOR · MENTOR`
- Lead: *"I don't collect titles. I build systems — then I live inside them."*
- Buttons: **[ Enter the Empire ]** (primary → §10 Concierge) · **[ See the Proof ]** (outline → §5)
- Scroll cue: thin animated gold chevron

**Why a vault.** The visitor's first instinct on a personal site is "another link-in-bio."
A vault says: something is kept in here, and it was closed until you arrived.

### §2 The Spine

Full-width, near-black, minimal. One centred statement at `display-l`, gold, with generous
space. This is the governing sentence, stated plainly:

> **This is not a portfolio.**
> **It's an operating system for power and self-mastery —**
> **built and lived by one man.**

Kicker beneath, muted: `THE THESIS`

Nothing else in this section. The whitespace *is* the confidence.

### §3 The Constellation — the harmony mechanism

**Layout (≥768px).** `chapter-02-authority.jpg` in a 200px circular gold-ringed frame at
centre. Ten role nodes on two concentric orbits (inner r≈190px, outer r≈280px), slowly
rotating. Node labels counter-rotate to stay upright.

Beneath the constellation, a single reframing line in a fixed-height container (fixed so the
layout never jumps as text changes):

| Role | Orbit | Accent | Reframing line |
|---|---|---|---|
| Founder — EEC | inner | gold | "I built a six-level English system, week by week, and shipped every one." |
| CEO — MACAL Empire | inner | gold | "I run the company. The strategy, the stack, and the consequences are mine." |
| AI Mentor | inner | fire | "I teach people to command AI instead of being replaced by it." |
| Life Coach | inner | fire | "Fluency is a mindset problem wearing a grammar costume." |
| Marketing Strategist | inner | bronze | "I don't buy attention. I engineer reasons to pay attention." |
| Social Media Manager | outer | bronze | "Every channel I own, I built and I run. No agency, no ghost team." |
| Trader | outer | silver | "I trade my own book. I teach discipline — never signals." |
| Investor | outer | silver | "Capital protection first. Legacy second. Hype never." |
| Model | outer | silver | "Presence is a language. I'm fluent in that one too." |
| Influencer | outer | silver | "Influence isn't reach. It's what people do after they listen." |

Default line (nothing selected):

> **Ten roles. One operator. Zero contradictions.**
> *MACAL — Multi-talented. Adaptive. Creative. Ambitious. Leader.*

**Layout (<768px).** Portrait on top, roles as a two-column grid of tappable chips grouped by
wing accent. Same reframing line below. No orbit, no overlap.

**Why this works.** It converts the biggest liability — "he does too many things" — into the
page's most memorable interaction. The visitor doesn't *read* that the roles cohere; they
*operate* a control that demonstrates it. And the acronym proves it was the plan all along.

### §4 The Four Wings

Four cards, 2×2 on desktop. Each: accent-ringed icon, wing name in Cinzel, the roles it
absorbs as small mono chips, a two-sentence body, and a proof line.

**THE ARCHITECT** — gold — *Founder, CEO*
> I build the system before I sell the seat. Empire English Community is six CEFR levels,
> ninety weeks, and four hundred and fifty content modules — designed, written, and shipped.
> **Proof:** a working curriculum, a live assessment engine, and an audio pipeline of 9,360 clips.

**THE OPERATOR** — bronze — *Marketing manager, social media manager, AI mentor*
> Strategy is worthless if you can't run it yourself. I write the copy, cut the content, build
> the automation, and read the numbers. Then I teach the same stack to the people I mentor.
> **Proof:** every channel under this name was built and is run by one person.

**THE MENTOR** — fire — *AI mentor, life coach*
> Most people don't lack ability. They lack a system and a reason. I hand them both, then get
> out of the way.
> **Proof:** a method built on mindset first, mechanics second — the reason our students
> actually finish.

**THE STANDARD** — silver — *Model, influencer, trader, investor*
> You cannot teach a standard you don't hold. I trade my own capital, I show up on camera,
> and I walk into rooms I wasn't invited to.
> **Proof:** discipline is visible. That's the point of showing it.

Kicker close: *Four wings. One roof.*

### §5 The Proof — verified numbers

The pivot of the entire page. `tactical-panel` treatment, mono digits, count-up on entry.

Header kicker: `EVERY NUMBER RE-DERIVED FROM SOURCE CODE`
Title: **THE RECEIPTS**
Lead: *"Anyone can claim a system. Here is mine, counted."*

Primary row (large):

| Value | Label | Sub-label |
|---|---|---|
| 6 | CEFR LEVELS | A1 through C2, complete |
| 90 | CURRICULUM WEEKS | Written week by week |
| 450 | CONTENT MODULES | Five tracks per level |
| 9,360 | NARRATED CLIPS | Rendered, verified, live |

Secondary row (small):

| Value | Label |
|---|---|
| 465 | Extended-listening segments |
| 112 | Can-do descriptors |
| 360 | Comprehension questions |
| 1,095 | Broadcast audio clips |
| 1,370 | Automated tests |
| 34,777 | Lines of engine code |

Footnote, mono, muted:
> *Derived from source, not from a brochure. CEFR-aligned — not a certifying body.*

**Kicker:** *I don't ask you to trust me. I ask you to count.*

That footnote is doing real work: it pre-empts the "prove it" reflex *and* keeps the EEC
accreditation claim honest, as required by R-BRD-6.

### §6 The Ecosystem

An interactive SVG architecture diagram — the single most differentiating section on the page,
because it is a category error for a personal site to have one, and it's true.

Centre node: **MACAL EMPIRE**. Six connected nodes, wires drawn on scroll entry:

| Node | One-line description |
|---|---|
| **Empire English Community** | Six CEFR levels. The flagship. |
| **The Learning Engine** | A Discord system that teaches, tracks and promotes, daily. |
| **The Practice Site** | Thousands of generated pages of drills and reading. |
| **The Assessment Engine** | Adaptive placement across four skills. Anti-memorisation by design. |
| **The Audio Pipeline** | 9,360 clips, seven voices, pace-verified. |
| **The Broadcast Network** | TikTok, YouTube, Instagram, Telegram — owned and operated. |

Tapping a node expands its detail. Wires pulse gold on hover.

Title: **THE ARCHITECTURE**
Lead: *"Most people show you a logo wall. I'll show you the wiring."*
**Kicker:** *One operator. Six systems. Zero outsourcing.*

### §7 The Chapters — photography

Four full-bleed panels, alternating image side, each with a large Cinzel manifesto line and a
short body. Parallax on the image (disabled under reduced motion).

**I. DIPLOMACY** — `chapter-01-diplomacy.jpg`
> **"I represent something bigger than myself."**
> When you carry a name, you stop making decisions for yourself alone. Everything I build has
> to survive being looked at.

**II. AUTHORITY** — `chapter-02-authority.jpg`
> **"Authority is quiet."**
> The loudest man in the room is usually the one with the least to show. I'd rather the work
> did the talking.

**III. PRESENCE** — `chapter-03-presence.jpg`
> **"I move in rooms I was told I'd never enter."**
> Nobody handed me access. I built something worth letting in.

**IV. VISION** — `chapter-04-vision.jpg`
> **"I build where the skyline is still going up."**
> Dubai doesn't reward nostalgia. Neither do I. Build for the version of the world that's
> arriving.

### §8 Empire English Community

Title: **THE FLAGSHIP**
Lead: *"The number one thing I've built. Not a course — a system."*

Three pillars:
- **REAL ENGLISH** — Not exam tricks. The English that works in a meeting, an interview, a life.
- **RIGHT MINDSET** — We fix the fear first. Grammar is the easy half.
- **EXCLUSIVE SYSTEM** — Six levels, ninety weeks, one path. Built here. Available nowhere else.

Honesty line (R-BRD-6): *CEFR-aligned, not a certifying body. We measure ability, not attendance.*

CTAs: **[ Take the free placement test ]** → `assessment.empireenglish.online` ·
**[ Join the community ]** → Telegram

**Kicker:** *Your English isn't broken. Your system is.*

> Note: "the number one thing I've built" is a statement about *his own* portfolio — a
> permitted, honest use of the phrase. It deliberately replaces the unverifiable
> "the number one platform in the world" (R-PRF-4).

### §9 The Doctrine

Six operating principles, adapted from the brand bible's worldview. Two-column list, gold rule
between. This section makes the visitor feel *aligned*, which is what converts mentorship leads.

1. **Hard work beats hype.** Every time. No exceptions, no shortcuts, no seminars.
2. **If it sounds too good to be true, hold your wallet.** Especially in this market.
3. **Respect is earned in public and paid for in private.** Show up. Deliver. Repeat.
4. **Complexity is usually a hiding place.** If I can't explain it simply, I don't understand it yet.
5. **Own the mistake, fix it, move.** Excuses are just deferred costs.
6. **Legacy is what outlasts you.** I'm not building a following. I'm building a foundation.

**Kicker:** *You can have excuses. Or results. Not both.*

### §10 The Concierge — PRIMARY CTA

Two-step, no backend.

**Step 1** — Title: **HOW DO YOU WANT TO CONNECT?**
Lead: *"Tell me what you need. I'll be on the other end."*

Five intent cards:

| Icon | Intent | Sub-copy |
|---|---|---|
| 📘 | **Learn English** | Join EEC and start at your real level. |
| 📅 | **Book a consultation** | One conversation. Bring a real problem. |
| 🤝 | **Business & collaboration** | Brand deals, partnerships, ventures. |
| 🧭 | **Mentorship & coaching** | AI fluency, discipline, direction. |
| 🎤 | **Media & speaking** | Press, interviews, stages, panels. |

**Step 2** — the selected card expands to reveal only that intent's channels:

| Intent | Channels revealed |
|---|---|
| Learn English | Telegram community · Free placement test |
| Consultation | WhatsApp (pre-filled: *"Consultation request —"*) · EEC email |
| Business | WhatsApp (pre-filled: *"Business enquiry —"*) · business email (assembled) · LinkedIn |
| Mentorship | WhatsApp (pre-filled: *"Mentorship enquiry —"*) · EEC email |
| Media | business email (assembled) · LinkedIn · Instagram |

Regional numbers (Egypt, UAE) sit behind a **"Show regional numbers"** disclosure that
assembles the strings on click — never in the initial HTML (R-CNC-6).

**Kicker:** *One message is enough. Make it a real one.*

### §11 The Channels

Six social cards, each with platform accent, handle, and a one-line reason to follow.

| Platform | Handle | Reason |
|---|---|---|
| TikTok — EEC | `@empireenglishcommunity` | English that actually sticks. Daily. |
| TikTok — MACAL | `@macal.empire` | Discipline, business, the long game. |
| YouTube | `@empireenglishcommunity` | Long-form. Where the real teaching lives. |
| Instagram | `@empireenglishcommunity` | The visual record. |
| Telegram | `Empire_English_Community` | Announcements first. Community always. |
| LinkedIn | `mahmoud-ashri` | The professional file. |

Facebook appears as a smaller secondary link.

**Instagram handle — RESOLVED 2026-08-31.** `@empireenglishcommunity` is canonical, confirmed
by the owner. Note that the live assessment site (`empire-oracle`,
`src/components/empire/SocialMediaSection.tsx`) still ships `@macals_empire_official`, so
**that repo is now the one carrying a stale handle** — worth a follow-up PR against
`empire-oracle` so the two properties agree.

### §12 Footer

- M-crown emblem, **MACAL EMPIRE**
- `DISCIPLINE · PURPOSE · POWER · LEGACY` (from the existing brand asset)
- *Forged in Language. Crowned in Mastery.* (existing EEC tagline — ties the properties together)
- Honest disclaimers, small and unashamed:
  > Empire English Community is CEFR-aligned and is not a certifying body.
  > Trading and investing are personal activities. Nothing here is financial advice, an offer,
  > or a solicitation. No returns are promised or implied.
- © year MACAL EMPIRE

That disclaimer block is not legal boilerplate bolted on — per the brand bible's own forbidden
list ("no guaranteed returns — we educate, we don't sell fantasy"), stating it plainly is
**on-brand** and increases trust with audience A4.

---

## 6. Component inventory

| Component | Purpose | Origin |
|---|---|---|
`MetallicCard` | Base card surface | ported from empire-oracle |
`GlowingBorder` | Pulsing gold frame | ported |
`ImperialButton` | primary / outline / ghost | ported, extended with `ghost` |
`SectionShell` | `<section>` + heading + kicker + rise animation | new |
`GoldDivider` | Ornamental section break | ported (`SectionDivider`) |
`ParticleField` | Ambient gold motes, canvas, count-capped | ported, perf-hardened |
`Kicker` | Mono tracked eyebrow label | new |
`VaultHero` | §1 | new |
`RoleConstellation` | §3 — orbit + reframe | new |
`WingCard` | §4 | new |
`StatCounter` | §5 — count-up, tabular | new |
`EcosystemMap` | §6 — interactive SVG | new |
`PhotoChapter` | §7 | new |
`DoctrineList` | §9 | new |
`Concierge` | §10 — two-step router | new |
`ChannelCard` | §11 | new |
`SiteHeader` | Sticky nav + persistent Concierge action | new |
`SiteFooter` | §12 | ported/extended |
`useReducedMotion` | Motion gate | new |
`useCountUp` | Counter with reduced-motion bypass | new |

## 7. Recorded stat derivations (R-PRF-2)

Run from `empire-nexus/bots/discord-learning-bot`:

```bash
# 6 levels, 90 weeks, 450 modules
for L in a1 a2 b1 b2 c1 c2; do
  echo -n "$L: "; for d in content/$L/*/; do echo -n "$(basename $d)=$(ls $d|wc -l) "; done; echo
done
# → 10/12/14/16/18/20 weeks across 5 tracks = 90 weeks, 450 modules

# 465 broadcast segments, 90 passages, 360 questions, 360 glossary, 112 descriptors
# (see scripts/derive_stats.py in this repo)

# 1,370 tests / 113 files
grep -rho "^\s*def test_[a-zA-Z0-9_]*" tests/ | wc -l ; ls tests/*.py | wc -l

# 44 modules / 34,777 lines
ls src/*.py | wc -l ; cat src/*.py | wc -l
```

From `empire-dojo`:
```bash
python3 -c "import json;d=json.load(open('scripts/speech-rendered.json'));print(d['count'],len(d['clips']))"
# → 9360 9360
python3 -c "import json;print(len(json.load(open('scripts/audio-manifest.json'))))"
# → 1095
```

**Did not reproduce:** `630 passages`. Actual = 90; each reading JSON is a single passage with
`text`, `glossary[4]`, `questions[4]`. Recorded here so the wrong number does not return.

## 8. Deployment

Static export → Cloudflare Pages.

```bash
npm run build          # next build, output: 'export' → ./out
npx wrangler pages deploy out --project-name=empire-crown --branch=main
```

Then map `mahmoud-ashri.empireenglish.online` in the Pages project's custom-domain settings.
Requires `CLOUDFLARE_API_TOKEN` (owner-supplied per session, never committed) and account
`8c2ca895bd4e579be07d2fa6c9fdba7e` (an identifier, not a credential).

**Note:** as with `empire-dojo`, **merging is not deploying.** The deploy is a deliberate
separate command.


---

## 13. §9b THE DIRECT LINE — added 2026-08-31

**Why it exists alongside the Concierge.** The Concierge is a *router*: it asks what you
need, then reveals only the relevant channel. That is right for five audiences, but it
costs one interaction before any contact detail appears — and a visitor who already knows
they want to speak to Mahmoud should not have to answer a question first.

| Section | Serves |
|---|---|
| **DirectLine** (§9b) | *"I want to reach him."* Zero clicks. Numbers on screen. |
| **Concierge** (§10) | *"I'm not sure which door is mine."* Guided. |

Placed immediately **before** the Concierge, so the fast path is offered first and the
router catches everyone else.

**Layout.** `GlowingBorder` at high intensity around a bracketed `MetallicCard` — the
brightest thing in its neighbourhood, deliberately. Inside: two large channel cards
(WhatsApp in its own green, Telegram in its own blue — platform colour beats house gold
here, because recognisability *is* the affordance), a hairline, then the two phone numbers
as tap-to-call rows in house gold.

**Copy.** Kicker `NO FORMS · NO GATEKEEPERS`. Title **TALK TO ME DIRECTLY**.
Lead: *"You don't need an assistant, a form, or a funnel. Here are my actual numbers."*
Close: *"I read my own messages. Bring something real and you'll get a real answer."*

Phone numbers carry `dir="ltr"` even on the Arabic page — a number is not text to mirror.

## 14. BILINGUAL ARCHITECTURE

### Two routes, one composition

```
/      → PageBody locale="en"   (app/(en)/)
/ar/   → PageBody locale="ar"   (app/(ar)/ar/)
```

Copy in **one dictionary** (`src/i18n/content.ts`) read through a `LocaleProvider` context.
A second set of Arabic components was rejected: it doubles the places a layout bug must be
fixed, and the pages would drift within a month.

**Two root layouts** via route groups, because `lang` and `dir` belong on `<html>` and only
a root layout can own that element. A wrapper `<div dir="rtl">` works for layout and screen
readers but leaves `<html lang="en">` on the Arabic page — an incorrect signal handed to
crawlers. Shared shell in `app/shared-layout.tsx`.

Side benefit: two root layouts make a language switch a full document load, which is
correct when the entire document direction changes.

### Arabic typography is a second system, not a font

| Rule | Why | Enforced by |
|---|---|---|
| `letter-spacing: 0` | Arabic letters **join**; tracking fractures them | `.ar-text` + `check_arabic.py` |
| `text-transform: none` | Arabic has no case; `uppercase` is a silent no-op | `.ar-text` |
| **Tajawal** | Cinzel/Playfair contain **zero** Arabic glyphs (no `U+0600`) | `next/font`, arabic subset only |
| `line-height: 1.9` | Taller ascenders/descenders and diacritics | `.ar-text` |
| ≤1 embedded Latin token per line | Bidi reorders 2+ unpredictably per browser | `check_arabic.py` |

Hierarchy in Arabic therefore comes from **weight and size**, never caps and tracking.

### What is NOT translated

- **His name.** Proper noun and brand mark; a transliteration reads as a different person.
- **Numbers.** LTR, mono, `dir="ltr"`.
- **Platform names** (TikTok, LinkedIn) — the marks are the recognisable thing.

### Direction-sensitive details that flip

Tactical-panel accent rule (`.tactical-rtl`) · doctrine list border · Concierge chevron
(`→`/`←`) · scroll-progress transform origin · photo-chapter side alternation · audio
control corner · skip-link position · group-heading rule gradient.

### Register: MSA, and not mixed

Modern Standard Arabic throughout, confirmed with the owner. Formal, authoritative, travels
across Egypt and the Gulf. **Do not mix registers** — MSA headings with dialect buttons
reads as careless rather than friendly.

The Arabic is **not literal**: "hold your wallet", "the long game" and "receipts" are
rewritten to make the same point with Arabic idiom.

## 15. AMBIENT AUDIO

**Invitation, never a toll booth.** The product site attempts autoplay and, when blocked
(always, on a first visit), renders a full-screen interstitial. On a landing page that is a
conversion tax paid in exactly the leads the page exists to capture.

| Property | Value |
|---|---|
| Autoplay | **Never** |
| Gate / interstitial | **None** |
| `preload` | **`none`** — zero bytes unless opted into |
| Format | Opus **453 KB** (mp3 743 KB fallback); browser fetches one |
| Volume | 0.14, `easeInOutSine` ramp over 2.2 s via `requestAnimationFrame` |
| Persistence | `localStorage`; declining is never re-asked |
| Invitation | Once, after 5 s, self-dismissing at 14 s |
| Tab hidden | Auto-pause |
| Position | Reading-**end** corner (right LTR, left RTL) |

The source file contained an embedded 360×360 album-art JPEG; stripping it plus mono and
loudness normalisation took 2,199 KB → 453 KB.

`GainNode` was specified and **rejected in implementation**: `MediaElementSource` adds
AudioContext lifecycle management (suspended states, iOS resume quirks) for no audible gain
over a ~16 ms rAF ramp.

## 16. DELIVERY INFRASTRUCTURE

`public/_headers` — Pages defaults everything to `max-age=14400, must-revalidate`, which is
wrong in both directions.

| Path | Cache-Control |
|---|---|
| `/_next/static/*` | `max-age=31536000, immutable` (content-hashed) |
| `/photos/*`, `/audio/*` | `max-age=2592000, stale-while-revalidate=86400` |
| HTML | `max-age=0, must-revalidate` (deploys visible immediately) |

Plus a corrected `Content-Type: audio/webm; codecs=opus` (Pages sniffed the container and
said `video/webm`), and five security headers: `Referrer-Policy`, `X-Frame-Options`, CSP
`frame-ancestors`, `Permissions-Policy`, HSTS.

**404** is branded and bilingual. Because there are two root layouts, a global `not-found`
has no shared layout to inherit and must render its own `<html>`/`<body>`.

**OG cards are per-locale**: `og-image.jpg` and `og-image-ar.jpg` (mirrored — portrait
right, text right-aligned). Generating the Arabic one required Pillow's **raqm/HarfBuzz**
shaping; `arabic_reshaper` + `python-bidi` produce legacy presentation forms
(`U+FE70–FEFF`) that Tajawal does not contain, so every glyph fell back to notdef.
`make_og_card.py` refuses to write an Arabic card if raqm is unavailable.
