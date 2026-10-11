"use client";

import { Check } from "lucide-react";
import { EXPERIENCES, EXPERIENCE_ORDER, type ExperienceId } from "@/lib/booking/config";
import { Photo } from "../photo";
import { visuals } from "./visuals";

export function ExperienceStep({
  value,
  onChange,
}: {
  value: ExperienceId | null;
  onChange: (id: ExperienceId) => void;
}) {
  return (
    <fieldset>
      <legend className="sr-only">Choose an experience</legend>
      <div className="grid gap-4 sm:grid-cols-2">
        {EXPERIENCE_ORDER.map((id, i) => {
          const exp = EXPERIENCES[id];
          const v = visuals[id];
          const selected = value === id;
          return (
            <label
              key={id}
              className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-[24px] p-2.5 transition-[transform,box-shadow] duration-300 ease-[var(--ease-spring)] hover:-translate-y-1 has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-cobalt motion-reduce:hover:translate-y-0 ${v.card} ${
                selected ? "shadow-[0_0_0_4px_var(--color-coral),0_24px_40px_-24px_rgb(18_22_41/0.6)]" : "shadow-[0_12px_30px_-24px_rgb(18_22_41/0.5)]"
              } ${i === 0 ? "sm:col-span-2 sm:flex-row" : ""}`}
            >
              <input
                type="radio"
                name="experience"
                value={id}
                checked={selected}
                onChange={() => onChange(id)}
                className="sr-only"
              />
              <span className={`relative block shrink-0 overflow-hidden rounded-[18px] ${i === 0 ? "h-44 sm:h-auto sm:w-[46%]" : "h-36"}`}>
                <Photo
                  src={v.photo.src}
                  alt=""
                  fill
                  sizes="(min-width:640px) 360px, 90vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
                />
              </span>
              <span className={`flex flex-1 flex-col p-4 ${i === 0 ? "sm:p-6" : ""}`}>
                <span className="flex items-start justify-between gap-3">
                  <span className="display text-[1.75rem] leading-[0.95]">{exp.name}</span>
                  <span
                    aria-hidden
                    className={`grid size-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                      selected ? "scale-100 bg-coral text-midnight" : "scale-90 shadow-[inset_0_0_0_2px_currentColor] opacity-50"
                    }`}
                  >
                    {selected && <Check className="size-4" strokeWidth={3} />}
                  </span>
                </span>
                <span className={`mt-2 text-[0.95rem] leading-snug ${v.muted}`}>{exp.tagline}</span>
                <span className="mt-4 flex flex-wrap gap-1.5">
                  {exp.facts.map((f) => (
                    <span key={f} className={`rounded-full px-2.5 py-1 text-xs font-semibold ${v.chip}`}>
                      {f}
                    </span>
                  ))}
                </span>
                <span className="mt-auto flex items-center justify-between gap-3 pt-5">
                  <span className="font-[family-name:var(--font-label)] text-sm font-bold">{exp.priceHint}</span>
                  {exp.mode === "request" && (
                    <span className="label rounded-full bg-midnight px-2 py-1 text-[0.6rem] text-cream">Request</span>
                  )}
                </span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
