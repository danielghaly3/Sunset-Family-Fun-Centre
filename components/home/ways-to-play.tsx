"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { offers } from "@/data/attractions";
import { Ticket } from "../ticket";

const filters = [
  { id: "all", label: "Everything" },
  { id: "per group", label: "For groups" },
  { id: "per person", label: "Per person" },
] as const;

export function WaysToPlay() {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const reduce = useReducedMotion();
  const shown = offers.filter((o) => filter === "all" || o.unit === filter);

  return (
    <section aria-labelledby="ways-title" className="on-dark bg-midnight py-24 text-cream lg:py-32">
      <div className="shell">
        <h2 id="ways-title" className="display reveal text-[clamp(3rem,8vw,7rem)]">
          Popular ways
          <br />
          to <span className="text-lime">play.</span>
        </h2>

        <div role="group" aria-label="Filter prices" className="mt-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className="btn btn-sm text-cream shadow-[inset_0_0_0_2px_rgb(255_247_235/0.25)] hover:shadow-[inset_0_0_0_2px_var(--color-cream)] aria-pressed:bg-cream aria-pressed:text-midnight"
            >
              {f.label}
            </button>
          ))}
        </div>

        <p className="sr-only" aria-live="polite">
          Showing {shown.length} options
        </p>
        <motion.ul
          layout={!reduce}
          className={`mt-10 grid gap-5 md:grid-cols-2 ${shown.length === 2 ? "" : "lg:grid-cols-3"}`}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((o) => (
              <motion.li
                key={o.id}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, scale: 0.94 }}
                transition={{ type: "spring", stiffness: 260, damping: 28 }}
                className={o.featured && filter !== "per group" ? "md:col-span-2" : o.featured ? "md:col-span-2 lg:col-span-1" : ""}
              >
                <Ticket offer={o} tone={o.featured ? "sunset" : "night"} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        <p className="mt-8 max-w-[70ch] text-sm text-cream/65">
          Prices in Canadian dollars, as listed on Sunset&apos;s current public website, and subject to confirmation.
          Online booking on this concept site is a demo with simulated availability.
        </p>
      </div>
    </section>
  );
}
