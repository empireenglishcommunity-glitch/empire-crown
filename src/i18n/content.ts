/**
 * THE BILINGUAL CONTENT DICTIONARY — every string on the page, in both locales.
 *
 * One dictionary, two locales, one set of components. Adding a string means adding it
 * in both places, which is deliberate: a missing translation should be visible at the
 * type level, not discovered by a visitor.
 *
 * ─── ARABIC REGISTER: MODERN STANDARD ARABIC ────────────────────────────────
 * Confirmed with the owner. MSA reads as formal and authoritative, and travels across
 * both Egypt and the Gulf — the two markets. Dialect would feel warmer but would pick
 * a side. Do not mix registers: a page that is MSA in the headings and Egyptian in the
 * buttons reads as careless rather than friendly.
 *
 * ─── THE ARABIC IS NOT A LITERAL TRANSLATION ────────────────────────────────
 * Several English lines lean on idiom that dies in translation. "Hold your wallet",
 * "the long game", "receipts" have no equivalent that carries the same snap. Those are
 * rewritten to make the same *point* with an Arabic idiom, not transliterated. Where an
 * English line is already plain, the Arabic follows it closely.
 *
 * ─── HARD RULES (enforced by scripts/check_arabic.py) ───────────────────────
 * 1. No Arabic string may contain 2+ embedded Latin tokens — the bidi algorithm
 *    reorders them differently per browser. It looks fine in review and scrambles on a
 *    phone.
 * 2. Arabic renders only through <Arabic>/<ArabicSub> or a locale-aware component, so
 *    letter-spacing:0 and text-transform:none are always applied. Tracking FRACTURES
 *    joined Arabic letterforms.
 * 3. Never hand-write Arabic into a .tsx. It goes here.
 */

import type { Locale } from './types';

type Dict = {
  /* ── chrome ── */
  nav: { roles: string; proof: string; system: string; english: string; contact: string };
  connect: string;
  skipToContent: string;
  langSwitch: string;
  langSwitchAria: string;
  menuOpen: string;
  menuClose: string;

  /* ── §1 hero ── */
  hero: {
    kicker: string;
    roleLine: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };

  /* ── §2 spine ── */
  spine: { kicker: string; l1: string; l2: string; l3: string };

  /* ── §3 constellation ── */
  constellation: {
    kicker: string;
    title: string;
    lead: string;
    defaultTitle: string;
    acronym: string;
    hintDesktop: string;
    hintMobile: string;
    ariaGroup: string;
    roles: Record<string, { label: string; line: string }>;
  };

  /* ── §4 wings ── */
  wings: {
    kicker: string;
    title: string;
    lead: string;
    proofLabel: string;
    close: string;
    items: Record<string, { name: string; roles: string[]; body: string; proof: string }>;
  };

  /* ── §5 proof ── */
  proof: {
    kicker: string;
    title: string;
    lead: string;
    footnote: string;
    close: string;
    labels: Record<string, string>;
    subs: Record<string, string>;
  };

  /* ── §6 ecosystem ── */
  ecosystem: {
    kicker: string;
    title: string;
    lead: string;
    hub: string;
    hubSub: string;
    close: string;
    detail: string;
    closeDetail: string;
    nodes: Record<string, { name: string; short: string; detail: string }>;
  };

  /* ── §7 chapters ── */
  chapters: {
    kicker: string;
    title: string;
    lead: string;
    chapterWord: string;
    items: Record<string, { title: string; line: string; body: string; alt: string }>;
  };

  /* ── §8 empire english ── */
  eec: {
    kicker: string;
    title: string;
    lead: string;
    ctaTitle: string;
    ctaSub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    honesty: string;
    tagline: string;
    close: string;
    pillars: Record<string, { title: string; body: string }>;
  };

  /* ── §9 doctrine ── */
  doctrine: {
    kicker: string;
    title: string;
    lead: string;
    close: string;
    items: { title: string; body: string }[];
  };

  /* ── §9b direct line ── */
  direct: {
    kicker: string;
    title: string;
    lead: string;
    whatsapp: string;
    telegram: string;
    orCall: string;
    note: string;
  };

  /* ── §10 concierge ── */
  concierge: {
    kicker: string;
    title: string;
    lead: string;
    close: string;
    back: string;
    fallback: string;
    reveal: string;
    preferCall: string;
    ariaGroup: string;
    intents: Record<string, { label: string; sub: string }>;
    /** Pre-filled WhatsApp subject per intent, so Mahmoud can triage from line one. */
    waSubjects: Record<string, string>;
    routes: {
      whatsapp: string;
      placement: string;
      telegramCommunity: string;
      email: string;
      businessEmail: string;
      linkedin: string;
      instagramEec: string;
      instagramPersonal: string;
    };
  };

  /* ── §11 channels ── */
  channels: {
    kicker: string;
    title: string;
    lead: string;
    close: string;
    groupEec: string;
    groupEecNote: string;
    groupPersonal: string;
    groupPersonalNote: string;
    reasons: Record<string, string>;
  };

  /* ── §12 footer ── */
  footer: {
    properties: { english: string; placement: string; practice: string };
    cefr: string;
    finance: string;
    rights: string;
  };

  /* ── audio ── */
  audio: { invite: string; dismiss: string; on: string; off: string };

  /* ── document metadata + outbound message templates ── */
  meta: { title: string; description: string; keywords: string[]; ogAlt: string };
  /** Country labels for the Direct Line phone rows. */
  countries: { uae: string; egypt: string };
  /** Pre-filled first line of a WhatsApp message, in the reader's language. */
  whatsappGreeting: string;
};

