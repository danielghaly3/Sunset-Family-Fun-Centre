import { SunsetDisc } from "../motifs";

const words = ["Bowl", "Glow", "Play", "Repeat"];

/** The page's single marquee. Pauses on hover and stops under reduced motion. */
export function PlayStrip() {
  const run = (
    <div className="flex shrink-0 items-center">
      {[...words, ...words].map((w, i) => (
        <span key={i} className="flex items-center">
          <span className={`display px-6 text-[clamp(2.4rem,6vw,4.75rem)] ${i % 4 === 1 ? "outline-text [--fill:var(--color-coral)] [--stroke:var(--color-midnight)]" : ""}`}>
            {w}
          </span>
          <SunsetDisc className="size-[clamp(1.6rem,3.5vw,2.75rem)] [background:var(--color-midnight)]" />
        </span>
      ))}
    </div>
  );
  return (
    // overflow-x clip (not hidden) trims the rotated band's ends without clipping it vertically
    <div className="relative z-10 -mt-12 overflow-x-clip">
    <div className="-ml-[3vw] w-[106vw] -rotate-[1.6deg] bg-coral py-3 text-midnight shadow-[0_20px_40px_-25px_rgb(18_22_41/0.5)] sm:py-4">
      <p className="sr-only">Bowl. Glow. Play. Repeat.</p>
      <div className="marquee flex overflow-hidden" aria-hidden>
        <div className="marquee-track flex w-max">
          {run}
          {run}
        </div>
      </div>
    </div>
    </div>
  );
}
