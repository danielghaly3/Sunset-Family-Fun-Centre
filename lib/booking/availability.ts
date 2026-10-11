// Simulated availability. Sample occupancy is a pure function of date and hour, so it is
// stable across refreshes and "Reset demo" always restores the same starting picture.
import { BOOKING_WINDOW_DAYS, EXPERIENCES, GOLF_CAPACITY, LANES, startTimes, type Experience } from "./config.ts";
import type { Booking } from "./records.ts";
import { addDays, weekday, type DateKey, type Now } from "./time.ts";

/** FNV-1a hash mapped to [0, 1). */
function rand(seed: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0) / 2 ** 32;
}

const isBusy = (date: DateKey, hour: number) => {
  const wd = weekday(date);
  return wd === 0 || wd === 6 || hour >= 18;
};

/** Lanes taken by simulated sample bookings. Roughly one slot in ten is fully booked. */
export function sampleLanes(date: DateKey, hour: number): number[] {
  const full = rand(`${date}|${hour}|full`) < 0.1;
  const count = full ? LANES : Math.floor(rand(`${date}|${hour}|n`) * (isBusy(date, hour) ? 11 : 7));
  return Array.from({ length: LANES }, (_, i) => i + 1)
    .sort((a, b) => rand(`${date}|${hour}|${a}`) - rand(`${date}|${hour}|${b}`))
    .slice(0, count)
    .sort((a, b) => a - b);
}

export function sampleGolfGroups(date: DateKey, hour: number): number {
  if (rand(`${date}|${hour}|golf-full`) < 0.1) return GOLF_CAPACITY;
  return Math.floor(rand(`${date}|${hour}|golf`) * GOLF_CAPACITY);
}

/** Does this live demo booking occupy its resource during the given hour? */
const occupies = (b: Booking, date: DateKey, hour: number) =>
  b.status === "confirmed" && b.date === date && hour >= b.hour && hour < b.hour + EXPERIENCES[b.experience].slotHours;

export type LaneUse = { kind: "sample" } | { kind: "booking"; booking: Booking };

export function laneUsage(date: DateKey, hour: number, bookings: Booking[]): Map<number, LaneUse> {
  const used = new Map<number, LaneUse>();
  for (const lane of sampleLanes(date, hour)) used.set(lane, { kind: "sample" });
  for (const b of bookings) {
    if (b.lane !== null && occupies(b, date, hour)) used.set(b.lane, { kind: "booking", booking: b });
  }
  return used;
}

export function golfUsage(date: DateKey, hour: number, bookings: Booking[]) {
  const demo = bookings.filter((b) => EXPERIENCES[b.experience].resource === "golf" && occupies(b, date, hour));
  return { sample: sampleGolfGroups(date, hour), demo };
}

/** Lowest free lane, or null when the hour is full. */
export function assignLane(date: DateKey, hour: number, bookings: Booking[]): number | null {
  const used = laneUsage(date, hour, bookings);
  for (let lane = 1; lane <= LANES; lane++) if (!used.has(lane)) return lane;
  return null;
}

export type SlotStatus = "available" | "limited" | "full" | "past" | "request";
export type Slot = { hour: number; status: SlotStatus; left: number | null };

export const inWindow = (date: DateKey, now: Now) =>
  date >= now.date && date <= addDays(now.date, BOOKING_WINDOW_DAYS);

export function slotFor(exp: Experience, date: DateKey, hour: number, bookings: Booking[], now: Now): Slot {
  if (date < now.date || (date === now.date && hour <= now.hour)) return { hour, status: "past", left: null };
  if (exp.mode === "request") return { hour, status: "request", left: null };
  let left: number;
  if (exp.resource === "lane") {
    left = LANES - laneUsage(date, hour, bookings).size;
  } else {
    const g = golfUsage(date, hour, bookings);
    left = Math.max(0, GOLF_CAPACITY - g.sample - g.demo.length);
  }
  const status: SlotStatus = left === 0 ? "full" : left <= (exp.resource === "lane" ? 3 : 1) ? "limited" : "available";
  return { hour, status, left };
}

export const slotsFor = (exp: Experience, date: DateKey, bookings: Booking[], now: Now) =>
  startTimes(date, exp).map((h) => slotFor(exp, date, h, bookings, now));

export const isOpenSlot = (s: Slot) => s.status === "available" || s.status === "limited" || s.status === "request";

/** Calendar dot: how much is left on a day for this experience. */
export function dayLevel(exp: Experience, date: DateKey, bookings: Booking[], now: Now) {
  if (!inWindow(date, now)) return "unavailable" as const;
  const slots = slotsFor(exp, date, bookings, now).filter(isOpenSlot);
  if (slots.length === 0) return "full" as const;
  if (exp.mode === "request") return "request" as const;
  return slots.length <= 2 ? ("low" as const) : ("good" as const);
}
