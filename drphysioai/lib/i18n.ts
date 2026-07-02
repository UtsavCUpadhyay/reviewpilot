/**
 * DrPhysioAI i18n — English / Hindi / Gujarati.
 *
 * This file is pure data (safe to import in client components). The active
 * locale is read from the `locale` cookie server-side via `lib/i18n-server.ts`.
 * Strings not translated here fall back to English via `getDict`.
 */

export const locales = ["en", "hi", "gu"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  hi: "हिंदी",
  gu: "ગુજરાતી",
};

/** Short chip label per locale (for the switcher). */
export const localeShort: Record<Locale, string> = {
  en: "EN",
  hi: "हिं",
  gu: "ગુ",
};

export const LOCALE_COOKIE = "locale";

export function isLocale(v: string | undefined | null): v is Locale {
  return !!v && (locales as readonly string[]).includes(v);
}

export interface Dict {
  language: string;
  nav: {
    aiLearning: string;
    consultation: string;
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
}

const en: Dict = {
  language: "Language",
  nav: {
    aiLearning: "AI Learning",
    consultation: "Consultation",
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
};

const hi: Dict = {
  language: "भाषा",
  nav: {
    aiLearning: "एआई लर्निंग",
    consultation: "परामर्श",
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
};

const gu: Dict = {
  language: "ભાષા",
  nav: {
    aiLearning: "એઆઈ લર્નિંગ",
    consultation: "પરામર્શ",
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
};

const dicts: Record<Locale, Dict> = { en, hi, gu };

/** Returns the dictionary for a locale (English for unknown locales). */
export function getDict(locale: Locale): Dict {
  return dicts[locale] ?? en;
}
