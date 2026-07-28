/**
 * DrPhysioAI — sample patient caseload (illustrative demo data only).
 * No real patient information. Replace with data from your DB (e.g. Supabase)
 * behind auth + row-level security in production.
 */

export type PatientStatus = "New" | "Active" | "On hold" | "Discharged";

export type Patient = {
  id: string;
  name: string;
  age: number;
  sex: "F" | "M" | "X";
  condition: string;
  region: string;
  status: PatientStatus;
  lastVisit: string;
  nextAppt: string | null;
  clinician: string;
  outcome: number; // % improvement to date
  flag?: string;   // optional alert
  measures: { name: string; value: number }[];
};

export const patientStatuses: PatientStatus[] = ["New", "Active", "On hold", "Discharged"];

export const statusStyle: Record<PatientStatus, string> = {
  New: "bg-violet-500/15 text-violet-600",
  Active: "bg-teal-500/15 text-teal-700 dark:text-teal-300",
  "On hold": "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  Discharged: "bg-muted text-muted-foreground",
};

export const patients: Patient[] = [
  {
    id: "p-anaya", name: "Ananya Rao", age: 34, sex: "F",
    condition: "Patellofemoral pain", region: "Knee", status: "New",
    lastVisit: "Today", nextAppt: "In 1 week", clinician: "Dr. Utsav", outcome: 0,
    measures: [{ name: "NPRS", value: 20 }, { name: "LEFS", value: 35 }],
  },
  {
    id: "p-rakesh", name: "Rakesh Menon", age: 58, sex: "M",
    condition: "Post-op ACL rehab", region: "Knee", status: "Active",
    lastVisit: "Today", nextAppt: "In 3 days", clinician: "Dr. Utsav", outcome: 62,
    measures: [{ name: "NPRS", value: 70 }, { name: "LEFS", value: 66 }],
  },
  {
    id: "p-priya", name: "Priya Sharma", age: 71, sex: "F",
    condition: "Non-specific low back pain", region: "Low back", status: "Active",
    lastVisit: "Yesterday", nextAppt: "Today 11:30", clinician: "Dr. Utsav", outcome: 48,
    measures: [{ name: "Oswestry", value: 54 }, { name: "PSFS", value: 60 }],
  },
  {
    id: "p-sunil", name: "Sunil Kapoor", age: 45, sex: "M",
    condition: "Rotator cuff related pain", region: "Shoulder", status: "Active",
    lastVisit: "3 days ago", nextAppt: "Today 14:00", clinician: "Dr. Utsav", outcome: 40,
    measures: [{ name: "NPRS", value: 55 }, { name: "SPADI", value: 58 }],
  },
  {
    id: "p-meera", name: "Meera Das", age: 29, sex: "F",
    condition: "Mechanical neck pain", region: "Neck", status: "New",
    lastVisit: "—", nextAppt: "Today 15:30", clinician: "Dr. Utsav", outcome: 0,
    measures: [{ name: "NDI", value: 30 }],
  },
  {
    id: "p-vikram", name: "Vikram Patel", age: 63, sex: "M",
    condition: "Lateral ankle sprain", region: "Ankle", status: "On hold",
    lastVisit: "2 weeks ago", nextAppt: null, clinician: "Dr. Utsav", outcome: 55,
    flag: "Awaiting imaging",
    measures: [{ name: "FAAM", value: 62 }],
  },
  {
    id: "p-sana", name: "Sana Qureshi", age: 38, sex: "F",
    condition: "Cervical radiculopathy", region: "Neck", status: "Active",
    lastVisit: "5 days ago", nextAppt: "In 2 days", clinician: "Dr. Utsav", outcome: 33,
    flag: "Monitor neuro signs",
    measures: [{ name: "NDI", value: 45 }, { name: "NPRS", value: 50 }],
  },
  {
    id: "p-arjun", name: "Arjun Nair", age: 24, sex: "M",
    condition: "Sports injury — return to play", region: "Knee", status: "Active",
    lastVisit: "1 week ago", nextAppt: "In 4 days", clinician: "Dr. Utsav", outcome: 78,
    measures: [{ name: "LEFS", value: 82 }, { name: "IKDC", value: 80 }],
  },
  {
    id: "p-fatima", name: "Fatima Sheikh", age: 52, sex: "F",
    condition: "Chronic low back pain", region: "Low back", status: "Active",
    lastVisit: "4 days ago", nextAppt: "In 1 week", clinician: "Dr. Utsav", outcome: 41,
    measures: [{ name: "Oswestry", value: 48 }],
  },
  {
    id: "p-deepak", name: "Deepak Iyer", age: 67, sex: "M",
    condition: "Post-surgical shoulder rehab", region: "Shoulder", status: "Discharged",
    lastVisit: "1 month ago", nextAppt: null, clinician: "Dr. Utsav", outcome: 92,
    measures: [{ name: "SPADI", value: 90 }],
  },
];
