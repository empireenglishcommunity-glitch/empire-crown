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
  domain: 'mahmoud-ashri.empireenglish.online',
  url: 'https://mahmoud-ashri.empireenglish.online',

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
   * Personal Telegram — direct line to the owner.
   *
   * NOT the same thing as the Empire English announcement group. That group is a
   * broadcast channel for students; this is a one-to-one channel to Mahmoud. Keeping
   * them visually distinct matters, or people post questions into the announcements
   * feed and assume nobody read them.
   */
  telegramDirect: {
    handle: '@macal_emperor',
    url: 'https://t.me/macal_emperor',
  },

  /**
   * PUBLIC as of 2026-08-31, at the owner's explicit and repeated instruction.
   *
   * These were previously base64-assembled on click so no phone-shaped string existed
   * in the static export. The owner has asked that direct contact be *prominent*, and
   * obfuscation works directly against prominence — a number nobody can see until
   * they click is not a strong call to action.
   *
   * So this is a deliberate, owner-owned trade: reach beats scrape-resistance. The
   * cost is real and should be expected — published numbers get harvested, which
   * means spam calls and WhatsApp junk within weeks. Documented here so that when it
   * happens, it reads as a known consequence rather than a mystery.
   *
   * If it becomes a problem the fix is not to hide them again — it is a second SIM or
   * a WhatsApp Business number used as the public front door.
   */
  phones: [
    { label: 'UAE', display: '+971 50 703 9573', dial: '+971507039573' },
    { label: 'Egypt', display: '+20 104 121 5787', dial: '+201041215787' },
  ],

  /**
   * Still gated. The business/press inbox stays assembled-on-click because email
   * harvesting is far more automated than phone harvesting, and an address in the
   * clear on a public page attracts volume that a phone number does not.
   */
  emailBusinessEncoded: {
    user: 'bS5uYXNzZXJhc2hyaQ==',
    domain: 'Z21haWwuY29t',
  },
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

/** Build a wa.me deep link with a pre-filled, intent-specific first message. */
export function whatsappLink(subject: string): string {
  return `https://wa.me/${CONTACT.whatsapp.digits}?text=${encodeURIComponent(subject)}`;
}

/* ─────────────────────────────────────────────────────────────
 * CHANNELS
 * ───────────────────────────────────────────────────────────── */

/**
 * `brand` separates the two identities that share this page.
 *
 * There are genuinely two parallel account sets — the Empire English teaching brand and
 * the personal / MACAL Empire brand — and collapsing them into one list was wrong. A
 * learner looking for daily English lessons and a brand looking to collaborate want
 * different accounts, so the Channels section groups them and the Concierge routes each
 * intent to the right one.
 */
export type Channel = {
  id: string;
  platform: string;
  handle: string;
  url: string;
  reason: string;
  accent: string;
  primary: boolean;
  brand: 'eec' | 'personal';
};

export const CHANNELS: Channel[] = [
  /* ── Empire English Community — the teaching brand ── */
  {
    id: 'tiktok-eec',
    platform: 'TikTok',
    handle: '@empireenglishcommunity',
    url: 'https://www.tiktok.com/@empireenglishcommunity',
    reason: 'English that actually sticks. Daily.',
    accent: '#00f2ea',
    primary: true,
    brand: 'eec',
  },
  {
    id: 'instagram-eec',
    platform: 'Instagram',
    handle: '@empireenglishcommunity',
    url: 'https://www.instagram.com/empireenglishcommunity',
    reason: 'Lessons, wins, and the community in motion.',
    accent: '#dc2743',
    primary: true,
    brand: 'eec',
  },
  {
    id: 'youtube',
    platform: 'YouTube',
    handle: '@empireenglishcommunity',
    url: 'https://www.youtube.com/@empireenglishcommunity',
    reason: 'Long-form. Where the real teaching lives.',
    accent: '#ff0000',
    primary: true,
    brand: 'eec',
  },
  {
    id: 'telegram',
    platform: 'Telegram',
    handle: 'Empire_English_Community',
    url: 'https://t.me/Empire_English_Community',
    reason: 'Announcements first. Community always.',
    accent: '#2aabee',
    primary: true,
    brand: 'eec',
  },

  /* ── MACAL Empire / personal — the founder brand ── */
  {
    id: 'tiktok-macal',
    platform: 'TikTok',
    handle: '@macal.empire',
    url: 'https://www.tiktok.com/@macal.empire',
    reason: 'Discipline, business, and the long game.',
    accent: '#ff0050',
    primary: true,
    brand: 'personal',
  },
  {
    id: 'instagram-personal',
    platform: 'Instagram',
    handle: '@macals_empire_official',
    url: 'https://www.instagram.com/macals_empire_official',
    reason: 'The personal record. Rooms, work, and the standard.',
    accent: '#f09433',
    primary: true,
    brand: 'personal',
  },
  {
    id: 'linkedin',
    platform: 'LinkedIn',
    handle: 'mahmoud-ashri',
    url: 'https://www.linkedin.com/in/mahmoud-ashri',
    reason: 'The professional file.',
    accent: '#0a66c2',
    primary: true,
    brand: 'personal',
  },
  {
    id: 'facebook',
    platform: 'Facebook',
    handle: 'Mahmoud Ashri',
    url: 'https://www.facebook.com/share/1D3FA3tHdN/',
    reason: 'The personal side of the empire.',
    accent: '#1877f2',
    primary: false,
    brand: 'personal',
  },
];

/** Convenience lookups. Throw loudly rather than rendering a broken link. */
export function channel(id: string): Channel {
  const found = CHANNELS.find((c) => c.id === id);
  if (!found) throw new Error(`Unknown channel id: ${id}`);
  return found;
}

export const EEC_CHANNELS = CHANNELS.filter((c) => c.brand === 'eec');
export const PERSONAL_CHANNELS = CHANNELS.filter((c) => c.brand === 'personal');

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
