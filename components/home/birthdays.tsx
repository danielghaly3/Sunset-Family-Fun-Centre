import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { photos } from "@/data/attractions";
import { Photo } from "../photo";
import { PriceToken } from "../price-token";

const perks = [
  "Two hours of all-you-can-play bowling and glow mini-golf",
  "Chicken fingers or a hotdog with fries, plus a drink for every guest",
  "Bring the cake. Cake and cupcakes are welcome",
  "Add an arcade card for every guest",
];

const confetti = [
  "top-[8%] left-[46%] size-4 rounded-full bg-cream [--dx:8px] [--t:6s]",
  "top-[18%] right-[6%] size-3 rounded-full bg-cobalt [--t:8s]",
  "bottom-[12%] left-[44%] h-5 w-3.5 bg-midnight [clip-path:polygon(50%_0,100%_100%,0_100%)] [--r:18deg] [--t:7s]",
  "bottom-[30%] right-[3%] h-4 w-3 bg-cream [clip-path:polygon(50%_0,100%_100%,0_100%)] [--r:-24deg] [--t:9s]",
  "top-[48%] left-[3%] size-2.5 rounded-full bg-midnight [--t:5s]",
];

export function Birthdays() {
  return (
    <section aria-labelledby="party-title" className="py-24 lg:py-32">
      <div className="shell">
        <div className="grain relative isolate overflow-hidden rounded-[28px] bg-[linear-gradient(150deg,var(--color-sun)_0%,var(--color-coral)_60%,var(--color-coral-deep)_100%)] px-5 py-14 text-midnight sm:px-10 lg:px-16 lg:py-20">
          {confetti.map((c, i) => (
            <span key={i} aria-hidden className={`a-drift absolute -z-10 max-md:hidden ${c}`} />
          ))}
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <p className="label">Birthday parties</p>
              <h2 id="party-title" className="display reveal mt-4 text-[clamp(3.4rem,9vw,8rem)] leading-[0.85]">
                Make
                <br />
                their day.
              </h2>
              <p className="mt-6 max-w-[42ch] text-lg leading-relaxed text-midnight/85">
                Two hours of bowling, glow golf and party food, with the planning already sorted. You bring the
                birthday kid and the cake.
              </p>
              <ul className="mt-8 space-y-3">
                {perks.map((p) => (
                  <li key={p} className="flex gap-3 text-[1.05rem] font-medium">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-midnight text-sun">
                      <Check aria-hidden className="size-3.5" strokeWidth={3} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <Link href="/parties" className="btn btn-dark mt-10">
                Explore parties <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>

            <div className="relative mx-auto w-full max-w-[520px] pb-10 sm:pb-0">
              <div className="relative aspect-[4/5] -rotate-[3deg] overflow-hidden rounded-[28px] border-[6px] border-cream shadow-[0_40px_80px_-40px_rgb(18_22_41/0.7)]">
                <Photo
                  src={photos.glowEntrance.src}
                  alt={photos.glowEntrance.alt}
                  fill
                  sizes="(min-width:1024px) 520px, 90vw"
                  className="object-cover object-[40%_50%]"
                />
              </div>
              <PriceToken
                price={26}
                ring="Birthday parties - 2 hours of fun - "
                className="absolute -bottom-2 -left-2 w-[42%] sm:-left-10 lg:-bottom-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
