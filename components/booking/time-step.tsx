"use client";

import { CalendarX2, Clock } from "lucide-react";
import { isOpenSlot, slotsFor, type Slot } from "@/lib/booking/availability";
import type { Experience } from "@/lib/booking/config";
import type { Booking } from "@/lib/booking/records";
import { formatTime, type DateKey, type Now } from "@/lib/booking/time";

function statusText(s: Slot, exp: Experience) {
  switch (s.status) {
    case "past":
      return "Time passed";
    case "full":
      return "Fully booked";
    case "request":
      return "Request this time";
    case "limited":
      return exp.resource === "lane" ? `${s.left} ${s.left === 1 ? "lane" : "lanes"} left` : `${s.left} tee time left`;
    default:
      return "Available";
  }
}

export function TimeStep({
  exp,
  date,
  bookings,
  now,
  value,
  onChange,
  onChangeDate,
}: {
  exp: Experience;
  date: DateKey;
  bookings: Booking[];
  now: Now;
  value: number | null;
  onChange: (h: number) => void;
  onChangeDate: () => void;
}) {
  const slots = slotsFor(exp, date, bookings, now);
  const open = slots.filter(isOpenSlot);

  if (open.length === 0) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-[24px] bg-cream p-8">
        <CalendarX2 aria-hidden className="size-8 text-coral-deep" />
        <p className="text-lg">No times left on this day for {exp.name}. Try another date.</p>
        <button type="button" onClick={onChangeDate} className="btn btn-sm btn-dark">
          Choose another date
        </button>
      </div>
    );
  }

  return (
    <div>
      <fieldset>
        <legend className="sr-only">Start time</legend>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {slots.map((s) => {
            const disabled = !isOpenSlot(s);
            const selected = value === s.hour;
            return (
              <label
                key={s.hour}
                className={`relative flex flex-col rounded-2xl p-4 transition-[background-color,color,transform] duration-200 has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-cobalt sm:p-5 ${
                  selected
                    ? "bg-midnight text-cream shadow-[0_14px_30px_-16px_rgb(18_22_41/0.9)]"
                    : disabled
                      ? "cursor-not-allowed bg-cream/50 text-midnight/35"
                      : "cursor-pointer bg-cream hover:-translate-y-0.5 hover:bg-white motion-reduce:hover:translate-y-0"
                }`}
              >
                <input
                  type="radio"
                  name="time"
                  className="sr-only"
                  disabled={disabled}
                  checked={selected}
                  onChange={() => onChange(s.hour)}
                />
                <span className="display text-2xl sm:text-3xl">{formatTime(s.hour)}</span>
                <span
                  className={`mt-1 flex items-center gap-1.5 text-sm font-semibold ${
                    selected ? "text-lime" : s.status === "limited" ? "text-error" : disabled ? "" : "text-[#237a46]"
                  } ${s.status === "full" ? "line-through" : ""}`}
                >
                  {statusText(s, exp)}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>
      <p className="mt-6 flex items-center gap-2 text-sm text-ink-soft">
        <Clock aria-hidden className="size-4" />
        Eastern Time (Port Elgin). {exp.resource === "lane" ? "A lane is assigned automatically when you complete the booking." : ""}
      </p>
    </div>
  );
}
