import { ArrowUpRight } from "lucide-react";
import { menuHighlights, photos } from "@/data/attractions";
import { FOOD_MENU_URL } from "@/lib/constants";
import { ExternalLink } from "../book-link";
import { Photo } from "../photo";

export function Food() {
  return (
    <section aria-labelledby="food-title" className="on-dark relative overflow-hidden bg-cobalt text-cream">
      <div className="shell grid items-center gap-12 py-20 md:grid-cols-[1.3fr_1fr] lg:py-24">
        <div>
          <h2 id="food-title" className="display reveal text-[clamp(2.6rem,6vw,5rem)]">
            Play hard.
            <br />
            Refuel <span className="text-sun">right.</span>
          </h2>
          <p className="mt-6 max-w-[40ch] text-lg text-cream/85">
            Grab a bite between frames. The snack bar covers all the classics.
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-4 gap-y-2 font-[family-name:var(--font-display)] text-2xl font-semibold sm:text-3xl">
            {menuHighlights.map((m, i) => (
              <li key={m} className="flex items-center gap-4">
                {m}
                {i < menuHighlights.length - 1 && <span aria-hidden className="size-2 rounded-full bg-coral" />}
              </li>
            ))}
          </ul>
          <ExternalLink href={FOOD_MENU_URL} className="btn btn-ghost mt-10">
            See the food menu <ArrowUpRight aria-hidden className="size-4" />
          </ExternalLink>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-[420px]">
          <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-full bg-coral" aria-hidden />
          <div className="relative size-full overflow-hidden rounded-full border-[6px] border-cream">
            <Photo
              src={photos.poutine.src}
              alt={photos.poutine.alt}
              fill
              sizes="(min-width:768px) 420px, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
