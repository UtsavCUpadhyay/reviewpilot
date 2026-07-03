/**
 * DrPhysioAI — homepage content.
 * Keeping copy in one place makes it easy to localize (Hindi / Gujarati) later.
 */

export const site = {
  name: "DrPhysioAI",
  tagline: "Your Personal AI Physiotherapist",
  whatsapp: "+91 97372 06393",
  whatsappLink: "https://wa.me/919737206393",
  email: "UtsavCUpadhyay@gmail.com",
  founder: "Dr. Utsav Chiragkumar Upadhyay",
};

export const nav = [
  { label: "AI Learning", href: "/ai" },
  { label: "Consultation", href: "/consultation" },
  { label: "Exercise Programs", href: "/consultation#services" },
  { label: "Live Classes", href: "/live-classes" },
  { label: "Pricing", href: "/#pricing" },
];

export const stats = [
  { value: "50,000+", label: "Students helped", hint: "across India" },
  { value: "1,20,000+", label: "Patients treated", hint: "online & at home" },
  { value: "18,000+", label: "Consultations completed", hint: "with experts" },
  { value: "4.2 Cr+", label: "AI questions answered", hint: "24/7 tutor" },
];

export const audiences = [
  "Physiotherapy students",
  "Patients",
  "Elderly care",
  "Doctors & interns",
  "Fitness enthusiasts",
  "Parents",
];

export const aiFeatures = [
  {
    icon: "Sparkles",
    title: "AI Notes & Concepts",
    desc: "Anatomy, physiology, biomechanics, neuro, ortho — explained short, detailed, or illustrated. You choose the depth.",
    tag: "Learn",
  },
  {
    icon: "FileText",
    title: "PDF → Beautiful Notes",
    desc: "Connect Google Drive and we rewrite your university PDFs into professionally designed notes — never raw uploads.",
    tag: "Study",
  },
  {
    icon: "Brain",
    title: "Exam & OSCE Prep",
    desc: "Auto-generated MCQs, flashcards, mind-maps, case studies and clinical-reasoning drills tuned to your exam.",
    tag: "Revise",
  },
  {
    icon: "Mic",
    title: "Voice AI Tutor",
    desc: "Ask out loud in English, Hindi or Gujarati. Get step-by-step walkthroughs like a professor beside you.",
    tag: "Ask",
  },
  {
    icon: "Image",
    title: "Image & X-ray Analysis",
    desc: "Upload a diagram, slide or scan and get a clear, evidence-based explanation in seconds.",
    tag: "Analyse",
  },
  {
    icon: "Trophy",
    title: "Streaks & Achievements",
    desc: "Daily quizzes, study streaks, badges and a personal dashboard that keeps you coming back.",
    tag: "Grow",
  },
];

export const consultationServices = [
  { icon: "Video", title: "Video Consultation", desc: "Face-to-face with licensed physiotherapists.", price: 499, mins: 30 },
  { icon: "Activity", title: "Exercise Prescription", desc: "A personalised home program that adapts to you.", price: 699, mins: 30 },
  { icon: "HeartPulse", title: "Pain Management", desc: "Back, neck, knee and joint pain — done right.", price: 599, mins: 40 },
  { icon: "Stethoscope", title: "Post-Surgical Rehab", desc: "Guided recovery after surgery, step by step.", price: 799, mins: 45 },
  { icon: "Dumbbell", title: "Sports Injury Rehab", desc: "Return to play, stronger and safer.", price: 799, mins: 45 },
  { icon: "Accessibility", title: "Neuro & Elderly Care", desc: "Gentle, expert care for every age.", price: 699, mins: 45 },
];

export const timeSlots = [
  "09:00 AM", "10:30 AM", "12:00 PM", "02:00 PM",
  "03:30 PM", "05:00 PM", "06:30 PM", "08:00 PM",
];

export const liveClasses = [
  "Stretching", "Weight Loss", "Back Pain", "Neck Pain", "Knee Pain",
  "Arthritis", "Balance", "Senior Fitness", "Prenatal", "Postnatal",
  "Office Workers", "Sports Performance",
];

/* ---------------------------------------------------------------------------
 * Live Classes page
 * ------------------------------------------------------------------------- */

