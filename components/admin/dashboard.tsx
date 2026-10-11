"use client";

import Link from "next/link";
import { Fragment, useRef, useState } from "react";
import {
  AlertTriangle,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Inbox,
  RotateCcw,
  Ticket,
  Users,
  X,
} from "lucide-react";
import { golfUsage, laneUsage } from "@/lib/booking/availability";
import { EXPERIENCES, GOLF_CAPACITY, LANES, PARTY_PACKAGES, formatCad, startTimes } from "@/lib/booking/config";
import type { Booking } from "@/lib/booking/records";
import { cancelBooking, resetDemo, useBookings, useNow } from "@/lib/booking/store";
import { addDays, formatDate, formatTime, type DateKey } from "@/lib/booking/time";

const card = "rounded-xl border border-slate-200 bg-white";
const sample = "bg-[repeating-linear-gradient(135deg,#e2e8f0_0_5px,#f1f5f9_5px_10px)] text-slate-500";
const STATUS = {
  confirmed: "bg-emerald-50 text-emerald-800 ring-emerald-600/20",
  requested: "bg-amber-50 text-amber-800 ring-amber-600/25",
  cancelled: "bg-slate-100 text-slate-600 ring-slate-500/20",
} as const;

const activityName = (b: Booking) =>
  b.pkg ? `${EXPERIENCES[b.experience].name} (${PARTY_PACKAGES[b.pkg].label})` : b.eventType ? `${EXPERIENCES[b.experience].name} (${b.eventType})` : EXPERIENCES[b.experience].name;

const shortDate = (d: DateKey) => formatDate(d, { weekday: "short", month: "short", year: undefined });

