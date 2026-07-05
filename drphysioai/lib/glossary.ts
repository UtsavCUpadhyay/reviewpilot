/**
 * Physiotherapy glossary — plain-English definitions of common terms patients
 * and students search for. Powers /glossary (long-tail SEO) with a
 * DefinedTermSet JSON-LD.
 */
export type GlossaryTerm = {
  term: string;
  definition: string;
  /** Optional related condition slug for internal linking. */
  related?: string;
};

export const glossary: GlossaryTerm[] = [
  { term: "Acute pain", definition: "Pain that comes on recently and is usually short-lived, often after an injury or strain. It typically settles as the tissue heals." },
  { term: "Adhesive capsulitis", definition: "The medical name for frozen shoulder — a painful, progressive stiffening of the shoulder joint capsule that usually recovers over time.", related: "frozen-shoulder" },
  { term: "Arthritis", definition: "Inflammation or wear of a joint causing pain and stiffness. Osteoarthritis (wear-and-tear) is the most common type.", related: "arthritis" },
  { term: "Biomechanics", definition: "The study of how the body moves — how muscles, bones and joints work together to produce movement and manage load." },
  { term: "Cartilage", definition: "Smooth, cushioning tissue that covers the ends of bones in a joint, allowing them to glide with little friction." },
  { term: "Cervical spine", definition: "The neck portion of the spine — seven vertebrae that support the head and allow it to move.", related: "cervical-spondylosis" },
  { term: "Chronic pain", definition: "Pain that persists beyond normal healing time (usually more than three months). It often needs a broader management approach than acute pain." },
  { term: "Core stability", definition: "The ability of the deep trunk muscles to support and control the spine and pelvis during movement." },
  { term: "Dry needling", definition: "A technique where a physiotherapist inserts a fine needle into a tight muscle 'trigger point' to reduce tension and pain." },
  { term: "Ergonomics", definition: "Designing your workspace and habits — desk, chair, screen height — so your body is supported and strain is minimised." },
  { term: "Frozen shoulder", definition: "A condition where the shoulder becomes painful and stiff, then slowly recovers over months. Physiotherapy speeds up recovery.", related: "frozen-shoulder" },
  { term: "Gait", definition: "Your pattern of walking. Analysing gait helps physiotherapists spot problems in the feet, knees, hips or balance." },
  { term: "Herniated disc", definition: "When the soft centre of a spinal disc pushes out through its outer layer, sometimes pressing on a nerve and causing back or leg pain.", related: "sciatica" },
  { term: "Hypermobility", definition: "Joints that move beyond the normal range. It can be harmless, but sometimes leads to pain and needs strengthening for support." },
  { term: "Inflammation", definition: "The body's natural response to injury — warmth, swelling and tenderness — that is part of early healing." },
  { term: "Ligament", definition: "A tough band of tissue that connects bone to bone and stabilises a joint. Sprains are ligament injuries." },
  { term: "Manual therapy", definition: "Hands-on techniques — such as joint mobilisation and soft-tissue work — used by physiotherapists to reduce pain and improve movement." },
  { term: "Mobility", definition: "How freely a joint or the body can move through its range. Mobility work keeps joints supple and healthy." },
  { term: "Neuroplasticity", definition: "The brain's ability to rewire and relearn — the basis of recovery after a stroke or brain injury.", related: "neuro-elderly-care" },
  { term: "Osteoarthritis", definition: "The most common form of arthritis, caused by gradual wear of joint cartilage with age or overuse.", related: "arthritis" },
  { term: "Osteoporosis", definition: "A condition where bones become weaker and more fragile, increasing fracture risk. Weight-bearing exercise helps protect bone." },
  { term: "Physiotherapy", definition: "A healthcare profession that restores movement and function through exercise, hands-on treatment, and education — without medication or surgery." },
  { term: "Plantar fascia", definition: "The thick band of tissue along the sole of the foot. When irritated it causes plantar fasciitis (heel pain).", related: "plantar-fasciitis" },
  { term: "Posture", definition: "How you hold your body when sitting, standing or moving. Varied, balanced posture is healthier than any single 'perfect' position." },
  { term: "Range of motion", definition: "The full distance and direction a joint can move. Restoring range of motion is a common rehab goal." },
  { term: "Rehabilitation", definition: "The process of restoring strength, movement and function after injury, surgery or illness through a structured program." },
  { term: "RICE", definition: "A first-aid approach for minor injuries — Rest, Ice, Compression, Elevation — used in the early stage before guided rehab." },
  { term: "Sciatica", definition: "Pain that travels along the sciatic nerve, from the lower back through the buttock and down the leg.", related: "sciatica" },
  { term: "Spondylosis", definition: "Age-related wear of the spine's joints and discs. In the neck it's called cervical spondylosis.", related: "cervical-spondylosis" },
  { term: "Sprain", definition: "An injury to a ligament — the tissue connecting bones — usually from a sudden twist or overstretch." },
  { term: "Strain", definition: "An injury to a muscle or tendon from overstretching or overloading, commonly called a 'pulled muscle'." },
  { term: "Tendon", definition: "A strong cord that attaches muscle to bone. Overuse can cause tendinopathy, a painful tendon condition." },
  { term: "Tendinopathy", definition: "Pain and reduced function in a tendon from overload — such as tennis elbow. Gradual strengthening is the main treatment.", related: "tennis-elbow" },
  { term: "Trigger point", definition: "A tight, tender 'knot' within a muscle that can cause local or referred pain." },
  { term: "Ultrasound therapy", definition: "A treatment using sound waves to generate gentle warmth in deep tissues, sometimes used to ease pain and aid healing." },
];

/** Groups terms alphabetically by first letter for an A–Z layout. */
export function glossaryByLetter(): { letter: string; terms: GlossaryTerm[] }[] {
  const sorted = [...glossary].sort((a, b) => a.term.localeCompare(b.term));
  const groups = new Map<string, GlossaryTerm[]>();
  for (const t of sorted) {
    const letter = t.term[0].toUpperCase();
    if (!groups.has(letter)) groups.set(letter, []);
    groups.get(letter)!.push(t);
  }
  return Array.from(groups, ([letter, terms]) => ({ letter, terms }));
}
