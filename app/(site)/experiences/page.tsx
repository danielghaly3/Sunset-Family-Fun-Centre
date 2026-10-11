import type { Metadata } from "next";
import { Accessibility, Gauge, Phone, Users, Warehouse } from "lucide-react";
import { leagues, offerById, photos } from "@/data/attractions";
import { business, emailHref } from "@/data/business";
import { Photo } from "@/components/photo";
import { Ticket } from "@/components/ticket";
import { FinalCta } from "@/components/final-cta";
import { LaneArrows, PinFormation, SunsetDisc } from "@/components/motifs";

export const metadata: Metadata = {
  title: "Attractions",
  description:
    "5-pin bowling, indoor glow-in-the-dark mini-golf, a redemption arcade and an all-in combo at Sunset Family Fun Centre in Port Elgin.",
};

const jump = [
  { href: "#bowling", label: "5-Pin Bowling" },
  { href: "#glow-golf", label: "Glow Mini-Golf" },
  { href: "#arcade", label: "Arcade" },
  { href: "#combo", label: "Combo" },
  { href: "#leagues", label: "Leagues" },
];

const bowlingFacts = [
  { icon: Warehouse, title: "12 lanes", body: "Plenty of room for families, friends and groups." },
  { icon: Users, title: "Up to 6 per lane", body: "Bring the whole crew onto one lane." },
  { icon: Gauge, title: "Automatic scoring", body: "Nobody has to do the math." },
  { icon: Accessibility, title: "Bowling ramps", body: "Accessible ramps, great for kids." },
];

function InlineCircle({ photo }: { photo: (typeof photos)[keyof typeof photos] }) {
  return (
    <span className="relative inline-block aspect-square w-[0.82em] translate-y-[0.06em] overflow-hidden rounded-full border-[0.05em] border-cream align-baseline shadow-[0_16px_30px_-18px_rgb(18_22_41/0.7)]">
      <Photo src={photo.src} alt="" fill sizes="160px" className="object-cover" loading="eager" />
    </span>
  );
}

