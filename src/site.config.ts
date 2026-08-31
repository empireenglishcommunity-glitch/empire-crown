/**
 * SINGLE SOURCE OF TRUTH for identity, contacts, links and published statistics.
 *
 * Rule: no contact string, handle or URL may be hard-coded in a component. It goes
 * here. Contact details scattered through JSX is exactly how a site ends up with a
 * stale phone number in three places and nobody notices for a year.
 *
 * See requirements.md R-CNC-5 for the contact exposure tiers, and R-PRF-3 for why
 * every number below carries a `derivation`.
 */

export const IDENTITY = {
  name: 'Mahmoud Ashri',
  nameUpper: 'MAHMOUD ASHRI',
  company: 'MACAL EMPIRE',
  companyExpanded: 'Multi-talented. Adaptive. Creative. Ambitious. Leader.',
  platform: 'Empire English Community',
  platformShort: 'EEC',
  roleLine: 'FOUNDER · OPERATOR · MENTOR',
  locations: 'DUBAI · CAIRO',
  domain: 'mahmoud-ashr.empireenglish.online',
  url: 'https://mahmoud-ashr.empireenglish.online',

  /** The governing sentence. Every section is measured against this. */
  thesis:
    "This is not a portfolio. It's an operating system for power and self-mastery — built and lived by one man.",
  heroLead: "I don't collect titles. I build systems — then I live inside them.",

  /** Inherited brand lines — these already exist in the ecosystem, do not invent new ones. */
  brandMotto: 'DISCIPLINE · PURPOSE · POWER · LEGACY',
  eecTagline: 'Forged in Language. Crowned in Mastery.',
} as const;

/* ─────────────────────────────────────────────────────────────
 * CONTACTS — tiered exposure (R-CNC-5)
 *
 * `public`  → may be rendered as a link in the initial HTML
 * `gated`   → MUST be assembled at interaction time only. These are split into
 *             parts so the full string never appears in the exported HTML source,
 *             which is what stops the cheap scrapers.
 * ───────────────────────────────────────────────────────────── */

export const CONTACT = {
  /** Public — the primary channel. Same number for calls and WhatsApp. */
  whatsapp: {
    /** wa.me requires digits only, no +, no spaces. */
    digits: '971565868882',
    display: '+971 56 586 8882',
  },

  /** Public — general and EEC enquiries. */
  emailPublic: {
    user: 'empireenglishcommunity',
    domain: 'gmail.com',
    get address() {
      return `${this.user}@${this.domain}`;
    },
  },

  /**
   * Gated — business/press only. Stored base64-encoded and decoded on click.
   *
   * WHY ENCODED AND NOT JUST SPLIT: an earlier version stored the local part as the
   * plain string 'm.nasserashri'. The assembled address never appeared in the export,
   * but the username did — and a harvester grepping for the surname finds that just
   * as easily. Encoding means no email-shaped or name-shaped substring exists in the
   * bundle at all.
   *
   * This is NOT encryption and is not claimed to be. The threat model is automated
   * regex harvesters scraping static files, and against those it works. A determined
   * human reading the source will of course decode it in seconds — that is an
   * accepted trade, and the alternative (publishing the owner's personal address in
   * plain text) is strictly worse.
   */
  emailBusinessEncoded: {
    user: 'bS5uYXNzZXJhc2hyaQ==',
    domain: 'Z21haWwuY29t',
  },

  /** Gated — revealed only behind an explicit disclosure control. Same reasoning. */
  regionalEncoded: [
    { label: 'Egypt', encoded: 'KzIwIDEwNCAxMjEgNTc4Nw==' },
    { label: 'UAE', encoded: 'Kzk3MSA1MCA3MDMgOTU3Mw==' },
  ],
} as const;

/** Decode a gated value. Client-only — never call this during render. */
function decode(value: string): string {
  if (typeof window === 'undefined') return '';
  try {
    return window.atob(value);
  } catch {
    return '';
  }
}

/** Assemble the gated business email at interaction time. */
export function assembleEmail(parts: { user: string; domain: string }): string {
  const user = decode(parts.user);
  const domain = decode(parts.domain);
  return user && domain ? `${user}@${domain}` : '';
}

/** Reveal a gated phone number at interaction time. */
export function assemblePhone(encoded: string): string {
  return decode(encoded);
}

/* ─────────────────────────────────────────────────────────────
 * CHANNELS
 * ───────────────────────────────────────────────────────────── */

export type Channel = {
  id: string;
  platform: string;
  handle: string;
  url: string;
  reason: string;
  accent: string;
  primary: boolean;
};

