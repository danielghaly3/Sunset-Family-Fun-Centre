"use client";

import { useReducer } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { AlertCircle, ArrowLeft, ArrowRight, Check, Pencil } from "lucide-react";
import { assignLane, dayLevel, inWindow, isOpenSlot, slotFor } from "@/lib/booking/availability";
import {
  EXPERIENCES,
  PARTY_PACKAGES,
  isExperienceId,
  quote,
  type ExperienceId,
  type PartyPackage,
} from "@/lib/booking/config";
import { makeRef, type Booking, type Customer } from "@/lib/booking/records";
import { addBooking, getBookings, useBookings, useNow } from "@/lib/booking/store";
import { formatDate, formatTime, parseKey, torontoNow, type DateKey } from "@/lib/booking/time";
import { validateCustomer, validateSelection, type DetailErrors } from "@/lib/booking/validate";
import { Calendar, type Month } from "./calendar";
import { DetailsStep } from "./details-step";
import { ExperienceStep } from "./experience-step";
import { GuestsStep } from "./guests-step";
import { STEPS, StepHeading, StepIndicator } from "./step-indicator";
import { Summary, totalText } from "./summary";
import { TimeStep } from "./time-step";

type State = {
  step: number;
  /** furthest step the visitor may jump to from the indicator */
  reachable: number;
  navigated: boolean;
  dir: 1 | -1;
  experience: ExperienceId | null;
  guests: number;
  pkg: PartyPackage;
  eventType: string;
  date: DateKey | null;
  hour: number | null;
  month: Month | null;
  customer: Customer;
  errors: DetailErrors;
  formError: string | null;
};

type Action =
  | { type: "go"; step: number }
  | { type: "experience"; id: ExperienceId; guests?: number }
  | { type: "guests"; n: number }
  | { type: "pkg"; pkg: PartyPackage }
  | { type: "eventType"; value: string }
  | { type: "date"; date: DateKey }
  | { type: "hour"; hour: number }
  | { type: "month"; month: Month }
  | { type: "customer"; field: keyof Customer; value: string }
  | { type: "errors"; errors: DetailErrors }
  | { type: "formError"; message: string | null };

const clampGuests = (id: ExperienceId, n: number) => {
  const e = EXPERIENCES[id];
  return Math.min(e.maxGuests, Math.max(e.minGuests, Number.isFinite(n) && n > 0 ? Math.round(n) : e.defaultGuests));
};

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "go":
      return {
        ...s,
        step: a.step,
        dir: a.step >= s.step ? 1 : -1,
        reachable: Math.max(s.reachable, a.step),
        navigated: true,
        formError: null,
      };
    case "experience":
      // A new experience changes capacity and start times, so the time must be picked again.
      return {
        ...s,
        experience: a.id,
        guests: clampGuests(a.id, a.guests ?? (s.experience ? s.guests : NaN)),
        hour: null,
        reachable: Math.min(s.reachable, 2),
        formError: null,
      };
    case "guests":
      return s.experience ? { ...s, guests: clampGuests(s.experience, a.n) } : s;
    case "pkg":
      return { ...s, pkg: a.pkg };
    case "eventType":
      return { ...s, eventType: a.value };
    case "date":
      return { ...s, date: a.date, hour: null, reachable: Math.min(s.reachable, 3), formError: null };
    case "hour":
      return { ...s, hour: a.hour, formError: null };
    case "month":
      return { ...s, month: a.month };
    case "customer":
      return { ...s, customer: { ...s.customer, [a.field]: a.value }, errors: { ...s.errors, [a.field]: undefined } };
    case "errors":
      return { ...s, errors: a.errors };
    case "formError":
      return { ...s, formError: a.message };
  }
}

function init(params: URLSearchParams): State {
  const id = params.get("experience");
  const base: State = {
    step: 0,
    reachable: 0,
    navigated: false,
    dir: 1,
    experience: null,
    guests: 1,
    pkg: params.get("package") === "arcade" ? "arcade" : "classic",
    eventType: "",
    date: null,
    hour: null,
    month: null,
    customer: { name: "", email: "", phone: "", notes: "" },
    errors: {},
    formError: null,
  };
  if (!isExperienceId(id)) return base;
  return { ...base, experience: id, guests: clampGuests(id, Number(params.get("guests"))), step: 1, reachable: 1 };
}

