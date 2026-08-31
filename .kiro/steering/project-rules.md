---
inclusion: always
---

# empire-crown — project rules

Personal brand landing page for Mahmoud Ashri. **Live and shipped** — English at
`mahmoud-ashri.empireenglish.online`, Arabic at `/ar/`. Next.js static export → Cloudflare
Pages. Read `.kiro/specs/mahmoud-ashri-landing/` before changing anything structural; its
`tasks.md` status header is the reliable progress signal, not the checkboxes.

**Both locales render one composition** (`src/components/PageBody.tsx`) with copy from one
dictionary (`src/i18n/content.ts`). Never add a user-facing string to a component — add it
to the dictionary in **both** locales.

## 1. Never publish an underived number

Every statistic on this page must be reproducible by:

```bash
python3 scripts/derive_stats.py --nexus ../empire-nexus/bots/discord-learning-bot --dojo ../empire-dojo
```

Each entry in `STATS_PRIMARY` / `STATS_SECONDARY` in `src/site.config.ts` carries a
`derivation` field. Adding a stat without one is a defect, not a shortcut.

**The reason this rule exists:** an internal document asserted "630 passages" for
months. The real count is 90 — each reading JSON file is a single passage. Documented
counts in this ecosystem have been wrong in *both* directions. Derive, don't trust.

**Never publish:** student headcount (small and early — it subtracts credibility next
to a leadership claim), or any "number one / best / biggest" superlative about the
market. "The number one thing *I've* built" is fine; it is a claim about his own
portfolio.

## 2. Contact details live in one file, and some are gated

All contacts, handles and URLs go in `src/site.config.ts`. Never hard-code one in a
component.

**Changed 2026-08-31 at the owner's explicit, repeated instruction:** the UAE and Egypt
phone numbers and the personal Telegram are now rendered **in the clear**, prominently, in
the Direct Line section. Obfuscation works against prominence. This is an owner-owned trade
— reach beats scrape-resistance — and the expected cost (harvesting → spam) is documented in
`site.config.ts`. **Do not re-hide them.** If spam becomes a problem the remedy is a
WhatsApp Business number as the public front door.

The **business email remains gated**: stored base64-encoded and assembled at click time via
`assembleEmail()`, so the complete string never appears in the exported HTML. Email
harvesting is far more automated than phone harvesting. Do not "simplify" this into a plain
`mailto:` — the whole point is that harvesters scraping the static export get nothing.

After any change to the Concierge, re-verify:

```bash
npm run build && grep -ric "m\.nasserashri" out/ || echo "PASS"
```

## 3. Compliance copy is load-bearing, not padding

From `empire-nexus/content/brand/macal-brand-bible.md` (the forbidden list):

- **No guaranteed returns. No performance figures. No signals. No managed money.** The
  trader/investor identity is *identity only*. This is brand law and the correct
  regulatory posture in the UAE.
- **"CEFR-aligned, not a certifying body"** must remain in §5, §8 and the footer.
  Never imply accreditation.
- No jargon without plain-language translation. No dense paragraphs. No profanity.

Also from the bible: short sentences (under ~20 words), fragments are fine, and
sections close on a **kicker** — a short sharp final line. Use `<KickerClose>`.

**Voice caution:** the brand bible's folksy, hunting-analogy "Mike Baxter" register is
for the MACAL real-estate content engine. It clashes with this page's cinematic
gold-on-black register. Take the bible's *principles* (proof over posturing, plain
speech, kickers), not its analogies.

## 3b. Arabic is a second typographic system

Run `python3 scripts/check_arabic.py --export` after ANY Arabic change.

- **`letter-spacing` FRACTURES Arabic** — the letters join. `.ar-text` forces `0`.
- **Arabic has no uppercase** — `text-transform` is a no-op; use weight and size.
- **Cinzel/Playfair have ZERO Arabic glyphs** — Tajawal is mandatory, arabic subset only.
- **Never ≥2 embedded Latin tokens in one Arabic line** (bidi reorders unpredictably).
- **Never hand-write Arabic in a `.tsx`.** It goes in the dictionary.
- Register is **MSA** and must not be mixed with dialect.
- **His name is NOT translated.** Numbers stay `dir="ltr"` and mono.
- Do **not** auto-detect or auto-redirect locale. Detection may suggest; the visitor decides.

**Known gap in the guard:** it catches Arabic leaking *into* code but not English failing to
*leave* it. An English audio label reached the Arabic page and was caught only by looking at
a screenshot. **Render the page and look at it.**

## 3c. Audio must stay free

`preload="none"`, no autoplay, no interstitial. A visitor who ignores the control must
download **zero bytes** — verify with `performance.getEntriesByType('resource')`. Do not
"improve" this by preloading.

## 4. Accessibility rules that are already decided

- Muted gold `#8b7355` fails AA below 16px. **Never use it for small body copy.** Use
  cream `#e8e0d0`, or `#a08a63` for tracked micro-labels. The product site violates
  this; do not copy that.
- Every animation must respect `prefers-reduced-motion` in **both** CSS and JS. CSS
  alone cannot stop a `requestAnimationFrame` counter — gate it with
  `useReducedMotion()`.
- `useReducedMotion()` intentionally starts `true`. A user who asked for no motion must
  not get a burst of it on first paint.
- Every interactive element keyboard-reachable with the global gold focus ring.
- The Constellation is a `radiogroup` of real `<button>`s with an `aria-live` output.
  Keep it that way if you restyle it.

## 5. Architecture constraints (hard)

- **Static export only.** No server, no database, no API route, no server action. The
  ecosystem runs under a ~$7/month ceiling and the Hetzner box is saturated.
- Zero paid dependencies. No usage-capped SaaS. No AI on any request path.
- Performance budget: LCP < 2.5s on mid-tier Android over 4G. The audience is in Egypt
  and the UAE, not on fibre. Large photographs are the most likely way to break this —
  see `docs/PHOTOS.md`.

## 6. Photo paths are contractual

`public/photos/chapter-0{1..4}-*.jpg` are referenced directly in components. Renaming
one breaks a panel. Two do double duty: `chapter-02-authority.jpg` is also the
Constellation centre portrait, and `chapter-04-vision.jpg` is also the hero backdrop.

The build must always succeed with placeholders present. Never make the page depend on
an asset that might not be there.

## 7. Git workflow

Feature branch plus a PR, **never** a direct push to `main` — even for docs. Commit
messages use `type(scope): description`; branches use `component/description`.

Create PRs with `gh api repos/{owner}/{repo}/pulls -f title=... -f head=... -f base=main`.
The GraphQL-backed `gh pr create` fails in this sandbox.

Never commit a real secret. Removing it from HEAD does not remove it from history.

## 8. When this page and a product site change together

Deploy order matters across the ecosystem. If a link here depends on a route that does
not exist yet on `assessment.` or `practice.`, ship the product change first — this
page cannot guess which version is live.
