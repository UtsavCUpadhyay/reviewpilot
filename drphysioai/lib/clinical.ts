/**
 * DrPhysioAI — Clinical platform content (B2B "operating system for physiotherapy").
 *
 * IMPORTANT (clinical safety): every AI output here is decision *support*, not a
 * diagnosis. The treating physiotherapist always makes the final judgment. This
 * is not a medical device and the content below is illustrative sample data for
 * the assessment workflow demo — not validated clinical guidance.
 */

export const clinicianAudiences = [
  "Private clinics", "Hospitals", "Universities", "Sports teams",
  "Rehab centres", "Home-visit physios", "Telehealth", "NDIS providers",
];

export const clinicalModules = [
  { name: "Orthopaedics", emoji: "🦴", conditions: "MSK injuries, post-op, arthritis" },
  { name: "Neurology", emoji: "🧠", conditions: "Stroke, SCI, Parkinson's, MS" },
  { name: "Cardiorespiratory", emoji: "🫁", conditions: "COPD, post-ICU, cardiac rehab" },
  { name: "Sports", emoji: "🏃", conditions: "Return-to-sport, load management" },
  { name: "Paediatrics", emoji: "🧒", conditions: "Developmental, CP, gait" },
  { name: "Women's Health", emoji: "🌸", conditions: "Pelvic floor, pre/postnatal" },
  { name: "Geriatrics", emoji: "🧓", conditions: "Falls, frailty, balance" },
  { name: "Vestibular", emoji: "🌀", conditions: "BPPV, dizziness, VOR" },
  { name: "Chronic Pain", emoji: "🔥", conditions: "Pain science, graded exposure" },
  { name: "Occupational", emoji: "🏭", conditions: "Ergonomics, return-to-work" },
];

export const platformPillars = [
  {
    icon: "Brain",
    title: "Clinical reasoning assistant",
    desc: "Structured, transparent reasoning that suggests ranked differentials with rationale — you stay in control of every decision.",
  },
  {
    icon: "ClipboardList",
    title: "Guided assessments",
    desc: "Region-specific subjective + objective pathways with special tests, outcome measures, red-flag and yellow-flag screening.",
  },
  {
    icon: "FileText",
    title: "Instant documentation",
    desc: "Auto-draft SOAP notes, initial assessments, referral & insurance letters — editable before you sign off.",
  },
  {
    icon: "Activity",
    title: "Exercise prescription",
    desc: "Prescribe from a large evidence-tagged library with progressions, regressions, dosage and patient handouts.",
  },
  {
    icon: "TrendingUp",
    title: "Outcomes & progress",
    desc: "Track validated outcome measures over time and visualise progress for patients, payers and audits.",
  },
  {
    icon: "ShieldCheck",
    title: "Practice management",
    desc: "Scheduling, billing, telehealth, consent, e-signatures and role-based multi-site dashboards.",
  },
];

/** The structured assessment workflow (condensed for the demo wizard). */
export const assessmentFlow = [
  "Demographics", "Chief complaint", "History", "Red-flag screening",
  "Yellow-flag screening", "Body chart", "Objective exam", "Special tests",
  "Outcome measures", "Clinical reasoning", "Differential suggestions",
  "Management options", "Exercise program", "Documentation", "Progress tracking",
];

/** Shared red flags surfaced during screening. */
export const redFlags = [
  "Unexplained weight loss",
  "Constant, unremitting night pain",
  "Fever / systemically unwell",
  "History of cancer",
  "Bladder/bowel changes or saddle anaesthesia",
  "Progressive neurological deficit",
  "Significant trauma / unable to weight-bear",
];

export type Differential = {
  dx: string;
  confidence: "High" | "Moderate" | "Low";
  rationale: string;
  evidence: string;
  furtherTests: string[];
  management: string[];
  exercises: string[];
};

type RegionData = {
  complaints: string[];
  specialTests: string[];
  differentials: Differential[];
};

/**
 * Region-specific sample data. Illustrative only — designed to demonstrate the
 * structured-reasoning UX, not to be used for real patient care.
 */
