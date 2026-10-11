"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { dayLevel } from "@/lib/booking/availability";
import { BOOKING_WINDOW_DAYS, type Experience } from "@/lib/booking/config";
import type { Booking } from "@/lib/booking/records";
import { addDays, daysInMonth, formatDate, parseKey, toKey, weekday, type DateKey, type Now } from "@/lib/booking/time";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const LEVEL = {
  good: { dot: "bg-[#2f9e5b]", text: "good availability" },
  low: { dot: "bg-coral", text: "limited availability" },
  request: { dot: "bg-cobalt", text: "open for requests" },
  full: { dot: "bg-midnight/25", text: "fully booked" },
  unavailable: { dot: "", text: "not available" },
} as const;

export type Month = { y: number; m: number };

export function Calendar({
  exp,
  bookings,
  now,
  value,
  onChange,
  month,
  onMonth,
}: {
  exp: Experience;
  bookings: Booking[];
  now: Now;
  value: DateKey | null;
  onChange: (d: DateKey) => void;
  month: Month;
  onMonth: (m: Month) => void;
}) {
  const first = toKey(month.y, month.m, 1);
  const total = daysInMonth(month.y, month.m);
  const lead = weekday(first);
  const today = parseKey(now.date);
  const last = parseKey(addDays(now.date, BOOKING_WINDOW_DAYS));
  const canPrev = month.y > today.y || (month.y === today.y && month.m > today.m);
  const canNext = month.y < last.y || (month.y === last.y && month.m < last.m);
  const shift = (n: number) => {
    const d = new Date(Date.UTC(month.y, month.m - 1 + n, 1));
    onMonth({ y: d.getUTCFullYear(), m: d.getUTCMonth() + 1 });
  };
  const title = formatDate(first, { weekday: undefined, day: undefined });

  return (
    <div className="rounded-[24px] bg-cream p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <button type="button" onClick={() => shift(-1)} disabled={!canPrev} aria-label="Previous month" className="grid size-11 place-items-center rounded-full bg-cream-2 transition-opacity hover:bg-midnight hover:text-cream disabled:pointer-events-none disabled:opacity-30">
          <ChevronLeft aria-hidden className="size-5" />
        </button>
        <h3 className="display text-2xl sm:text-3xl" aria-live="polite">{title}</h3>
        <button type="button" onClick={() => shift(1)} disabled={!canNext} aria-label="Next month" className="grid size-11 place-items-center rounded-full bg-cream-2 transition-opacity hover:bg-midnight hover:text-cream disabled:pointer-events-none disabled:opacity-30">
          <ChevronRight aria-hidden className="size-5" />
        </button>
      </div>

      <div className="mt-6 grid grid-cols-7 gap-1 text-center sm:gap-2">
        <div className="contents">
          {WEEKDAYS.map((w) => (
            <div key={w} aria-hidden className="label pb-2 text-[0.65rem] text-ink-soft">
              {w}
            </div>
          ))}
        </div>
        <div className="contents">
          {Array.from({ length: lead }, (_, i) => (
            <div key={`b${i}`} aria-hidden />
          ))}
          {Array.from({ length: total }, (_, i) => {
            const key = toKey(month.y, month.m, i + 1);
            const level = dayLevel(exp, key, bookings, now);
            const disabled = level === "unavailable" || level === "full";
            const selected = value === key;
            const isToday = key === now.date;
            return (
              <div key={key}>
                <button
                  type="button"
                  disabled={disabled}
                  aria-pressed={selected}
                  aria-label={`${formatDate(key)}${isToday ? ", today" : ""}, ${LEVEL[level].text}`}
                  onClick={() => onChange(key)}
                  className={`relative flex h-12 w-full flex-col sm:h-14 items-center justify-center rounded-2xl text-base font-semibold tabular-nums transition-[background-color,color,transform] duration-200 active:scale-95 sm:text-lg ${
                    selected
                      ? "bg-midnight text-cream shadow-[0_10px_24px_-12px_rgb(18_22_41/0.8)]"
                      : disabled
                        ? "cursor-not-allowed text-midnight/25"
                        : "hover:bg-cream-2"
                  } ${isToday && !selected ? "shadow-[inset_0_0_0_2px_var(--color-coral)]" : ""} ${level === "full" ? "line-through" : ""}`}
                >
                  {i + 1}
                  {level !== "unavailable" && (
                    <span aria-hidden className={`absolute bottom-[14%] size-1.5 rounded-full ${selected ? "bg-lime" : LEVEL[level].dot}`} />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-soft">
        {(exp.mode === "request" ? (["request", "full"] as const) : (["good", "low", "full"] as const)).map((l) => (
          <li key={l} className="flex items-center gap-2">
            <span aria-hidden className={`size-2 rounded-full ${LEVEL[l].dot}`} />
            {LEVEL[l].text[0].toUpperCase() + LEVEL[l].text.slice(1)}
          </li>
        ))}
      </ul>
    </div>
  );
}
