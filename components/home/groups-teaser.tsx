import Link from "next/link";
import { ArrowRight, Briefcase, Cake, Heart, School, Users } from "lucide-react";
import { photos } from "@/data/attractions";
import { Photo } from "../photo";
import { SunsetDisc } from "../motifs";

export const occasions = [
  { label: "Birthdays", icon: Cake },
  { label: "Family reunions", icon: Heart },
  { label: "School outings", icon: School },
  { label: "Corporate events", icon: Briefcase },
  { label: "Friends and teams", icon: Users },
];

export function GroupsTeaser() {
  return (
    <section aria-labelledby="groups-title" className="overflow-hidden py-24 lg:py-32">
      <div className="shell">
        <h2 id="groups-title" className="display reveal max-w-[14ch] text-[clamp(3rem,8vw,7rem)]">
          Good times are better <span className="text-cobalt">together.</span>
        </h2>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-12">
          <div className="relative lg:order-2 lg:col-span-7">
            <SunsetDisc className="absolute -top-10 -right-10 size-44 sm:size-56" />
            <div className="relative aspect-[16/11] overflow-hidden rounded-[28px] shadow-[0_40px_80px_-50px_rgb(18_22_41/0.7)]">
              <Photo
                src={photos.lanesInterior.src}
                alt={photos.lanesInterior.alt}
                fill
                sizes="(min-width:1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="max-w-[42ch] text-lg leading-relaxed text-ink-soft">
              Twelve lanes, a glow course and an arcade under one roof. Sunset hosts group bookings for all kinds of
              occasions, with customizable packages, food and drink options, and space for your group to gather.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {occasions.map(({ label, icon: Icon }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 rounded-full bg-cream-2 px-4 py-2.5 font-medium"
                >
                  <Icon aria-hidden className="size-4 text-cobalt" strokeWidth={2.25} />
                  {label}
                </li>
              ))}
            </ul>
            <Link href="/groups" className="btn btn-dark mt-10">
              Plan a group outing <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