export const liveClassLevels = ["All levels", "Beginner", "Intermediate", "Advanced"] as const;
export type LiveClassLevel = (typeof liveClassLevels)[number];

/** Filterable categories for the weekly schedule. */
export const liveClassCategories = [
  "All", "Pain Relief", "Mobility", "Strength", "Senior", "Prenatal", "Sports",
] as const;
export type LiveClassCategory = (typeof liveClassCategories)[number];

export interface LiveClass {
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
  time: string;          // IST, 12-hour
  title: string;
  focus: string;
  instructor: string;
  category: Exclude<LiveClassCategory, "All">;
  level: LiveClassLevel;
  mins: number;
  spots: number;         // spots left (out of capacity)
  capacity: number;
  free?: boolean;        // included in every member's free monthly class
}

/** Weekly live-class timetable (all times IST, hosted on Zoom/Google Meet). */
export const liveClassSchedule: LiveClass[] = [
  { day: "Mon", time: "07:00 AM", title: "Morning Mobility Flow", focus: "Full-body gentle stretching to start the day", instructor: "Dr. Utsav Upadhyay", category: "Mobility", level: "All levels", mins: 30, spots: 12, capacity: 40, free: true },
  { day: "Mon", time: "06:30 PM", title: "Back Pain Relief", focus: "Core activation & spine-safe movement", instructor: "Dr. Sneha Patel", category: "Pain Relief", level: "Beginner", mins: 40, spots: 6, capacity: 40 },
  { day: "Tue", time: "08:00 AM", title: "Desk Reset for Office Workers", focus: "Neck, shoulder & wrist decompression", instructor: "Dr. Ravi Menon", category: "Pain Relief", level: "All levels", mins: 25, spots: 18, capacity: 50 },
  { day: "Tue", time: "05:30 PM", title: "Knee & Joint Care", focus: "Arthritis-friendly strengthening", instructor: "Dr. Sneha Patel", category: "Pain Relief", level: "Beginner", mins: 35, spots: 9, capacity: 40 },
  { day: "Wed", time: "07:00 AM", title: "Prenatal Wellness", focus: "Safe movement & breathing for expecting mothers", instructor: "Dr. Aditi Rao", category: "Prenatal", level: "All levels", mins: 30, spots: 8, capacity: 25 },
  { day: "Wed", time: "07:00 PM", title: "Weight-Loss Circuit", focus: "Low-impact cardio + mobility", instructor: "Dr. Ravi Menon", category: "Strength", level: "Intermediate", mins: 45, spots: 4, capacity: 45 },
  { day: "Thu", time: "09:00 AM", title: "Senior Balance & Falls Prevention", focus: "Stability, coordination & confidence", instructor: "Dr. Aditi Rao", category: "Senior", level: "All levels", mins: 30, spots: 14, capacity: 30, free: true },
  { day: "Thu", time: "06:30 PM", title: "Neck & Posture Fix", focus: "Release tension, rebuild alignment", instructor: "Dr. Utsav Upadhyay", category: "Pain Relief", level: "All levels", mins: 30, spots: 11, capacity: 40 },
  { day: "Fri", time: "07:00 AM", title: "Athlete Mobility & Prehab", focus: "Injury-proofing for runners & gym-goers", instructor: "Dr. Ravi Menon", category: "Sports", level: "Advanced", mins: 40, spots: 7, capacity: 35 },
  { day: "Fri", time: "06:00 PM", title: "Full-Body Strength", focus: "Progressive resistance, physio-guided", instructor: "Dr. Sneha Patel", category: "Strength", level: "Intermediate", mins: 45, spots: 10, capacity: 45 },
  { day: "Sat", time: "08:30 AM", title: "Postnatal Recovery", focus: "Core & pelvic-floor rebuilding", instructor: "Dr. Aditi Rao", category: "Prenatal", level: "Beginner", mins: 35, spots: 6, capacity: 25 },
  { day: "Sat", time: "05:00 PM", title: "Sports Performance Lab", focus: "Agility, power & return-to-play drills", instructor: "Dr. Utsav Upadhyay", category: "Sports", level: "Advanced", mins: 45, spots: 5, capacity: 35 },
  { day: "Sun", time: "08:00 AM", title: "Sunday Slow Stretch", focus: "Restorative full-body mobility", instructor: "Dr. Sneha Patel", category: "Mobility", level: "All levels", mins: 30, spots: 20, capacity: 50, free: true },
  { day: "Sun", time: "10:00 AM", title: "Community Q&A + Guided Session", focus: "Ask a physiotherapist live, then move together", instructor: "Dr. Utsav Upadhyay", category: "Mobility", level: "All levels", mins: 40, spots: 22, capacity: 60, free: true },
];

