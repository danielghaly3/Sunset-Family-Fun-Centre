"use client";

import { EXPERIENCES, PARTY_PACKAGES, formatCad, type ExperienceId, type PartyPackage, type Quote } from "@/lib/booking/config";
import { formatDate, formatTime, type DateKey } from "@/lib/booking/time";
import { Photo } from "../photo";
import { visuals } from "./visuals";

export type SummaryData = {
  experience: ExperienceId | null;
  guests: number;
  pkg: PartyPackage;
  eventType: string;
  date: DateKey | null;
  hour: number | null;
  lane: number | null;
  quote: Quote | null;
};

export function totalText(q: Quote | null) {
  if (!q) return "Choose an experience";
  if (q.total === null) return "Quote from the team";
  return formatCad(q.total);
}

export function Summary({ data, laneNote }: { data: SummaryData; laneNote?: string }) {
  const exp = data.experience ? EXPERIENCES[data.experience] : null;
  const rows: [string, string][] = exp
    ? [
        ...(exp.id === "birthday" ? ([["Package", PARTY_PACKAGES[data.pkg].label]] as [string, string][]) : []),
        ...(exp.id === "group-event" ? ([["Occasion", data.eventType || "Not chosen yet"]] as [string, string][]) : []),
        ["Date", data.date ? formatDate(data.date, { year: undefined }) : "Not chosen yet"],
        ["Time", data.hour !== null ? formatTime(data.hour) : "Not chosen yet"],
        ["Duration", exp.durationLabel],
        ["Guests", String(data.guests)],
        ...(exp.resource === "lane" ? ([["Lane", data.lane ? `Lane ${data.lane} (demo)` : (laneNote ?? "Assigned at checkout")]] as [string, string][]) : []),
      ]
    : [];

  return (
    <section aria-labelledby="summary-title" className="ticket on-dark rounded-[24px] bg-midnight p-6 text-cream [--notch-y:58%] sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <h2 id="summary-title" className="display text-2xl">Your booking</h2>
        <span className="label rounded-full bg-lime px-2.5 py-1 text-[0.6rem] text-midnight">Demo</span>
      </div>

      {exp ? (
        <>
          <div className="mt-5 flex items-center gap-4">
            <span className="relative size-16 shrink-0 overflow-hidden rounded-2xl">
              <Photo src={visuals[exp.id].photo.src} alt="" fill sizes="64px" className="object-cover" />
            </span>
            <div>
              <p className="display text-2xl leading-none">{exp.name}</p>
              <p className="mt-1 text-sm text-cream/70">{exp.mode === "request" ? "Request, confirmed by the team" : "Instant demo booking"}</p>
            </div>
          </div>
          <dl className="mt-6 space-y-2.5 text-[0.95rem]">
            {rows.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4">
                <dt className="text-cream/65">{k}</dt>
                <dd className="text-right font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </>
      ) : (
        <p className="mt-5 text-cream/70">Pick an experience to start. Your selections and price appear here.</p>
      )}

      <div className="mt-6 border-t border-dashed border-cream/25 pt-5">
        {data.quote && data.quote.lines.length > 0 && (
          <ul className="space-y-2 text-[0.95rem]">
            {data.quote.lines.map((l) => (
              <li key={l.label} className="flex justify-between gap-4">
                <span className="text-cream/80">{l.label}</span>
                <span className="font-medium tabular-nums">${l.amount}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4 flex items-end justify-between gap-4">
          <span className="text-cream/70">{data.quote?.estimate ? "Estimated total" : "Total"}</span>
          <span aria-live="polite" className="display text-right text-3xl tabular-nums sm:text-4xl">
            {totalText(data.quote)}
          </span>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-cream/60">
          Demo pricing from Sunset&apos;s published price list, before any applicable taxes. No payment is taken.
        </p>
      </div>
    </section>
  );
}