export const regions: Record<string, RegionData> = {
  Knee: {
    complaints: ["Anterior knee pain", "Medial joint line pain", "Giving way / instability", "Swelling after activity"],
    specialTests: ["Lachman", "Anterior drawer", "McMurray", "Patellar apprehension", "Valgus/varus stress"],
    differentials: [
      {
        dx: "Patellofemoral pain syndrome",
        confidence: "High",
        rationale: "Anterior knee pain aggravated by stairs/squatting, insidious onset, no locking, negative ligament tests — pattern consistent with PFPS.",
        evidence: "Consistent with current PFPS clinical practice guidelines (exercise-therapy first-line).",
        furtherTests: ["Single-leg squat quality", "Hip abductor strength", "Patellar glide"],
        management: ["Hip + quadriceps strengthening", "Load management & activity modification", "Movement retraining", "Consider taping short-term"],
        exercises: ["Isometric quads", "Side-lying hip abduction", "Step-downs (controlled)", "Spanish squat progression"],
      },
      {
        dx: "Meniscal injury",
        confidence: "Moderate",
        rationale: "Medial joint-line pain with mechanical symptoms would raise suspicion; correlate with McMurray and history of twisting mechanism.",
        evidence: "Cluster of history + Thessaly/McMurray improves diagnostic confidence per composite test literature.",
        furtherTests: ["Thessaly test", "Joint-line tenderness", "Consider imaging if mechanical locking"],
        management: ["Progressive loading program", "Neuromuscular control", "Refer for imaging if true locking / red flags"],
        exercises: ["Closed-chain quad loading", "Balance/proprioception drills", "Graded return-to-activity"],
      },
      {
        dx: "ACL insufficiency",
        confidence: "Low",
        rationale: "Consider if 'giving way' with pivoting; screen with Lachman (most sensitive). Low here unless instability + positive Lachman.",
        evidence: "Lachman has highest sensitivity for ACL rupture among clinical tests.",
        furtherTests: ["Lachman", "Pivot shift", "Refer for orthopaedic + MRI if positive"],
        management: ["Prehab/rehab per shared decision", "Refer to orthopaedics if surgical candidate"],
        exercises: ["Quad/hamstring co-contraction", "Perturbation training", "Progressive plyometrics (later phase)"],
      },
    ],
  },
  "Low back": {
    complaints: ["Central low back pain", "Pain with flexion", "Pain with extension", "Leg pain below knee"],
    specialTests: ["Straight leg raise", "Slump test", "Neuro screen (myotome/dermatome)", "Prone instability", "Centralisation with repeated movements"],
    differentials: [
      {
        dx: "Non-specific low back pain",
        confidence: "High",
        rationale: "No red flags, no radicular signs, mechanical pattern — fits the large majority of presentations.",
        evidence: "Aligned with LBP guidelines: reassurance, stay active, avoid unnecessary imaging.",
        furtherTests: ["Movement-based classification", "Yellow-flag screen (fear-avoidance)"],
        management: ["Education & reassurance", "Stay active / graded activity", "Address yellow flags", "Manual therapy as adjunct"],
        exercises: ["Directional preference exercises", "Graded walking", "Core motor-control progression"],
      },
      {
        dx: "Lumbar radiculopathy",
        confidence: "Moderate",
        rationale: "Leg pain below knee with positive neural tension and matching neuro deficit raises suspicion of nerve-root involvement.",
        evidence: "SLR sensitivity high for L4–S1 radiculopathy; correlate with neuro exam.",
        furtherTests: ["Full neuro screen", "Crossed SLR", "Monitor for progressive deficit"],
        management: ["Neural mobilisation as tolerated", "Directional preference / centralisation", "Referral if progressive deficit"],
        exercises: ["Nerve gliders", "Extension bias (if centralises)", "Graded aerobic activity"],
      },
    ],
  },
  Shoulder: {
    complaints: ["Painful arc", "Pain with overhead", "Night pain on shoulder", "Stiffness / loss of ROM"],
    specialTests: ["Hawkins-Kennedy", "Empty can (Jobe)", "External rotation lag", "Lift-off", "Apprehension/relocation"],
    differentials: [
      {
        dx: "Rotator cuff related shoulder pain",
        confidence: "High",
        rationale: "Painful arc, pain with overhead and positive cuff tests without capsular restriction — consistent with RC-related pain.",
        evidence: "Guidelines favour progressive loading exercise as first-line for RC-related pain.",
        furtherTests: ["Resisted abduction/ER strength", "Scapular control assessment"],
        management: ["Progressive cuff + scapular loading", "Activity modification", "Education on expected timeframe"],
        exercises: ["Isometric ER/abduction", "Banded ER", "Scapular setting", "Progressive overhead loading"],
      },
      {
        dx: "Adhesive capsulitis",
        confidence: "Moderate",
        rationale: "Global passive ROM loss (esp. external rotation) with night pain would point to frozen shoulder — check capsular pattern.",
        evidence: "Capsular pattern with ER loss is characteristic; stage-based management applies.",
        furtherTests: ["Passive ROM in all planes", "Screen for diabetes / thyroid"],
        management: ["Stage-appropriate ROM", "Pain-guided loading", "Patient education on natural history"],
        exercises: ["Pendulum / gentle ROM", "Pain-free stretching", "Graded strengthening as pain settles"],
      },
    ],
  },
  Neck: {
    complaints: ["Neck pain with stiffness", "Pain radiating to arm", "Headache from neck", "Pain with sustained postures"],
    specialTests: ["Spurling's test", "Neuro screen (C5–T1)", "Upper limb tension test", "Cervical ROM", "Distraction test"],
    differentials: [
      {
        dx: "Non-specific mechanical neck pain",
        confidence: "High",
        rationale: "Movement/posture-related pain, no neuro deficit, no red flags — the most common presentation.",
        evidence: "Guidelines support exercise, education and manual therapy as adjunct for mechanical neck pain.",
        furtherTests: ["Cervical ROM", "Postural/movement screen", "Yellow-flag screen"],
        management: ["Education & reassurance", "Active ROM + strengthening", "Manual therapy adjunct", "Ergonomic advice"],
        exercises: ["Deep neck flexor activation", "Scapular setting", "Cervical AROM", "Postural endurance"],
      },
      {
        dx: "Cervical radiculopathy",
        confidence: "Moderate",
        rationale: "Arm pain with a positive Spurling's + matching dermatome/myotome raises suspicion of nerve-root involvement.",
        evidence: "Wainner cluster (Spurling's, distraction, ULTT, ROM<60°) improves diagnostic accuracy.",
        furtherTests: ["Full neuro screen", "Wainner cluster", "Monitor for progressive deficit"],
        management: ["Neural mobilisation as tolerated", "Deloading/retraining", "Refer if progressive deficit"],
        exercises: ["Nerve gliders", "Deep neck flexor control", "Scapular strengthening"],
      },
    ],
  },
  Ankle: {
    complaints: ["Lateral ankle pain after sprain", "Pain with weight-bearing", "Recurrent giving way", "Swelling & bruising"],
    specialTests: ["Anterior drawer (ankle)", "Talar tilt", "Ottawa ankle rules", "Single-leg balance", "Squeeze test"],
    differentials: [
      {
        dx: "Lateral ankle ligament sprain (ATFL)",
        confidence: "High",
        rationale: "Inversion mechanism, lateral pain/swelling, positive anterior drawer, Ottawa rules negative for fracture.",
        evidence: "Ottawa Ankle Rules are highly sensitive for ruling out fracture and reducing unnecessary imaging.",
        furtherTests: ["Ottawa ankle rules", "Anterior drawer", "Weight-bearing tolerance"],
        management: ["Early protected loading", "Balance/proprioception", "Progressive strengthening", "Bracing early phase"],
        exercises: ["Ankle alphabet / AROM", "Single-leg balance", "Calf raises", "Peroneal strengthening"],
      },
      {
        dx: "Ankle fracture (screen)",
        confidence: "Low",
        rationale: "Apply Ottawa rules — bony tenderness at malleoli or inability to weight-bear 4 steps warrants imaging.",
        evidence: "Ottawa Ankle Rules: ~100% sensitivity for clinically significant fractures.",
        furtherTests: ["Ottawa ankle rules", "Refer for X-ray if positive"],
        management: ["Refer for imaging if Ottawa positive", "Protect & offload until cleared"],
        exercises: ["Defer loading until fracture excluded"],
      },
    ],
  },
};

