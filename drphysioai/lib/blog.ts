export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "tip"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  emoji: string;
  readMin: number;
  date: string; // ISO
  author: string;
  keywords: string[];
  body: BlogBlock[];
  related?: string[]; // condition slugs
};

/**
 * SEO content engine. Each article targets a high-intent Indian search query
 * ("back pain exercises at home", "physiotherapy cost in India", etc.) and links
 * back to the relevant condition page and consultation booking.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "back-pain-exercises-at-home",
    title: "7 Safe Exercises to Relieve Lower Back Pain at Home",
    excerpt:
      "Simple, physiotherapist-approved exercises you can do at home to ease lower back pain — with the right technique and safety cues.",
    category: "Back Pain",
    emoji: "🧘",
    readMin: 6,
    date: "2026-06-20",
    author: "Dr. Utsav Upadhyay",
    keywords: ["back pain exercises", "lower back pain relief", "physiotherapy at home India"],
    related: ["back-pain"],
    body: [
      { type: "p", text: "Lower back pain is one of the most common reasons Indians visit a physiotherapist. The good news: for most mechanical back pain, gentle daily movement helps more than bed rest. Here are seven safe exercises you can start at home today." },
      { type: "h2", text: "Before you begin" },
      { type: "p", text: "Move slowly, breathe normally, and stop if any exercise causes sharp or shooting pain. Mild muscle discomfort is normal; nerve pain down the leg is not — if you have that, book a consultation first." },
      { type: "h2", text: "The routine" },
      { type: "ul", items: [
        "Pelvic tilts — wake up your deep core and flatten a stiff back.",
        "Cat–cow stretch — mobilise the whole spine gently.",
        "Bird-dog — build stability that protects your back during the day.",
        "Glute bridge — strong glutes take load off the lower back.",
        "Knee-to-chest stretch — release tight lower-back muscles.",
        "Child's pose — a calming, safe end-range stretch.",
        "Short daily walks — the single best thing for a healthy back.",
      ] },
      { type: "tip", text: "Consistency beats intensity. Ten minutes every day helps far more than one long session a week." },
      { type: "h2", text: "When to see a physiotherapist" },
      { type: "p", text: "If your pain lasts more than two weeks, wakes you at night, or spreads to your legs, get assessed. A DrPhysioAI physiotherapist can build a plan around your exact cause — and follow up over WhatsApp." },
    ],
  },
  {
    slug: "tech-neck-fix-desk-workers",
    title: "Tech Neck: Why Your Neck Hurts and How to Fix It",
    excerpt:
      "Long hours on phones and laptops are causing 'tech neck'. Here's what's happening and the 5-minute daily fix.",
    category: "Neck Pain",
    emoji: "💻",
    readMin: 5,
    date: "2026-06-10",
    author: "Dr. Sneha Patel",
    keywords: ["tech neck", "neck pain from laptop", "forward head posture fix"],
    related: ["neck-pain"],
    body: [
      { type: "p", text: "Every inch your head drifts forward adds several kilograms of load on your neck muscles. Hours of looking down at a phone or laptop leaves them overworked and achy — what we now call 'tech neck'." },
      { type: "h2", text: "The signs" },
      { type: "ul", items: [
        "A dull ache at the base of the neck and between the shoulder blades.",
        "Stiffness when turning your head.",
        "Headaches that start at the back of the skull.",
        "Rounded shoulders and a head that sits ahead of your body.",
      ] },
      { type: "h2", text: "The 5-minute daily fix" },
      { type: "ul", items: [
        "Chin tucks — 10 reps to reset your head position.",
        "Neck side stretches — 20 seconds each side.",
        "Wall angels — open a rounded chest.",
        "Set your screen at eye level so you stop looking down.",
      ] },
      { type: "tip", text: "Take a 20-second posture break every 30 minutes — set a phone reminder until it becomes a habit." },
      { type: "p", text: "Try our free AI posture check to see how far your head sits forward, then follow the exercises above." },
    ],
  },
  {
    slug: "physiotherapy-cost-india-guide",
    title: "How Much Does Physiotherapy Cost in India? (2026 Guide)",
    excerpt:
      "A clear breakdown of physiotherapy costs in India — clinic visits vs online consultations — and how to get quality care affordably.",
    category: "Guides",
    emoji: "💰",
    readMin: 5,
    date: "2026-05-28",
    author: "Dr. Utsav Upadhyay",
    keywords: ["physiotherapy cost India", "online physiotherapy price", "affordable physio"],
    body: [
      { type: "p", text: "Physiotherapy costs in India vary widely by city and setting. Here's what to expect in 2026, and how online care is making expert help far more affordable." },
      { type: "h2", text: "Typical price ranges" },
      { type: "ul", items: [
        "Clinic visit (metro city): ₹500–₹1,500 per session.",
        "Home-visit physiotherapy: ₹700–₹2,000 per session, plus travel.",
        "Online video consultation: often ₹300–₹700 — no travel, same expertise.",
      ] },
      { type: "h2", text: "Why online is cheaper" },
      { type: "p", text: "Online physiotherapy removes clinic overheads and travel time. For most conditions — back and neck pain, posture, and exercise-based rehab — a video consultation plus a home exercise plan is just as effective." },
      { type: "tip", text: "At DrPhysioAI, every registered user gets a free 5-minute consultation each month, and video sessions start at ₹499 — payable instantly by UPI." },
      { type: "p", text: "You also get a free AI study tutor, an exercise library, and posture screening at no cost — so you can do a lot before you ever pay." },
    ],
  },
  {
    slug: "knee-pain-relief-without-surgery",
    title: "Knee Pain Relief Without Surgery: What Actually Works",
    excerpt:
      "Most knee pain improves with the right strengthening — not surgery. Here's the evidence-based approach physiotherapists use.",
    category: "Knee Pain",
    emoji: "🦵",
    readMin: 6,
    date: "2026-05-15",
    author: "Dr. Ravi Menon",
    keywords: ["knee pain relief", "knee pain exercises", "avoid knee surgery"],
    related: ["knee-pain"],
    body: [
      { type: "p", text: "For most people with knee pain — especially from osteoarthritis or overuse — strengthening the muscles around the joint is the single most effective treatment. Research consistently shows it can reduce pain as much as surgery for many cases." },
      { type: "h2", text: "Start with these" },
      { type: "ul", items: [
        "Quad sets — rebuild the thigh muscle that stabilises the knee.",
        "Straight-leg raises — strengthen without bending the joint.",
        "Glute bridges — strong hips reduce load on the knee.",
        "Gentle range-of-motion work to keep the joint mobile.",
      ] },
      { type: "h2", text: "What to avoid" },
      { type: "p", text: "Deep squats, running on hard surfaces and long stairs can aggravate an already-irritated knee early on. Build strength first, then reintroduce load gradually." },
      { type: "tip", text: "Pain during exercise should stay below 3 out of 10 and settle within 24 hours. If it spikes, ease off and get assessed." },
      { type: "p", text: "A DrPhysioAI physiotherapist can grade your exercises correctly and progress them safely — book a video consultation to get a plan for your knee." },
    ],
  },
  {
    slug: "physiotherapy-students-study-smarter",
    title: "How Physiotherapy Students Can Study Smarter with AI",
    excerpt:
      "From anatomy to OSCEs, an AI tutor built for physiotherapy can cut your study time. Here's how to use it well.",
    category: "For Students",
    emoji: "🎓",
    readMin: 4,
    date: "2026-04-30",
    author: "Dr. Utsav Upadhyay",
    keywords: ["physiotherapy student study tips", "BPT exam prep", "AI tutor physiotherapy"],
    body: [
      { type: "p", text: "Physiotherapy degrees are dense — anatomy, biomechanics, pathology, and clinical reasoning, all at once. An AI tutor that understands physiotherapy can help you learn faster, if you use it the right way." },
      { type: "h2", text: "Smart ways to use an AI tutor" },
      { type: "ul", items: [
        "Ask for the same concept in three formats: short, detailed, and as a table.",
        "Turn your notes into practice MCQs before an exam.",
        "Rehearse OSCE stations by role-playing the examiner.",
        "Get case studies broken down into assessment → diagnosis → plan.",
      ] },
      { type: "tip", text: "Don't just read answers — explain them back in your own words. Teaching the concept is the fastest way to lock it in." },
      { type: "p", text: "DrPhysioAI's tutor is free for students and tuned for the Indian BPT/MPT syllabus. Try it and pick the answer style that suits how you learn." },
    ],
  },
];

export const blogCategories = Array.from(new Set(blogPosts.map((p) => p.category)));

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function sortedPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}
