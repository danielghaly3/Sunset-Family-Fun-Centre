"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { photos } from "@/data/attractions";
import { Photo } from "../photo";
import { LaneArrows } from "../motifs";

const moments = ["Family nights out", "Birthday afternoons", "Friday nights with friends", "League nights"];

export function Cinematic() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Slow push-in as the section passes: depth, not decoration. CSS cancels it for reduced motion
  // so server and client render the same markup.
  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);

  return (
    <section
      ref={ref}
      aria-labelledby="more-title"
      className="on-dark relative isolate flex min-h-[92dvh] items-end overflow-hidden bg-midnight text-cream"
    >
      <motion.div style={{ scale }} className="absolute inset-0 -z-10 motion-reduce:[transform:none!important]">
        <Photo src={photos.shoe.src} alt="" fill sizes="100vw" className="object-cover object-[60%_50%]" />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(18_22_41/0.15)_0%,rgb(18_22_41/0.55)_45%,rgb(18_22_41/0.96)_100%)] md:bg-[linear-gradient(100deg,rgb(18_22_41/0.95)_0%,rgb(18_22_41/0.7)_45%,rgb(18_22_41/0.1)_100%)]"
      />
      <div className="shell grain relative py-20 sm:py-28">
        <h2 id="more-title" className="display reveal text-[clamp(3.2rem,9vw,8.5rem)] leading-[0.86]">
          More than
          <br />
          just a <span className="text-lime">game.</span>
        </h2>
        <p className="reveal mt-8 max-w-[44ch] text-lg leading-relaxed text-cream/85 sm:text-xl">
          Bowling, glow golf and the arcade, all under one roof. Roll a few frames, putt through the glowing jungle,
          then cash in your points for a prize on the way out.
        </p>
        <ul className="reveal mt-12 flex flex-wrap gap-x-8 gap-y-4">
          {moments.map((m) => (
            <li key={m} className="flex items-center gap-3 font-[family-name:var(--font-label)] font-semibold uppercase tracking-wide">
              <LaneArrows count={1} className="rotate-90 text-[0.8rem] text-coral" />
              {m}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
