import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingFlow } from "@/components/booking/booking-flow";
import { DemoBanner } from "@/components/booking/demo-banner";
import { LaneArrows } from "@/components/motifs";

export const metadata: Metadata = {
  title: "Book (Demo)",
  description: "Demo booking experience for Sunset Family Fun Centre. Simulated availability only; no real reservations are made.",
};

export default function BookPage() {
  return (
    <section aria-labelledby="book-title" className="pt-8 pb-24 sm:pt-12 lg:pb-32">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end xl:gap-12">
          <div>
            <LaneArrows count={5} className="a-fade-up text-base text-coral" />
            <h1 id="book-title" className="display a-fade-up mt-5 text-[clamp(3.2rem,10vw,7.5rem)] leading-[0.88]">
              Book your <span className="text-cobalt">fun.</span>
            </h1>
          </div>
          <DemoBanner />
        </div>
        <Suspense
          fallback={<div className="mt-10 h-[32rem] animate-pulse rounded-[28px] bg-cream-2 motion-reduce:animate-none" />}
        >
          <BookingFlow />
        </Suspense>
      </div>
    </section>
  );
}