/**
 * Localised names used in structured data (schema.org `alternateName`).
 * Kept here rather than inline in the layout so the Arabic guard's "no Arabic in a
 * .tsx" rule holds without exception.
 */
export const ALT_NAMES = {
  person: ['Mahmoud Nasser Ashri', 'محمود عشري'],
  eec: ['EEC', 'مجتمع إمباير إنجلش'],
} as const;

/* ═══════════════════════════════════════════════════════════════
 * ENGLISH
 * ═══════════════════════════════════════════════════════════════ */

const en: Dict = {
  nav: { roles: 'Roles', proof: 'Proof', system: 'System', english: 'English', contact: 'Contact' },
  connect: 'Connect',
  skipToContent: 'Skip to content',
  langSwitch: 'العربية',
  langSwitchAria: 'Switch to Arabic',
  menuOpen: 'Open menu',
  menuClose: 'Close menu',

  hero: {
    kicker: 'MACAL EMPIRE · DUBAI · CAIRO',
    roleLine: 'FOUNDER · OPERATOR · MENTOR',
    lead: "I don't collect titles. I build systems — then I live inside them.",
    ctaPrimary: 'Enter the Empire',
    ctaSecondary: 'See the Proof',
  },

  spine: {
    kicker: 'The Thesis',
    l1: 'This is not a portfolio.',
    l2: "It's an operating system for power and self-mastery",
    l3: '— built and lived by one man.',
  },

  constellation: {
    kicker: 'Ten Roles · One Operator',
    title: 'THE CONSTELLATION',
    lead: '“People ask which one I really am. All of them. That was the plan.”',
    defaultTitle: 'Ten roles. One operator. Zero contradictions.',
    acronym: 'MACAL — Multi-talented. Adaptive. Creative. Ambitious. Leader.',
    hintDesktop: 'Hover or tab through the roles',
    hintMobile: 'Tap a role',
    ariaGroup: 'Select a role to see how it fits the whole',
    roles: {
      'founder-eec': {
        label: 'Founder — EEC',
        line: 'I built a six-level English system, week by week, and shipped every one.',
      },
      ceo: {
        label: 'CEO — MACAL Empire',
        line: 'I run the company. The strategy, the stack, and the consequences are mine.',
      },
      'ai-mentor': {
        label: 'AI Mentor',
        line: 'I teach people to command AI instead of being replaced by it.',
      },
      'life-coach': {
        label: 'Life Coach',
        line: 'Fluency is a mindset problem wearing a grammar costume.',
      },
      marketing: {
        label: 'Marketing Strategist',
        line: "I don't buy attention. I engineer reasons to pay attention.",
      },
      social: {
        label: 'Social Media Manager',
        line: 'Every channel I own, I built and I run. No agency, no ghost team.',
      },
      trader: {
        label: 'Trader',
        line: 'I trade my own book. I teach discipline — never signals.',
      },
      investor: {
        label: 'Investor',
        line: 'Capital protection first. Legacy second. Hype never.',
      },
      model: {
        label: 'Model',
        line: "Presence is a language. I'm fluent in that one too.",
      },
      influencer: {
        label: 'Influencer',
        line: "Influence isn't reach. It's what people do after they listen.",
      },
    },
  },

  wings: {
    kicker: 'One Spine · Four Wings',
    title: 'THE ARCHITECTURE OF A PERSON',
    lead: '“Ten titles is not ten careers. It’s one system with four wings.”',
    proofLabel: 'Proof',
    close: 'Four wings. One roof.',
    items: {
      architect: {
        name: 'The Architect',
        roles: ['Founder', 'CEO'],
        body: 'I build the system before I sell the seat. Empire English Community is six CEFR levels, ninety weeks and four hundred and fifty content modules — designed, written and shipped.',
        proof: 'A working curriculum, a live assessment engine, and an audio pipeline of 9,360 clips.',
      },
      operator: {
        name: 'The Operator',
        roles: ['Marketing Manager', 'Social Media Manager', 'AI Mentor'],
        body: "Strategy is worthless if you can't run it yourself. I write the copy, cut the content, build the automation and read the numbers. Then I teach the same stack to the people I mentor.",
        proof: 'Every channel under this name was built and is run by one person.',
      },
      mentor: {
        name: 'The Mentor',
        roles: ['AI Mentor', 'Life Coach'],
        body: "Most people don't lack ability. They lack a system and a reason. I hand them both, then get out of the way.",
        proof: 'A method built on mindset first, mechanics second — the reason our students finish.',
      },
      standard: {
        name: 'The Standard',
        roles: ['Model', 'Influencer', 'Trader', 'Investor'],
        body: "You cannot teach a standard you don't hold. I trade my own capital, I show up on camera, and I walk into rooms I wasn't invited to.",
        proof: "Discipline is visible. That's the point of showing it.",
      },
    },
  },

  proof: {
    kicker: 'Every Number Re-Derived From Source Code',
    title: 'THE RECEIPTS',
    lead: '“Anyone can claim a system. Here is mine, counted.”',
    footnote:
      'Derived from source, not from a brochure. Empire English Community is CEFR-aligned — not a certifying body.',
    close: 'I don’t ask you to trust me. I ask you to count.',
    labels: {
      levels: 'CEFR LEVELS',
      weeks: 'CURRICULUM WEEKS',
      modules: 'CONTENT MODULES',
      clips: 'NARRATED CLIPS',
      listening: 'Extended-listening segments',
      descriptors: 'Can-do descriptors',
      questions: 'Comprehension questions',
      broadcast: 'Broadcast audio clips',
      tests: 'Automated tests',
      loc: 'Lines of engine code',
    },
    subs: {
      levels: 'A1 through C2, complete',
      weeks: 'Written week by week',
      modules: 'Five tracks per level',
      clips: 'Rendered, verified, live',
    },
  },

  ecosystem: {
    kicker: 'Not A Logo Wall',
    title: 'THE ARCHITECTURE',
    lead: '“Most people show you a client list. I’ll show you the wiring.”',
    hub: 'MACAL EMPIRE',
    hubSub: 'One Operator',
    close: 'One operator. Six systems. Zero outsourcing.',
    detail: '+ Detail',
    closeDetail: '— Close',
    nodes: {
      eec: {
        name: 'Empire English Community',
        short: 'Six CEFR levels. The flagship.',
        detail:
          'A complete A1→C2 programme: 90 weeks of curriculum across five parallel tracks — reading, grammar, accent, mediation and extended listening.',
      },
      engine: {
        name: 'The Learning Engine',
        short: 'Teaches, tracks and promotes — daily.',
        detail:
          'A Discord-based system that delivers daily practice, records submissions, scores progress against can-do descriptors and promotes students between levels on evidence.',
      },
      practice: {
        name: 'The Practice Site',
        short: 'Thousands of generated pages.',
        detail:
          'Every curriculum week compiles into drill, reading and listening pages, verified by an automated build before anything reaches a student.',
      },
      assessment: {
        name: 'The Assessment Engine',
        short: 'Adaptive placement, four skills.',
        detail:
          'Reading, listening, speaking and writing, scored adaptively into a per-skill CEFR profile. Built to resist memorisation: no two sessions share a question path.',
      },
      audio: {
        name: 'The Audio Pipeline',
        short: '9,360 clips. Seven voices. Pace-verified.',
        detail:
          'Every spoken line is pre-rendered, hash-addressed and speed-checked against a target words-per-minute for its level, so no lesson is delivered too fast or too slow.',
      },
      broadcast: {
        name: 'The Broadcast Network',
        short: 'Owned and operated.',
        detail:
          'TikTok, YouTube, Instagram and Telegram — the distribution layer. Built, filmed, written and scheduled in-house. No agency.',
      },
    },
  },

  chapters: {
    kicker: 'Four Frames',
    title: 'THE CHAPTERS',
    lead: '“A photograph is a claim. These are the four I’m willing to defend.”',
    chapterWord: 'Chapter',
    items: {
      diplomacy: {
        title: 'Diplomacy',
        line: 'I represent something bigger than myself.',
        body: 'When you carry a name, you stop making decisions for yourself alone. Everything I build has to survive being looked at.',
        alt: 'Mahmoud Ashri in a black suit standing before national flags at an official reception',
      },
      authority: {
        title: 'Authority',
        line: 'Authority is quiet.',
        body: "The loudest man in the room is usually the one with the least to show. I'd rather the work did the talking.",
        alt: 'Mahmoud Ashri seated in a leather chair in a marble lobby, hands clasped',
      },
      presence: {
        title: 'Presence',
        line: "I move in rooms I was told I'd never enter.",
        body: 'Nobody handed me access. I built something worth letting in.',
        alt: 'Mahmoud Ashri at an evening industry event, guests gathered behind him',
      },
      vision: {
        title: 'Vision',
        line: 'I build where the skyline is still going up.',
        body: "Dubai doesn't reward nostalgia. Neither do I. Build for the version of the world that's arriving.",
        alt: 'Mahmoud Ashri on a terrace at dusk with the Dubai skyline behind him',
      },
    },
  },

  eec: {
    kicker: 'Empire English Community',
    title: 'THE FLAGSHIP',
    lead: '“The number one thing I’ve built. Not a course — a system.”',
    ctaTitle: 'Start at your real level — not the one you guessed',
    ctaSub:
      'The placement test is free, adaptive, and built so it cannot be gamed. It takes about thirty minutes and tells you the truth.',
    ctaPrimary: 'Take the free placement test',
    ctaSecondary: 'Join the community',
    honesty: 'CEFR-aligned, not a certifying body. We measure ability, not attendance.',
    tagline: 'Forged in Language. Crowned in Mastery.',
    close: 'Your English isn’t broken. Your system is.',
    pillars: {
      real: {
        title: 'Real English',
        body: 'Not exam tricks. The English that works in a meeting, an interview, and a life you actually want.',
      },
      mindset: {
        title: 'Right Mindset',
        body: 'We fix the fear first. Grammar is the easy half — the hard half is believing you can speak.',
      },
      exclusive: {
        title: 'Exclusive System',
        body: 'Six levels, ninety weeks, one path. Built here, from scratch. Available nowhere else.',
      },
    },
  },

  doctrine: {
    kicker: 'How I Operate',
    title: 'THE DOCTRINE',
    lead: '“Six rules. I didn’t read them in a book — I paid for each one.”',
    close: 'You can have excuses. Or results. Not both.',
    items: [
      {
        title: 'Hard work beats hype',
        body: 'Every time. No exceptions, no shortcuts, no weekend seminar that changes your life.',
      },
      {
        title: 'If it sounds too good to be true, hold your wallet',
        body: 'Especially in this market. Especially when someone is in a hurry for your money.',
      },
      {
        title: 'Respect is earned in public, paid for in private',
        body: 'Show up. Deliver. Repeat until your name does the introductions for you.',
      },
      {
        title: 'Complexity is usually a hiding place',
        body: "If I can't explain it simply, I don't understand it yet. So I go back and learn it properly.",
      },
      {
        title: 'Own the mistake, fix it, move',
        body: 'Excuses are just deferred costs. They always come due, and they always cost more.',
      },
      {
        title: 'Legacy is what outlasts you',
        body: "I'm not building a following. I'm building a foundation that works when I'm not in the room.",
      },
    ],
  },

  direct: {
    kicker: 'No Forms · No Gatekeepers',
    title: 'TALK TO ME DIRECTLY',
    lead: '“You don’t need an assistant, a form, or a funnel. Here are my actual numbers.”',
    whatsapp: 'WhatsApp — fastest reply',
    telegram: 'Telegram — direct to me',
    orCall: 'Or call directly',
    note: 'I read my own messages. Bring something real and you’ll get a real answer.',
  },

  concierge: {
    kicker: 'The Concierge',
    title: 'HOW DO YOU WANT TO CONNECT?',
    lead: '“Tell me what you need. I’ll be on the other end.”',
    close: 'One message is enough. Make it a real one.',
    back: 'All options',
    fallback: 'Or just message me directly',
    reveal: 'Tap to reveal',
    preferCall: 'Prefer to call? All my numbers →',
    ariaGroup: 'Choose what you need',
    intents: {
      learn: { label: 'Learn English', sub: 'Join EEC and start at your real level.' },
      consult: { label: 'Book a consultation', sub: 'One conversation. Bring a real problem.' },
      business: {
        label: 'Business & collaboration',
        sub: 'Brand deals, partnerships, ventures.',
      },
      mentorship: {
        label: 'Mentorship & coaching',
        sub: 'AI fluency, discipline, direction.',
      },
      media: { label: 'Media & speaking', sub: 'Press, interviews, stages, panels.' },
    },
    waSubjects: {
      consult: 'Consultation request — ',
      business: 'Business enquiry — ',
      mentorship: 'Mentorship enquiry — ',
    },
    routes: {
      whatsapp: 'WhatsApp — fastest',
      placement: 'Free placement test',
      telegramCommunity: 'Telegram community',
      email: 'Email',
      businessEmail: 'Business email',
      linkedin: 'LinkedIn',
      instagramEec: 'Instagram — Empire English',
      instagramPersonal: 'Instagram — MACAL Empire',
    },
  },

  channels: {
    kicker: 'Beyond This Page',
    title: 'THE CHANNELS',
    lead: '“Two brands. One operator. Follow the one you came for.”',
    close: 'Follow if you build. Unfollow if you drift.',
    groupEec: 'Empire English Community',
    groupEecNote: 'For the learners. Teaching, community, announcements.',
    groupPersonal: 'MACAL Empire · Personal',
    groupPersonalNote: 'For the builders. Business, discipline, the standard.',
    reasons: {
      'tiktok-eec': 'English that actually sticks. Daily.',
      'instagram-eec': 'Lessons, wins, and the community in motion.',
      youtube: 'Long-form. Where the real teaching lives.',
      telegram: 'Announcements first. Community always.',
      'tiktok-macal': 'Discipline, business, and the long game.',
      'instagram-personal': 'The personal record. Rooms, work, and the standard.',
      linkedin: 'The professional file.',
      facebook: 'The personal side of the empire.',
    },
  },

  footer: {
    properties: {
      english: 'Empire English',
      placement: 'Placement Test',
      practice: 'Practice Site',
    },
    cefr: 'Empire English Community is CEFR-aligned and is not a certifying body.',
    finance:
      'Trading and investing are personal activities. Nothing on this page is financial advice, an offer, or a solicitation. No returns are promised or implied.',
    rights: 'All rights reserved',
  },

  audio: {
    invite: 'Turn on the sound',
    dismiss: 'Dismiss',
    on: 'Sound on',
    off: 'Sound off',
  },

  meta: {
    title: 'Mahmoud Ashri — Founder, Operator, Mentor | MACAL EMPIRE',
    description:
      'Founder of Empire English Community and CEO of MACAL Empire. I build systems that turn potential into power — a six-level English curriculum, a live learning engine, and the discipline to run them. This is not a portfolio.',
    keywords: [
      'Mahmoud Ashri',
      'MACAL Empire',
      'Empire English Community',
      'English learning system',
      'CEFR English course',
      'AI mentor',
      'life coach Dubai',
      'founder Dubai',
      'learn English Arabic speakers',
      'business coach Egypt UAE',
    ],
    ogAlt: 'Mahmoud Ashri — MACAL EMPIRE',
  },
  countries: { uae: 'UAE', egypt: 'Egypt' },
  whatsappGreeting: 'Hello Mahmoud — ',
};

