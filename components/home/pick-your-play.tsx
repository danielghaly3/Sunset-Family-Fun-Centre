"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { attractions } from "@/data/attractions";
import { useMedia } from "@/lib/use-media";
import { Photo } from "../photo";
import { PinFormation } from "../motifs";

const themes = {
  bowling: { panel: "on-dark bg-cobalt text-cream", kicker: "text-sun", link: "text-cream" },
  "glow-golf": { panel: "on-dark bg-midnight text-cream", kicker: "text-lime", link: "text-lime" },
  arcade: {
    panel: "bg-[linear-gradient(160deg,var(--color-sun),var(--color-coral)_70%)] text-midnight",
    kicker: "text-midnight/70",
    link: "text-midnight",
  },
} as const;

export function PickYourPlay() {
  const [active, setActive] = useState(0);
  const desktop = useMedia("(min-width: 1024px)");

  return (
    <section aria-labelledby="play-title" className="pt-28 pb-24 sm:pt-36 lg:pb-32">
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 id="play-title" className="display reveal text-[clamp(3rem,8vw,7rem)]">
            Pick your <span className="text-coral-deep">play.</span>
          </h2>
          <Link href="/experiences" className="link-arrow mb-2 self-start md:self-auto">
            All attractions and prices <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>

        <div className="mt-12 flex flex-col gap-4 lg:h-[640px] lg:flex-row">
          {attractions.map((a, i) => {
            const t = themes[a.slug];
            const open = !desktop || active === i;
            return (
              <article
                key={a.slug}
                onMouseEnter={() => setActive(i)}
                onFocusCapture={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`reveal group relative isolate flex min-w-0 flex-col overflow-hidden rounded-[28px] p-3 transition-[flex-grow] duration-700 ease-[var(--ease-spring)] motion-reduce:transition-none lg:basis-0 ${t.panel} ${
                  active === i ? "lg:grow-[2] xl:grow-[2.6]" : "lg:grow"
                }`}
              >
                <div
                  className="relative h-64 overflow-hidden rounded-[20px] sm:h-80 lg:h-auto lg:min-h-0 lg:grow lg:basis-0"
                >
                  <Photo
                    src={a.photo.src}
                    alt={a.photo.alt}
                    fill
                    sizes="(min-width:1024px) 60vw, 100vw"
                    className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-spring)] group-hover:scale-[1.05] motion-reduce:transition-none"
                  />
                </div>

                <div className="relative flex flex-col p-4 pt-6 sm:p-6">
                  <p className={`label flex items-center gap-2 ${t.kicker}`}>
                    <PinFormation className="text-[0.5rem]" /> {a.kicker}
                  </p>
                  <h3
                    className={`display mt-3 text-[clamp(2.2rem,8vw,3.6rem)] leading-[0.92] ${
                      active === i ? "" : "lg:text-[clamp(1.25rem,1.9vw,2.4rem)]"
                    }`}
                  >
                    {desktop ? (
                      <button
                        type="button"
                        aria-expanded={active === i}
                        aria-controls={`play-${a.slug}`}
                        className="text-left uppercase"
                      >
                        {a.name}
                      </button>
                    ) : (
                      a.name
                    )}
                  </h3>
                  <div
                    id={`play-${a.slug}`}
                    className={`transition-[opacity,transform] duration-500 motion-reduce:transition-none ${
                      open ? "opacity-100 delay-200" : "invisible h-0 translate-y-3 opacity-0 lg:absolute"
                    }`}
                  >
                    <p className="mt-4 max-w-[46ch] text-base leading-relaxed opacity-90 sm:text-lg">{a.blurb}</p>
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                      <p className="font-[family-name:var(--font-label)] font-semibold">{a.from}</p>
                      <Link href={`/experiences#${a.slug}`} className={`link-arrow ${t.link}`}>
                        Explore<span className="sr-only"> {a.name}</span> <ArrowRight aria-hidden className="size-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
