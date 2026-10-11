import type { Metadata } from "next";
import { Accessibility, CalendarCheck, Cake, Sun, Utensils } from "lucide-react";
import { business, hoursSummary } from "@/data/business";
import Link from "next/link";
import { FACEBOOK_URL } from "@/lib/constants";
import { ExternalLink } from "@/components/book-link";
import { HoursChart } from "@/components/hours-chart";
import { ContactList, MapFrame, VisitActions } from "@/components/visit-info";
import { FinalCta } from "@/components/final-cta";
import { SunsetDisc } from "@/components/motifs";

export const metadata: Metadata = {
  title: "Plan Your Visit",
  description:
    "Address, hours, directions and contact details for Sunset Family Fun Centre, 990 Goderich St, Port Elgin, Ontario.",
};

const tips = [
  { icon: CalendarCheck, title: "Book ahead online", body: "Pick an activity, date and time in a few taps. Demo booking on this concept site.", href: "/book" },
  { icon: Accessibility, title: "Bowling ramps", body: "Accessible bowling ramps are available, and they are great for kids." },
  { icon: Utensils, title: "Food on site", body: "Poutine, nachos, chicken fingers, burgers and more from the snack bar." },
  { icon: Sun, title: "Outdoor patio", body: "Take a break and relax on the outdoor patio." },
  { icon: Cake, title: "Party cakes welcome", body: "For birthday parties, cake or cupcakes are permitted. No other outside food or drinks." },
];

export default function VisitPage() {
  return (
    <>
      <section aria-labelledby="visit-title" className="relative overflow-hidden pt-10 pb-20 sm:pt-16 lg:pb-28">
        <SunsetDisc className="a-sunrise absolute -top-16 -right-24 size-48 sm:-top-24 sm:size-[30rem]" />
        <div className="shell relative">
          <h1 id="visit-title" className="display a-fade-up text-[clamp(3.6rem,13vw,10rem)] leading-[0.86]">
            Plan your
            <br />
            <span className="text-cobalt">visit.</span>
          </h1>
          <p className="a-fade-up mt-8 max-w-[44ch] text-lg leading-relaxed text-ink-soft sm:text-xl" style={{ "--d": "150ms" } as React.CSSProperties}>
            {business.name} is on Goderich Street in Port Elgin, Ontario, near the shores of Lake Huron.
          </p>
        </div>
      </section>

      <section aria-labelledby="where-title" className="pb-24 lg:pb-32">
        <div className="shell grid gap-6 lg:grid-cols-12 [&>*]:min-w-0">
          <div className="rounded-[28px] bg-cream-2 p-7 sm:p-10 lg:col-span-5">
            <h2 id="where-title" className="display text-4xl">Find us</h2>
            <div className="mt-8">
              <ContactList />
            </div>
            <div className="mt-10">
              <VisitActions />
            </div>
          </div>
          <MapFrame className="min-h-80 lg:col-span-7" />

          <div className="on-dark rounded-[28px] bg-midnight p-7 text-cream sm:p-10 lg:col-span-12">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_2fr]">
              <div>
                <h2 className="display text-4xl">Hours</h2>
                <dl className="mt-8 space-y-4">
                  {hoursSummary.map((h) => (
                    <div key={h.days}>
                      <dt className="text-cream/65">{h.days}</dt>
                      <dd className="display text-2xl">{h.time}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-8 text-sm text-cream/65">Regular published hours. Call ahead to confirm before you visit.</p>
              </div>
              <HoursChart dark />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="tips-title" className="bg-cream-2 py-24 lg:py-32">
        <div className="shell">
          <h2 id="tips-title" className="display reveal text-[clamp(2.8rem,6vw,5.5rem)]">
            Good to <span className="text-cobalt">know.</span>
          </h2>
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {tips.map(({ icon: Icon, title, body, href }) => (
              <li key={title} className="flex flex-col rounded-[28px] bg-cream p-7">
                <Icon aria-hidden className="size-8 text-cobalt" strokeWidth={1.75} />
                <h3 className="display mt-8 text-2xl">{title}</h3>
                <p className="mt-2 text-ink-soft">{body}</p>
                {href && (
                  <Link href={href} className="link-arrow mt-auto pt-6 text-cobalt">
                    Start booking
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-10 text-ink-soft">
            Follow along for news and updates on{" "}
            <ExternalLink href={FACEBOOK_URL} className="font-semibold text-cobalt underline underline-offset-4">
              Sunset&apos;s Facebook page
            </ExternalLink>
            .
          </p>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
