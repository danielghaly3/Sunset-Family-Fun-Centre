import { HoursChart } from "../hours-chart";
import { ContactList, MapFrame, VisitActions } from "../visit-info";

export function VisitBlock() {
  return (
    <section aria-labelledby="visit-title" className="py-24 lg:py-32">
      <div className="shell grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="visit-title" className="display reveal text-[clamp(3rem,7vw,6rem)]">
            Plan your
            <br />
            <span className="text-cobalt">visit.</span>
          </h2>
          <p className="mt-6 max-w-[38ch] text-lg text-ink-soft">
            Find us on Goderich Street in Port Elgin, near the shores of Lake Huron.
          </p>
          <div className="mt-10">
            <ContactList />
          </div>
          <div className="mt-10">
            <VisitActions />
          </div>
        </div>
        <div className="flex flex-col gap-5 lg:col-span-7">
          <div className="rounded-[28px] bg-cream-2 p-6 sm:p-8">
            <h3 className="display text-3xl">Hours</h3>
            <div className="mt-6">
              <HoursChart />
            </div>
            <p className="mt-6 text-sm text-ink-soft">Regular published hours. Call ahead to confirm before you visit.</p>
          </div>
          <MapFrame className="h-72 sm:h-80" />
        </div>
      </div>
    </section>
  );
}