/**
 * Build an editable draft SOAP note from an assessment. Pure string assembly —
 * in Phase 5 this becomes a Claude call over the structured assessment + RAG.
 */
export function buildSoapNote(a: {
  age: string; sex: string; region: string; complaint: string | null;
  flags: string[]; tests: string[]; topDx: string; confidence: string;
}) {
  const flags = a.flags.length ? a.flags.join(", ") : "None reported";
  const tests = a.tests.length ? a.tests.join(", ") : "Not documented";
  return {
    subjective:
`${a.sex}, ${a.age}y. Presenting complaint: ${a.complaint ?? "not specified"} (${a.region}).
Red-flag screen: ${flags}.
History and aggravating/easing factors to be completed by clinician.`,
    objective:
`Region assessed: ${a.region}.
Special tests performed: ${tests}.
Observation, ROM, strength and neurological findings to be completed by clinician.`,
    assessment:
`Working hypothesis: ${a.topDx} (${a.confidence.toLowerCase()} confidence) — AI-suggested, pending clinician confirmation.
Differential reasoning documented in the assessment. Clinician to confirm/adjust.`,
    plan:
`1. Confirm hypothesis with relevant objective findings/tests.
2. Commence evidence-based management for ${a.topDx.toLowerCase()}.
3. Prescribe home exercise program with progressions.
4. Educate patient; agree goals and expected timeframe.
5. Review and re-assess with an outcome measure at follow-up.${a.flags.length ? "\n6. Red flags present — arrange appropriate referral/medical review." : ""}`,
  };
}

