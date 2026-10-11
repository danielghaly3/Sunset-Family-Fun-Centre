"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSyncExternalStore } from "react";
import { MotionConfig, motion } from "motion/react";
import { ArrowRight, CalendarSearch, Home, LayoutDashboard, RotateCcw } from "lucide-react";
import { EXPERIENCES, PARTY_PACKAGES, formatCad } from "@/lib/booking/config";
import { useBookings } from "@/lib/booking/store";
import { formatDate, formatTime } from "@/lib/booking/time";
import { SunsetDisc } from "../motifs";

const noop = () => () => {};
/** false on the server and during hydration, true once the browser (and its storage) is available */
const useHydrated = () => useSyncExternalStore(noop, () => true, () => false);

function Check() {
  return (
    <motion.svg viewBox="0 0 120 120" className="size-28 sm:size-32" aria-hidden initial="hidden" animate="shown">
      <motion.circle
        cx="60"
        cy="60"
        r="54"
        className="fill-coral"
        variants={{ hidden: { scale: 0.4, opacity: 0 }, shown: { scale: 1, opacity: 1 } }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        style={{ originX: "50%", originY: "50%" }}
      />
      <motion.path
        d="M36 62 L53 78 L85 44"
        fill="none"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-midnight"
        variants={{ hidden: { pathLength: 0 }, shown: { pathLength: 1 } }}
        transition={{ delay: 0.25, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.svg>
  );
}

export function ConfirmationView() {
  const ref = useSearchParams().get("ref");
  const bookings = useBookings();
  const hydrated = useHydrated();
  const booking = bookings.find((b) => b.ref === ref);

  if (!hydrated) return <div className="mx-auto h-[36rem] max-w-3xl animate-pulse rounded-[28px] bg-cream-2 motion-reduce:animate-none" />;

  if (!booking) {
    return (
      <div className="mx-auto max-w-2xl rounded-[28px] bg-cream-2 p-8 text-center sm:p-12">
        <CalendarSearch aria-hidden className="mx-auto size-10 text-cobalt" />
        <h1 id="confirm-title" className="display mt-6 text-[clamp(2.4rem,6vw,4rem)]">
          Booking not found.
        </h1>
        <p className="mx-auto mt-4 max-w-[46ch] text-lg text-ink-soft">
          {ref
            ? `We couldn't find demo booking ${ref} in this browser. Demo bookings are only saved on the device that made them, and they're cleared when the demo is reset.`
            : "There's no booking reference in this link."}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/book" className="btn btn-primary">
            Make a demo booking <ArrowRight aria-hidden className="size-4" />
          </Link>
          <Link href="/" className="btn btn-ghost">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const exp = EXPERIENCES[booking.experience];
  const cancelled = booking.status === "cancelled";
  const isRequest = booking.status === "requested";
  const title = cancelled ? "Demo booking cancelled." : isRequest ? "Demo request sent." : "Demo booking confirmed.";
  const rows: [string, string][] = [
    ["Name", booking.customer.name],
    ["Experience", booking.pkg ? `${exp.name}, ${PARTY_PACKAGES[booking.pkg].label}` : booking.eventType ? `${exp.name}, ${booking.eventType}` : exp.name],
    ["Date", formatDate(booking.date)],
    ["Time", `${formatTime(booking.hour)} Eastern Time`],
    ["Guests", String(booking.guests)],
    ...(booking.lane ? ([["Lane", `Lane ${booking.lane} (simulated)`]] as [string, string][]) : []),
    ["Duration", exp.durationLabel],
    [booking.quote.estimate ? "Estimated total" : "Demo total", booking.quote.total === null ? "Quote from the team" : formatCad(booking.quote.total)],
  ];

  return (
    <MotionConfig reducedMotion="user">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col items-center text-center">
          {!cancelled && <Check />}
          <h1 id="confirm-title" className="display mt-8 text-[clamp(2.8rem,8vw,5.5rem)] leading-[0.9]">
            {title}
          </h1>
          <p role="status" className="mt-6 rounded-2xl border-2 border-dashed border-midnight/30 bg-cream-2 px-5 py-4 text-lg font-semibold">
            Demo reservation only. This is not a real booking with Sunset Family Fun Centre.
          </p>
          {isRequest && (
            <p className="mt-4 max-w-[52ch] text-ink-soft">
              In a live system, the team would now review the request and reply to {booking.customer.email}. In this demo, no email is sent.
            </p>
          )}
        </div>

        <motion.article
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, type: "spring", stiffness: 200, damping: 26 }}
          className={`ticket on-dark relative mt-10 overflow-hidden rounded-[28px] bg-midnight p-7 text-cream [--notch-y:30%] sm:p-10 ${cancelled ? "opacity-70" : ""}`}
        >
          <SunsetDisc className="absolute -top-16 -right-16 size-48 opacity-90 max-sm:hidden" />
          <p className="label text-cream/60">Demo booking reference</p>
          <p className="mt-2 font-[family-name:var(--font-label)] text-4xl font-bold tracking-wide text-lime sm:text-5xl">{booking.ref}</p>
          <dl className="relative mt-8 grid gap-x-8 gap-y-5 border-t border-dashed border-cream/25 pt-8 sm:grid-cols-2">
            {rows.map(([k, v]) => (
              <div key={k}>
                <dt className="text-sm text-cream/60">{k}</dt>
                <dd className="mt-0.5 text-lg font-semibold [overflow-wrap:anywhere]">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-xs text-cream/55">
            Simulated with sample availability. Saved in this browser only. No payment taken, no email or text sent.
          </p>
        </motion.article>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
          <Link href="/" className="btn btn-dark">
            <Home aria-hidden className="size-4" /> Return home
          </Link>
          <Link href="/book" className="btn btn-primary">
            <RotateCcw aria-hidden className="size-4" /> Make another demo booking
          </Link>
          <Link href="/demo-admin" className="btn btn-ghost">
            <LayoutDashboard aria-hidden className="size-4" /> See it in the staff demo
          </Link>
        </div>
      </div>
    </MotionConfig>
  );
}
