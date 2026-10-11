"use client";

import { useEffect, useRef } from "react";
import { Check } from "lucide-react";

export const STEPS = ["Experience", "Guests", "Date", "Time", "Details", "Review"] as const;

export function StepIndicator({
  step,
  reachable,
  onGo,
}: {
  step: number;
  reachable: number;
  onGo: (i: number) => void;
}) {
  return (
    <nav aria-label="Booking steps">
      <ol className="flex items-center">
        {STEPS.map((label, i) => {
          const done = i < step;
          const current = i === step;
          const canGo = i !== step && i <= reachable;
          const dot = (
            <span
              className={`grid size-9 shrink-0 place-items-center rounded-full font-[family-name:var(--font-label)] text-sm font-bold transition-colors duration-300 ${
                current
                  ? "bg-coral text-midnight shadow-[0_8px_20px_-8px_rgb(242_86_58/0.8)]"
                  : done
                    ? "bg-midnight text-cream"
                    : "bg-cream text-midnight/50 shadow-[inset_0_0_0_2px_rgb(18_22_41/0.15)]"
              }`}
            >
              {done ? <Check aria-hidden className="size-4" strokeWidth={3} /> : i + 1}
            </span>
          );
          return (
            <li key={label} className={`flex items-center ${i < STEPS.length - 1 ? "flex-1" : ""}`}>
              {canGo ? (
                <button
                  type="button"
                  onClick={() => onGo(i)}
                  className="flex items-center gap-2 rounded-full"
                  aria-label={`Step ${i + 1}: ${label}${done ? ", completed" : ""}`}
                >
                  {dot}
                  <span className="hidden text-sm font-semibold xl:inline">{label}</span>
                </button>
              ) : (
                <span className="flex items-center gap-2" aria-current={current ? "step" : undefined}>
                  {dot}
                  <span className={`text-sm font-semibold ${current ? "inline" : "hidden xl:inline"} ${current ? "" : "text-midnight/50"}`}>
                    <span className="sr-only">Step {i + 1}: </span>
                    {label}
                  </span>
                </span>
              )}
              {i < STEPS.length - 1 && (
                <span aria-hidden className={`mx-2 h-[3px] flex-1 rounded-full transition-colors duration-500 ${done ? "bg-midnight" : "bg-midnight/12"}`} />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Each step's heading takes focus when the step opens, so keyboard and screen-reader users land in the right place. */
export function StepHeading({ title, sub, focus }: { title: string; sub?: React.ReactNode; focus: boolean }) {
  const ref = useRef<HTMLHeadingElement>(null);
  // Mount only: re-renders (typing, counters) must never pull focus back to the heading.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => void (focus && ref.current?.focus()), []);
  return (
    <div className="mb-8">
      <h2
        tabIndex={-1}
        ref={ref}
        className="display text-[clamp(2.2rem,5vw,3.4rem)] outline-none"
      >
        {title}
      </h2>
      {sub && <p className="mt-3 max-w-[56ch] text-lg text-ink-soft">{sub}</p>}
    </div>
  );
}
