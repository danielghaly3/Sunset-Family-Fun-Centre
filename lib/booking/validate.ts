import { EXPERIENCES, startTimes, type Selection } from "./config.ts";
import { inWindow, isOpenSlot, slotFor } from "./availability.ts";
import type { Booking, Customer } from "./records.ts";
import type { DateKey, Now } from "./time.ts";

export type DetailErrors = Partial<Record<keyof Customer, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateCustomer(c: Customer): DetailErrors {
  const e: DetailErrors = {};
  const name = c.name.trim();
  if (name.length < 2) e.name = "Please enter your full name.";
  else if (name.length > 80) e.name = "Please keep your name under 80 characters.";
  if (!EMAIL.test(c.email.trim())) e.email = "Enter a valid email address, like name@example.com.";
  const digits = c.phone.replace(/\D/g, "");
  if (!(digits.length === 10 || (digits.length === 11 && digits.startsWith("1"))))
    e.phone = "Enter a 10-digit phone number, like (519) 555-0123.";
  if (c.notes.length > 500) e.notes = "Please keep special requests under 500 characters.";
  return e;
}

/** Returns a message when the selection can no longer be booked, otherwise null. */
export function validateSelection(
  sel: Selection,
  date: DateKey | null,
  hour: number | null,
  bookings: Booking[],
  now: Now,
): string | null {
  const exp = EXPERIENCES[sel.experience];
  if (sel.guests < exp.minGuests || sel.guests > exp.maxGuests)
    return `${exp.name} is for ${exp.minGuests} to ${exp.maxGuests} guests.`;
  if (!date || !inWindow(date, now)) return "Please choose a date within the booking window.";
  if (hour === null || !startTimes(date, exp).includes(hour)) return "Please choose a start time.";
  const slot = slotFor(exp, date, hour, bookings, now);
  if (slot.status === "past") return "That time has already passed. Please choose a later time.";
  if (!isOpenSlot(slot)) return "Sorry, that time just filled up. Please choose another time.";
  return null;
}
