import type { Metadata } from "next";
import { Accessibility, Cake, Check, Mail, Minus, Phone, Sparkles, Utensils } from "lucide-react";
import { partyPackages, photos } from "@/data/attractions";
import { business, emailHref } from "@/data/business";
import { BookLink } from "@/components/book-link";
import { Photo } from "@/components/photo";
import { PriceToken } from "@/components/price-token";
import { FinalCta } from "@/components/final-cta";

export const metadata: Metadata = {
  title: "Birthday Parties",
  description:
    "Two-hour birthday parties with bowling, glow mini-golf and party food at Sunset Family Fun Centre in Port Elgin. From $26 CAD per person.",
};

const reasons = [
  {
    icon: Sparkles,
    title: "Two attractions, one party",
    body: "Two hours of all-you-can-play bowling and glow mini-golf, with an arcade card upgrade if you want it.",
    tone: "bg-cobalt text-cream on-dark",
  },
  {
    icon: Utensils,
    title: "Food is sorted",
    body: "Every guest gets chicken fingers or a hotdog with fries, plus a drink.",
    tone: "bg-cream-2",
  },
  {
    icon: Cake,
    title: "Bring the cake",
    body: "Birthday cake or cupcakes are welcome, so the big moment stays yours.",
    tone: "bg-cream-2",
  },
  {
    icon: Accessibility,
    title: "Fun for every age",
    body: "Bowling ramps help the littlest guests, and glow golf works for all ages.",
    tone: "bg-midnight text-cream on-dark",
  },
];

const compare = [
  { label: "Party length", values: ["2 hours", "2 hours"] },
  { label: "All-you-can-play bowling", values: [true, true] },
  { label: "Glow mini-golf", values: [true, true] },
  { label: "Meal and a drink for every guest", values: [true, true] },
  { label: "Arcade card for every guest", values: [false, true] },
] as const;

const faqs = [
  { q: "How long is a party?", a: "Both packages run for two hours." },
  {
    q: "What food is included?",
    a: "Each guest gets 2 chicken fingers and fries, or a hotdog and fries, plus a drink. Extra pizzas can be added for $25 each.",
  },
  {
    q: "Can we bring a birthday cake?",
    a: "Yes. Cake or cupcakes are permitted. Sunset asks that you don't bring any other outside food or drinks.",
  },
  {
    q: "Is it good for younger kids?",
    a: "Yes. Accessible bowling ramps are available and are great for kids, and glow mini-golf is made for all ages.",
  },
  {
    q: "What about guest numbers, deposits and availability?",
    a: "These details aren't listed publicly, so contact the team for details before you book.",
  },
  {
    q: "How do I book?",
    a: "Use any Book now button to request a party online (a demo on this concept site), or call or email the team if you have questions first.",
  },
];

