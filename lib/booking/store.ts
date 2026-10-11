"use client";

// Demo persistence: one localStorage key, shared live across components and browser tabs.
import { useMemo, useSyncExternalStore } from "react";
import { parseBookings, type Booking } from "./records.ts";
import { torontoNow, type Now } from "./time.ts";

const KEY = "sunset-demo-bookings-v1";
const CHANGE = "sunset-demo-bookings-change";
const EMPTY: Booking[] = [];

let cachedRaw: string | null | undefined;
let cached: Booking[] = EMPTY;

function readRaw(): string | null {
  try {
    return window.localStorage.getItem(KEY);
  } catch {
    return null; // storage blocked (private mode, settings): behave like an empty demo
  }
}

/** Stable snapshot: the same array until the stored JSON actually changes. */
export function getBookings(): Booking[] {
  const raw = readRaw();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cached = parseBookings(raw);
  }
  return cached;
}

function save(bookings: Booking[]): boolean {
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ version: 1, bookings }));
  } catch {
    return false;
  }
  window.dispatchEvent(new Event(CHANGE));
  return true;
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE, onChange);
  };
}

export const useBookings = () => useSyncExternalStore(subscribe, getBookings, () => EMPTY);

export const addBooking = (b: Booking) => save([...getBookings(), b]);

export const cancelBooking = (ref: string) =>
  save(getBookings().map((b) => (b.ref === ref ? { ...b, status: "cancelled" as const } : b)));

export function resetDemo() {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // nothing stored, nothing to clear
  }
  window.dispatchEvent(new Event(CHANGE));
}

// Current Port Elgin time, re-read every 30 s. Null during prerender and hydration, so pages
// never bake the build time into HTML or mismatch on hydrate.
const minuteNow = () => Math.floor(Date.now() / 60_000);
const tick = (cb: () => void) => {
  const id = window.setInterval(cb, 30_000);
  return () => window.clearInterval(id);
};

export function useNow(): Now | null {
  const minute = useSyncExternalStore(tick, minuteNow, () => null);
  return useMemo(() => (minute === null ? null : torontoNow(new Date(minute * 60_000))), [minute]);
}