export function BookingFlow() {
  const params = useSearchParams();
  const router = useRouter();
  const [s, dispatch] = useReducer(reducer, params, init);
  const bookings = useBookings();
  const now = useNow();

  const exp = s.experience ? EXPERIENCES[s.experience] : null;
  const q = exp ? quote({ experience: exp.id, guests: s.guests, pkg: s.pkg }) : null;
  const lanePreview =
    exp?.resource === "lane" && s.date && s.hour !== null ? assignLane(s.date, s.hour, bookings) : null;

  const valid = [
    !!exp,
    !!exp && s.guests >= exp.minGuests && s.guests <= exp.maxGuests && (exp.id !== "group-event" || !!s.eventType),
    !!exp && !!s.date && !!now && inWindow(s.date, now) && dayLevel(exp, s.date, bookings, now) !== "full",
    !!exp && !!s.date && s.hour !== null && !!now && isOpenSlot(slotFor(exp, s.date, s.hour, bookings, now)),
    true, // details are checked when Continue is pressed, so errors show at the right moment
    true,
  ];
  const reachable = Math.min(s.reachable, valid.findIndex((v) => !v) === -1 ? 5 : valid.findIndex((v) => !v));
  const hints = [
    "Choose an experience to continue",
    "Choose the occasion to continue",
    "Choose a date to continue",
    "Choose a start time to continue",
    "",
    "",
  ];

  const go = (step: number) => dispatch({ type: "go", step });

  function submitDetails() {
    const errors = validateCustomer(s.customer);
    dispatch({ type: "errors", errors });
    const first = (["name", "email", "phone", "notes"] as const).find((f) => errors[f]);
    if (first) document.getElementById(first)?.focus();
    else go(5);
  }

  function next() {
    if (s.step === 4) return submitDetails();
    if (s.step === 5) return complete();
    if (valid[s.step]) go(s.step + 1);
  }

  function complete() {
    if (!exp) return go(0);
    const errors = validateCustomer(s.customer);
    if (Object.keys(errors).length) {
      dispatch({ type: "errors", errors });
      return go(4);
    }
    // Re-read storage at the last moment: another tab may have taken the slot.
    const fresh = getBookings();
    const t = torontoNow();
    const problem = validateSelection({ experience: exp.id, guests: s.guests, pkg: s.pkg }, s.date, s.hour, fresh, t);
    if (problem || !s.date || s.hour === null) {
      dispatch({ type: "formError", message: problem ?? "Please check your date and time." });
      return;
    }
    const lane = exp.resource === "lane" ? assignLane(s.date, s.hour, fresh) : null;
    if (exp.resource === "lane" && lane === null) {
      dispatch({ type: "formError", message: "Sorry, every lane just filled up for that time. Please choose another time." });
      return;
    }
    const booking: Booking = {
      ref: makeRef(new Set(fresh.map((b) => b.ref))),
      createdAt: new Date().toISOString(),
      status: exp.mode === "request" ? "requested" : "confirmed",
      experience: exp.id,
      pkg: exp.id === "birthday" ? s.pkg : null,
      eventType: exp.id === "group-event" ? s.eventType : null,
      date: s.date,
      hour: s.hour,
      guests: s.guests,
      lane,
      customer: {
        name: s.customer.name.trim(),
        email: s.customer.email.trim(),
        phone: s.customer.phone.trim(),
        notes: s.customer.notes.trim(),
      },
      quote: quote({ experience: exp.id, guests: s.guests, pkg: s.pkg }),
    };
    if (!addBooking(booking)) {
      dispatch({
        type: "formError",
        message: "This browser is blocking local storage, so the demo booking could not be saved. Try a regular (not private) window.",
      });
      return;
    }
    router.push(`/book/confirmation?ref=${booking.ref}`);
  }

  const isRequest = exp?.mode === "request";
  const primaryLabel = s.step === 5 ? (isRequest ? "Send Demo Request" : "Complete Demo Booking") : "Continue";
  const month: Month | null =
    s.month ?? (s.date ? { y: parseKey(s.date).y, m: parseKey(s.date).m } : now ? { y: parseKey(now.date).y, m: parseKey(now.date).m } : null);

  const loading = (
    <div aria-busy className="grid gap-3">
      <div className="h-80 animate-pulse rounded-[24px] bg-cream motion-reduce:animate-none" />
      <p className="sr-only">Loading availability</p>
    </div>
  );

  function stepBody() {
    switch (s.step) {
      case 0:
        return (
          <>
            <StepHeading focus={s.navigated} title="What are we playing?" sub="Choose an experience. You can change it at any time." />
            <ExperienceStep value={s.experience} onChange={(id) => dispatch({ type: "experience", id })} />
          </>
        );
      case 1:
        return exp ? (
          <>
            <StepHeading
              focus={s.navigated}
              title="Who's coming?"
              sub={exp.mode === "request" ? "Tell us roughly how many guests. The team confirms the final details." : "Your price updates as you go."}
            />
            <GuestsStep
              exp={exp}
              guests={s.guests}
              onGuests={(n) => dispatch({ type: "guests", n })}
              pkg={s.pkg}
              onPkg={(pkg) => dispatch({ type: "pkg", pkg })}
              eventType={s.eventType}
              onEventType={(value) => dispatch({ type: "eventType", value })}
              onSwitchToGroup={() => dispatch({ type: "experience", id: "group-event", guests: 7 })}
            />
          </>
        ) : null;
      case 2:
        return exp ? (
          <>
            <StepHeading focus={s.navigated} title="Pick a day." sub="Sample availability for the next 90 days. Past dates are unavailable." />
            {now && month ? (
              <Calendar
                exp={exp}
                bookings={bookings}
                now={now}
                value={s.date}
                onChange={(date) => dispatch({ type: "date", date })}
                month={month}
                onMonth={(m) => dispatch({ type: "month", month: m })}
              />
            ) : (
              loading
            )}
          </>
        ) : null;
      case 3:
        return exp && s.date ? (
          <>
            <StepHeading focus={s.navigated} title="Pick a time." sub={formatDate(s.date)} />
            {now ? (
              <TimeStep
                exp={exp}
                date={s.date}
                bookings={bookings}
                now={now}
                value={s.hour}
                onChange={(hour) => dispatch({ type: "hour", hour })}
                onChangeDate={() => go(2)}
              />
            ) : (
              loading
            )}
          </>
        ) : null;
      case 4:
        return (
          <>
            <StepHeading focus={s.navigated} title="Your details." sub="So the team knows who's coming. Demo only, nothing is sent." />
            <DetailsStep
              value={s.customer}
              errors={s.errors}
              onChange={(field, value) => dispatch({ type: "customer", field, value })}
              onSubmit={submitDetails}
            />
          </>
        );
      case 5:
        return exp && s.date && s.hour !== null ? (
          <>
            <StepHeading
              focus={s.navigated}
              title={isRequest ? "Review your request." : "Review and book."}
              sub="Check everything, then complete your demo booking."
            />
            <ul className="divide-y divide-midnight/10 rounded-[24px] bg-cream px-5 sm:px-7">
              {(
                [
                  ["Experience", exp.id === "birthday" ? `${exp.name}, ${PARTY_PACKAGES[s.pkg].label}` : exp.id === "group-event" ? `${exp.name}, ${s.eventType}` : exp.name, 0],
                  ["Guests", String(s.guests), 1],
                  ["Date", formatDate(s.date), 2],
                  ["Time", `${formatTime(s.hour)} Eastern Time`, 3],
                  ["Name", s.customer.name, 4],
                  ["Email", s.customer.email, 4],
                  ["Phone", s.customer.phone, 4],
                  ...(s.customer.notes ? ([["Special requests", s.customer.notes, 4]] as [string, string, number][]) : []),
                ] as [string, string, number][]
              ).map(([k, v, step]) => (
                <li key={k} className="flex items-start justify-between gap-4 py-4">
                  <div className="min-w-0">
                    <p className="text-sm text-ink-soft">{k}</p>
                    <p className="font-semibold [overflow-wrap:anywhere]">{v}</p>
                  </div>
                  <button type="button" onClick={() => go(step)} className="flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-cobalt hover:bg-cream-2">
                    <Pencil aria-hidden className="size-3.5" /> Edit<span className="sr-only"> {k.toLowerCase()}</span>
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-2xl border-2 border-dashed border-midnight/25 p-4 text-[0.95rem]">
              <strong>Demo only.</strong> Completing this creates a simulated reservation saved in this browser. It is not a
              real booking with Sunset Family Fun Centre and no payment is taken.
            </p>
          </>
        ) : null;
    }
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start xl:gap-12">
        <div className="min-w-0">
          <StepIndicator step={s.step} reachable={reachable} onGo={go} />

          <div className="mt-8 overflow-hidden rounded-[28px] bg-cream-2 p-5 sm:p-8">
            <AnimatePresence mode="wait" initial={false} custom={s.dir}>
              <motion.div
                key={s.step}
                custom={s.dir}
                initial={{ opacity: 0, x: 28 * s.dir }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -28 * s.dir }}
                transition={{ type: "spring", stiffness: 320, damping: 32 }}
              >
                {stepBody()}
              </motion.div>
            </AnimatePresence>

            {s.formError && (
              <div role="alert" className="mt-6 flex items-start gap-3 rounded-2xl bg-error/10 p-4 font-medium text-error">
                <AlertCircle aria-hidden className="mt-0.5 size-5 shrink-0" />
                <div>
                  <p>{s.formError}</p>
                  {s.step === 5 && (
                    <button type="button" onClick={() => go(3)} className="mt-2 underline underline-offset-4">
                      Choose another time
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="sticky bottom-3 z-20 mt-6 flex items-center gap-3 rounded-full bg-midnight p-2 text-cream shadow-[0_20px_40px_-20px_rgb(18_22_41/0.8)] lg:static lg:bg-transparent lg:p-0 lg:text-midnight lg:shadow-none">
            {s.step > 0 && (
              <button
                type="button"
                onClick={() => go(s.step - 1)}
                className="btn btn-sm shrink-0 px-4 shadow-[inset_0_0_0_2px_currentColor] lg:px-5"
              >
                <ArrowLeft aria-hidden className="size-4" />
                <span className="max-sm:sr-only">Back</span>
              </button>
            )}
            <p className="mr-auto min-w-0 truncate pl-2 text-sm lg:hidden">
              <span className="block text-cream/60">{q?.estimate ? "Est. total" : "Total"}</span>
              <span className="font-semibold">{totalText(q)}</span>
            </p>
            {!valid[s.step] && <p className="hidden text-sm text-ink-soft lg:mr-auto lg:block">{hints[s.step]}</p>}
            {/* On the details step this is the form's own submit button, so Enter in any field submits. */}
            <button
              type={s.step === 4 ? "submit" : "button"}
              form={s.step === 4 ? "details-form" : undefined}
              onClick={s.step === 4 ? undefined : next}
              disabled={!valid[s.step]}
              aria-describedby={!valid[s.step] ? "step-hint" : undefined}
              className="btn btn-primary btn-sm shrink-0 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:hover:translate-y-0 disabled:hover:bg-coral lg:ml-auto lg:min-h-[3.25rem] lg:px-7"
            >
              {primaryLabel}
              {s.step === 5 ? <Check aria-hidden className="size-4" strokeWidth={3} /> : <ArrowRight aria-hidden className="size-4" />}
            </button>
            <span id="step-hint" className="sr-only">
              {hints[s.step]}
            </span>
          </div>
          <p className="sr-only" aria-live="polite">
            Step {s.step + 1} of {STEPS.length}: {STEPS[s.step]}
          </p>
        </div>

        <aside className="lg:sticky lg:top-24">
          <Summary
            data={{ experience: s.experience, guests: s.guests, pkg: s.pkg, eventType: s.eventType, date: s.date, hour: s.hour, lane: null, quote: q }}
            laneNote={lanePreview ? `Lane ${lanePreview}, assigned at checkout` : undefined}
          />
        </aside>
      </div>
    </MotionConfig>
  );
}