export const liveClassHighlights = [
  { icon: "Radio", title: "Truly live", desc: "Real-time coaching with form correction — not a pre-recorded video." },
  { icon: "Users", title: "Small groups", desc: "Capped class sizes so the physiotherapist can watch and adjust you." },
  { icon: "Video", title: "Join from home", desc: "One-tap Zoom/Meet link on any device. Replays available for 7 days." },
  { icon: "HeartPulse", title: "Physio-designed", desc: "Every session is built and led by licensed physiotherapists." },
];

export const steps = [
  {
    n: "01",
    title: "Ask or book",
    desc: "Chat with the AI tutor, or book a physiotherapist in a couple of taps.",
    icon: "MousePointerClick",
  },
  {
    n: "02",
    title: "Get a personal plan",
    desc: "AI-crafted notes, a study path, or a doctor-designed exercise program made for you.",
    icon: "Route",
  },
  {
    n: "03",
    title: "Track & improve",
    desc: "Follow your progress, streaks and reports — recover faster and score higher.",
    icon: "TrendingUp",
  },
];

export const testimonials = [
  {
    quote:
      "I cleared my BPT exams using DrPhysioAI's notes and OSCE practice. It explains like my favourite professor — but at 2am.",
    name: "Ananya R.",
    role: "Final-year BPT student, Pune",
  },
  {
    quote:
      "After my knee surgery I couldn't travel. The video consultations and home program got me walking pain-free in weeks.",
    name: "Rakesh M.",
    role: "Patient, Ahmedabad",
  },
  {
    quote:
      "My mother is 71. The Senior mode and large fonts mean she books her own balance classes now. Beautifully simple.",
    name: "Priya S.",
    role: "Daughter & caregiver, Mumbai",
  },
];

export const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    highlight: false,
    desc: "Start learning & healing today.",
    features: [
      "Basic AI notes & concepts",
      "Daily AI question limit",
      "1 free 5-min consultation / month",
      "1 free live exercise class / month",
    ],
    cta: "Start Free",
  },
  {
    name: "Ultimate Student",
    price: "₹499",
    period: "/ month",
    highlight: true,
    desc: "Everything a physio student needs to top the class.",
    features: [
      "Unlimited AI notes & voice tutor",
      "Exam prep, OSCE, case studies",
      "PDF → designed notes (Drive)",
      "Flashcards, MCQs & mind-maps",
      "Priority support",
    ],
    cta: "Go Ultimate",
  },
  {
    name: "Complete Care",
    price: "₹1,499",
    period: "/ month",
    highlight: false,
    desc: "AI + doctor + exercise + live, all-in-one.",
    features: [
      "Everything in Ultimate",
      "Monthly 1:1 physio consultation",
      "Personalised exercise program",
      "Unlimited live classes",
      "Personal physiotherapist",
    ],
    cta: "Get Complete Care",
  },
];

export const faqs = [
  {
    q: "Is DrPhysioAI a replacement for seeing a doctor?",
    a: "No. Our AI helps you learn and manage everyday care, and our licensed physiotherapists provide real consultations. For emergencies or medical diagnosis, always consult a qualified doctor in person.",
  },
  {
    q: "Which languages are supported?",
    a: "English, Hindi and Gujarati today — with more regional Indian languages coming. The voice tutor understands and replies in your language.",
  },
  {
    q: "How does the free plan work?",
    a: "Every registered user gets basic AI learning, one free 5-minute consultation, and one free live exercise class every month — no card required.",
  },
  {
    q: "Can I use it on my phone?",
    a: "Yes. DrPhysioAI is mobile-first, works offline for downloads, installs as an app (PWA), and native Android & iOS apps are on the way.",
  },
  {
    q: "How do payments work in India?",
    a: "We support UPI, Google Pay, PhonePe, Paytm, cards and net-banking, with GST invoices and easy cancellation.",
  },
];

