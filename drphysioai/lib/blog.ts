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
      { type: "p", text: "Try our AI posture check to see how far your head sits forward, then follow the exercises above." },
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
      { type: "tip", text: "At DrPhysioAI, membership starts at ₹199/month and includes a monthly video consultation, with additional sessions from ₹499 — payable instantly by UPI." },
      { type: "p", text: "You also get an AI study tutor, an exercise library and posture screening — so you get a lot of value for a small monthly price." },
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
      { type: "p", text: "DrPhysioAI's tutor is built for students and tuned for the Indian BPT/MPT syllabus, from ₹199/month. Try it and pick the answer style that suits how you learn." },
    ],
  },
  {
    slug: "sciatica-pain-relief-exercises",
    title: "Sciatica: What Causes That Shooting Leg Pain and How to Ease It",
    excerpt:
      "Sciatica sends pain down the back of the leg. Here's why it happens and the gentle exercises that most often help.",
    category: "Sciatica",
    emoji: "⚡",
    readMin: 6,
    date: "2026-06-25",
    author: "Dr. Sneha Patel",
    keywords: ["sciatica exercises", "sciatica pain relief", "leg pain from back"],
    related: ["sciatica", "back-pain"],
    body: [
      { type: "p", text: "Sciatica isn't a diagnosis on its own — it's the name for pain that travels along the sciatic nerve, from the lower back through the buttock and down the leg. It usually starts when a nerve root is irritated or compressed, often by a disc issue or a tight, overworked muscle." },
      { type: "h2", text: "Typical signs" },
      { type: "ul", items: [
        "A sharp, burning or electric pain down one leg.",
        "Pain that worsens with sitting, coughing or sneezing.",
        "Tingling, numbness or weakness in the leg or foot.",
        "Usually on one side only.",
      ] },
      { type: "h2", text: "Gentle exercises that often help" },
      { type: "ul", items: [
        "Knee-to-chest stretch — eases pressure in the lower back.",
        "Piriformis (figure-4) stretch — releases a tight buttock muscle.",
        "Sciatic nerve glides — gentle movements that calm the nerve.",
        "Pelvic tilts and short, frequent walks.",
      ] },
      { type: "tip", text: "Movement usually helps sciatica more than bed rest. But stop any exercise that sends pain further down your leg — that's a sign to ease off." },
      { type: "p", text: "See a physiotherapist urgently if you notice weakness in the leg, or any change in bladder or bowel control. Otherwise, a DrPhysioAI physiotherapist can identify the source and build a safe plan for your sciatica." },
    ],
  },
  {
    slug: "frozen-shoulder-stages-exercises",
    title: "Frozen Shoulder: The 3 Stages and How to Get Moving Again",
    excerpt:
      "Frozen shoulder can take months to settle. Understanding its stages — and doing the right stretches — makes a big difference.",
    category: "Shoulder",
    emoji: "🧊",
    readMin: 6,
    date: "2026-06-18",
    author: "Dr. Ravi Menon",
    keywords: ["frozen shoulder exercises", "frozen shoulder treatment", "shoulder stiffness"],
    related: ["frozen-shoulder"],
    body: [
      { type: "p", text: "Frozen shoulder (adhesive capsulitis) is a common, frustrating condition where the shoulder becomes painful and progressively stiff. It's more common after 40, in women, and in people with diabetes. The good news: it almost always recovers, and physiotherapy speeds it up." },
      { type: "h2", text: "The three stages" },
      { type: "ul", items: [
        "Freezing — pain increases and movement starts to reduce (weeks to months).",
        "Frozen — pain eases but stiffness peaks; daily tasks are hard.",
        "Thawing — movement slowly returns over several months.",
      ] },
      { type: "h2", text: "Exercises by stage" },
      { type: "ul", items: [
        "Painful stage: pendulum swings and gentle range-of-motion only.",
        "Stiff stage: towel stretches, wall walks and cross-body stretches.",
        "Always work to a gentle stretch, not into sharp pain.",
      ] },
      { type: "tip", text: "Consistency beats force. Little and often — a few minutes several times a day — restores movement faster than one hard session." },
      { type: "p", text: "Heat before stretching and a physiotherapist-guided plan can shorten recovery. Book a DrPhysioAI consultation to get exercises matched to your current stage." },
    ],
  },
  {
    slug: "best-sleeping-position-back-pain",
    title: "The Best Sleeping Positions for Back and Neck Pain",
    excerpt:
      "How you sleep can make or break your back. Simple position and pillow tweaks to wake up with less pain.",
    category: "Back Pain",
    emoji: "🛏️",
    readMin: 4,
    date: "2026-06-05",
    author: "Dr. Sneha Patel",
    keywords: ["sleeping position back pain", "pillow for neck pain", "how to sleep with back pain"],
    related: ["back-pain", "neck-pain"],
    body: [
      { type: "p", text: "If you wake up stiff and sore, your sleeping position may be part of the problem. The goal is simple: keep your spine in a neutral, supported line all night." },
      { type: "h2", text: "For lower back pain" },
      { type: "ul", items: [
        "On your back: place a pillow under your knees to reduce arch.",
        "On your side: put a pillow between your knees to keep hips level.",
        "Avoid sleeping flat on your stomach — it strains the low back and neck.",
      ] },
      { type: "h2", text: "For neck pain" },
      { type: "ul", items: [
        "Use one supportive pillow that keeps your neck level with your spine.",
        "Side-sleepers usually need a slightly thicker pillow than back-sleepers.",
        "Skip stacking two pillows — it bends the neck forward all night.",
      ] },
      { type: "tip", text: "A rolled towel inside your pillowcase gives your neck extra support without buying anything new." },
      { type: "p", text: "If pain regularly wakes you at night, get assessed — night pain is one sign worth checking with a physiotherapist." },
    ],
  },
  {
    slug: "work-from-home-desk-setup-ergonomics",
    title: "The 10-Minute Desk Setup That Saves Your Back and Neck",
    excerpt:
      "Working from home on a laptop and a dining chair? Here's how to set up an ergonomic workspace on any budget.",
    category: "Posture",
    emoji: "🪑",
    readMin: 5,
    date: "2026-05-22",
    author: "Dr. Utsav Upadhyay",
    keywords: ["ergonomic desk setup", "work from home back pain", "laptop posture"],
    related: ["neck-pain", "back-pain"],
    body: [
      { type: "p", text: "Most work-from-home aches come from one thing: a laptop that forces you to look down all day. You don't need expensive furniture to fix it — just a few smart adjustments." },
      { type: "h2", text: "Set up in 10 minutes" },
      { type: "ul", items: [
        "Raise your screen so the top is at eye level (books or a box work fine).",
        "Use a separate keyboard and mouse so your hands stay low and relaxed.",
        "Sit back in the chair with a cushion supporting your lower back.",
        "Keep feet flat on the floor or a footrest, knees roughly level with hips.",
        "Position the screen an arm's length away.",
      ] },
      { type: "tip", text: "The best posture is your next posture. Set a reminder to stand, stretch and walk for a minute every 30–45 minutes." },
      { type: "p", text: "Pair a good setup with a short daily mobility routine and most desk-related aches settle within a couple of weeks. Try our exercise library to build the habit." },
    ],
  },
  {
    slug: "pregnancy-back-pain-safe-exercises",
    title: "Back Pain in Pregnancy: Safe Ways to Find Relief",
    excerpt:
      "Back pain is common in pregnancy. Here are gentle, safe exercises and everyday tips — always cleared with your doctor.",
    category: "Women's Health",
    emoji: "🤰",
    readMin: 5,
    date: "2026-05-08",
    author: "Dr. Sneha Patel",
    keywords: ["pregnancy back pain", "prenatal exercises", "safe exercise pregnancy"],
    related: ["back-pain"],
    body: [
      { type: "p", text: "As your baby grows, your centre of gravity shifts and hormones loosen your ligaments — so back and pelvic pain is very common in pregnancy. Gentle movement usually helps more than rest." },
      { type: "h2", text: "Safe, gentle options" },
      { type: "ul", items: [
        "Pelvic tilts on all fours to ease lower-back tension.",
        "Cat–cow to keep the spine mobile.",
        "Supported side-lying rest with a pillow between the knees.",
        "Short, regular walks and prenatal-safe stretching.",
      ] },
      { type: "tip", text: "Always get clearance from your obstetrician before starting any exercise in pregnancy, and stop immediately if you feel dizzy, breathless or any bleeding." },
      { type: "p", text: "A physiotherapist can teach you safe positions for daily tasks and pelvic-floor care. DrPhysioAI's prenatal-aware physiotherapists can guide you through each trimester." },
    ],
  },
  {
    slug: "knee-osteoarthritis-managing-at-home",
    title: "Knee Osteoarthritis: Staying Active and Pain-Free at Home",
    excerpt:
      "Osteoarthritis doesn't mean stopping. The right strengthening and habits keep your knees working for years.",
    category: "Knee Pain",
    emoji: "🦵",
    readMin: 6,
    date: "2026-04-20",
    author: "Dr. Ravi Menon",
    keywords: ["knee osteoarthritis exercises", "arthritis knee pain", "OA knee management"],
    related: ["knee-pain"],
    body: [
      { type: "p", text: "Osteoarthritis is wear-and-tear of the joint cartilage, and it's very common with age. It can feel scary, but research is clear: staying active and building strength is one of the most effective treatments — often as good as medication for pain." },
      { type: "h2", text: "What helps most" },
      { type: "ul", items: [
        "Strengthen the thigh and hip muscles that support the knee.",
        "Keep moving daily — gentle activity nourishes the joint.",
        "Manage weight; even small reductions ease knee load a lot.",
        "Use warmth before activity and ice after if it flares.",
      ] },
      { type: "h2", text: "Good starter exercises" },
      { type: "ul", items: [
        "Quad sets and straight-leg raises.",
        "Sit-to-stand from a chair (build up reps slowly).",
        "Stationary cycling or pool walking for low-impact cardio.",
      ] },
      { type: "tip", text: "Some ache during and after exercise is normal with arthritis. As long as it settles within a day and doesn't steadily worsen, you're on the right track." },
      { type: "p", text: "A physiotherapist can grade the load correctly so you build strength without flaring the joint. Book a DrPhysioAI consultation for a knee-friendly plan." },
    ],
  },
  {
    slug: "plantar-fasciitis-heel-pain-relief",
    title: "Heel Pain in the Morning? It Might Be Plantar Fasciitis",
    excerpt:
      "That stabbing heel pain with your first steps has a name — and a simple set of stretches that usually fixes it.",
    category: "Foot & Ankle",
    emoji: "🦶",
    readMin: 5,
    date: "2026-04-05",
    author: "Dr. Ravi Menon",
    keywords: ["plantar fasciitis", "heel pain treatment", "morning heel pain"],
    body: [
      { type: "p", text: "If your first steps out of bed bring a sharp pain under the heel that eases as you walk, plantar fasciitis is the usual culprit. It's an irritation of the thick band of tissue along the sole of your foot, and it responds well to simple home care." },
      { type: "h2", text: "What eases it" },
      { type: "ul", items: [
        "Calf stretches against a wall, held 30 seconds, a few times a day.",
        "Rolling the sole of the foot over a bottle or ball.",
        "Toe-towel scrunches to strengthen the small foot muscles.",
        "Supportive footwear — avoid walking barefoot on hard floors.",
      ] },
      { type: "tip", text: "Do a few gentle calf and foot stretches before you get out of bed — it makes those painful first steps much easier." },
      { type: "p", text: "Most heel pain settles with consistent stretching over a few weeks. If it lingers, a physiotherapist can check your foot mechanics and add targeted treatment." },
    ],
  },
  {
    slug: "cervical-spondylosis-neck-exercises",
    title: "Cervical Spondylosis: Managing Age-Related Neck Pain",
    excerpt:
      "Neck stiffness and headaches as you age are often cervical spondylosis. Here's how to keep your neck strong and mobile.",
    category: "Neck Pain",
    emoji: "🦴",
    readMin: 5,
    date: "2026-03-22",
    author: "Dr. Sneha Patel",
    keywords: ["cervical spondylosis exercises", "neck arthritis", "cervical pain relief"],
    related: ["neck-pain"],
    body: [
      { type: "p", text: "Cervical spondylosis is age-related wear in the neck's joints and discs. It's extremely common after 50 and often shows on scans even in people with no pain. When it does cause symptoms, gentle exercise and posture care usually keep it manageable." },
      { type: "h2", text: "Common symptoms" },
      { type: "ul", items: [
        "Neck stiffness, especially in the morning.",
        "Headaches starting at the base of the skull.",
        "Occasional grinding or clicking when turning the head.",
      ] },
      { type: "h2", text: "Helpful exercises" },
      { type: "ul", items: [
        "Chin tucks to support the deep neck muscles.",
        "Gentle neck rotations and side bends within a comfortable range.",
        "Shoulder-blade squeezes to support upright posture.",
      ] },
      { type: "tip", text: "See a physiotherapist promptly if you get pins-and-needles, weakness or clumsiness in the hands — that needs a proper assessment." },
      { type: "p", text: "A DrPhysioAI physiotherapist can build a safe, progressive neck routine and check your posture and workstation." },
    ],
  },
  {
    slug: "stroke-rehabilitation-at-home",
    title: "Physiotherapy After a Stroke: How Home Rehab Rebuilds Movement",
    excerpt:
      "Recovery after a stroke continues at home. Consistent, guided physiotherapy is key to regaining strength and independence.",
    category: "Neuro Care",
    emoji: "🧠",
    readMin: 6,
    date: "2026-03-05",
    author: "Dr. Utsav Upadhyay",
    keywords: ["stroke rehabilitation", "physiotherapy after stroke", "neuro physiotherapy home"],
    related: ["neuro-elderly-care"],
    body: [
      { type: "p", text: "The brain keeps rewiring itself for months and years after a stroke — a process called neuroplasticity. Regular, task-focused physiotherapy helps drive that recovery, and much of it can continue safely at home with the right guidance." },
      { type: "h2", text: "What home rehab focuses on" },
      { type: "ul", items: [
        "Repetitive, meaningful movements — reaching, gripping, standing, walking.",
        "Balance and safety to reduce the risk of falls.",
        "Strength and flexibility on the affected side.",
        "Building independence in everyday tasks, one step at a time.",
      ] },
      { type: "tip", text: "Little and often wins. Short daily practice of the right movements does more for recovery than occasional long sessions." },
      { type: "p", text: "Stroke rehab should be supervised by a physiotherapist who can progress it safely and involve family carers. DrPhysioAI's neuro-aware physiotherapists offer guided home programs and video reviews." },
    ],
  },
  {
    slug: "how-to-improve-posture-complete-guide",
    title: "How to Improve Your Posture: A Simple, Complete Guide",
    excerpt:
      "Good posture isn't about standing stiff — it's about balance, movement and strength. Here's how to build it.",
    category: "Posture",
    emoji: "🧍",
    readMin: 6,
    date: "2026-02-18",
    author: "Dr. Utsav Upadhyay",
    keywords: ["how to improve posture", "posture correction exercises", "fix rounded shoulders"],
    related: ["neck-pain", "back-pain"],
    body: [
      { type: "p", text: "Posture matters, but not in the way most people think. There's no single 'perfect' posture to hold all day — the healthiest posture is one that keeps changing. Still, if you spend hours hunched over screens, some targeted work makes a real difference." },
      { type: "h2", text: "The four pillars of better posture" },
      { type: "ul", items: [
        "Awareness — notice when you slump, and reset gently.",
        "Mobility — open a tight chest and stiff upper back.",
        "Strength — build the upper-back and core muscles that hold you up.",
        "Movement — change position often; don't stay still for hours.",
      ] },
      { type: "h2", text: "A simple daily routine" },
      { type: "ul", items: [
        "Chin tucks × 10 to reset a forward head.",
        "Wall angels × 10 to open the chest.",
        "Shoulder-blade squeezes × 10 to switch on the upper back.",
        "Thoracic extensions over a chair to counter slouching.",
      ] },
      { type: "tip", text: "Try our AI posture check to see your starting point, then repeat it in a few weeks to track your progress." },
      { type: "p", text: "Better posture is built from strength and movement, not willpower alone. A physiotherapist can pinpoint what's tight and what's weak for you specifically." },
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
