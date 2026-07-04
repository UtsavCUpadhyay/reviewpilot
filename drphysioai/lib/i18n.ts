/**
 * DrPhysioAI i18n — English / Hindi / Gujarati.
 *
 * Pure data (safe to import in client components). The active locale is read
 * from the `locale` cookie server-side via `lib/i18n-server.ts`.
 */

export const locales = ["en", "hi", "gu"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  hi: "हिंदी",
  gu: "ગુજરાતી",
};

export const localeShort: Record<Locale, string> = {
  en: "EN",
  hi: "हिं",
  gu: "ગુ",
};

export const LOCALE_COOKIE = "locale";

export function isLocale(v: string | undefined | null): v is Locale {
  return !!v && (locales as readonly string[]).includes(v);
}

interface TitleParts {
  eyebrow: string;
  titlePre: string;
  titleAccent: string;
  desc?: string;
}

export interface Dict {
  language: string;
  nav: {
    aiLearning: string;
    consultation: string;
    conditions: string;
    exercise: string;
    liveClasses: string;
    pricing: string;
  };
  actions: { login: string; startFree: string; whatsapp: string };
  hero: {
    badge: string;
    titleLead: string;
    titleAccent: string;
    subtitleStrong: string;
    subtitleRest: string;
    ctaStart: string;
    ctaBook: string;
    watchDemo: string;
    trustUsers: string;
    trustRating: string;
    trustReviewed: string;
    whatsappChat: string;
  };
  audiences: string[];
  home: {
    stats: { label: string; hint: string }[];
    features: TitleParts & { items: { title: string; desc: string; tag: string }[] };
    how: TitleParts & { stepWord: string; steps: { title: string; desc: string }[] };
    consultation: TitleParts & {
      services: { title: string; desc: string }[];
      band: { badge: string; title: string; desc: string; book: string };
    };
    testimonials: TitleParts & { items: { quote: string; role: string }[] };
    pricing: TitleParts & {
      footNote: string;
      mostPopular: string;
      plans: { desc: string; period: string; features: string[]; cta: string }[];
    };
    faq: { eyebrow: string; title: string; items: { q: string; a: string }[] };
    cta: { badge: string; title: string; subtitle: string; start: string; book: string; whatsapp: string };
    live: TitleParts & { seeSchedule: string };
    footer: {
      tagline: string;
      columns: { title: string; links: string[] }[];
      location: string;
      foundedBy: string;
      disclaimer: string;
    };
  };
}