export const CHANNELS: Channel[] = [
  {
    id: 'tiktok-eec',
    platform: 'TikTok — EEC',
    handle: '@empireenglishcommunity',
    url: 'https://www.tiktok.com/@empireenglishcommunity',
    reason: 'English that actually sticks. Daily.',
    accent: '#00f2ea',
    primary: true,
  },
  {
    id: 'tiktok-macal',
    platform: 'TikTok — MACAL',
    handle: '@macal.empire',
    url: 'https://www.tiktok.com/@macal.empire',
    reason: 'Discipline, business, and the long game.',
    accent: '#ff0050',
    primary: true,
  },
  {
    id: 'youtube',
    platform: 'YouTube',
    handle: '@empireenglishcommunity',
    url: 'https://www.youtube.com/@empireenglishcommunity',
    reason: 'Long-form. Where the real teaching lives.',
    accent: '#ff0000',
    primary: true,
  },
  {
    id: 'instagram',
    platform: 'Instagram',
    handle: '@empireenglishcommunity',
    url: 'https://www.instagram.com/empireenglishcommunity',
    reason: 'The visual record of the work.',
    accent: '#dc2743',
    primary: true,
  },
  {
    id: 'telegram',
    platform: 'Telegram',
    handle: 'Empire_English_Community',
    url: 'https://t.me/Empire_English_Community',
    reason: 'Announcements first. Community always.',
    accent: '#2aabee',
    primary: true,
  },
  {
    id: 'linkedin',
    platform: 'LinkedIn',
    handle: 'mahmoud-ashri',
    url: 'https://www.linkedin.com/in/mahmoud-ashri',
    reason: 'The professional file.',
    accent: '#0a66c2',
    primary: true,
  },
  {
    id: 'facebook',
    platform: 'Facebook',
    handle: 'Mahmoud Ashri',
    url: 'https://www.facebook.com/share/1D3FA3tHdN/',
    reason: 'The personal side of the empire.',
    accent: '#1877f2',
    primary: false,
  },
];

/** Product properties inside the ecosystem. */
export const PROPERTIES = {
  assessment: 'https://assessment.empireenglish.online',
  practice: 'https://practice.empireenglish.online',
  root: 'https://empireenglish.online',
} as const;

/* ─────────────────────────────────────────────────────────────
 * PUBLISHED STATISTICS (R-PRF-2/R-PRF-3)
 *
 * Every value below was re-derived from source code, not copied from a document.
 * `derivation` records how. Run `python3 scripts/derive_stats.py` to re-verify.
 *
 * DO NOT ADD A NUMBER HERE WITHOUT DERIVING IT FIRST. Documented counts in this
 * ecosystem have been wrong in both directions.
 * ───────────────────────────────────────────────────────────── */

export type Stat = {
  value: number;
  /** Rendered suffix, e.g. '+'. Empty for exact counts. */
  suffix?: string;
  label: string;
  sub?: string;
  derivation: string;
};

export const STATS_PRIMARY: Stat[] = [
  {
    value: 6,
    label: 'CEFR LEVELS',
    sub: 'A1 through C2, complete',
    derivation: 'content/{a1,a2,b1,b2,c1,c2}/ — six level directories',
  },
  {
    value: 90,
    label: 'CURRICULUM WEEKS',
    sub: 'Written week by week',
    derivation: '10+12+14+16+18+20 week files per level',
  },
  {
    value: 450,
    label: 'CONTENT MODULES',
    sub: 'Five tracks per level',
    derivation: '5 tracks (accent, broadcast, grammar, mediation, reading) x 90 weeks',
  },
  {
    value: 9360,
    label: 'NARRATED CLIPS',
    sub: 'Rendered, verified, live',
    derivation: "scripts/speech-rendered.json — count 9360 == len(clips) 9360",
  },
];

export const STATS_SECONDARY: Stat[] = [
  {
    value: 465,
    label: 'Extended-listening segments',
    derivation: 'sum of segments[] across content/*/broadcast/*.json',
  },
  {
    value: 112,
    label: 'Can-do descriptors',
    derivation: 'content/cefr/can_do.json — reception+production+interaction+mediation',
  },
  {
    value: 360,
    label: 'Comprehension questions',
    derivation: 'sum of questions[] across content/*/reading/*.json',
  },
  {
    value: 1095,
    label: 'Broadcast audio clips',
    derivation: 'len(scripts/audio-manifest.json)',
  },
  {
    value: 1370,
    label: 'Automated tests',
    derivation: 'grep -rho "def test_" tests/ | wc -l  (113 test files)',
  },
  {
    value: 34777,
    label: 'Lines of engine code',
    derivation: 'cat src/*.py | wc -l  (44 modules)',
  },
];
