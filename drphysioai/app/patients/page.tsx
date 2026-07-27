import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/shell";
import { PatientsTable } from "@/components/dashboard/patients-table";

export const metadata: Metadata = {
  title: "Patients",
  description: "Manage your physiotherapy caseload — patients, conditions, status and outcomes.",
  robots: { index: false, follow: false },
};

export default function PatientsPage() {
  return (
    <DashboardShell>
      <div>
        <h1 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">Patients</h1>
        <p className="mt-1 text-muted-foreground">Your caseload — search, filter and open a patient to see outcomes and act.</p>
      </div>
      <div className="mt-6">
        <PatientsTable />
      </div>
    </DashboardShell>
  );
}