export default function PartiesPage() {
  return (
    <>
      <section
        aria-labelledby="parties-title"
        className="grain relative isolate overflow-hidden bg-[linear-gradient(160deg,var(--color-sun)_0%,var(--color-coral)_55%,var(--color-coral-deep)_100%)] text-midnight"
      >
        <div className="shell grid gap-12 pt-10 pb-24 sm:pt-16 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:pb-28">
          <div>
            <p className="label a-fade-up">Birthday parties at Sunset</p>
            <h1 id="parties-title" className="display mt-5 text-[clamp(3.8rem,14vw,10rem)] leading-[0.84]">
              <span className="block overflow-hidden pb-[0.04em]">
                <span className="a-rise block">Make</span>
              </span>
              <span className="block overflow-hidden pb-[0.06em]">
                <span className="a-rise block" style={{ "--d": "120ms" } as React.CSSProperties}>
                  their day.
                </span>
              </span>
            </h1>
            <p className="a-fade-up mt-7 max-w-[38ch] text-lg leading-relaxed sm:text-xl" style={{ "--d": "250ms" } as React.CSSProperties}>
              Two hours of bowling, glow mini-golf and party food. From $26 CAD per person.
            </p>
            <div className="a-fade-up mt-9 flex flex-col gap-3 sm:flex-row" style={{ "--d": "350ms" } as React.CSSProperties}>
              <BookLink href="/book?experience=birthday" className="btn btn-dark">
                Book your fun
              </BookLink>
              <a href={emailHref("Birthday party enquiry")} className="btn btn-ghost">
                <Mail aria-hidden className="size-4" /> Ask about a party
              </a>
            </div>
          </div>
          <div className="relative mx-auto w-[88%] max-w-[500px] pb-8 sm:w-full">
            <div className="a-unveil relative aspect-[4/5] rotate-[3deg] overflow-hidden rounded-[28px] border-[6px] border-cream shadow-[0_40px_80px_-40px_rgb(18_22_41/0.7)]">
              <Photo src={photos.glowCourse.src} alt={photos.glowCourse.alt} fill loading="eager" sizes="(min-width:1024px) 500px, 90vw" className="object-cover" />
            </div>
            <PriceToken price={26} ring="Birthday parties - 2 hours of fun - " className="absolute -bottom-2 -left-2 w-[40%] sm:-left-10" />
          </div>
        </div>
      </section>

      <section aria-labelledby="why-title" className="py-24 lg:py-32">
        <div className="shell">
          <h2 id="why-title" className="display reveal max-w-[16ch] text-[clamp(2.8rem,6vw,5.5rem)]">
            Why celebrate at <span className="text-cobalt">Sunset?</span>
          </h2>
          <ul className="mt-14 grid gap-4 md:grid-cols-6">
            {reasons.map(({ icon: Icon, title, body, tone }, i) => (
              <li
                key={title}
                className={`reveal flex flex-col rounded-[28px] p-7 sm:p-9 ${tone} ${i === 0 || i === 3 ? "md:col-span-4" : "md:col-span-2"}`}
              >
                <Icon aria-hidden className="size-8" strokeWidth={1.75} />
                <h3 className="display mt-10 text-3xl">{title}</h3>
                <p className="mt-3 max-w-[40ch] opacity-85">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="packages-title" className="on-dark bg-midnight py-24 text-cream lg:py-32">
        <div className="shell">
          <h2 id="packages-title" className="display reveal text-[clamp(2.8rem,6vw,5.5rem)]">
            Pick your <span className="text-lime">party.</span>
          </h2>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {partyPackages.map((p) => (
              <article
                key={p.id}
                className={`ticket flex flex-col rounded-[20px] p-7 sm:p-9 [--notch-y:38%] ${
                  p.arcade ? "bg-[linear-gradient(135deg,var(--color-sun),var(--color-coral))] text-midnight" : "bg-midnight-2"
                }`}
              >
                <h3 className="display text-4xl">{p.label}</h3>
                <p className="mt-6">
                  <span className="display text-7xl tabular-nums sm:text-8xl">${p.price}</span>
                  <span className="ml-2 font-[family-name:var(--font-label)] text-sm font-semibold uppercase opacity-75">
                    CAD per person
                  </span>
                </p>
                <ul className={`mt-8 space-y-3 border-t border-dashed pt-8 ${p.arcade ? "border-midnight/30" : "border-cream/25"}`}>
                  {p.includes.map((inc) => (
                    <li key={inc} className="flex gap-3 text-lg">
                      <Check aria-hidden className={`mt-1 size-5 shrink-0 ${p.arcade ? "" : "text-lime"}`} strokeWidth={2.5} />
                      {inc}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-10">
                  <BookLink href={`/book?experience=birthday&package=${p.id}`} className={`btn ${p.arcade ? "btn-dark" : "btn-primary"}`}>
                    Book now
                  </BookLink>
                </div>
              </article>
            ))}
          </div>

          <div className="relative mt-16 overflow-x-auto rounded-[28px] bg-midnight-2 p-2 sm:p-4">
            <table className="w-full text-left text-[0.95rem] sm:text-base">
              <caption className="sr-only">Party package comparison</caption>
              <thead>
                <tr className="label text-cream/65">
                  <th scope="col" className="p-3 sm:p-4 font-semibold">Included</th>
                  {partyPackages.map((p) => (
                    <th key={p.id} scope="col" className="p-3 sm:p-4 text-center font-semibold">
                      {p.label} (${p.price})
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compare.map((row) => (
                  <tr key={row.label} className="border-t border-cream/10">
                    <th scope="row" className="p-3 sm:p-4 font-medium">{row.label}</th>
                    {row.values.map((v, i) => (
                      <td key={i} className="p-3 sm:p-4 text-center">
                        {v === true ? (
                          <Check aria-label="Included" className="mx-auto size-5 text-lime" strokeWidth={2.5} />
                        ) : v === false ? (
                          <Minus aria-label="Not included" className="mx-auto size-5 text-cream/40" />
                        ) : (
                          v
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-8 max-w-[75ch] text-sm leading-relaxed text-cream/65">
            Prices in Canadian dollars, as listed on Sunset&apos;s current public website, and subject to
            confirmation. Package names on this page are concept labels. A third birthday package at $34 per person is
            also listed on the current site; contact the team for what it includes.
          </p>
        </div>
      </section>

      <section aria-labelledby="food-title" className="py-24 lg:py-32">
        <div className="shell grid gap-6 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-[28px] bg-cobalt p-8 text-cream sm:p-12">
            <Utensils aria-hidden className="size-8" />
            <h2 id="food-title" className="display mt-10 text-[clamp(2.4rem,4.5vw,3.8rem)]">Party food</h2>
            <p className="mt-4 max-w-[42ch] text-lg text-cream/85">
              Every guest gets 2 chicken fingers and fries, or a hotdog and fries, plus a drink. Want more? Extra
              pizzas can be added for $25 each.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-[28px] bg-cream-2 p-8 sm:p-12">
            <Cake aria-hidden className="size-8 text-coral-deep" />
            <h2 className="display mt-10 text-[clamp(2.4rem,4.5vw,3.8rem)]">The cake rule</h2>
            <p className="mt-4 max-w-[42ch] text-lg text-ink-soft">
              Cake or cupcakes are welcome. Please don&apos;t bring any other outside food or drinks.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-title" className="pb-24 lg:pb-32">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 id="faq-title" className="display reveal text-[clamp(2.8rem,6vw,5.5rem)]">
              Good <span className="text-cobalt">questions.</span>
            </h2>
            <p className="mt-6 max-w-[36ch] text-lg text-ink-soft">Still wondering about something? The team is a call away.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <a href={business.phoneHref} className="btn btn-dark">
                <Phone aria-hidden className="size-4" /> {business.phone}
              </a>
              <a href={emailHref("Birthday party enquiry")} className="btn btn-ghost">
                <Mail aria-hidden className="size-4" /> Email the team
              </a>
            </div>
          </div>
          <div className="divide-y divide-midnight/10 border-y border-midnight/10">
            {faqs.map((f) => (
              <details key={f.q} className="faq group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-xl font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full bg-cream-2 text-2xl leading-none transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="max-w-[60ch] pb-6 text-lg leading-relaxed text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <FinalCta title="Let's plan the party." sub="Request your party online in a few steps, or call the team with any questions." />
    </>
  );
}