export default function ExperiencesPage() {
  return (
    <>
      <section aria-labelledby="exp-title" className="relative overflow-hidden pt-10 pb-20 sm:pt-16 lg:pb-28">
        <div className="shell">
          <h1 id="exp-title" className="display text-[clamp(3.4rem,19vw,11rem)] leading-[0.92]">
            <span className="a-fade-up block" style={{ "--d": "80ms" } as React.CSSProperties}>
              Bowl <InlineCircle photo={photos.pins} />
            </span>
            <span className="a-fade-up block sm:pl-[12%]" style={{ "--d": "180ms" } as React.CSSProperties}>
              <span className="text-cobalt">Glow</span> <InlineCircle photo={photos.glowCourse} />
            </span>
            <span className="a-fade-up block sm:pl-[24%]" style={{ "--d": "280ms" } as React.CSSProperties}>
              Play <InlineCircle photo={photos.arcade} />
            </span>
          </h1>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <p className="max-w-[46ch] text-lg leading-relaxed text-ink-soft sm:text-xl">
              Three ways to play under one roof in Port Elgin, plus a combo that bundles them all together.
            </p>
            <nav aria-label="On this page">
              <ul className="flex flex-wrap gap-2">
                {jump.map((j) => (
                  <li key={j.href}>
                    <a href={j.href} className="btn btn-sm btn-ghost">
                      {j.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </section>

      {/* Bowling */}
      <section id="bowling" aria-labelledby="bowling-title" className="overflow-hidden bg-cream-2 py-24 lg:py-32">
        <div className="shell grid gap-14 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px]">
              <Photo src={photos.lanes.src} alt={photos.lanes.alt} fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-10 -left-2 aspect-[3/4] w-[38%] -rotate-[4deg] overflow-hidden rounded-[22px] border-[6px] border-cream-2 sm:-left-6">
              <Photo src={photos.pins.src} alt={photos.pins.alt} fill sizes="240px" className="object-cover" />
            </div>
            <SunsetDisc className="absolute -top-8 -right-6 -z-0 size-28 sm:size-36" />
          </div>
          <div className="pt-6 lg:pt-0">
            <h2 id="bowling-title" className="display reveal text-[clamp(2.8rem,6vw,5.5rem)]">
              5-Pin <span className="text-cobalt">Bowling</span>
            </h2>
            <p className="mt-6 max-w-[50ch] text-lg leading-relaxed text-ink-soft">
              A family outing, a casual hangout with friends or league night: 5-pin is Sunset&apos;s home game. The
              smaller ball fits in one hand, so it&apos;s easy to pick up at any age.
            </p>
            <dl className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {bowlingFacts.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex gap-4">
                  <dt className="contents">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-cobalt text-cream">
                      <Icon aria-hidden className="size-5" />
                    </span>
                  </dt>
                  <dd>
                    <span className="display block text-2xl">{title}</span>
                    <span className="text-ink-soft">{body}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="shell mt-20 grid gap-5 md:grid-cols-2">
          <Ticket offer={offerById("group-bowling")} />
          <Ticket offer={offerById("aycp-bowling")} />
        </div>
        <p className="shell mt-6 text-ink-soft">
          Want more time? All-you-can-play bowling adds an extra half hour for $5 per person, or an extra hour for $10
          per person.
        </p>
      </section>

      {/* Glow golf */}
      <section id="glow-golf" aria-labelledby="golf-title" className="on-dark relative overflow-hidden bg-midnight py-24 text-cream lg:py-32">
        <div aria-hidden className="absolute -top-40 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-violet/25 blur-3xl" />
        <div className="shell relative grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="label flex items-center gap-2 text-lime">
              <PinFormation className="text-[0.5rem]" /> Indoor, 9 holes
            </p>
            <h2 id="golf-title" className="display reveal mt-4 text-[clamp(2.8rem,6vw,5.5rem)]">
              Glow <span className="text-lime">Mini-Golf</span>
            </h2>
            <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-cream/85">
              Nine indoor holes under blacklight, with neon fairways and sculpted jungle and sea creatures at every
              turn. Up to six people can play at once, so it works for a date night, a family night or a crew of
              friends.
            </p>
          </div>
          <div className="grid grid-cols-[1.2fr_1fr] gap-4">
            <div className="relative row-span-2 aspect-[3/4] overflow-hidden rounded-[28px]">
              <Photo src={photos.glowCourse.src} alt={photos.glowCourse.alt} fill sizes="(min-width:1024px) 30vw, 55vw" className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-full">
              <Photo src={photos.glowEntrance.src} alt={photos.glowEntrance.alt} fill sizes="(min-width:1024px) 22vw, 40vw" className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-[28px]">
              <Photo src={photos.lanesBlacklight.src} alt={photos.lanesBlacklight.alt} fill sizes="(min-width:1024px) 22vw, 40vw" className="object-cover" />
            </div>
          </div>
        </div>
        <div className="shell relative mt-20 grid gap-5 md:grid-cols-2">
          <Ticket offer={offerById("group-golf")} tone="night" />
          <Ticket offer={offerById("solo-golf")} tone="night" />
        </div>
      </section>

      {/* Arcade */}
      <section id="arcade" aria-labelledby="arcade-title" className="py-24 lg:py-32">
        <div className="shell">
          <div className="grain relative grid overflow-hidden rounded-[28px] bg-[linear-gradient(140deg,var(--color-sun),var(--color-coral)_65%)] lg:grid-cols-2">
            <div className="relative min-h-80 lg:order-2">
              <Photo src={photos.arcade.src} alt={photos.arcade.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="relative p-8 sm:p-12 lg:p-16">
              <h2 id="arcade-title" className="display reveal text-[clamp(2.8rem,6vw,5.5rem)]">
                Redemption arcade
              </h2>
              <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-midnight/85">
                A room full of unique and fun games. Load up one of the new arcade cards, play for points, then cash
                them in for prizes.
              </p>
              <p className="mt-8 rounded-2xl bg-midnight/10 p-5 font-medium">
                Arcade card prices vary, with a range of credit deals. Ask the team what&apos;s on offer when you
                visit.
              </p>
              <a href={business.phoneHref} className="btn btn-dark mt-8">
                <Phone aria-hidden className="size-4" /> Call {business.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Combo */}
      <section id="combo" aria-labelledby="combo-title" className="pb-24 lg:pb-32">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <LaneArrows count={5} className="text-xl text-coral" />
            <h2 id="combo-title" className="display reveal mt-6 text-[clamp(2.8rem,6vw,5.5rem)]">
              Can&apos;t decide? <span className="text-cobalt">Do it all.</span>
            </h2>
            <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-ink-soft">
              The combo bundles bowling, glow mini-golf and 160 arcade credits into one group price for up to six
              people.
            </p>
          </div>
          <Ticket offer={offerById("combo")} tone="sunset" />
        </div>
      </section>

      {/* Leagues */}
      <section id="leagues" aria-labelledby="leagues-title" className="bg-cream-2 py-24 lg:py-32">
        <div className="shell">
          <h2 id="leagues-title" className="display reveal text-[clamp(2.8rem,6vw,5.5rem)]">
            Join a <span className="text-cobalt">league.</span>
          </h2>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-soft">
            Friendly competition every week, for all skill levels and age groups. Sunset runs leagues for youth,
            adults and seniors.
          </p>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {leagues.map((l) => (
              <li key={l.name} className="flex items-start gap-5 rounded-[28px] bg-cream p-7">
                <span className="grid size-14 shrink-0 place-items-center rounded-full bg-midnight text-lime">
                  <PinFormation className="text-[0.55rem]" />
                </span>
                <div>
                  <h3 className="display text-2xl leading-tight">{l.name}</h3>
                  <p className="mt-1 text-ink-soft">{l.who}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <p className="mr-4 font-medium">Ask the team about the current season and registration.</p>
            <a href={business.phoneHref} className="btn btn-dark">
              <Phone aria-hidden className="size-4" /> Call us
            </a>
            <a href={emailHref("Bowling league enquiry")} className="btn btn-ghost">
              Email us
            </a>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
