/**
 * ARABIC COPY — the bilingual spine (Phase A).
 *
 * A large share of the audience are native Arabic speakers who are not yet fluent in
 * English. The page is English-first on purpose — a founder who teaches English should
 * be seen operating in it, and that is itself part of the proof — but the moments that
 * carry meaning and drive action must be readable by the people who need them most.
 *
 * So Arabic appears on the LOAD-BEARING moments only:
 *   - the thesis
 *   - each section's one-line lead
 *   - the five Concierge intents (the actual conversion surface)
 *   - the Empire English offer
 *
 * It does NOT appear on every paragraph. Full parity belongs to the /ar route
 * (Phase B). Doubling every line here would halve the page's density and cost the
 * cinematic pacing that makes it work.
 *
 * ─── TYPOGRAPHIC LAW (see .ar-text in globals.css) ────────────────────────────
 * 1. NEVER apply letter-spacing to Arabic. Arabic letters JOIN; tracking pulls the
 *    joined forms apart and the word visibly fractures. The whole design language is
 *    tracked 0.06–0.35em, so every Arabic node must reset it to 0.
 * 2. Arabic has NO uppercase. `text-transform: uppercase` is a no-op, so hierarchy in
 *    Arabic must come from weight and size, never from caps.
 * 3. Cinzel and Playfair Display have ZERO Arabic glyphs (verified against the Google
 *    Fonts unicode-ranges — no U+0600 block). Arabic MUST use Tajawal or it silently
 *    falls back to the system UI font and the premium look collapses.
 * 4. Every Arabic string must carry dir="rtl" and lang="ar".
 *
 * ─── BIDI RULE ────────────────────────────────────────────────────────────────
 * Never write an Arabic line containing two or more embedded Latin tokens — the
 * bidirectional algorithm reorders them unpredictably across browsers. Where a Latin
 * name is unavoidable, keep it to ONE token and wrap it in <bdi>. This is why the
 * strings below say «إمباير إنجلish» nowhere and transliterate or isolate instead.
 */

export const AR = {
  /** §2 — the governing sentence. */
  thesis: 'هذه ليست صفحة إنجازات. هذا نظامٌ متكامل لبناء القوة وإتقان الذات — صنعته وأعيشه.',

  /** §1 hero lead. */
  heroLead: 'لا أجمع الألقاب. أبني الأنظمة، ثم أعيش داخلها.',

  /** Section leads. */
  constellation: 'عشرة أدوار. عقلٌ واحد. لا تناقض.',
  wings: 'عشرة ألقاب ليست عشر مهن. إنها نظام واحد بأربعة أجنحة.',
  proof: 'أي شخص يستطيع الادعاء. هذه أرقامي، محسوبة واحدًا واحدًا.',
  ecosystem: 'الآخرون يعرضون شعارات عملائهم. أنا أعرض لك البنية من الداخل.',
  chapters: 'الصورة موقف. هذه أربعة مواقف أدافع عنها.',
  doctrine: 'ستة مبادئ. لم أقرأها في كتاب — دفعت ثمن كل واحد منها.',
  channels: 'علامتان تجاريتان. مشغّلٌ واحد. تابع ما جئت من أجله.',

  /** §8 — Empire English Community. */
  eec: {
    lead: 'أهم ما بنيته. ليس كورسًا — بل نظامًا كاملًا.',
    pillars: {
      real: 'ليست حيل امتحانات. الإنجليزية التي تنفعك في اجتماع، ومقابلة عمل، وحياة تريدها فعلًا.',
      mindset: 'نعالج الخوف أولًا. القواعد هي الجزء السهل — الأصعب أن تؤمن أنك قادر على التحدث.',
      exclusive: 'ستة مستويات، تسعون أسبوعًا، مسارٌ واحد. بُني من الصفر، ولا يوجد في مكان آخر.',
    },
    cta: 'ابدأ من مستواك الحقيقي — لا من المستوى الذي تظنه.',
    ctaSub: 'اختبار تحديد المستوى مجاني، ويتكيّف معك، ومصمَّم بحيث لا يمكن التحايل عليه. ثلاثون دقيقة تقريبًا، ويقول لك الحقيقة.',
    honesty: 'متوافق مع الإطار الأوروبي المرجعي، ولسنا جهة مانحة للشهادات. نقيس القدرة، لا الحضور.',
  },

  /** §10 — the Concierge. This is the conversion surface; it matters most. */
  concierge: {
    title: 'كيف تريد أن نتواصل؟',
    lead: 'قل لي ما تحتاجه. سأكون على الطرف الآخر.',
    intents: {
      learn: 'انضم إلى المجتمع وابدأ من مستواك الحقيقي.',
      consult: 'محادثة واحدة. أحضر معك مشكلة حقيقية.',
      business: 'شراكات، وحملات، ومشاريع مشتركة.',
      mentorship: 'إتقان الذكاء الاصطناعي، والانتظام، ووضوح الاتجاه.',
      media: 'صحافة، ومقابلات، ومنصات، وجلسات حوارية.',
    },
    labels: {
      learn: 'تعلّم الإنجليزية',
      consult: 'احجز استشارة',
      business: 'أعمال وشراكات',
      mentorship: 'إرشاد وتدريب',
      media: 'إعلام ومحاضرات',
    },
  },

  /** Footer disclaimers — honesty must be readable in both languages, not just one. */
  footer: {
    cefr: 'مجتمع إمباير إنجلش متوافق مع الإطار الأوروبي المرجعي، وليس جهة مانحة للشهادات.',
    finance:
      'التداول والاستثمار نشاط شخصي. لا شيء في هذه الصفحة يُعدّ نصيحة مالية أو عرضًا أو دعوة للاستثمار، ولا نتائج مضمونة أو مُلمَّح إليها.',
  },
} as const;
