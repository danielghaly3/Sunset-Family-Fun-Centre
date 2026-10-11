// The demo reservation record, and defensive parsing of whatever is in localStorage.
import { isExperienceId, type ExperienceId, type PartyPackage, type Quote } from "./config.ts";
import { isDateKey, type DateKey } from "./time.ts";

export type BookingStatus = "confirmed" | "requested" | "cancelled";

export type Customer = { name: string; email: string; phone: string; notes: string };

export type Booking = {
  ref: string;
  createdAt: string;
  status: BookingStatus;
  experience: ExperienceId;
  pkg: PartyPackage | null;
  eventType: string | null;
  date: DateKey;
  hour: number;
  guests: number;
  lane: number | null;
  customer: Customer;
  quote: Quote;
};

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null;
const isStr = (v: unknown): v is string => typeof v === "string";
const isInt = (v: unknown): v is number => Number.isInteger(v);

export function isBooking(v: unknown): v is Booking {
  if (!isObj(v) || !isObj(v.customer) || !isObj(v.quote)) return false;
  const c = v.customer;
  const q = v.quote;
  return (
    isStr(v.ref) &&
    /^DEMO-\d{5}$/.test(v.ref) &&
    isStr(v.createdAt) &&
    (v.status === "confirmed" || v.status === "requested" || v.status === "cancelled") &&
    isExperienceId(v.experience) &&
    (v.pkg === null || v.pkg === "classic" || v.pkg === "arcade") &&
    (v.eventType === null || isStr(v.eventType)) &&
    isDateKey(v.date) &&
    isInt(v.hour) && v.hour >= 0 && v.hour < 24 &&
    isInt(v.guests) && v.guests > 0 &&
    (v.lane === null || (isInt(v.lane) && v.lane >= 1)) &&
    isStr(c.name) && isStr(c.email) && isStr(c.phone) && isStr(c.notes) &&
    Array.isArray(q.lines) &&
    (q.total === null || typeof q.total === "number")
  );
}

/** Never throws: corrupt or foreign data becomes an empty list, bad rows are dropped. */
export function parseBookings(raw: string | null): Booking[] {
  if (!raw) return [];
  try {
    const data: unknown = JSON.parse(raw);
    return isObj(data) && Array.isArray(data.bookings) ? data.bookings.filter(isBooking) : [];
  } catch {
    return [];
  }
}

export function makeRef(taken: Set<string>, random: () => number = Math.random): string {
  for (;;) {
    const ref = `DEMO-${10000 + Math.floor(random() * 90000)}`;
    if (!taken.has(ref)) return ref;
  }
}
