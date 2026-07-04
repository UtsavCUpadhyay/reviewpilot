export type ExerciseCategory =
  | "Back"
  | "Neck"
  | "Knee"
  | "Shoulder"
  | "Hip"
  | "Posture"
  | "Mobility"
  | "Core";

export type Exercise = {
  slug: string;
  name: string;
  category: ExerciseCategory;
  emoji: string;
  target: string; // what it helps with
  level: "Beginner" | "Intermediate" | "Advanced";
  durationMin: number;
  reps: string;
  steps: string[];
  cue: string; // one key safety cue
};

/**
 * Curated home-exercise library. Every routine is safe, equipment-free and
 * physiotherapist-approved for general fitness — not a substitute for a
 * personalised plan. Used by /exercises and the progress/streak tracker.
 */
export const exercises: Exercise[] = [
  {
    slug: "cat-cow-stretch",
    name: "Cat–Cow Stretch",
    category: "Back",
    emoji: "🐱",
    target: "Gently mobilises a stiff lower back and warms up the spine.",
    level: "Beginner",
    durationMin: 3,
    reps: "10 slow rounds",
    steps: [
      "Start on all fours, wrists under shoulders and knees under hips.",
      "Inhale, drop your belly and lift your chest and tailbone (Cow).",
      "Exhale, round your spine towards the ceiling and tuck your chin (Cat).",
      "Move slowly with your breath, one round every few seconds.",
    ],
    cue: "Move within a comfortable range — never force the arch.",
  },
  {
    slug: "pelvic-tilt",
    name: "Pelvic Tilt",
    category: "Back",
    emoji: "🧘",
    target: "Activates deep core muscles and eases lower-back tension.",
    level: "Beginner",
    durationMin: 3,
    reps: "3 sets of 10",
    steps: [
      "Lie on your back, knees bent, feet flat on the floor.",
      "Flatten your lower back gently into the floor by tightening your tummy.",
      "Hold for 5 seconds, breathing normally.",
      "Release slowly and repeat.",
    ],
    cue: "Keep the movement small — it's your core working, not your legs.",
  },
  {
    slug: "bird-dog",
    name: "Bird-Dog",
    category: "Core",
    emoji: "🐦",
    target: "Builds core and back stability to protect the spine.",
    level: "Intermediate",
    durationMin: 4,
    reps: "3 sets of 8 each side",
    steps: [
      "Start on all fours with a flat back.",
      "Extend your right arm forward and left leg back together.",
      "Keep your hips level and hold for 3 seconds.",
      "Return and switch to the other side.",
    ],
    cue: "Don't let your lower back sag — keep your tummy gently braced.",
  },
  {
    slug: "chin-tucks",
    name: "Chin Tucks",
    category: "Neck",
    emoji: "🙆",
    target: "Corrects forward-head posture and eases tech-neck strain.",
    level: "Beginner",
    durationMin: 2,
    reps: "3 sets of 10",
    steps: [
      "Sit or stand tall, looking straight ahead.",
      "Gently draw your chin straight back, making a 'double chin'.",
      "Hold for 5 seconds — you should feel a stretch at the base of your skull.",
      "Release slowly and repeat.",
    ],
    cue: "Keep your eyes level — don't tilt your head up or down.",
  },
  {
    slug: "neck-side-stretch",
    name: "Neck Side Stretch",
    category: "Neck",
    emoji: "💆",
    target: "Relieves tight upper-trap muscles from desk work.",
    level: "Beginner",
    durationMin: 2,
    reps: "3 holds each side",
    steps: [
      "Sit tall and relax your shoulders down.",
      "Gently tilt your right ear towards your right shoulder.",
      "For a deeper stretch, rest your right hand lightly on your head.",
      "Hold 20 seconds, then switch sides.",
    ],
    cue: "Let the weight of your hand do the work — never pull hard.",
  },
  {
    slug: "quad-sets",
    name: "Quad Sets",
    category: "Knee",
    emoji: "🦵",
    target: "Rebuilds thigh strength around the knee — great post-injury.",
    level: "Beginner",
    durationMin: 3,
    reps: "3 sets of 10",
    steps: [
      "Sit with your leg straight out in front of you.",
      "Tighten the thigh muscle to press the back of your knee down.",
      "Hold for 5 seconds — your kneecap should ride up slightly.",
      "Relax and repeat.",
    ],
    cue: "Keep breathing — don't hold your breath while you squeeze.",
  },
  {
    slug: "straight-leg-raise",
    name: "Straight-Leg Raise",
    category: "Knee",
    emoji: "🦿",
    target: "Strengthens the knee without bending it — safe for recovery.",
    level: "Beginner",
    durationMin: 4,
    reps: "3 sets of 10 each leg",
    steps: [
      "Lie on your back, one knee bent and the other leg straight.",
      "Tighten the thigh of the straight leg and lift it to the height of the bent knee.",
      "Hold for 3 seconds at the top.",
      "Lower slowly and repeat, then switch legs.",
    ],
    cue: "Keep the working leg dead straight throughout the lift.",
  },
  {
    slug: "wall-angels",
    name: "Wall Angels",
    category: "Posture",
    emoji: "😇",
    target: "Opens the chest and trains upright, tall posture.",
    level: "Intermediate",
    durationMin: 3,
    reps: "3 sets of 10",
    steps: [
      "Stand with your back, head and hips against a wall.",
      "Raise your arms into a 'goalpost' position, backs of hands to the wall.",
      "Slide your arms up overhead, keeping contact with the wall.",
      "Slide back down slowly.",
    ],
    cue: "Keep your lower back gently flat — don't let it arch off the wall.",
  },
  {
    slug: "pendulum-swings",
    name: "Pendulum Swings",
    category: "Shoulder",
    emoji: "🕰️",
    target: "Gently mobilises a stiff or frozen shoulder.",
    level: "Beginner",
    durationMin: 3,
    reps: "1–2 minutes each direction",
    steps: [
      "Lean forward, supporting yourself on a table with your good arm.",
      "Let your sore arm hang loose and relaxed.",
      "Use your body to gently swing the arm in small circles.",
      "Reverse the direction after a minute.",
    ],
    cue: "Let gravity move the arm — the shoulder muscles stay relaxed.",
  },
  {
    slug: "glute-bridge",
    name: "Glute Bridge",
    category: "Hip",
    emoji: "🌉",
    target: "Strengthens glutes and hips to support the lower back.",
    level: "Beginner",
    durationMin: 4,
    reps: "3 sets of 12",
    steps: [
      "Lie on your back, knees bent, feet flat and hip-width apart.",
      "Squeeze your glutes and lift your hips into a straight line.",
      "Hold at the top for 3 seconds.",
      "Lower slowly with control.",
    ],
    cue: "Drive through your heels and squeeze the glutes, not the back.",
  },
  {
    slug: "hip-flexor-stretch",
    name: "Hip Flexor Stretch",
    category: "Hip",
    emoji: "🏹",
    target: "Loosens tight hip flexors from long hours of sitting.",
    level: "Beginner",
    durationMin: 3,
    reps: "3 holds each side",
    steps: [
      "Kneel on one knee with the other foot flat in front (half-kneel).",
      "Tuck your tailbone under and gently push your hips forward.",
      "Feel the stretch at the front of the kneeling hip.",
      "Hold 30 seconds, then switch sides.",
    ],
    cue: "Keep your chest tall and your back straight, not arched.",
  },
  {
    slug: "ankle-mobility",
    name: "Ankle Mobility Rocks",
    category: "Mobility",
    emoji: "🦶",
    target: "Improves ankle flexibility for squats, stairs and balance.",
    level: "Beginner",
    durationMin: 3,
    reps: "3 sets of 10 each side",
    steps: [
      "Stand facing a wall in a short lunge, front foot a hand-width away.",
      "Keeping your heel down, rock your front knee towards the wall.",
      "Feel the stretch at the front of the ankle.",
      "Return and repeat, then switch sides.",
    ],
    cue: "Keep the heel glued to the floor the whole time.",
  },
];

export const exerciseCategories: ExerciseCategory[] = [
  "Back",
  "Neck",
  "Knee",
  "Shoulder",
  "Hip",
  "Posture",
  "Core",
  "Mobility",
];

export function getExercise(slug: string): Exercise | undefined {
  return exercises.find((e) => e.slug === slug);
}
