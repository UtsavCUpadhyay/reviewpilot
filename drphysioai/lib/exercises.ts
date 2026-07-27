/**
 * DrPhysioAI — Exercise library (Phase 6).
 *
 * Illustrative sample data to demonstrate the prescription engine UX. In
 * production this is a large, evidence-tagged library with media and citations;
 * dosage is a clinician-adjustable default, not a prescription.
 */

export type Level = "Beginner" | "Intermediate" | "Advanced";

export type Exercise = {
  id: string;
  name: string;
  region: string;
  category: "Strength" | "Mobility" | "Balance" | "Neural" | "Cardio";
  level: Level;
  purpose: string;
  equipment: string;
  indications: string[];
  contraindications: string[];
  instructions: string[];
  dosage: { sets: number; reps: string; frequency: string };
  progressions: string[];
  regressions: string[];
  commonErrors: string[];
};

export const exerciseRegions = ["Knee", "Shoulder", "Low back", "Neck", "Ankle", "General"];
export const exerciseCategories = ["Strength", "Mobility", "Balance", "Neural", "Cardio"];

export const exercises: Exercise[] = [
  {
    id: "quad-iso",
    name: "Isometric quads (quad set)",
    region: "Knee", category: "Strength", level: "Beginner",
    purpose: "Early quadriceps activation without joint loading.",
    equipment: "None (± small towel roll)",
    indications: ["Early PFPS", "Post-op knee", "Pain-limited loading"],
    contraindications: ["Acute locked knee", "Undiagnosed effusion with red flags"],
    instructions: ["Sit/lie with leg straight", "Tighten thigh, push knee down into surface", "Hold 5–10s, relax"],
    dosage: { sets: 3, reps: "10 holds", frequency: "Daily" },
    progressions: ["Straight-leg raise", "Short-arc quads", "Closed-chain loading"],
    regressions: ["Reduce hold time", "Sub-maximal contraction"],
    commonErrors: ["Holding breath", "Hip hiking instead of quad set"],
  },
  {
    id: "step-down",
    name: "Controlled step-downs",
    region: "Knee", category: "Strength", level: "Intermediate",
    purpose: "Eccentric quad control and patellofemoral loading.",
    equipment: "Low step",
    indications: ["PFPS (progression)", "Return-to-activity"],
    contraindications: ["Reproducible sharp pain", "Instability / giving way"],
    instructions: ["Stand on step", "Slowly lower opposite heel toward floor", "Keep knee over 2nd toe", "Return under control"],
    dosage: { sets: 3, reps: "8–12", frequency: "Alt days" },
    progressions: ["Higher step", "Add load", "Tempo (slow eccentric)"],
    regressions: ["Lower step", "Partial range", "Hold support"],
    commonErrors: ["Knee valgus (caves in)", "Rushing the lowering phase"],
  },
  {
    id: "hip-abd",
    name: "Side-lying hip abduction",
    region: "Knee", category: "Strength", level: "Beginner",
    purpose: "Gluteus medius strength to control knee valgus.",
    equipment: "None (± band)",
    indications: ["PFPS", "Dynamic knee valgus"],
    contraindications: ["Acute lateral hip pain"],
    instructions: ["Lie on side, legs stacked", "Lift top leg keeping it in line with body", "Lower slowly"],
    dosage: { sets: 3, reps: "12–15", frequency: "Alt days" },
    progressions: ["Add band", "Longer lever", "Standing cable abduction"],
    regressions: ["Reduce range", "Bent knee"],
    commonErrors: ["Rolling hips back", "Using hip flexors"],
  },
  {
    id: "cuff-er",
    name: "Banded external rotation",
    region: "Shoulder", category: "Strength", level: "Beginner",
    purpose: "Rotator cuff (infraspinatus/teres minor) loading.",
    equipment: "Resistance band",
    indications: ["RC-related shoulder pain", "Scapular control programs"],
    contraindications: ["Acute post-op restriction", "Reproducible night pain flare"],
    instructions: ["Elbow at 90°, tucked to side", "Rotate forearm outward", "Return slowly, keep elbow in"],
    dosage: { sets: 3, reps: "10–15", frequency: "Daily" },
    progressions: ["Heavier band", "ER at 90° abduction", "Add load"],
    regressions: ["Lighter band", "Isometric ER hold"],
    commonErrors: ["Elbow drifting from side", "Shrugging"],
  },
  {
    id: "scap-set",
    name: "Scapular setting",
    region: "Shoulder", category: "Mobility", level: "Beginner",
    purpose: "Scapular control and postural awareness.",
    equipment: "None",
    indications: ["RC-related pain", "Neck/shoulder postural pain"],
    contraindications: ["None (gentle)"],
    instructions: ["Gently draw shoulder blades down and back", "Hold 5–10s", "Relax, avoid over-squeezing"],
    dosage: { sets: 3, reps: "10 holds", frequency: "Daily" },
    progressions: ["Wall slides", "Prone Y/T/W", "Loaded carries"],
    regressions: ["Reduce hold", "Supported sitting"],
    commonErrors: ["Excessive shrug", "Extending low back"],
  },
  {
    id: "dnf",
    name: "Deep neck flexor activation",
    region: "Neck", category: "Strength", level: "Beginner",
    purpose: "Cervical deep flexor endurance for mechanical neck pain.",
    equipment: "None (± pressure biofeedback)",
    indications: ["Mechanical neck pain", "Cervicogenic headache"],
    contraindications: ["Acute radicular flare", "Unscreened red flags"],
    instructions: ["Lie supine", "Gentle chin nod (yes motion)", "Hold without bulging superficial muscles"],
    dosage: { sets: 3, reps: "10 holds", frequency: "Daily" },
    progressions: ["Longer holds", "Add head lift", "Sitting endurance"],
    regressions: ["Shorter holds", "Reduce range"],
    commonErrors: ["Jutting chin forward", "Using superficial neck muscles"],
  },
  {
    id: "nerve-glide",
    name: "Median nerve glider",
    region: "Neck", category: "Neural", level: "Intermediate",
    purpose: "Neural mobility for cervical radiculopathy (as tolerated).",
    equipment: "None",
    indications: ["Cervical radiculopathy", "Neural sensitisation (irritability low)"],
    contraindications: ["Highly irritable/acute", "Progressive neuro deficit"],
    instructions: ["Gentle oscillatory glide", "Move within symptom-free range", "No sustained stretch"],
    dosage: { sets: 2, reps: "8–10", frequency: "1–2×/day" },
    progressions: ["Increase range", "Add tensioner (later)"],
    regressions: ["Smaller amplitude", "Fewer reps"],
    commonErrors: ["Aggressive stretching", "Provoking distal symptoms"],
  },
  {
    id: "mck-ext",
    name: "Prone press-up (extension)",
    region: "Low back", category: "Mobility", level: "Beginner",
    purpose: "Directional preference (extension) for centralising LBP.",
    equipment: "Mat",
    indications: ["LBP with extension preference", "Centralisation response"],
    contraindications: ["Peripheralisation with extension", "Red flags"],
    instructions: ["Lie prone", "Press up on hands, hips stay down", "Return slowly, repeat if centralising"],
    dosage: { sets: 1, reps: "10", frequency: "Every 2–3h" },
    progressions: ["Greater range", "Sustained holds"],
    regressions: ["Prop on elbows", "Reduce range"],
    commonErrors: ["Tensing glutes", "Pushing into peripheral pain"],
  },
  {
    id: "bird-dog",
    name: "Bird-dog",
    region: "Low back", category: "Strength", level: "Beginner",
    purpose: "Trunk motor control and anti-rotation.",
    equipment: "Mat",
    indications: ["Non-specific LBP", "Motor control retraining"],
    contraindications: ["Acute severe pain", "Wrist/knee intolerance"],
    instructions: ["4-point kneeling", "Extend opposite arm + leg", "Keep pelvis level", "Return with control"],
    dosage: { sets: 3, reps: "8–10 each", frequency: "Alt days" },
    progressions: ["Add hold", "Add band", "Unstable surface"],
    regressions: ["Arm only / leg only", "Reduce range"],
    commonErrors: ["Rotating pelvis", "Arching low back"],
  },
  {
    id: "sl-balance",
    name: "Single-leg balance",
    region: "Ankle", category: "Balance", level: "Beginner",
    purpose: "Proprioception after ankle sprain.",
    equipment: "None",
    indications: ["Lateral ankle sprain (rehab)", "Fall-risk / balance"],
    contraindications: ["Unable to weight-bear", "Fracture not excluded"],
    instructions: ["Stand on one leg", "Keep support nearby", "Hold steady, progress time"],
    dosage: { sets: 3, reps: "30s holds", frequency: "Daily" },
    progressions: ["Eyes closed", "Foam surface", "Add perturbation"],
    regressions: ["Fingertip support", "Shorter holds"],
    commonErrors: ["Gripping toes excessively", "Holding breath"],
  },
  {
    id: "calf-raise",
    name: "Calf raises",
    region: "Ankle", category: "Strength", level: "Beginner",
    purpose: "Calf/ankle strength and load tolerance.",
    equipment: "None (± step)",
    indications: ["Ankle sprain rehab", "Lower-limb loading"],
    contraindications: ["Acute Achilles pathology (unscreened)"],
    instructions: ["Rise onto toes", "Lower slowly", "Keep even weight through foot"],
    dosage: { sets: 3, reps: "12–15", frequency: "Alt days" },
    progressions: ["Single-leg", "Add load", "Off a step (range)"],
    regressions: ["Two-leg with support", "Partial range"],
    commonErrors: ["Rolling to outer foot", "Bouncing"],
  },
  {
    id: "walk-aerobic",
    name: "Graded walking program",
    region: "General", category: "Cardio", level: "Beginner",
    purpose: "General reconditioning and pain modulation.",
    equipment: "None",
    indications: ["Chronic pain", "Deconditioning", "General health"],
    contraindications: ["Unstable cardiac symptoms (refer)"],
    instructions: ["Start at comfortable pace/time", "Increase ~10% weekly", "Stay within acceptable flare limits"],
    dosage: { sets: 1, reps: "10–30 min", frequency: "Most days" },
    progressions: ["Increase duration", "Add gradient", "Increase pace"],
    regressions: ["Shorter bouts", "Split into intervals"],
    commonErrors: ["Boom-bust overactivity", "Ignoring flare limits"],
  },
];
