// Demo booking rules. Prices come from the published price list; capacities and slot
// lengths marked "demo" are assumptions for the simulation and need confirming with Sunset.
import { PRICES } from "../../data/pricing.ts";
import { weekHours } from "../../data/business.ts";
import { weekday, type DateKey } from "./time.ts";

export type ExperienceId = "bowling" | "golf" | "combo" | "birthday" | "group-event";
export type PartyPackage = "classic" | "arcade";

export type Experience = {
  id: ExperienceId;
  name: string;
  tagline: string;
  facts: string[];
  priceHint: string;
  /** instant = confirmed on the spot; request = the team follows up */
  mode: "instant" | "request";
  /** what a booking occupies in the simulation */
  resource: "lane" | "golf" | null;
  minGuests: number;
  maxGuests: number;
  defaultGuests: number;
  /** hours a booking blocks, also used to build start times */
  slotHours: number;
  durationLabel: string;
};

export const LANES = 12;
export const LANE_MAX_GUESTS = 6;
/** demo assumption: groups that can be on the glow course in the same hour */
export const GOLF_CAPACITY = 4;
/** how far ahead the demo calendar opens */
export const BOOKING_WINDOW_DAYS = 90;

export const EXPERIENCES: Record<ExperienceId, Experience> = {
  bowling: {
    id: "bowling",
    name: "5-Pin Bowling",
    tagline: "Your own lane, automatic scoring and bowling ramps for little bowlers.",
    facts: ["12 lanes", "Up to 6 per lane", "1 hour"],
    priceHint: `$${PRICES.bowlingPerPerson}/person or $${PRICES.groupBowling} per group`,
    mode: "instant",
    resource: "lane",
    minGuests: 1,
    maxGuests: LANE_MAX_GUESTS,
    defaultGuests: 4,
    slotHours: 1,
    durationLabel: "1 hour",
  },
  golf: {
    id: "golf",
    name: "Glow Mini-Golf",
    tagline: "Nine indoor holes under blacklight, with neon fairways at every turn.",
    facts: ["9 holes", "Indoor", "Up to 6 per group"],
    priceHint: `$${PRICES.golfPerPerson}/person or $${PRICES.groupGolf} for 5 to 6`,
    mode: "instant",
    resource: "golf",
    minGuests: 1,
    maxGuests: 6,
    defaultGuests: 2,
    slotHours: 1,
    durationLabel: "1-hour tee time (demo)",
  },
  combo: {
    id: "combo",
    name: "Family Fun Combo",
    tagline: "Bowling, glow mini-golf and 160 arcade credits for one group price.",
    facts: ["Bowling + golf + arcade", "Up to 6 people"],
    priceHint: `$${PRICES.combo} per group`,
    mode: "instant",
    resource: "lane",
    minGuests: 1,
    maxGuests: 6,
    defaultGuests: 4,
    slotHours: 1,
    durationLabel: "1 hour of bowling, then golf and arcade",
  },
  birthday: {
    id: "birthday",
    name: "Birthday Party",
    tagline: "Two hours of bowling, glow golf and party food. The team confirms the details.",
    facts: ["2 hours", "Food for every guest", "Cake welcome"],
    priceHint: `From $${PRICES.partyClassic}/person`,
    mode: "request",
    resource: null,
    minGuests: 1,
    maxGuests: 40,
    defaultGuests: 10,
    slotHours: 2,
    durationLabel: "2 hours",
  },
  "group-event": {
    id: "group-event",
    name: "Group Event",
    tagline: "School outings, corporate events, reunions. Request a date and the team will plan it with you.",
    facts: ["Any occasion", "Custom packages"],
    priceHint: "Quote from the team",
    mode: "request",
    resource: null,
    minGuests: 2,
    maxGuests: 200,
    defaultGuests: 12,
    slotHours: 2,
    durationLabel: "To be confirmed with the team",
  },
};

export const EXPERIENCE_ORDER: ExperienceId[] = ["bowling", "golf", "combo", "birthday", "group-event"];

export const isExperienceId = (v: unknown): v is ExperienceId =>
  typeof v === "string" && v in EXPERIENCES;

export const PARTY_PACKAGES: Record<PartyPackage, { label: string; price: number; includes: string }> = {
  classic: {
    label: "Classic Party",
    price: PRICES.partyClassic,
    includes: "Bowling, glow golf, a meal and a drink for every guest",
  },
  arcade: {
    label: "Party + Arcade",
    price: PRICES.partyArcade,
    includes: "Everything in the Classic Party, plus an arcade card for every guest",
  },
};

export const EVENT_TYPES = [
  "Family celebration",
  "School outing",
  "Corporate event",
  "Friends and teams",
  "Something else",
];

export function openingHours(date: DateKey) {
  // weekHours runs Monday to Sunday; weekday() runs Sunday to Saturday.
  const h = weekHours[(weekday(date) + 6) % 7];
  return { open: h.open, close: h.close };
}

/** Start times on the hour that finish by closing time. */
export function startTimes(date: DateKey, exp: Experience): number[] {
  const { open, close } = openingHours(date);
  const out: number[] = [];
  for (let h = open; h + exp.slotHours <= close; h++) out.push(h);
  return out;
}

export type Selection = {
  experience: ExperienceId;
  guests: number;
  pkg: PartyPackage;
};

export type Line = { label: string; amount: number };
export type Quote = { lines: Line[]; total: number | null; estimate: boolean };

export function quote({ experience, guests, pkg }: Selection): Quote {
  switch (experience) {
    case "bowling":
      return guests >= 4
        ? { lines: [{ label: "Group bowling, 4 to 6 people", amount: PRICES.groupBowling }], total: PRICES.groupBowling, estimate: false }
        : perPerson(`All-you-can-play bowling`, PRICES.bowlingPerPerson, guests);
    case "golf":
      // Published: $10/person (1 to 3) and $48 for 5 to 6. Demo assumption: 4 players pay per person.
      return guests >= 5
        ? { lines: [{ label: "Group glow mini-golf, 5 to 6 people", amount: PRICES.groupGolf }], total: PRICES.groupGolf, estimate: false }
        : perPerson("Glow mini-golf", PRICES.golfPerPerson, guests);
    case "combo":
      return { lines: [{ label: "Family Fun Combo, up to 6 people", amount: PRICES.combo }], total: PRICES.combo, estimate: false };
    case "birthday": {
      const p = PARTY_PACKAGES[pkg];
      return { ...perPerson(p.label, p.price, guests), estimate: true };
    }
    case "group-event":
      return { lines: [], total: null, estimate: true };
  }
}

function perPerson(label: string, price: number, guests: number): Quote {
  return {
    lines: [{ label: `${label}, ${guests} × $${price}`, amount: price * guests }],
    total: price * guests,
    estimate: false,
  };
}

export const formatCad = (n: number) => `$${n.toLocaleString("en-CA")} CAD`;
