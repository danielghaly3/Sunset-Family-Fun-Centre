import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ShieldAlert } from "lucide-react";
import { AdminDashboard } from "@/components/admin/dashboard";
import { SunsetDisc } from "@/components/motifs";

export const metadata: Metadata = {
  title: "Staff Dashboard (Demo)",
  description: "Presentation-only staff dashboard for the Sunset booking demo. Local browser data, not a secure admin system.",
};

export default function DemoAdminPage() {
  return (
    <div className="min-h-dvh bg-slate-50 font-sans text-slate-900">
      <p className="bg-slate-900 px-4 py-2 text-center text-xs text-slate-200">
        Independent website redesign concept. Not the official Sunset Family Fun Centre website.
      </p>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 md:px-8">
          <div className="flex items-center gap-3">
            <SunsetDisc className="size-8" />
            <div className="leading-tight">
              <p className="font-semibold">Sunset Staff</p>
              <p className="text-xs text-slate-500">Bookings dashboard</p>
            </div>
            <span className="ml-2 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-900">Demo</span>
          </div>
          <Link href="/" className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-sm font-medium hover:bg-slate-50">
            <span className="max-sm:sr-only">View website</span> <ArrowUpRight aria-hidden className="size-4" />
          </Link>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-[1400px] px-4 py-8 md:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Bookings</h1>
            <p className="mt-1 text-slate-500">A preview of how staff could manage reservations made on the website.</p>
          </div>
        </div>
        <div role="note" className="mb-8 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
          <ShieldAlert aria-hidden className="mt-0.5 size-5 shrink-0 text-amber-700" />
          <p>
            <strong className="font-semibold">Presentation demo only.</strong> Reservations live in this browser&apos;s local storage and
            lanes marked &ldquo;sample&rdquo; are simulated. This is not a secure admin system and is not connected to Sunset&apos;s real
            schedule or customer records.
          </p>
        </div>
        <AdminDashboard />
      </main>
    </div>
  );
}