export function AdminDashboard() {
  const bookings = useBookings();
  const now = useNow();
  const [pickedDate, setPickedDate] = useState<DateKey | null>(null);
  const [pickedHour, setPickedHour] = useState<number | null>(null);
  const [filter, setFilter] = useState<"upcoming" | "all" | "cancelled">("upcoming");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [confirming, setConfirming] = useState<string | null>(null);
  const [toast, setToast] = useState("");
  const resetDialog = useRef<HTMLDialogElement>(null);
  const schedule = useRef<HTMLElement>(null);

  if (!now) {
    return (
      <div aria-busy className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`${card} h-28 animate-pulse motion-reduce:animate-none`} />
          ))}
        </div>
        <div className={`${card} h-96 animate-pulse motion-reduce:animate-none`} />
      </div>
    );
  }

  const active = bookings.filter((b) => b.status !== "cancelled");
  const isUpcoming = (b: Booking) => b.date > now.date || (b.date === now.date && b.hour > now.hour);

  const day = pickedDate ?? now.date;
  const hours = startTimes(day, EXPERIENCES.bowling);
  const defaultHour = day === now.date ? (hours.find((h) => h >= now.hour) ?? hours[hours.length - 1]) : hours[0];
  const hour = pickedHour !== null && hours.includes(pickedHour) ? pickedHour : defaultHour;
  const lanes = laneUsage(day, hour, bookings);

  const todayHours = startTimes(now.date, EXPERIENCES.bowling);
  const liveHour = todayHours.find((h) => h >= now.hour);
  const freeNow = liveHour === undefined ? null : LANES - laneUsage(now.date, liveHour, bookings).size;

  const dayRequests = bookings.filter((b) => b.date === day && EXPERIENCES[b.experience].resource === null && b.status !== "cancelled");

  const listed = bookings
    .filter((b) => (filter === "cancelled" ? b.status === "cancelled" : filter === "upcoming" ? b.status !== "cancelled" && isUpcoming(b) : true))
    .sort((a, b) => (a.date + String(a.hour).padStart(2, "0")).localeCompare(b.date + String(b.hour).padStart(2, "0")));

  function showOnSchedule(b: Booking) {
    setPickedDate(b.date);
    setPickedHour(b.hour);
    schedule.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function cancel(b: Booking) {
    cancelBooking(b.ref);
    setConfirming(null);
    setToast(`${b.ref} cancelled.${b.lane ? ` Lane ${b.lane} is available again at ${formatTime(b.hour)}.` : ""}`);
  }

  const stats = [
    { label: "Demo bookings today", value: active.filter((b) => b.date === now.date).length, sub: formatDate(now.date, { year: undefined }), icon: CalendarDays },
    { label: "Total demo bookings", value: active.length, sub: `${bookings.length - active.length} cancelled`, icon: Ticket },
    {
      label: "Available bowling lanes",
      value: freeNow === null ? "Closed" : `${freeNow}/${LANES}`,
      sub: liveHour === undefined ? "No more slots today" : `Today at ${formatTime(liveHour)}, incl. sample bookings`,
      icon: Users,
    },
    { label: "Upcoming demo reservations", value: active.filter(isUpcoming).length, sub: "From now onward", icon: Inbox },
  ];

  return (
    <div className="space-y-8">
      <p role="status" aria-live="polite" className={toast ? "flex items-center justify-between gap-4 rounded-lg bg-slate-900 px-4 py-3 text-sm text-white" : "sr-only"}>
        {toast}
        {toast && (
          <button type="button" onClick={() => setToast("")} aria-label="Dismiss message" className="rounded p-1 hover:bg-white/10">
            <X className="size-4" />
          </button>
        )}
      </p>

      <section aria-labelledby="overview-title">
        <h2 id="overview-title" className="sr-only">Overview</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ label, value, sub, icon: Icon }) => (
            <div key={label} className={`${card} p-5`}>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-600">{label}</p>
                <Icon aria-hidden className="size-4 text-slate-400" />
              </div>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 tabular-nums">{value}</p>
              <p className="mt-1 text-xs text-slate-500">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      <section ref={schedule} aria-labelledby="lanes-title" className={`${card} scroll-mt-6`}>
        <div className="flex flex-col gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 id="lanes-title" className="text-lg font-semibold text-slate-900">Bowling lanes</h2>
            <p className="text-sm text-slate-500">{formatDate(day)} at {formatTime(hour)}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={() => { setPickedDate(addDays(day, -1)); setPickedHour(null); }} aria-label="Previous day" className="grid size-9 place-items-center rounded-lg border border-slate-200 hover:bg-slate-50">
              <ChevronLeft className="size-4" />
            </button>
            <button type="button" onClick={() => { setPickedDate(null); setPickedHour(null); }} className="h-9 rounded-lg border border-slate-200 px-3 text-sm font-medium hover:bg-slate-50">
              Today
            </button>
            <button type="button" onClick={() => { setPickedDate(addDays(day, 1)); setPickedHour(null); }} aria-label="Next day" className="grid size-9 place-items-center rounded-lg border border-slate-200 hover:bg-slate-50">
              <ChevronRight className="size-4" />
            </button>
            <label className="sr-only" htmlFor="admin-date">Date</label>
            <input
              id="admin-date"
              type="date"
              value={day}
              onChange={(e) => e.target.value && (setPickedDate(e.target.value), setPickedHour(null))}
              className="h-9 rounded-lg border border-slate-200 px-2 text-sm"
            />
          </div>
        </div>

        <div className="p-5">
          <div role="group" aria-label="Time" className="flex flex-wrap gap-1.5">
            {hours.map((h) => (
              <button
                key={h}
                type="button"
                aria-pressed={h === hour}
                onClick={() => setPickedHour(h)}
                className="h-8 rounded-md border border-slate-200 px-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 aria-pressed:border-cobalt aria-pressed:bg-cobalt aria-pressed:text-white"
              >
                {formatTime(h)}
              </button>
            ))}
          </div>

          <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {Array.from({ length: LANES }, (_, i) => i + 1).map((lane) => {
              const use = lanes.get(lane);
              const b = use?.kind === "booking" ? use.booking : null;
              return (
                <li
                  key={lane}
                  className={`flex min-h-28 flex-col rounded-lg border p-3 ${
                    b ? "border-cobalt bg-cobalt text-white" : use ? `border-slate-200 ${sample}` : "border-emerald-200 bg-emerald-50/60 text-slate-800"
                  }`}
                >
                  <span className="text-xs font-semibold uppercase tracking-wide opacity-75">Lane {lane}</span>
                  {b ? (
                    <>
                      <span className="mt-auto font-mono text-sm font-semibold">{b.ref}</span>
                      <span className="truncate text-sm">{b.customer.name}</span>
                      <span className="text-xs opacity-80">{b.guests} guests, {EXPERIENCES[b.experience].name}</span>
                    </>
                  ) : use ? (
                    <span className="mt-auto text-sm font-medium">Sample booking</span>
                  ) : (
                    <span className="mt-auto flex items-center gap-1.5 text-sm font-medium text-emerald-800">
                      <span aria-hidden className="size-2 rounded-full bg-emerald-500" /> Available
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="day-title" className={card}>
        <div className="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 id="day-title" className="text-lg font-semibold text-slate-900">Day schedule</h2>
            <p className="text-sm text-slate-500">{formatDate(day)}. Select a time column to inspect it above.</p>
          </div>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
            <li className="flex items-center gap-1.5"><span aria-hidden className="size-3 rounded-sm border border-emerald-200 bg-emerald-50" /> Available</li>
            <li className="flex items-center gap-1.5"><span aria-hidden className={`size-3 rounded-sm border border-slate-200 ${sample}`} /> Sample booking</li>
            <li className="flex items-center gap-1.5"><span aria-hidden className="size-3 rounded-sm bg-cobalt" /> Demo booking</li>
          </ul>
        </div>
        <div className="relative overflow-x-auto p-5">
          <table className="w-full min-w-[640px] border-separate border-spacing-1 text-left text-sm">
            <caption className="sr-only">Lane and mini-golf schedule for {formatDate(day)}</caption>
            <thead>
              <tr>
                <th scope="col" className="w-24 px-2 text-xs font-medium text-slate-500">Resource</th>
                {hours.map((h) => (
                  <th key={h} scope="col" className="px-0">
                    <button
                      type="button"
                      onClick={() => setPickedHour(h)}
                      aria-pressed={h === hour}
                      className="w-full rounded-md px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100 aria-pressed:bg-slate-900 aria-pressed:text-white"
                    >
                      {formatTime(h).replace(":00", "")}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: LANES }, (_, i) => i + 1).map((lane) => (
                <tr key={lane}>
                  <th scope="row" className="px-2 text-xs font-medium whitespace-nowrap text-slate-600">Lane {lane}</th>
                  {hours.map((h) => {
                    const use = laneUsage(day, h, bookings).get(lane);
                    const b = use?.kind === "booking" ? use.booking : null;
                    return (
                      <td
                        key={h}
                        className={`h-8 rounded-md px-1.5 text-center text-[0.7rem] ${
                          b ? "bg-cobalt font-mono font-semibold text-white" : use ? sample : "border border-emerald-100 bg-emerald-50/60"
                        }`}
                      >
                        {b ? b.ref.replace("DEMO-", "") : use ? <span className="sr-only">Sample booking</span> : <span className="sr-only">Available</span>}
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr>
                <th scope="row" className="px-2 pt-2 text-xs font-medium whitespace-nowrap text-slate-600">Mini-golf</th>
                {hours.map((h) => {
                  const g = golfUsage(day, h, bookings);
                  const used = Math.min(GOLF_CAPACITY, g.sample + g.demo.length);
                  return (
                    <td key={h} className={`h-8 rounded-md text-center text-xs font-semibold ${used >= GOLF_CAPACITY ? "bg-slate-200 text-slate-600" : g.demo.length ? "bg-cobalt/15 text-cobalt-deep" : "bg-slate-50 text-slate-600"}`}>
                      {used}/{GOLF_CAPACITY}
                      <span className="sr-only"> groups booked</span>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
          <p className="mt-3 text-xs text-slate-500">
            Mini-golf shows groups booked per hour against a demo capacity of {GOLF_CAPACITY}. Times use Eastern Time.
          </p>

          <h3 className="mt-6 text-sm font-semibold text-slate-900">Party and event requests this day</h3>
          {dayRequests.length ? (
            <ul className="mt-2 divide-y divide-slate-100 rounded-lg border border-slate-200">
              {dayRequests.map((b) => (
                <li key={b.ref} className="flex flex-wrap items-center justify-between gap-2 px-3 py-2.5 text-sm">
                  <span>
                    <span className="font-mono font-semibold">{b.ref}</span> {activityName(b)}, {b.guests} guests at {formatTime(b.hour)}
                  </span>
                  <span className="text-slate-600">{b.customer.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-slate-500">No requests for this day.</p>
          )}
        </div>
      </section>

      <section aria-labelledby="res-title" className={card}>
        <div className="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 id="res-title" className="text-lg font-semibold text-slate-900">Reservations</h2>
            <p className="text-sm text-slate-500">Demo bookings made on the public booking page in this browser.</p>
          </div>
          <div role="group" aria-label="Filter reservations" className="inline-flex rounded-lg border border-slate-200 p-0.5">
            {(["upcoming", "all", "cancelled"] as const).map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 capitalize aria-pressed:bg-slate-900 aria-pressed:text-white"
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {listed.length === 0 ? (
          <div className="flex flex-col items-center gap-3 p-10 text-center">
            <Inbox aria-hidden className="size-8 text-slate-400" />
            <p className="font-medium text-slate-900">{bookings.length ? "Nothing in this view." : "No demo bookings yet."}</p>
            <p className="max-w-[44ch] text-sm text-slate-500">
              {bookings.length ? "Try another filter." : "Make a booking on the public site and it will appear here instantly, in this browser."}
            </p>
            {!bookings.length && (
              <Link href="/book" className="mt-2 inline-flex h-9 items-center gap-2 rounded-lg bg-slate-900 px-4 text-sm font-medium text-white hover:bg-slate-700">
                Open the booking page
              </Link>
            )}
          </div>
        ) : (
          <div className="relative overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs font-medium tracking-wide text-slate-500 uppercase">
                <tr>
                  <th scope="col" className="px-5 py-3">Reference</th>
                  <th scope="col" className="px-3 py-3">Guest</th>
                  <th scope="col" className="px-3 py-3">Activity</th>
                  <th scope="col" className="px-3 py-3">When</th>
                  <th scope="col" className="px-3 py-3 text-right">Guests</th>
                  <th scope="col" className="px-3 py-3">Lane</th>
                  <th scope="col" className="px-3 py-3 text-right">Total</th>
                  <th scope="col" className="px-3 py-3">Status</th>
                  <th scope="col" className="px-5 py-3 text-right"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {listed.map((b) => (
                  <Fragment key={b.ref}>
                    <tr className={b.status === "cancelled" ? "text-slate-400" : "text-slate-800"}>
                      <td className="px-5 py-3 font-mono font-semibold whitespace-nowrap">{b.ref}</td>
                      <td className="px-3 py-3 whitespace-nowrap">{b.customer.name}</td>
                      <td className="px-3 py-3">{activityName(b)}</td>
                      <td className="px-3 py-3 whitespace-nowrap">{shortDate(b.date)}, {formatTime(b.hour)}</td>
                      <td className="px-3 py-3 text-right tabular-nums">{b.guests}</td>
                      <td className="px-3 py-3">{b.lane ? `Lane ${b.lane}` : "None"}</td>
                      <td className="px-3 py-3 text-right whitespace-nowrap tabular-nums">{b.quote.total === null ? "Quote" : formatCad(b.quote.total)}</td>
                      <td className="px-3 py-3">
                        <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize ring-1 ring-inset ${STATUS[b.status]}`}>{b.status}</span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex justify-end gap-1.5 whitespace-nowrap">
                          <button
                            type="button"
                            aria-expanded={expanded === b.ref}
                            onClick={() => setExpanded(expanded === b.ref ? null : b.ref)}
                            className="h-8 rounded-md border border-slate-200 px-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                          >
                            Details<span className="sr-only"> for {b.ref}</span>
                          </button>
                          <button type="button" onClick={() => showOnSchedule(b)} className="h-8 rounded-md border border-slate-200 px-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50">
                            Schedule<span className="sr-only"> for {b.ref}</span>
                          </button>
                          {b.status !== "cancelled" &&
                            (confirming === b.ref ? (
                              <>
                                <button type="button" onClick={() => cancel(b)} className="h-8 rounded-md bg-red-600 px-2.5 text-xs font-medium text-white hover:bg-red-700">
                                  Confirm cancel
                                </button>
                                <button type="button" onClick={() => setConfirming(null)} className="h-8 rounded-md px-2 text-xs font-medium text-slate-600 hover:bg-slate-100">
                                  Keep
                                </button>
                              </>
                            ) : (
                              <button type="button" onClick={() => setConfirming(b.ref)} className="h-8 rounded-md border border-red-200 px-2.5 text-xs font-medium text-red-700 hover:bg-red-50">
                                Cancel<span className="sr-only"> {b.ref}</span>
                              </button>
                            ))}
                        </div>
                      </td>
                    </tr>
                    {expanded === b.ref && (
                      <tr className="bg-slate-50">
                        <td colSpan={9} className="px-5 py-4">
                          <dl className="grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
                            {(
                              [
                                ["Email", b.customer.email],
                                ["Phone", b.customer.phone],
                                ["Special requests", b.customer.notes || "None"],
                                ["Created", new Date(b.createdAt).toLocaleString("en-CA", { timeZone: "America/Toronto", dateStyle: "medium", timeStyle: "short" })],
                                ["Duration", EXPERIENCES[b.experience].durationLabel],
                                ["Price breakdown", b.quote.lines.map((l) => `${l.label}: $${l.amount}`).join("; ") || "Quote from the team"],
                              ] as [string, string][]
                            ).map(([k, v]) => (
                              <div key={k}>
                                <dt className="text-xs font-medium text-slate-500">{k}</dt>
                                <dd className="mt-0.5 text-slate-900 [overflow-wrap:anywhere]">{v}</dd>
                              </div>
                            ))}
                          </dl>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section aria-labelledby="reset-title" className={`${card} flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between`}>
        <div>
          <h2 id="reset-title" className="font-semibold text-slate-900">Reset demo</h2>
          <p className="text-sm text-slate-500">Clears every demo booking in this browser and restores the original sample availability.</p>
        </div>
        <button
          type="button"
          onClick={() => resetDialog.current?.showModal()}
          className="inline-flex h-9 items-center gap-2 rounded-lg border border-red-200 px-4 text-sm font-medium text-red-700 hover:bg-red-50"
        >
          <RotateCcw aria-hidden className="size-4" /> Reset demo
        </button>
      </section>

      <dialog
        ref={resetDialog}
        aria-labelledby="reset-dialog-title"
        className="m-auto w-[min(92vw,28rem)] rounded-xl border border-slate-200 p-0 shadow-2xl backdrop:bg-slate-900/50"
      >
        <div className="p-6">
          <div className="flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-red-50 text-red-600">
              <AlertTriangle aria-hidden className="size-5" />
            </span>
            <div>
              <h2 id="reset-dialog-title" className="font-semibold text-slate-900">Reset the demo?</h2>
              <p className="mt-1 text-sm text-slate-600">
                This removes all {bookings.length} demo {bookings.length === 1 ? "booking" : "bookings"} saved in this browser. Sample availability goes back to its starting state.
              </p>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <button type="button" onClick={() => resetDialog.current?.close()} className="h-9 rounded-lg border border-slate-200 px-4 text-sm font-medium hover:bg-slate-50">
              Keep bookings
            </button>
            <button
              type="button"
              onClick={() => {
                resetDemo();
                resetDialog.current?.close();
                setExpanded(null);
                setConfirming(null);
                setToast("Demo reset. All demo bookings cleared and sample availability restored.");
              }}
              className="h-9 rounded-lg bg-red-600 px-4 text-sm font-medium text-white hover:bg-red-700"
            >
              Reset demo
            </button>
          </div>
        </div>
      </dialog>

      <p className="flex items-center gap-1.5 text-xs text-slate-500">
        <ExternalLink aria-hidden className="size-3.5" />
        Customers book on the public site at <Link href="/book" className="font-medium text-slate-700 underline underline-offset-2">/book</Link>.
      </p>
    </div>
  );
}
