import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, Phone, Puzzle, Sofa, Ticket as TicketIcon, Utensils } from "lucide-react";
import { offerById, photos } from "@/data/attractions";
import { business, emailHref } from "@/data/business";
import { Photo } from "@/components/photo";
import { Ticket } from "@/components/ticket";
import { FinalCta } from "@/components/final-cta";
import { BookLink } from "@/components/book-link";
import { occasions } from "@/components/home/groups-teaser";

export const metadata: Metadata = {
  title: "Group Bookings",
  description:
    "Birthdays, family reunions, school outings and corporate events at Sunset Family Fun Centre in Port Elgin: bowling, glow mini-golf, arcade, food and space to gather.",
};

const perks = [
  { icon: TicketIcon, title: "All the attractions", body: "Bowling, glow mini-golf and the arcade, so there is something for everyone." },
  { icon: Utensils, title: "Food and drink", body: "Food and drink options to keep the group fuelled." },
  { icon: Sofa, title: "Space to gather", body: "Dedicated spaces for your group to get together." },
  { icon: Puzzle, title: "Built around you", body: "Customizable packages, tailored to what your group needs." },
];

const plan = [
  { title: "Get in touch", body: "Call or email with your date, roughly how many people, and what you'd like to play." },
  { title: "Shape the package", body: "The team will help put together activities, food and space that suit your group." },
  { title: "Show up and play", body: "Send a request online with your date and group size, or confirm with the team directly." },
];

export default function GroupsPage() {
  return (
    <>
      <section aria-labelledby="groups-title" className="on-dark relative overflow-hidden bg-cobalt text-cream">
        <div className="shell grid gap-12 pt-10 pb-20 sm:pt-16 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:pb-28">
          <div>
            <h1 id="groups-title" className="display a-fade-up text-[clamp(3.4rem,10vw,8.5rem)] leading-[0.86]">
              Good times are better <span className="text-sun">together.</span>
            </h1>
            <p className="a-fade-up mt-7 max-w-[42ch] text-lg leading-relaxed text-cream/85 sm:text-xl" style={{ "--d": "150ms" } as React.CSSProperties}>
              Birthday parties, family reunions, corporate events and school outings. Sunset hosts groups for all
              kinds of occasions.
            </p>
            <div className="a-fade-up mt-9 flex flex-col gap-3 sm:flex-row" style={{ "--d": "250ms" } as React.CSSProperties}>
              <a href={business.phoneHref} className="btn btn-primary">
                <Phone aria-hidden className="size-4" /> Call to plan
              </a>
              <a href={emailHref("Group booking enquiry")} className="btn btn-ghost">
                <Mail aria-hidden className="size-4" /> Email the team
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="a-unveil relative aspect-[5/4] overflow-hidden rounded-[28px] [--d:150ms]">
              <Photo src={photos.lanesInterior.src} alt={photos.lanesInterior.alt} fill loading="eager" sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-8 -left-4 aspect-square w-[34%] overflow-hidden rounded-full border-[6px] border-cobalt sm:-left-8">
              <Photo src={photos.glowEntrance.src} alt={photos.glowEntrance.alt} fill sizes="220px" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="occasions-title" className="py-24 lg:py-32">
        <div className="shell">
          <h2 id="occasions-title" className="sr-only">Occasions we host</h2>
          <ul className="flex flex-col">
            {occasions.map(({ label, icon: Icon }, i) => (
              <li key={label} className="reveal border-b border-midnight/10 first:border-t">
                <div className="flex items-center gap-5 py-5 sm:gap-8 sm:py-7">
                  <span className={`grid size-12 shrink-0 place-items-center rounded-full sm:size-16 ${i % 2 ? "bg-coral text-midnight" : "bg-cobalt text-cream"}`}>
                    <Icon aria-hidden className="size-5 sm:size-7" />
                  </span>
                  <span className="display text-[clamp(2rem,6.5vw,5.5rem)] leading-none">{label}</span>
                  {label === "Birthdays" && (
                    <Link href="/parties" className="link-arrow ml-auto hidden sm:inline-flex">
                      Party packages <ArrowRight aria-hidden className="size-4" />
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="perks-title" className="bg-cream-2 py-24 lg:py-32">
        <div className="shell">
          <h2 id="perks-title" className="display reveal max-w-[14ch] text-[clamp(2.8rem,6vw,5.5rem)]">
            What your group <span className="text-cobalt">gets.</span>
          </h2>
          <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map(({ icon: Icon, title, body }) => (
              <li key={title}>
                <Icon aria-hidden className="size-9 text-coral-deep" strokeWidth={1.75} />
                <h3 className="display mt-6 text-3xl">{title}</h3>
                <p className="mt-2 text-lg text-ink-soft">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="group-prices-title" className="on-dark bg-midnight py-24 text-cream lg:py-32">
        <div className="shell">
          <h2 id="group-prices-title" className="display reveal text-[clamp(2.8rem,6vw,5.5rem)]">
            Group-size <span className="text-lime">prices.</span>
          </h2>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            <Ticket offer={offerById("combo")} tone="sunset" />
            <Ticket offer={offerById("group-bowling")} tone="night" />
            <Ticket offer={offerById("group-golf")} tone="night" />
          </div>
          <p className="mt-8 max-w-[70ch] text-sm text-cream/65">
            Prices in Canadian dollars, as listed on Sunset&apos;s current public website, and subject to
            confirmation. Larger groups and custom packages: contact the team for details.
          </p>
        </div>
      </section>

      <section aria-labelledby="plan-title" className="py-24 lg:py-32">
        <div className="shell">
          <h2 id="plan-title" className="display reveal text-[clamp(2.8rem,6vw,5.5rem)]">
            How to <span className="text-cobalt">plan it.</span>
          </h2>
          <ol className="mt-14 grid gap-5 lg:grid-cols-3">
            {plan.map((p, i) => (
              <li key={p.title} className="relative overflow-hidden rounded-[28px] bg-cream-2 p-8 sm:p-10">
                <span aria-hidden className="display absolute -top-4 -right-2 text-[9rem] leading-none text-coral/25">
                  {i + 1}
                </span>
                <h3 className="display relative text-3xl">{p.title}</h3>
                <p className="relative mt-3 max-w-[34ch] text-lg text-ink-soft">{p.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={business.phoneHref} className="btn btn-dark">
              <Phone aria-hidden className="size-4" /> {business.phone}
            </a>
            <a href={emailHref("Group booking enquiry")} className="btn btn-ghost">
              <Mail aria-hidden className="size-4" /> Email the team
            </a>
            <BookLink href="/book?experience=group-event" className="btn btn-primary">
              Request a date
            </BookLink>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
