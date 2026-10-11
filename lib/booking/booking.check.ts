// Self-check for the booking rules. Run: npm test  (Node 23.6+ runs TypeScript directly)
import assert from "node:assert/strict";
import { EXPERIENCES, LANES, quote, startTimes } from "./config.ts";
import { assignLane, laneUsage, sampleLanes, slotFor } from "./availability.ts";
import { makeRef, parseBookings, type Booking } from "./records.ts";
import { validateCustomer, validateSelection } from "./validate.ts";
import { addDays, torontoNow, weekday } from "./time.ts";

// Toronto time: 2026-01-01 03:30 UTC is still Dec 31 at 22:30 in Port Elgin.
assert.deepEqual(torontoNow(new Date("2026-01-01T03:30:00Z")), { date: "2025-12-31", hour: 22, minute: 30 });
assert.equal(addDays("2026-02-28", 1), "2026-03-01");
assert.equal(weekday("2026-10-11"), 0); // a Sunday

// Start times follow published hours: weekdays 4-8 PM, Saturday 11 AM-9 PM, Sunday 11 AM-5 PM.
assert.deepEqual(startTimes("2026-10-12", EXPERIENCES.bowling), [16, 17, 18, 19]);
assert.deepEqual(startTimes("2026-10-17", EXPERIENCES.bowling).at(-1), 20);
assert.deepEqual(startTimes("2026-10-11", EXPERIENCES.birthday), [11, 12, 13, 14, 15]);

// Pricing matches the published price list.
assert.equal(quote({ experience: "bowling", guests: 3, pkg: "classic" }).total, 60);
assert.equal(quote({ experience: "bowling", guests: 4, pkg: "classic" }).total, 80);
assert.equal(quote({ experience: "golf", guests: 2, pkg: "classic" }).total, 20);
assert.equal(quote({ experience: "golf", guests: 6, pkg: "classic" }).total, 48);
assert.equal(quote({ experience: "combo", guests: 6, pkg: "classic" }).total, 150);
assert.equal(quote({ experience: "birthday", guests: 10, pkg: "arcade" }).total, 310);
assert.equal(quote({ experience: "group-event", guests: 30, pkg: "classic" }).total, null);

// Sample occupancy is deterministic and within 12 lanes.
assert.deepEqual(sampleLanes("2026-10-17", 19), sampleLanes("2026-10-17", 19));
assert.ok(sampleLanes("2026-10-17", 19).every((l) => l >= 1 && l <= LANES));

// Lane assignment never double-books, and a full hour returns null.
const now = { date: "2026-10-11", hour: 9, minute: 0 };
const mk = (lane: number, status: Booking["status"] = "confirmed"): Booking => ({
  ref: `DEMO-${10000 + lane}`, createdAt: "", status, experience: "bowling", pkg: null, eventType: null,
  date: "2026-10-12", hour: 17, guests: 4, lane,
  customer: { name: "Test", email: "t@example.com", phone: "5195550123", notes: "" },
  quote: { lines: [], total: 80, estimate: false },
});
let bookings: Booking[] = [];
for (let i = 0; i < LANES; i++) {
  const lane = assignLane("2026-10-12", 17, bookings);
  if (lane === null) break;
  assert.ok(!laneUsage("2026-10-12", 17, bookings).has(lane));
  bookings = [...bookings, mk(lane)];
}
assert.equal(assignLane("2026-10-12", 17, bookings), null);
assert.equal(slotFor(EXPERIENCES.bowling, "2026-10-12", 17, bookings, now).status, "full");
// Cancelling frees the lane again.
bookings = bookings.map((b, i) => (i === 0 ? { ...b, status: "cancelled" } : b));
assert.equal(assignLane("2026-10-12", 17, bookings), bookings[0].lane);

// Past times and out-of-range guests are rejected.
assert.equal(slotFor(EXPERIENCES.bowling, "2026-10-11", 9, [], now).status, "past");
assert.match(validateSelection({ experience: "bowling", guests: 7, pkg: "classic" }, "2026-10-12", 16, [], now) ?? "", /1 to 6/);

// Customer validation.
assert.deepEqual(validateCustomer({ name: "Sam Lee", email: "sam@example.com", phone: "(519) 555-0123", notes: "" }), {});
assert.deepEqual(Object.keys(validateCustomer({ name: "S", email: "nope", phone: "123", notes: "" })).sort(), ["email", "name", "phone"]);

// Storage parsing survives garbage and drops malformed rows.
assert.deepEqual(parseBookings("{oops"), []);
assert.deepEqual(parseBookings(JSON.stringify({ bookings: [{ ref: "x" }, mk(3)] })).map((b) => b.lane), [3]);
const seq = [0, 0, 0.5];
assert.equal(makeRef(new Set(["DEMO-10000"]), () => seq.shift()!), "DEMO-55000");

console.log("booking checks passed");