const en: Dict = {
  language: "Language",
  nav: {
    aiLearning: "AI Learning",
    consultation: "Consultation",
    conditions: "Conditions",
    exercise: "Exercise Programs",
    liveClasses: "Live Classes",
    pricing: "Pricing",
  },
  actions: { login: "Login", startFree: "Start Free", whatsapp: "WhatsApp us" },
  hero: {
    badge: "AI + Expert Physiotherapists · Made in India",
    titleLead: "Your Personal",
    titleAccent: "AI Physiotherapist",
    subtitleStrong: "Learn. Recover. Move better.",
    subtitleRest:
      "Study smarter with an AI tutor, or book a real physiotherapist — all in one beautifully simple app for every age.",
    ctaStart: "Start Free",
    ctaBook: "Book Consultation",
    watchDemo: "Watch Demo",
    trustUsers: "Loved by 1.7L+ users",
    trustRating: "4.9/5 rating",
    trustReviewed: "Doctor-reviewed",
    whatsappChat: "Chat on WhatsApp",
  },
  audiences: [
    "Physiotherapy students",
    "Patients",
    "Elderly care",
    "Doctors & interns",
    "Fitness enthusiasts",
    "Parents",
  ],
  home: {
    stats: [
      { label: "Students helped", hint: "across India" },
      { label: "Patients treated", hint: "online & at home" },
      { label: "Consultations completed", hint: "with experts" },
      { label: "AI questions answered", hint: "24/7 tutor" },
    ],
    features: {
      eyebrow: "AI Learning",
      titlePre: "An AI tutor that explains like your",
      titleAccent: "favourite professor",
      desc: "From first-year anatomy to final-year OSCE — get notes, revision, quizzes and voice answers tailored to exactly how you learn.",
      items: [
        { title: "AI Notes & Concepts", tag: "Learn", desc: "Anatomy, physiology, biomechanics, neuro, ortho — explained short, detailed, or illustrated. You choose the depth." },
        { title: "PDF → Beautiful Notes", tag: "Study", desc: "Connect Google Drive and we rewrite your university PDFs into professionally designed notes — never raw uploads." },
        { title: "Exam & OSCE Prep", tag: "Revise", desc: "Auto-generated MCQs, flashcards, mind-maps, case studies and clinical-reasoning drills tuned to your exam." },
        { title: "Voice AI Tutor", tag: "Ask", desc: "Ask out loud in English, Hindi or Gujarati. Get step-by-step walkthroughs like a professor beside you." },
        { title: "Image & X-ray Analysis", tag: "Analyse", desc: "Upload a diagram, slide or scan and get a clear, evidence-based explanation in seconds." },
        { title: "Streaks & Achievements", tag: "Grow", desc: "Daily quizzes, study streaks, badges and a personal dashboard that keeps you coming back." },
      ],
    },
    how: {
      eyebrow: "How it works",
      titlePre: "Simple enough for a 12-year-old,",
      titleAccent: "powerful enough for a professor",
      desc: "Three steps. No jargon. No confusion.",
      stepWord: "STEP",
      steps: [
        { title: "Ask or book", desc: "Chat with the AI tutor, or book a physiotherapist in a couple of taps." },
        { title: "Get a personal plan", desc: "AI-crafted notes, a study path, or a doctor-designed exercise program made for you." },
        { title: "Track & improve", desc: "Follow your progress, streaks and reports — recover faster and score higher." },
      ],
    },
    consultation: {
      eyebrow: "Doctor Consultation",
      titlePre: "Real physiotherapists,",
      titleAccent: "from your home",
      desc: "Book a licensed physio in a couple of taps. Video sessions, home exercise programs, reports and WhatsApp reminders included.",
      services: [
        { title: "Video Consultation", desc: "Face-to-face with licensed physiotherapists." },
        { title: "Exercise Prescription", desc: "A personalised home program that adapts to you." },
        { title: "Pain Management", desc: "Back, neck, knee and joint pain — done right." },
        { title: "Post-Surgical Rehab", desc: "Guided recovery after surgery, step by step." },
        { title: "Sports Injury Rehab", desc: "Return to play, stronger and safer." },
        { title: "Neuro & Elderly Care", desc: "Gentle, expert care for every age." },
      ],
      band: {
        badge: "Free 5-min consult every month",
        title: "Book your first session in under a minute",
        desc: "Calendar slots, UPI payment, confirmation & WhatsApp reminder — done.",
        book: "Book Consultation",
      },
    },
    testimonials: {
      eyebrow: "Loved across India",
      titlePre: "Students recover their marks.",
      titleAccent: "Patients recover their lives.",
      items: [
        { role: "Final-year BPT student, Pune", quote: "I cleared my BPT exams using DrPhysioAI's notes and OSCE practice. It explains like my favourite professor — but at 2am." },
        { role: "Patient, Ahmedabad", quote: "After my knee surgery I couldn't travel. The video consultations and home program got me walking pain-free in weeks." },
        { role: "Daughter & caregiver, Mumbai", quote: "My mother is 71. The Senior mode and large fonts mean she books her own balance classes now. Beautifully simple." },
      ],
    },
    pricing: {
      eyebrow: "Pricing",
      titlePre: "Premium care at an",
      titleAccent: "Indian price",
      desc: "Start free forever. Upgrade any time. UPI, cards & net-banking with GST invoices — cancel whenever you like.",
      footNote: "Every registered user gets 1 free 5-min consultation & 1 free live class every month.",
      mostPopular: "Most popular",
      plans: [
        { desc: "Start learning & healing today.", period: "forever", cta: "Start Free", features: ["Basic AI notes & concepts", "Daily AI question limit", "1 free 5-min consultation / month", "1 free live exercise class / month"] },
        { desc: "Everything a physio student needs to top the class.", period: "/ month", cta: "Go Ultimate", features: ["Unlimited AI notes & voice tutor", "Exam prep, OSCE, case studies", "PDF → designed notes (Drive)", "Flashcards, MCQs & mind-maps", "Priority support"] },
        { desc: "AI + doctor + exercise + live, all-in-one.", period: "/ month", cta: "Get Complete Care", features: ["Everything in Ultimate", "Monthly 1:1 physio consultation", "Personalised exercise program", "Unlimited live classes", "Personal physiotherapist"] },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Questions, answered",
      items: [
        { q: "Is DrPhysioAI a replacement for seeing a doctor?", a: "No. Our AI helps you learn and manage everyday care, and our licensed physiotherapists provide real consultations. For emergencies or medical diagnosis, always consult a qualified doctor in person." },
        { q: "Which languages are supported?", a: "English, Hindi and Gujarati today — with more regional Indian languages coming. The voice tutor understands and replies in your language." },
        { q: "How does the free plan work?", a: "Every registered user gets basic AI learning, one free 5-minute consultation, and one free live exercise class every month — no card required." },
        { q: "Can I use it on my phone?", a: "Yes. DrPhysioAI is mobile-first, works offline for downloads, installs as an app (PWA), and native Android & iOS apps are on the way." },
        { q: "How do payments work in India?", a: "We support UPI, Google Pay, PhonePe, Paytm, cards and net-banking, with GST invoices and easy cancellation." },
      ],
    },
    cta: {
      badge: "Join 1.7 lakh+ learners & patients",
      title: "Learn. Recover. Move better — starting today.",
      subtitle: "Your personal AI physiotherapist and a real doctor, in one app. Free to start — no card needed.",
      start: "Start Free",
      book: "Book Consultation",
      whatsapp: "WhatsApp us",
    },
    live: {
      eyebrow: "Live Classes",
      titlePre: "Weekly live exercise classes",
      titleAccent: "for everyone",
      desc: "Join guided sessions from home — from prenatal care to sports performance. One free class every month for every member.",
      seeSchedule: "See the full weekly schedule",
    },
    footer: {
      tagline: "India's AI-powered physiotherapy platform for learning, recovery and expert online consultation.",
      columns: [
        { title: "Platform", links: ["AI Learning", "Doctor Consultation", "Exercise Programs", "Live Classes", "Pricing"] },
        { title: "Company", links: ["About Us", "Our Story", "Careers", "Blog", "Contact"] },
        { title: "For", links: ["Students", "Patients", "Doctors", "Elderly Care", "Fitness"] },
        { title: "Legal", links: ["Privacy Policy", "Terms", "Refund Policy", "Medical Disclaimer", "Cookie Policy"] },
      ],
      location: "Gujarat, India · Serving all of India",
      foundedBy: "Founded by",
      disclaimer: "Not a substitute for emergency medical care. For emergencies, contact your local hospital.",
    },
  },
};

const hi: Dict = {
  language: "भाषा",
  nav: {
    aiLearning: "एआई लर्निंग",
    consultation: "परामर्श",
    conditions: "बीमारियाँ",
    exercise: "एक्सरसाइज़ प्रोग्राम",
    liveClasses: "लाइव क्लासेस",
    pricing: "मूल्य",
  },
  actions: { login: "लॉग इन", startFree: "फ्री शुरू करें", whatsapp: "व्हाट्सएप करें" },
  hero: {
    badge: "एआई + विशेषज्ञ फिजियोथेरेपिस्ट · मेड इन इंडिया",
    titleLead: "आपका अपना",
    titleAccent: "एआई फिजियोथेरेपिस्ट",
    subtitleStrong: "सीखें। ठीक हों। बेहतर चलें।",
    subtitleRest:
      "एआई ट्यूटर के साथ स्मार्ट पढ़ाई करें, या असली फिजियोथेरेपिस्ट बुक करें — हर उम्र के लिए एक ही सुंदर, सरल ऐप में।",
    ctaStart: "फ्री शुरू करें",
    ctaBook: "परामर्श बुक करें",
    watchDemo: "डेमो देखें",
    trustUsers: "1.7 लाख+ यूज़र्स का भरोसा",
    trustRating: "4.9/5 रेटिंग",
    trustReviewed: "डॉक्टर-समीक्षित",
    whatsappChat: "व्हाट्सएप पर चैट करें",
  },
  audiences: [
    "फिजियोथेरेपी छात्र",
    "मरीज़",
    "बुज़ुर्गों की देखभाल",
    "डॉक्टर और इंटर्न",
    "फिटनेस प्रेमी",
    "माता-पिता",
  ],
  home: {
    stats: [
      { label: "छात्रों की मदद की", hint: "पूरे भारत में" },
      { label: "मरीज़ों का इलाज", hint: "ऑनलाइन और घर पर" },
      { label: "परामर्श पूरे हुए", hint: "विशेषज्ञों के साथ" },
      { label: "एआई सवालों के जवाब", hint: "24/7 ट्यूटर" },
    ],
    features: {
      eyebrow: "एआई लर्निंग",
      titlePre: "एक एआई ट्यूटर जो समझाए जैसे आपके",
      titleAccent: "पसंदीदा प्रोफेसर",
      desc: "पहले साल की एनाटॉमी से लेकर अंतिम साल की OSCE तक — नोट्स, रिवीज़न, क्विज़ और वॉइस जवाब, ठीक वैसे जैसे आप सीखते हैं।",
      items: [
        { title: "एआई नोट्स और कॉन्सेप्ट", tag: "सीखें", desc: "एनाटॉमी, फिजियोलॉजी, बायोमैकेनिक्स, न्यूरो, ऑर्थो — छोटा, विस्तृत या चित्रों के साथ। गहराई आप चुनें।" },
        { title: "PDF → सुंदर नोट्स", tag: "पढ़ें", desc: "गूगल ड्राइव जोड़ें और हम आपकी यूनिवर्सिटी PDF को पेशेवर, सुंदर नोट्स में बदल देते हैं — कभी कच्ची फाइल नहीं।" },
        { title: "परीक्षा और OSCE तैयारी", tag: "दोहराएँ", desc: "आपकी परीक्षा के अनुसार MCQ, फ्लैशकार्ड, माइंड-मैप, केस स्टडी और क्लिनिकल रीज़निंग अभ्यास।" },
        { title: "वॉइस एआई ट्यूटर", tag: "पूछें", desc: "अंग्रेज़ी, हिंदी या गुजराती में बोलकर पूछें। प्रोफेसर की तरह कदम-दर-कदम समझ पाएँ।" },
        { title: "इमेज और एक्स-रे विश्लेषण", tag: "विश्लेषण", desc: "कोई डायग्राम, स्लाइड या स्कैन अपलोड करें और सेकंडों में स्पष्ट, प्रमाण-आधारित व्याख्या पाएँ।" },
        { title: "स्ट्रीक और उपलब्धियाँ", tag: "बढ़ें", desc: "रोज़ की क्विज़, स्टडी स्ट्रीक, बैज और एक निजी डैशबोर्ड जो आपको वापस लाता रहे।" },
      ],
    },
    how: {
      eyebrow: "यह कैसे काम करता है",
      titlePre: "12 साल के बच्चे के लिए भी आसान,",
      titleAccent: "प्रोफेसर के लिए भी शक्तिशाली",
      desc: "तीन कदम। कोई कठिन शब्द नहीं। कोई उलझन नहीं।",
      stepWord: "कदम",
      steps: [
        { title: "पूछें या बुक करें", desc: "एआई ट्यूटर से चैट करें, या कुछ ही टैप में फिजियोथेरेपिस्ट बुक करें।" },
        { title: "निजी प्लान पाएँ", desc: "एआई-निर्मित नोट्स, एक स्टडी पाथ, या डॉक्टर-डिज़ाइन किया एक्सरसाइज़ प्रोग्राम — आपके लिए।" },
        { title: "ट्रैक करें और सुधारें", desc: "अपनी प्रगति, स्ट्रीक और रिपोर्ट देखें — तेज़ी से ठीक हों और बेहतर स्कोर करें।" },
      ],
    },
    consultation: {
      eyebrow: "डॉक्टर परामर्श",
      titlePre: "असली फिजियोथेरेपिस्ट,",
      titleAccent: "आपके घर से",
      desc: "कुछ ही टैप में लाइसेंस-प्राप्त फिजियो बुक करें। वीडियो सेशन, होम एक्सरसाइज़ प्रोग्राम, रिपोर्ट और व्हाट्सएप रिमाइंडर शामिल।",
      services: [
        { title: "वीडियो परामर्श", desc: "लाइसेंस-प्राप्त फिजियोथेरेपिस्ट से आमने-सामने।" },
        { title: "एक्सरसाइज़ प्रिस्क्रिप्शन", desc: "एक निजी होम प्रोग्राम जो आपके अनुसार ढलता है।" },
        { title: "दर्द प्रबंधन", desc: "पीठ, गर्दन, घुटने और जोड़ों का दर्द — सही तरीके से।" },
        { title: "सर्जरी के बाद रिहैब", desc: "सर्जरी के बाद कदम-दर-कदम मार्गदर्शित रिकवरी।" },
        { title: "स्पोर्ट्स इंजरी रिहैब", desc: "अधिक मज़बूत और सुरक्षित होकर खेल में वापसी।" },
        { title: "न्यूरो और बुज़ुर्ग देखभाल", desc: "हर उम्र के लिए कोमल, विशेषज्ञ देखभाल।" },
      ],
      band: {
        badge: "हर महीने मुफ़्त 5-मिनट परामर्श",
        title: "एक मिनट से कम में अपना पहला सेशन बुक करें",
        desc: "कैलेंडर स्लॉट, UPI भुगतान, पुष्टि और व्हाट्सएप रिमाइंडर — हो गया।",
        book: "परामर्श बुक करें",
      },
    },
    testimonials: {
      eyebrow: "पूरे भारत में पसंदीदा",
      titlePre: "छात्र अपने अंक वापस पाते हैं।",
      titleAccent: "मरीज़ अपनी ज़िंदगी वापस पाते हैं।",
      items: [
        { role: "अंतिम वर्ष BPT छात्रा, पुणे", quote: "मैंने DrPhysioAI के नोट्स और OSCE अभ्यास से अपनी BPT परीक्षा पास की। यह मेरे पसंदीदा प्रोफेसर की तरह समझाता है — वो भी रात 2 बजे।" },
        { role: "मरीज़, अहमदाबाद", quote: "घुटने की सर्जरी के बाद मैं यात्रा नहीं कर सकता था। वीडियो परामर्श और होम प्रोग्राम से कुछ ही हफ़्तों में बिना दर्द चलने लगा।" },
        { role: "बेटी और देखभालकर्ता, मुंबई", quote: "मेरी माँ 71 की हैं। सीनियर मोड और बड़े फ़ॉन्ट की वजह से अब वे खुद अपनी बैलेंस क्लास बुक करती हैं। बेहद सरल।" },
      ],
    },
    pricing: {
      eyebrow: "मूल्य",
      titlePre: "प्रीमियम देखभाल, एक",
      titleAccent: "भारतीय कीमत पर",
      desc: "हमेशा के लिए फ्री शुरू करें। कभी भी अपग्रेड करें। UPI, कार्ड और नेट-बैंकिंग, GST इनवॉइस के साथ — जब चाहें रद्द करें।",
      footNote: "हर रजिस्टर्ड यूज़र को हर महीने 1 मुफ़्त 5-मिनट परामर्श और 1 मुफ़्त लाइव क्लास मिलती है।",
      mostPopular: "सबसे लोकप्रिय",
      plans: [
        { desc: "आज ही सीखना और ठीक होना शुरू करें।", period: "हमेशा के लिए", cta: "फ्री शुरू करें", features: ["बेसिक एआई नोट्स और कॉन्सेप्ट", "रोज़ाना एआई सवाल सीमा", "1 मुफ़्त 5-मिनट परामर्श / माह", "1 मुफ़्त लाइव एक्सरसाइज़ क्लास / माह"] },
        { desc: "क्लास में टॉप करने के लिए हर ज़रूरत।", period: "/ माह", cta: "अल्टीमेट लें", features: ["असीमित एआई नोट्स और वॉइस ट्यूटर", "परीक्षा तैयारी, OSCE, केस स्टडी", "PDF → डिज़ाइन नोट्स (ड्राइव)", "फ्लैशकार्ड, MCQ और माइंड-मैप", "प्राथमिकता सहायता"] },
        { desc: "एआई + डॉक्टर + एक्सरसाइज़ + लाइव, सब एक साथ।", period: "/ माह", cta: "कम्प्लीट केयर लें", features: ["अल्टीमेट का सब कुछ", "मासिक 1:1 फिजियो परामर्श", "निजी एक्सरसाइज़ प्रोग्राम", "असीमित लाइव क्लास", "निजी फिजियोथेरेपिस्ट"] },
      ],
    },
    faq: {
      eyebrow: "सामान्य प्रश्न",
      title: "आपके सवाल, जवाबों के साथ",
      items: [
        { q: "क्या DrPhysioAI डॉक्टर को दिखाने का विकल्प है?", a: "नहीं। हमारा एआई आपको सीखने और रोज़मर्रा की देखभाल में मदद करता है, और हमारे लाइसेंस-प्राप्त फिजियोथेरेपिस्ट असली परामर्श देते हैं। आपात स्थिति या निदान के लिए हमेशा योग्य डॉक्टर से व्यक्तिगत रूप से मिलें।" },
        { q: "कौन-सी भाषाएँ समर्थित हैं?", a: "आज अंग्रेज़ी, हिंदी और गुजराती — और भी भारतीय भाषाएँ जल्द आ रही हैं। वॉइस ट्यूटर आपकी भाषा समझता और उसी में जवाब देता है।" },
        { q: "फ्री प्लान कैसे काम करता है?", a: "हर रजिस्टर्ड यूज़र को बेसिक एआई लर्निंग, एक मुफ़्त 5-मिनट परामर्श और हर महीने एक मुफ़्त लाइव एक्सरसाइज़ क्लास मिलती है — बिना कार्ड के।" },
        { q: "क्या मैं इसे फ़ोन पर इस्तेमाल कर सकता/सकती हूँ?", a: "हाँ। DrPhysioAI मोबाइल-फर्स्ट है, डाउनलोड के लिए ऑफ़लाइन चलता है, ऐप (PWA) के रूप में इंस्टॉल होता है, और नेटिव Android व iOS ऐप जल्द आ रहे हैं।" },
        { q: "भारत में भुगतान कैसे होता है?", a: "हम UPI, Google Pay, PhonePe, Paytm, कार्ड और नेट-बैंकिंग का समर्थन करते हैं, GST इनवॉइस और आसान रद्दीकरण के साथ।" },
      ],
    },
    cta: {
      badge: "1.7 लाख+ शिक्षार्थियों और मरीज़ों से जुड़ें",
      title: "सीखें। ठीक हों। बेहतर चलें — आज से।",
      subtitle: "आपका निजी एआई फिजियोथेरेपिस्ट और एक असली डॉक्टर, एक ही ऐप में। फ्री शुरू करें — कार्ड की ज़रूरत नहीं।",
      start: "फ्री शुरू करें",
      book: "परामर्श बुक करें",
      whatsapp: "व्हाट्सएप करें",
    },
    live: {
      eyebrow: "लाइव क्लासेस",
      titlePre: "साप्ताहिक लाइव एक्सरसाइज़ क्लास",
      titleAccent: "सबके लिए",
      desc: "घर से ही मार्गदर्शित सेशन में शामिल हों — प्रीनेटल देखभाल से लेकर स्पोर्ट्स परफ़ॉर्मेंस तक। हर सदस्य को हर महीने एक मुफ़्त क्लास।",
      seeSchedule: "पूरा साप्ताहिक शेड्यूल देखें",
    },
    footer: {
      tagline: "सीखने, रिकवरी और विशेषज्ञ ऑनलाइन परामर्श के लिए भारत का एआई-आधारित फिजियोथेरेपी प्लेटफ़ॉर्म।",
      columns: [
        { title: "प्लेटफ़ॉर्म", links: ["एआई लर्निंग", "डॉक्टर परामर्श", "एक्सरसाइज़ प्रोग्राम", "लाइव क्लासेस", "मूल्य"] },
        { title: "कंपनी", links: ["हमारे बारे में", "हमारी कहानी", "करियर", "ब्लॉग", "संपर्क"] },
        { title: "किसके लिए", links: ["छात्र", "मरीज़", "डॉक्टर", "बुज़ुर्ग देखभाल", "फिटनेस"] },
        { title: "कानूनी", links: ["प्राइवेसी पॉलिसी", "शर्तें", "रिफंड पॉलिसी", "मेडिकल डिस्क्लेमर", "कुकी पॉलिसी"] },
      ],
      location: "गुजरात, भारत · पूरे भारत में सेवा",
      foundedBy: "संस्थापक",
      disclaimer: "आपातकालीन चिकित्सा का विकल्प नहीं। आपात स्थिति में अपने नज़दीकी अस्पताल से संपर्क करें।",
    },
  },
};

const gu: Dict = {
  language: "ભાષા",
  nav: {
    aiLearning: "એઆઈ લર્નિંગ",
    consultation: "પરામર્શ",
    conditions: "સ્થિતિઓ",
    exercise: "એક્સરસાઇઝ પ્રોગ્રામ",
    liveClasses: "લાઇવ ક્લાસ",
    pricing: "કિંમત",
  },
  actions: { login: "લૉગ ઇન", startFree: "ફ્રી શરૂ કરો", whatsapp: "વ્હૉટ્સએપ કરો" },
  hero: {
    badge: "એઆઈ + નિષ્ણાત ફિઝિયોથેરાપિસ્ટ · મેડ ઇન ઇન્ડિયા",
    titleLead: "તમારો પોતાનો",
    titleAccent: "એઆઈ ફિઝિયોથેરાપિસ્ટ",
    subtitleStrong: "શીખો. સાજા થાઓ. સારી રીતે ચાલો.",
    subtitleRest:
      "એઆઈ ટ્યુટર સાથે સ્માર્ટ અભ્યાસ કરો, અથવા સાચા ફિઝિયોથેરાપિસ્ટને બુક કરો — દરેક ઉંમર માટે એક જ સુંદર, સરળ એપમાં.",
    ctaStart: "ફ્રી શરૂ કરો",
    ctaBook: "પરામર્શ બુક કરો",
    watchDemo: "ડેમો જુઓ",
    trustUsers: "1.7 લાખ+ યુઝર્સનો વિશ્વાસ",
    trustRating: "4.9/5 રેટિંગ",
    trustReviewed: "ડૉક્ટર-સમીક્ષિત",
    whatsappChat: "વ્હૉટ્સએપ પર ચેટ કરો",
  },
  audiences: [
    "ફિઝિયોથેરાપી વિદ્યાર્થીઓ",
    "દર્દીઓ",
    "વૃદ્ધોની સંભાળ",
    "ડૉક્ટર અને ઇન્ટર્ન",
    "ફિટનેસ પ્રેમીઓ",
    "માતાપિતા",
  ],
  home: {
    stats: [
      { label: "વિદ્યાર્થીઓને મદદ કરી", hint: "સમગ્ર ભારતમાં" },
      { label: "દર્દીઓની સારવાર", hint: "ઓનલાઇન અને ઘરે" },
      { label: "પરામર્શ પૂર્ણ થયા", hint: "નિષ્ણાતો સાથે" },
      { label: "એઆઈ પ્રશ્નોના જવાબ", hint: "24/7 ટ્યુટર" },
    ],
    features: {
      eyebrow: "એઆઈ લર્નિંગ",
      titlePre: "એક એઆઈ ટ્યુટર જે સમજાવે તમારા",
      titleAccent: "પ્રિય પ્રોફેસરની જેમ",
      desc: "પ્રથમ વર્ષની એનાટૉમીથી અંતિમ વર્ષની OSCE સુધી — નોટ્સ, રિવિઝન, ક્વિઝ અને વૉઇસ જવાબ, બરાબર જેમ તમે શીખો છો.",
      items: [
        { title: "એઆઈ નોટ્સ અને કૉન્સેપ્ટ", tag: "શીખો", desc: "એનાટૉમી, ફિઝિયોલૉજી, બાયોમિકેનિક્સ, ન્યુરો, ઑર્થો — ટૂંકું, વિગતવાર કે ચિત્રો સાથે. ઊંડાણ તમે પસંદ કરો." },
        { title: "PDF → સુંદર નોટ્સ", tag: "અભ્યાસ", desc: "ગૂગલ ડ્રાઇવ જોડો અને અમે તમારી યુનિવર્સિટી PDF ને વ્યાવસાયિક, સુંદર નોટ્સમાં ફેરવીએ છીએ — ક્યારેય કાચી ફાઇલ નહીં." },
        { title: "પરીક્ષા અને OSCE તૈયારી", tag: "રિવિઝન", desc: "તમારી પરીક્ષા મુજબ MCQ, ફ્લેશકાર્ડ, માઇન્ડ-મેપ, કેસ સ્ટડી અને ક્લિનિકલ રીઝનિંગ અભ્યાસ." },
        { title: "વૉઇસ એઆઈ ટ્યુટર", tag: "પૂછો", desc: "અંગ્રેજી, હિન્દી કે ગુજરાતીમાં બોલીને પૂછો. પ્રોફેસરની જેમ પગલું-દર-પગલું સમજો." },
        { title: "ઇમેજ અને એક્સ-રે વિશ્લેષણ", tag: "વિશ્લેષણ", desc: "કોઈ ડાયાગ્રામ, સ્લાઇડ કે સ્કૅન અપલોડ કરો અને સેકંડોમાં સ્પષ્ટ, પુરાવા-આધારિત સમજૂતી મેળવો." },
        { title: "સ્ટ્રીક અને સિદ્ધિઓ", tag: "વિકાસ", desc: "રોજની ક્વિઝ, સ્ટડી સ્ટ્રીક, બેજ અને એક વ્યક્તિગત ડેશબોર્ડ જે તમને પાછા લાવતું રહે." },
      ],
    },
    how: {
      eyebrow: "તે કેવી રીતે કામ કરે છે",
      titlePre: "12 વર્ષના બાળક માટે પણ સરળ,",
      titleAccent: "પ્રોફેસર માટે પણ શક્તિશાળી",
      desc: "ત્રણ પગલાં. કોઈ અઘરા શબ્દ નહીં. કોઈ મૂંઝવણ નહીં.",
      stepWord: "પગલું",
      steps: [
        { title: "પૂછો કે બુક કરો", desc: "એઆઈ ટ્યુટર સાથે ચેટ કરો, અથવા થોડા જ ટૅપમાં ફિઝિયોથેરાપિસ્ટ બુક કરો." },
        { title: "વ્યક્તિગત પ્લાન મેળવો", desc: "એઆઈ-બનાવેલ નોટ્સ, એક સ્ટડી પાથ, કે ડૉક્ટર-ડિઝાઇન કરેલ એક્સરસાઇઝ પ્રોગ્રામ — તમારા માટે." },
        { title: "ટ્રૅક કરો અને સુધારો", desc: "તમારી પ્રગતિ, સ્ટ્રીક અને રિપોર્ટ જુઓ — ઝડપથી સાજા થાઓ અને વધુ સ્કોર કરો." },
      ],
    },
    consultation: {
      eyebrow: "ડૉક્ટર પરામર્શ",
      titlePre: "સાચા ફિઝિયોથેરાપિસ્ટ,",
      titleAccent: "તમારા ઘરેથી",
      desc: "થોડા જ ટૅપમાં લાઇસન્સ-પ્રાપ્ત ફિઝિયો બુક કરો. વિડિયો સેશન, હોમ એક્સરસાઇઝ પ્રોગ્રામ, રિપોર્ટ અને વ્હૉટ્સએપ રિમાઇન્ડર સામેલ.",
      services: [
        { title: "વિડિયો પરામર્શ", desc: "લાઇસન્સ-પ્રાપ્ત ફિઝિયોથેરાપિસ્ટ સાથે રૂબરૂ." },
        { title: "એક્સરસાઇઝ પ્રિસ્ક્રિપ્શન", desc: "એક વ્યક્તિગત હોમ પ્રોગ્રામ જે તમારા મુજબ ઢળે છે." },
        { title: "દર્દ વ્યવસ્થાપન", desc: "કમર, ગરદન, ઘૂંટણ અને સાંધાનો દુખાવો — યોગ્ય રીતે." },
        { title: "સર્જરી પછીની રિહૅબ", desc: "સર્જરી પછી પગલું-દર-પગલું માર્ગદર્શિત રિકવરી." },
        { title: "સ્પોર્ટ્સ ઇજા રિહૅબ", desc: "વધુ મજબૂત અને સુરક્ષિત થઈને રમતમાં પાછા." },
        { title: "ન્યુરો અને વૃદ્ધ સંભાળ", desc: "દરેક ઉંમર માટે કોમળ, નિષ્ણાત સંભાળ." },
      ],
      band: {
        badge: "દર મહિને મફત 5-મિનિટ પરામર્શ",
        title: "એક મિનિટથી ઓછામાં તમારું પહેલું સેશન બુક કરો",
        desc: "કૅલેન્ડર સ્લોટ, UPI ચુકવણી, પુષ્ટિ અને વ્હૉટ્સએપ રિમાઇન્ડર — થઈ ગયું.",
        book: "પરામર્શ બુક કરો",
      },
    },
    testimonials: {
      eyebrow: "સમગ્ર ભારતમાં પ્રિય",
      titlePre: "વિદ્યાર્થીઓ તેમના ગુણ પાછા મેળવે છે.",
      titleAccent: "દર્દીઓ તેમનું જીવન પાછું મેળવે છે.",
      items: [
        { role: "અંતિમ વર્ષ BPT વિદ્યાર્થિની, પુણે", quote: "મેં DrPhysioAI ના નોટ્સ અને OSCE અભ્યાસથી મારી BPT પરીક્ષા પાસ કરી. તે મારા પ્રિય પ્રોફેસરની જેમ સમજાવે છે — તે પણ રાત્રે 2 વાગ્યે." },
        { role: "દર્દી, અમદાવાદ", quote: "ઘૂંટણની સર્જરી પછી હું મુસાફરી કરી શકતો ન હતો. વિડિયો પરામર્શ અને હોમ પ્રોગ્રામથી થોડા જ અઠવાડિયામાં દુખાવા વગર ચાલવા લાગ્યો." },
        { role: "પુત્રી અને સંભાળ રાખનાર, મુંબઈ", quote: "મારી માતા 71 વર્ષની છે. સિનિયર મોડ અને મોટા ફૉન્ટને કારણે હવે તેઓ પોતે તેમની બેલેન્સ ક્લાસ બુક કરે છે. ખૂબ સરળ." },
      ],
    },
    pricing: {
      eyebrow: "કિંમત",
      titlePre: "પ્રીમિયમ સંભાળ, એક",
      titleAccent: "ભારતીય કિંમતે",
      desc: "હંમેશ માટે ફ્રી શરૂ કરો. ગમે ત્યારે અપગ્રેડ કરો. UPI, કાર્ડ અને નેટ-બેન્કિંગ, GST ઇન્વૉઇસ સાથે — ગમે ત્યારે રદ કરો.",
      footNote: "દરેક રજિસ્ટર્ડ યુઝરને દર મહિને 1 મફત 5-મિનિટ પરામર્શ અને 1 મફત લાઇવ ક્લાસ મળે છે.",
      mostPopular: "સૌથી લોકપ્રિય",
      plans: [
        { desc: "આજે જ શીખવાનું અને સાજા થવાનું શરૂ કરો.", period: "હંમેશ માટે", cta: "ફ્રી શરૂ કરો", features: ["બેઝિક એઆઈ નોટ્સ અને કૉન્સેપ્ટ", "રોજની એઆઈ પ્રશ્ન મર્યાદા", "1 મફત 5-મિનિટ પરામર્શ / મહિને", "1 મફત લાઇવ એક્સરસાઇઝ ક્લાસ / મહિને"] },
        { desc: "ક્લાસમાં ટોપ કરવા માટે દરેક જરૂરિયાત.", period: "/ મહિને", cta: "અલ્ટિમેટ લો", features: ["અમર્યાદિત એઆઈ નોટ્સ અને વૉઇસ ટ્યુટર", "પરીક્ષા તૈયારી, OSCE, કેસ સ્ટડી", "PDF → ડિઝાઇન નોટ્સ (ડ્રાઇવ)", "ફ્લેશકાર્ડ, MCQ અને માઇન્ડ-મેપ", "પ્રાથમિકતા સહાય"] },
        { desc: "એઆઈ + ડૉક્ટર + એક્સરસાઇઝ + લાઇવ, બધું એકસાથે.", period: "/ મહિને", cta: "કમ્પ્લીટ કેર લો", features: ["અલ્ટિમેટનું બધું", "માસિક 1:1 ફિઝિયો પરામર્શ", "વ્યક્તિગત એક્સરસાઇઝ પ્રોગ્રામ", "અમર્યાદિત લાઇવ ક્લાસ", "વ્યક્તિગત ફિઝિયોથેરાપિસ્ટ"] },
      ],
    },
    faq: {
      eyebrow: "સામાન્ય પ્રશ્નો",
      title: "તમારા પ્રશ્નો, જવાબો સાથે",
      items: [
        { q: "શું DrPhysioAI ડૉક્ટરને મળવાનો વિકલ્પ છે?", a: "ના. અમારું એઆઈ તમને શીખવામાં અને રોજિંદી સંભાળમાં મદદ કરે છે, અને અમારા લાઇસન્સ-પ્રાપ્ત ફિઝિયોથેરાપિસ્ટ સાચા પરામર્શ આપે છે. કટોકટી કે નિદાન માટે હંમેશા લાયક ડૉક્ટરને રૂબરૂ મળો." },
        { q: "કઈ ભાષાઓ સપોર્ટેડ છે?", a: "આજે અંગ્રેજી, હિન્દી અને ગુજરાતી — વધુ ભારતીય ભાષાઓ ટૂંક સમયમાં આવી રહી છે. વૉઇસ ટ્યુટર તમારી ભાષા સમજે છે અને તેમાં જ જવાબ આપે છે." },
        { q: "ફ્રી પ્લાન કેવી રીતે કામ કરે છે?", a: "દરેક રજિસ્ટર્ડ યુઝરને બેઝિક એઆઈ લર્નિંગ, એક મફત 5-મિનિટ પરામર્શ અને દર મહિને એક મફત લાઇવ એક્સરસાઇઝ ક્લાસ મળે છે — કાર્ડ વગર." },
        { q: "શું હું તેને મારા ફોન પર વાપરી શકું?", a: "હા. DrPhysioAI મોબાઇલ-ફર્સ્ટ છે, ડાઉનલોડ માટે ઓફલાઇન ચાલે છે, એપ (PWA) તરીકે ઇન્સ્ટૉલ થાય છે, અને નેટિવ Android અને iOS એપ ટૂંક સમયમાં આવી રહી છે." },
        { q: "ભારતમાં ચુકવણી કેવી રીતે થાય છે?", a: "અમે UPI, Google Pay, PhonePe, Paytm, કાર્ડ અને નેટ-બેન્કિંગ સપોર્ટ કરીએ છીએ, GST ઇન્વૉઇસ અને સરળ રદ્દીકરણ સાથે." },
      ],
    },
    cta: {
      badge: "1.7 લાખ+ શીખનારા અને દર્દીઓ સાથે જોડાઓ",
      title: "શીખો. સાજા થાઓ. સારી રીતે ચાલો — આજથી.",
      subtitle: "તમારો વ્યક્તિગત એઆઈ ફિઝિયોથેરાપિસ્ટ અને એક સાચો ડૉક્ટર, એક જ એપમાં. ફ્રી શરૂ કરો — કાર્ડની જરૂર નથી.",
      start: "ફ્રી શરૂ કરો",
      book: "પરામર્શ બુક કરો",
      whatsapp: "વ્હૉટ્સએપ કરો",
    },
    live: {
      eyebrow: "લાઇવ ક્લાસ",
      titlePre: "સાપ્તાહિક લાઇવ એક્સરસાઇઝ ક્લાસ",
      titleAccent: "બધા માટે",
      desc: "ઘરેથી જ માર્ગદર્શિત સેશનમાં જોડાઓ — પ્રિનેટલ સંભાળથી સ્પોર્ટ્સ પર્ફોર્મન્સ સુધી. દરેક સભ્યને દર મહિને એક મફત ક્લાસ.",
      seeSchedule: "આખું સાપ્તાહિક શેડ્યૂલ જુઓ",
    },
    footer: {
      tagline: "શીખવા, રિકવરી અને નિષ્ણાત ઓનલાઇન પરામર્શ માટે ભારતનું એઆઈ-આધારિત ફિઝિયોથેરાપી પ્લેટફોર્મ.",
      columns: [
        { title: "પ્લેટફોર્મ", links: ["એઆઈ લર્નિંગ", "ડૉક્ટર પરામર્શ", "એક્સરસાઇઝ પ્રોગ્રામ", "લાઇવ ક્લાસ", "કિંમત"] },
        { title: "કંપની", links: ["અમારા વિશે", "અમારી વાર્તા", "કારકિર્દી", "બ્લોગ", "સંપર્ક"] },
        { title: "કોના માટે", links: ["વિદ્યાર્થીઓ", "દર્દીઓ", "ડૉક્ટરો", "વૃદ્ધ સંભાળ", "ફિટનેસ"] },
        { title: "કાનૂની", links: ["પ્રાઇવસી પોલિસી", "શરતો", "રિફંડ પોલિસી", "મેડિકલ ડિસ્ક્લેમર", "કૂકી પોલિસી"] },
      ],
      location: "ગુજરાત, ભારત · સમગ્ર ભારતમાં સેવા",
      foundedBy: "સ્થાપક",
      disclaimer: "કટોકટીની તબીબી સંભાળનો વિકલ્પ નથી. કટોકટીમાં તમારી નજીકની હોસ્પિટલનો સંપર્ક કરો.",
    },
  },
};

const dicts: Record<Locale, Dict> = { en, hi, gu };

/** Returns the dictionary for a locale (English for unknown locales). */
export function getDict(locale: Locale): Dict {
  return dicts[locale] ?? en;
}
