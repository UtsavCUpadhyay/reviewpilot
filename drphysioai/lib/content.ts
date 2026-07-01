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
  { label: "AI Learning", href: "#ai" },
  { label: "Consultation", href: "#consultation" },
  { label: "Exercise Programs", href: "#programs" },
  { label: "Live Classes", href: "#live" },
  { label: "Pricing", href: "#pricing" },
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
  { icon: "Video", title: "Video Consultation", desc: "Face-to-face with licensed physiotherapists." },
  { icon: "Activity", title: "Exercise Prescription", desc: "A personalised home program that adapts to you." },
  { icon: "HeartPulse", title: "Pain Management", desc: "Back, neck, knee and joint pain — done right." },
  { icon: "Stethoscope", title: "Post-Surgical Rehab", desc: "Guided recovery after surgery, step by step." },
  { icon: "Dumbbell", title: "Sports Injury Rehab", desc: "Return to play, stronger and safer." },
  { icon: "Accessibility", title: "Neuro & Elderly Care", desc: "Gentle, expert care for every age." },
];

export const liveClasses = [
  "Stretching", "Weight Loss", "Back Pain", "Neck Pain", "Knee Pain",
  "Arthritis", "Balance", "Senior Fitness", "Prenatal", "Postnatal",
  "Office Workers", "Sports Performance",
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
