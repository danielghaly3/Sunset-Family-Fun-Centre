import type { Metadata } from "next";
import { Suspense } from "react";
import { ConfirmationView } from "@/components/booking/confirmation-view";

export const metadata: Metadata = {
  title: "Demo Booking Confirmation",
  description: "Confirmation for a simulated demo booking. Not a real reservation with Sunset Family Fun Centre.",
};

export default function ConfirmationPage() {
  return (
    <section aria-labelledby="confirm-title" className="pt-10 pb-24 sm:pt-14 lg:pb-32">
      <div className="shell">
        <Suspense fallback={<div className="mx-auto h-[36rem] max-w-3xl animate-pulse rounded-[28px] bg-cream-2 motion-reduce:animate-none" />}>
          <ConfirmationView />
        </Suspense>
      </div>
    </section>
  );
}