/** Shopify store domain used to build checkout permalinks. */
export const STORE_DOMAIN = "gyvjr4-qz.myshopify.com";
const checkout = (variantId: string) => `https://${STORE_DOMAIN}/cart/${variantId}:1`;

export const saasPlans = [
  {
    name: "Solo",
    price: "₹1,499",
    period: "/ clinician / mo",
    highlight: false,
    desc: "For individual physiotherapists.",
    features: ["AI clinical assistant", "All assessment modules", "SOAP & report drafting", "Exercise prescription", "7-day free trial"],
    cta: "Start free trial",
    href: checkout("48134070730939"),
  },
  {
    name: "Clinic",
    price: "₹3,999",
    period: "/ mo (up to 5)",
    highlight: true,
    desc: "Multi-clinician practices.",
    features: ["Everything in Solo", "Shared patient records", "Scheduling & billing", "Clinic dashboard & analytics", "Role-based access"],
    cta: "Start free trial",
    href: checkout("48134070763707"),
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "hospital / university",
    highlight: false,
    desc: "Hospitals, universities, NDIS.",
    features: ["Everything in Clinic", "SSO & data isolation", "Audit logs & compliance", "University teaching mode", "Dedicated support & SLA"],
    cta: "Book a demo",
    href: "mailto:UtsavCUpadhyay@gmail.com?subject=DrPhysioAI%20Enterprise%20demo",
  },
];

export const evidenceSources = [
  "Clinical practice guidelines", "Peer-reviewed rehab research", "Validated outcome measures",
  "Clinical prediction rules", "Open-access education", "Return-to-sport/work pathways",
];

export const securityFeatures = [
  { icon: "Lock", title: "Encryption in transit & at rest" },
  { icon: "Users", title: "Role-based permissions" },
  { icon: "FileClock", title: "Full audit logs & version history" },
  { icon: "Building2", title: "Clinic-level data isolation" },
  { icon: "ShieldCheck", title: "Privacy-by-design architecture" },
  { icon: "DatabaseBackup", title: "Automated backups" },
];