/* ---------------------------------------------------------------------------
 * AI Learning page
 * ------------------------------------------------------------------------- */

export const aiSubjects = [
  { name: "Anatomy", topics: 180, emoji: "🦴" },
  { name: "Physiology", topics: 160, emoji: "🫀" },
  { name: "Biomechanics", topics: 120, emoji: "⚙️" },
  { name: "Neurology", topics: 140, emoji: "🧠" },
  { name: "Orthopaedics", topics: 150, emoji: "🦵" },
  { name: "Cardiorespiratory", topics: 110, emoji: "🫁" },
  { name: "Sports", topics: 95, emoji: "🏃" },
  { name: "Paediatrics", topics: 80, emoji: "🧒" },
  { name: "Women's Health", topics: 70, emoji: "🌸" },
  { name: "Electrotherapy", topics: 90, emoji: "⚡" },
  { name: "Rehabilitation", topics: 130, emoji: "🩹" },
  { name: "Evidence-Based Practice", topics: 85, emoji: "📊" },
];

export const answerFormats = [
  { key: "Short", desc: "A crisp answer in seconds." },
  { key: "Detailed", desc: "Deep, exam-ready explanation." },
  { key: "Table", desc: "Structured, compare-at-a-glance." },
  { key: "Flowchart", desc: "Step-by-step clinical reasoning." },
  { key: "Simple", desc: "Plain language, zero jargon." },
];

export const aiPlans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    highlight: false,
    features: ["Basic AI notes", "Concept learning", "Daily question limit", "Community access"],
  },
  {
    name: "Notes",
    price: "₹199",
    period: "/ mo",
    highlight: false,
    features: ["Unlimited notes", "Quick answers", "PDF summary", "Revision notes"],
  },
  {
    name: "Concept Learning",
    price: "₹299",
    period: "/ mo",
    highlight: false,
    features: ["Everything in Notes", "Deep explanations", "Mind maps", "Flashcards"],
  },
  {
    name: "Live Explanation",
    price: "₹399",
    period: "/ mo",
    highlight: false,
    features: ["AI tutor walkthroughs", "Step-by-step topics", "Interactive Q&A", "Voice answers"],
  },
  {
    name: "Ultimate Student",
    price: "₹499",
    period: "/ mo",
    highlight: true,
    features: ["Everything unlocked", "Exam & OSCE prep", "Case studies", "Research assistant", "Priority support"],
  },
];

/** Canned answers for the interactive tutor demo — no API key required. */
export const demoAnswer = {
  question: "Explain the rotator cuff muscles",
  formats: {
    Short:
      "The rotator cuff is 4 muscles — **S**upraspinatus, **I**nfraspinatus, **T**eres minor, **S**ubscapularis (SITS) — that stabilise the shoulder and drive rotation.",
    Detailed:
      "The rotator cuff is a group of four muscles and their tendons that surround the glenohumeral joint, holding the humeral head in the shallow glenoid fossa. Supraspinatus initiates abduction (first 15°); infraspinatus and teres minor produce external rotation; subscapularis produces internal rotation. Together they provide dynamic stability and are a common site of impingement and tears.",
    Table:
      "| Muscle | Action | Nerve |\n|---|---|---|\n| Supraspinatus | Abduction (0–15°) | Suprascapular |\n| Infraspinatus | External rotation | Suprascapular |\n| Teres minor | External rotation | Axillary |\n| Subscapularis | Internal rotation | Subscapular |",
    Flowchart:
      "Shoulder pain on abduction →\n  1. Test painful arc (60–120°)\n  2. Empty-can test → supraspinatus\n  3. External rotation lag → infraspinatus\n  4. Lift-off test → subscapularis\n  → Suspected cuff tear → refer for USG/MRI",
    Simple:
      "Think of 4 small muscles like a cuff around your shoulder — they keep the ball of your arm bone snug in its socket and help you rotate and lift your arm. If they get injured, lifting the arm hurts.",
  } as Record<string, string>,
};
