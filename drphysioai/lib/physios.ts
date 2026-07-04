/** Physiotherapist profiles — people book people. Trust-building details. */

export interface Physio {
  name: string;
  title: string;
  specialties: string[];
  experienceYears: number;
  languages: string[];
  rating: number;
  reviews: number;
  bio: string;
}

export const physios: Physio[] = [
  {
    name: "Dr. Utsav Upadhyay",
    title: "Founder · Sports & Orthopaedic Physiotherapist",
    specialties: ["Sports Injury", "Orthopaedics", "Post-Surgical Rehab"],
    experienceYears: 10,
    languages: ["English", "Hindi", "Gujarati"],
    rating: 4.9,
    reviews: 1240,
    bio: "Founder of DrPhysioAI, passionate about making expert physiotherapy accessible to every Indian. Specialises in sports and post-surgical rehabilitation.",
  },
  {
    name: "Dr. Sneha Patel",
    title: "Pain Management & Post-Surgical Specialist",
    specialties: ["Back & Neck Pain", "Post-Surgical Rehab", "Arthritis"],
    experienceYears: 8,
    languages: ["English", "Hindi", "Gujarati"],
    rating: 4.9,
    reviews: 980,
    bio: "Helps patients recover from chronic pain and surgery with gentle, evidence-based programs designed around each person's life.",
  },
  {
    name: "Dr. Ravi Menon",
    title: "Sports & Strength Physiotherapist",
    specialties: ["Sports Injury", "Strength & Conditioning", "Prehab"],
    experienceYears: 9,
    languages: ["English", "Hindi"],
    rating: 4.8,
    reviews: 860,
    bio: "Works with athletes and gym-goers to recover from injury and return to play stronger, with a focus on preventing re-injury.",
  },
  {
    name: "Dr. Aditi Rao",
    title: "Prenatal, Postnatal & Senior Care Physiotherapist",
    specialties: ["Prenatal & Postnatal", "Senior Balance", "Neuro Rehab"],
    experienceYears: 7,
    languages: ["English", "Hindi"],
    rating: 4.9,
    reviews: 720,
    bio: "Gentle, patient care for expecting mothers, new mothers and seniors — improving strength, balance and confidence at every stage of life.",
  },
];