/* ═══════════════════════════════════════════════════════════════
 * ARABIC — Modern Standard Arabic
 * ═══════════════════════════════════════════════════════════════ */

const ar: Dict = {
  nav: {
    roles: 'الأدوار',
    proof: 'الأرقام',
    system: 'النظام',
    english: 'الإنجليزية',
    contact: 'تواصل',
  },
  connect: 'تواصل معي',
  skipToContent: 'تجاوز إلى المحتوى',
  langSwitch: 'English',
  langSwitchAria: 'التحويل إلى الإنجليزية',
  menuOpen: 'افتح القائمة',
  menuClose: 'أغلق القائمة',

  hero: {
    kicker: 'ماكال إمباير · دبي · القاهرة',
    roleLine: 'مؤسس · مشغّل · مُرشد',
    lead: 'لا أجمع الألقاب. أبني الأنظمة، ثم أعيش داخلها.',
    ctaPrimary: 'ادخل الإمبراطورية',
    ctaSecondary: 'اطّلع على الأرقام',
  },

  spine: {
    kicker: 'الفكرة الأساسية',
    l1: 'هذه ليست صفحة إنجازات.',
    l2: 'هذا نظامٌ متكامل لبناء القوة وإتقان الذات',
    l3: '— صنعته بنفسي، وأعيشه كل يوم.',
  },

  constellation: {
    kicker: 'عشرة أدوار · عقلٌ واحد',
    title: 'المجموعة',
    lead: '«يسألني الناس: أيُّها أنت حقًا؟ كلها. وهذا ما خططت له.»',
    defaultTitle: 'عشرة أدوار. عقلٌ واحد. لا تناقض.',
    acronym: 'ماكال — متعدد المواهب. متكيّف. مبتكر. طموح. قائد.',
    hintDesktop: 'مرّر على الأدوار أو تنقّل بينها بلوحة المفاتيح',
    hintMobile: 'اضغط على أي دور',
    ariaGroup: 'اختر دورًا لترى كيف يندرج في الصورة الكاملة',
    roles: {
      'founder-eec': {
        label: 'مؤسس المجتمع',
        line: 'بنيت نظامًا لتعليم الإنجليزية بستة مستويات، أسبوعًا بأسبوع، وأنجزته كاملًا.',
      },
      ceo: {
        label: 'المدير التنفيذي',
        line: 'أنا من يدير الشركة. الاستراتيجية والتنفيذ والنتائج كلها مسؤوليتي.',
      },
      'ai-mentor': {
        label: 'مُرشد الذكاء الاصطناعي',
        line: 'أعلّم الناس أن يقودوا الذكاء الاصطناعي، لا أن يحلّ محلّهم.',
      },
      'life-coach': {
        label: 'مدرّب حياة',
        line: 'الطلاقة في جوهرها مشكلة عقلية تتخفّى في ثوب القواعد.',
      },
      marketing: {
        label: 'خبير تسويق',
        line: 'لا أشتري الانتباه. أصنع سببًا يستحق الانتباه.',
      },
      social: {
        label: 'مدير محتوى ومنصات',
        line: 'كل قناة أملكها بنيتها وأديرها بنفسي. بلا وكالة وبلا فريق خفي.',
      },
      trader: {
        label: 'متداول',
        line: 'أتداول بأموالي الخاصة. أعلّم الانتظام، لا التوصيات.',
      },
      investor: {
        label: 'مستثمر',
        line: 'حماية رأس المال أولًا. ثم الإرث. أما الضجيج فلا.',
      },
      model: {
        label: 'عارض أزياء',
        line: 'الحضور لغة أيضًا، وأنا أتحدثها بطلاقة.',
      },
      influencer: {
        label: 'صانع محتوى',
        line: 'التأثير ليس عدد المتابعين، بل ما يفعله الناس بعد أن يسمعوك.',
      },
    },
  },

  wings: {
    kicker: 'أساسٌ واحد · أربعة أجنحة',
    title: 'بنية الإنسان',
    lead: '«عشرة ألقاب ليست عشر مهن. إنها نظام واحد بأربعة أجنحة.»',
    proofLabel: 'الدليل',
    close: 'أربعة أجنحة تحت سقف واحد.',
    items: {
      architect: {
        name: 'المهندس',
        roles: ['مؤسس', 'مدير تنفيذي'],
        body: 'أبني النظام قبل أن أبيع المكان فيه. مجتمع إمباير إنجلش ستة مستويات، وتسعون أسبوعًا، وأربعمائة وخمسون وحدة تعليمية — صُمّمت وكُتبت وأُنجزت.',
        proof: 'منهج يعمل فعلًا، ونظام تقييم مباشر، ومكتبة صوتية تضم 9,360 مقطعًا.',
      },
      operator: {
        name: 'المشغّل',
        roles: ['مدير تسويق', 'مدير منصات', 'مُرشد ذكاء اصطناعي'],
        body: 'الاستراتيجية بلا قيمة إن لم تستطع تنفيذها بنفسك. أكتب النصوص، وأنتج المحتوى، وأبني الأتمتة، وأقرأ الأرقام. ثم أعلّم الأدوات نفسها لمن أُرشدهم.',
        proof: 'كل قناة تحمل هذا الاسم بناها ويديرها شخص واحد.',
      },
      mentor: {
        name: 'المُرشد',
        roles: ['مُرشد ذكاء اصطناعي', 'مدرّب حياة'],
        body: 'معظم الناس لا تنقصهم القدرة، بل ينقصهم نظام وسبب. أمنحهم الأمرين، ثم أخلي الطريق.',
        proof: 'منهج يبدأ بالعقلية قبل المهارة — ولهذا يُكمل طلابنا الطريق.',
      },
      standard: {
        name: 'المعيار',
        roles: ['عارض أزياء', 'صانع محتوى', 'متداول', 'مستثمر'],
        body: 'لا يمكنك أن تُعلّم معيارًا لا تلتزم به. أتداول بأموالي، وأظهر أمام الكاميرا، وأدخل قاعات قيل لي إنني لن أدخلها.',
        proof: 'الانتظام شيء يُرى. ولهذا أُظهره.',
      },
    },
  },

  proof: {
    kicker: 'كل رقم مُستخرج من الكود نفسه',
    title: 'الأرقام',
    lead: '«أي شخص يستطيع الادعاء. هذه أرقامي، محسوبة واحدًا واحدًا.»',
    footnote:
      'مستخرجة من الكود، لا من كتيّب دعائي. مجتمع إمباير إنجلش متوافق مع الإطار الأوروبي المرجعي، وليس جهة مانحة للشهادات.',
    close: 'لا أطلب منك أن تثق بي. أطلب منك أن تحسب.',
    labels: {
      levels: 'المستويات',
      weeks: 'أسابيع المنهج',
      modules: 'وحدة تعليمية',
      clips: 'مقطعًا صوتيًا',
      listening: 'مقاطع استماع مطوّلة',
      descriptors: 'مؤشر قدرة',
      questions: 'سؤال استيعاب',
      broadcast: 'مقطعًا إذاعيًا',
      tests: 'اختبارًا آليًا',
      loc: 'سطرًا برمجيًا',
    },
    subs: {
      levels: 'من المستوى الأول إلى المتقدم، مكتملة',
      weeks: 'مكتوبة أسبوعًا بأسبوع',
      modules: 'خمسة مسارات لكل مستوى',
      clips: 'مُنتَجة ومُراجَعة ومتاحة',
    },
  },

  ecosystem: {
    kicker: 'ليست قائمة شعارات',
    title: 'البنية',
    lead: '«الآخرون يعرضون قائمة عملائهم. أنا أعرض لك البنية من الداخل.»',
    hub: 'ماكال إمباير',
    hubSub: 'مشغّلٌ واحد',
    close: 'مشغّلٌ واحد. ستة أنظمة. بلا إسناد خارجي.',
    detail: '+ التفاصيل',
    closeDetail: '— إغلاق',
    nodes: {
      eec: {
        name: 'مجتمع إمباير إنجلش',
        short: 'ستة مستويات. المشروع الأساسي.',
        detail:
          'برنامج كامل من المستوى الأول إلى المتقدم: تسعون أسبوعًا من المنهج عبر خمسة مسارات متوازية — القراءة، والقواعد، واللفظ، والوساطة اللغوية، والاستماع المطوّل.',
      },
      engine: {
        name: 'محرّك التعلّم',
        short: 'يعلّم ويتابع ويرقّي، كل يوم.',
        detail:
          'نظام يعمل عبر ديسكورد، يقدّم تدريبًا يوميًا، ويسجّل الإجابات، ويقيس التقدّم مقابل مؤشرات القدرة، ويرقّي الطالب بين المستويات بناءً على دليل حقيقي.',
      },
      practice: {
        name: 'موقع التدريب',
        short: 'آلاف الصفحات المُولّدة.',
        detail:
          'كل أسبوع من المنهج يتحوّل إلى صفحات تدريب وقراءة واستماع، يتم التحقق منها آليًا قبل أن تصل إلى أي طالب.',
      },
      assessment: {
        name: 'محرّك التقييم',
        short: 'تحديد مستوى متكيّف لأربع مهارات.',
        detail:
          'القراءة والاستماع والتحدث والكتابة، تُقاس بأسلوب متكيّف لتكوين صورة دقيقة لكل مهارة. مصمَّم ليقاوم الحفظ: لا يتشابه اختباران في مسار الأسئلة.',
      },
      audio: {
        name: 'خط الإنتاج الصوتي',
        short: '9,360 مقطعًا. سبعة أصوات. سرعة مضبوطة.',
        detail:
          'كل سطر منطوق يُنتَج مسبقًا ويُفحَص مقابل سرعة كلمات مستهدفة لكل مستوى، حتى لا يُقدَّم الدرس أسرع أو أبطأ من اللازم.',
      },
      broadcast: {
        name: 'شبكة النشر',
        short: 'ملكٌ خاص وإدارة ذاتية.',
        detail:
          'تيك توك ويوتيوب وإنستغرام وتيليجرام — طبقة الوصول إلى الناس. تُبنى وتُصوَّر وتُكتب وتُجدول داخليًا. بلا وكالة.',
      },
    },
  },

  chapters: {
    kicker: 'أربع لقطات',
    title: 'الفصول',
    lead: '«الصورة موقف. هذه أربعة مواقف أدافع عنها.»',
    chapterWord: 'الفصل',
    items: {
      diplomacy: {
        title: 'التمثيل',
        line: 'أُمثّل شيئًا أكبر من نفسي.',
        body: 'عندما تحمل اسمًا، تتوقف عن اتخاذ القرارات لنفسك وحدك. كل ما أبنيه يجب أن يصمد أمام أعين الناس.',
        alt: 'محمود عشري ببدلة سوداء واقفًا أمام الأعلام في مناسبة رسمية',
      },
      authority: {
        title: 'الهيبة',
        line: 'الهيبة الحقيقية هادئة.',
        body: 'أعلى صوت في القاعة عادةً هو صاحب أقل ما يُعرض. أُفضّل أن يتحدث العمل عني.',
        alt: 'محمود عشري جالسًا على مقعد جلدي في بهو رخامي',
      },
      presence: {
        title: 'الحضور',
        line: 'أدخل قاعات قيل لي إنني لن أدخلها.',
        body: 'لم يمنحني أحد التصريح. بنيت شيئًا يستحق أن يُفتح له الباب.',
        alt: 'محمود عشري في مناسبة مهنية مسائية والحضور من خلفه',
      },
      vision: {
        title: 'الرؤية',
        line: 'أبني حيث ما زال الأفق يرتفع.',
        body: 'دبي لا تكافئ الحنين إلى الماضي، وأنا كذلك. ابنِ للعالم القادم، لا للعالم الذي مضى.',
        alt: 'محمود عشري على شرفة عند الغروب وأفق دبي من خلفه',
      },
    },
  },

  eec: {
    kicker: 'مجتمع إمباير إنجلش',
    title: 'المشروع الأساسي',
    lead: '«أهم ما بنيته. ليس دورة تدريبية — بل نظامًا كاملًا.»',
    ctaTitle: 'ابدأ من مستواك الحقيقي — لا من المستوى الذي تظنه',
    ctaSub:
      'اختبار تحديد المستوى مجاني، ويتكيّف معك، ومصمَّم بحيث لا يمكن التحايل عليه. ثلاثون دقيقة تقريبًا، ويقول لك الحقيقة.',
    ctaPrimary: 'ابدأ اختبار المستوى المجاني',
    ctaSecondary: 'انضم إلى المجتمع',
    honesty: 'متوافق مع الإطار الأوروبي المرجعي، ولسنا جهة مانحة للشهادات. نقيس القدرة، لا الحضور.',
    tagline: 'تُصاغ باللغة. تُتوَّج بالإتقان.',
    close: 'لغتك ليست هي المشكلة. نظامك هو المشكلة.',
    pillars: {
      real: {
        title: 'إنجليزية حقيقية',
        body: 'ليست حيل امتحانات. الإنجليزية التي تنفعك في اجتماع، ومقابلة عمل، وحياة تريدها فعلًا.',
      },
      mindset: {
        title: 'عقلية صحيحة',
        body: 'نعالج الخوف أولًا. القواعد هي الجزء السهل — الأصعب أن تؤمن أنك قادر على التحدث.',
      },
      exclusive: {
        title: 'نظام خاص',
        body: 'ستة مستويات، تسعون أسبوعًا، مسارٌ واحد. بُني من الصفر، ولا يوجد في مكان آخر.',
      },
    },
  },

  doctrine: {
    kicker: 'كيف أعمل',
    title: 'المبادئ',
    lead: '«ستة مبادئ. لم أقرأها في كتاب — دفعت ثمن كل واحد منها.»',
    close: 'إما الأعذار وإما النتائج. لا يجتمعان.',
    items: [
      {
        title: 'الاجتهاد يسبق الضجيج',
        body: 'في كل مرة. بلا استثناءات، وبلا طرق مختصرة، وبلا ندوة في نهاية الأسبوع تغيّر حياتك.',
      },
      {
        title: 'إن كان العرض أجمل من أن يكون حقيقيًا، فأمسك محفظتك',
        body: 'خصوصًا في هذا السوق. وخصوصًا إذا كان أحدهم مستعجلًا على مالك.',
      },
      {
        title: 'الاحترام يُكتسب علنًا ويُدفع ثمنه سرًا',
        body: 'احضر. سلّم ما وعدت به. وأعد ذلك حتى يصبح اسمك هو من يقدّمك.',
      },
      {
        title: 'التعقيد غالبًا مخبأ',
        body: 'إن لم أستطع شرحه ببساطة، فأنا لم أفهمه بعد. فأرجع وأتعلّمه كما يجب.',
      },
      {
        title: 'اعترف بالخطأ، أصلحه، وامضِ',
        body: 'الأعذار تكاليف مؤجلة. تحين دائمًا، وتكون دائمًا أغلى.',
      },
      {
        title: 'الإرث هو ما يبقى بعدك',
        body: 'لا أبني جمهورًا يتابعني. أبني أساسًا يعمل حين لا أكون موجودًا.',
      },
    ],
  },

  direct: {
    kicker: 'بلا نماذج · بلا وسطاء',
    title: 'تواصل معي مباشرة',
    lead: '«لا تحتاج إلى مساعد أو نموذج أو وسيط. هذه أرقامي الحقيقية.»',
    whatsapp: 'واتساب — أسرع رد',
    telegram: 'تيليجرام — مباشرةً إليّ',
    orCall: 'أو اتصل مباشرة',
    note: 'أقرأ رسائلي بنفسي. اكتب شيئًا حقيقيًا وستحصل على رد حقيقي.',
  },

  concierge: {
    kicker: 'خدمة التواصل',
    title: 'كيف تريد أن نتواصل؟',
    lead: '«قل لي ما تحتاجه. سأكون على الطرف الآخر.»',
    close: 'رسالة واحدة تكفي. اجعلها رسالة حقيقية.',
    back: 'كل الخيارات',
    fallback: 'أو راسلني مباشرة',
    reveal: 'اضغط للإظهار',
    preferCall: 'تفضّل الاتصال؟ كل أرقامي هنا ←',
    ariaGroup: 'اختر ما تحتاجه',
    intents: {
      learn: { label: 'تعلّم الإنجليزية', sub: 'انضم إلى المجتمع وابدأ من مستواك الحقيقي.' },
      consult: { label: 'احجز استشارة', sub: 'محادثة واحدة. أحضر معك مشكلة حقيقية.' },
      business: { label: 'أعمال وشراكات', sub: 'شراكات، وحملات، ومشاريع مشتركة.' },
      mentorship: {
        label: 'إرشاد وتدريب',
        sub: 'إتقان الذكاء الاصطناعي، والانتظام، ووضوح الاتجاه.',
      },
      media: { label: 'إعلام ومحاضرات', sub: 'صحافة، ومقابلات، ومنصات، وجلسات حوارية.' },
    },
    waSubjects: {
      consult: 'طلب استشارة — ',
      business: 'استفسار عن أعمال — ',
      mentorship: 'استفسار عن الإرشاد — ',
    },
    routes: {
      whatsapp: 'واتساب — الأسرع',
      placement: 'اختبار المستوى المجاني',
      telegramCommunity: 'مجموعة تيليجرام',
      email: 'البريد الإلكتروني',
      businessEmail: 'بريد الأعمال',
      linkedin: 'لينكدإن',
      instagramEec: 'إنستغرام — إمباير إنجلش',
      instagramPersonal: 'إنستغرام — ماكال إمباير',
    },
  },

  channels: {
    kicker: 'ما بعد هذه الصفحة',
    title: 'القنوات',
    lead: '«علامتان تجاريتان. مشغّلٌ واحد. تابع ما جئت من أجله.»',
    close: 'تابعني إن كنت تبني. واتركني إن كنت تتفرّج.',
    groupEec: 'مجتمع إمباير إنجلش',
    groupEecNote: 'للمتعلمين. تعليم، ومجتمع، وإعلانات.',
    groupPersonal: 'ماكال إمباير · الحساب الشخصي',
    groupPersonalNote: 'لمن يبني. أعمال، وانتظام، ومعايير.',
    reasons: {
      'tiktok-eec': 'إنجليزية تثبت فعلًا. كل يوم.',
      'instagram-eec': 'دروس، وإنجازات، والمجتمع في حركته.',
      youtube: 'محتوى مطوّل. هنا يكون التعليم الحقيقي.',
      telegram: 'الإعلانات أولًا. والمجتمع دائمًا.',
      'tiktok-macal': 'انتظام، وأعمال، ونظرة بعيدة المدى.',
      'instagram-personal': 'السجل الشخصي. القاعات، والعمل، والمعيار.',
      linkedin: 'الملف المهني.',
      facebook: 'الجانب الشخصي من الإمبراطورية.',
    },
  },

  footer: {
    properties: {
      english: 'إمباير إنجلش',
      placement: 'اختبار المستوى',
      practice: 'موقع التدريب',
    },
    cefr: 'مجتمع إمباير إنجلش متوافق مع الإطار الأوروبي المرجعي، وليس جهة مانحة للشهادات.',
    finance:
      'التداول والاستثمار نشاط شخصي. لا شيء في هذه الصفحة يُعدّ نصيحة مالية أو عرضًا أو دعوة للاستثمار، ولا نتائج مضمونة أو مُلمَّح إليها.',
    rights: 'جميع الحقوق محفوظة',
  },

  audio: {
    invite: 'شغّل الصوت',
    dismiss: 'إغلاق',
    on: 'الصوت مُشغّل',
    off: 'الصوت متوقف',
  },

  meta: {
    title: 'محمود عشري — مؤسس ومشغّل ومُرشد | ماكال إمباير',
    description:
      'مؤسس مجتمع إمباير إنجلش والمدير التنفيذي لماكال إمباير. أبني أنظمة تحوّل الطاقة إلى قوة: منهج إنجليزي من ستة مستويات، ومحرّك تعلّم يعمل كل يوم، والانتظام الذي يشغّلهما. هذه ليست صفحة إنجازات.',
    keywords: [
      'محمود عشري',
      'ماكال إمباير',
      'مجتمع إمباير إنجلش',
      'تعلم الإنجليزية',
      'تعلم الانجليزية من الصفر',
      'كورس انجليزي',
      'تحديد مستوى الإنجليزية',
      'مدرب حياة',
      'الذكاء الاصطناعي للمبتدئين',
      'تطوير الذات',
    ],
    ogAlt: 'محمود عشري — ماكال إمباير',
  },
  countries: { uae: 'الإمارات', egypt: 'مصر' },
  whatsappGreeting: 'مرحبًا محمود — ',
};

const DICTS: Record<Locale, Dict> = { en, ar };

export function getContent(locale: Locale): Dict {
  return DICTS[locale];
}

export type { Dict };
