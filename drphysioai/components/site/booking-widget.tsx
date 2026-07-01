"use client";

import * as React from "react";
import {
  Check, Clock, CalendarDays, CreditCard, ShieldCheck, MessageCircle, Loader2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "./icon";
import { consultationServices, timeSlots, site } from "@/lib/content";
import { cn } from "@/lib/utils";

type Step = 1 | 2 | 3;

/** Next 7 days as selectable chips (computed client-side to stay static). */
function useUpcomingDays() {
  return React.useMemo(() => {
    const days = [];
    const fmtD = new Intl.DateTimeFormat("en-IN", { weekday: "short" });
    const fmtN = new Intl.DateTimeFormat("en-IN", { day: "numeric" });
    const fmtM = new Intl.DateTimeFormat("en-IN", { month: "short" });
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      days.push({
        key: d.toISOString().slice(0, 10),
        dow: i === 0 ? "Today" : i === 1 ? "Tmrw" : fmtD.format(d),
        num: fmtN.format(d),
        mon: fmtM.format(d),
      });
    }
    return days;
  }, []);
}

export function BookingWidget() {
  const days = useUpcomingDays();
  const [service, setService] = React.useState(consultationServices[0].title);
  const [day, setDay] = React.useState(days[0].key);
  const [slot, setSlot] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<"idle" | "loading" | "done">("idle");

  const selected = consultationServices.find((s) => s.title === service)!;
  const selectedDay = days.find((d) => d.key === day)!;

  function confirm() {
    if (!slot) return;
    setStatus("loading");
    // Placeholder for checkout — becomes a Shopify/Stripe redirect once connected.
    window.setTimeout(() => setStatus("done"), 1100);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      {/* left: chooser */}
      <div className="space-y-6">
        <StepBlock n={1} title="Choose a service">
          <div className="grid gap-3 sm:grid-cols-2">
            {consultationServices.map((s) => (
              <button
                key={s.title}
                onClick={() => setService(s.title)}
                className={cn(
                  "flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-all",
                  service === s.title
                    ? "border-teal-500 bg-brand-soft shadow-glow"
                    : "border-border bg-card hover:border-teal-500/40",
                )}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-teal-600">
                  <Icon name={s.icon} className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-bold">{s.title}</span>
                  <span className="text-xs text-muted-foreground">
                    ₹{s.price} · {s.mins} min
                  </span>
                </span>
              </button>
            ))}
          </div>
        </StepBlock>

        <StepBlock n={2} title="Pick a date">
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {days.map((d) => (
              <button
                key={d.key}
                onClick={() => setDay(d.key)}
                className={cn(
                  "flex min-w-[64px] flex-col items-center rounded-2xl border px-3 py-2.5 transition-all",
                  day === d.key
                    ? "border-transparent bg-brand-gradient text-white shadow-glow"
                    : "border-border bg-card hover:border-teal-500/40",
                )}
              >
                <span className="text-[11px] font-semibold uppercase opacity-80">{d.dow}</span>
                <span className="text-lg font-extrabold leading-none">{d.num}</span>
                <span className="text-[11px] opacity-80">{d.mon}</span>
              </button>
            ))}
          </div>
        </StepBlock>

        <StepBlock n={3} title="Select a time">
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {timeSlots.map((t) => (
              <button
                key={t}
                onClick={() => setSlot(t)}
                className={cn(
                  "rounded-xl border py-2.5 text-sm font-semibold transition-all",
                  slot === t
                    ? "border-teal-500 bg-brand-soft text-teal-700 shadow-soft"
                    : "border-border bg-card text-muted-foreground hover:text-foreground",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </StepBlock>
      </div>

      {/* right: sticky summary */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <Card className="p-6 shadow-card">
          {status === "done" ? (
            <div className="py-6 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-teal-500/15 text-teal-600">
                <Check className="h-7 w-7" />
              </span>
              <h3 className="mt-4 font-display text-xl font-bold">You&apos;re booked! 🎉</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {selected.title} · {selectedDay.dow} {selectedDay.num} {selectedDay.mon} · {slot}
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                A confirmation + WhatsApp reminder is on its way.
              </p>
              <Button className="mt-5 w-full" onClick={() => setStatus("idle")}>
                Book another
              </Button>
            </div>
          ) : (
            <>
              <h3 className="font-display text-lg font-bold">Booking summary</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <Row label="Service" value={selected.title} />
                <Row
                  label={<><CalendarDays className="mr-1 inline h-3.5 w-3.5" />Date</>}
                  value={`${selectedDay.dow} ${selectedDay.num} ${selectedDay.mon}`}
                />
                <Row
                  label={<><Clock className="mr-1 inline h-3.5 w-3.5" />Time</>}
                  value={slot ?? <span className="text-muted-foreground">Pick a slot</span>}
                />
                <Row label="Duration" value={`${selected.mins} minutes`} />
              </dl>

              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <span className="text-sm text-muted-foreground">Total (incl. GST)</span>
                <span className="font-display text-2xl font-extrabold">₹{selected.price}</span>
              </div>

              <Button
                className="mt-5 w-full"
                size="lg"
                disabled={!slot || status === "loading"}
                onClick={confirm}
              >
                {status === "loading" ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Processing…</>
                ) : (
                  <><CreditCard className="h-4 w-4" /> Confirm &amp; Pay</>
                )}
              </Button>

              <div className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                <p className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-teal-500" /> UPI · Cards · Net-banking · GST invoice
                </p>
                <p className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-teal-500" /> Free cancellation up to 4 hours before
                </p>
              </div>

              <a
                href={site.whatsappLink}
                className="mt-4 flex items-center justify-center gap-2 rounded-full border border-border py-2.5 text-sm font-semibold transition-colors hover:bg-muted"
              >
                <MessageCircle className="h-4 w-4 text-[#25D366]" /> Prefer WhatsApp? Book via chat
              </a>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

function StepBlock({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2.5">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-gradient text-xs font-bold text-white">
          {n}
        </span>
        <h3 className="font-display text-base font-bold">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-semibold">{value}</dd>
    </div>
  );
}
