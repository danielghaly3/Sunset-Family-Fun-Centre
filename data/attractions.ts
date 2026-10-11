// Every price and inclusion here is copied from sunsetfamilyfun.com (2026-10-11).
// Durations are only shown where all public pages agree. See DESIGN.md for the conflicts.
import type { StaticImageData } from "next/image";
import arcade from "@/public/images/arcade-skeeball.jpg";
import pins from "@/public/images/bowling-pins-ball.jpg";
import glowCourse from "@/public/images/glow-golf-course.jpg";
import glowEntrance from "@/public/images/glow-golf-entrance.jpg";
import lanes from "@/public/images/lanes-brunswick.jpg";
import lanesBlacklight from "@/public/images/lanes-blacklight.jpg";
import lanesInterior from "@/public/images/lanes-interior.jpg";
import shoe from "@/public/images/glow-bowling-shoe.jpg";
import poutine from "@/public/images/food-poutine.jpg";
import { PRICES } from "./pricing.ts";

export const photos = {
  arcade: { src: arcade, alt: "A row of lit-up skee-ball machines in the Sunset arcade" },
  pins: { src: pins, alt: "Five-pin bowling pins and a red bowling ball on a wooden lane" },
  glowCourse: {
    src: glowCourse,
    alt: "The indoor glow-in-the-dark mini-golf course glowing green and orange under blacklight",
  },
  glowEntrance: {
    src: glowEntrance,
    alt: "Entrance to the Glow in the Dark Mini Golf Adventure, framed by a sculpted elephant and dolphin",
  },
  lanes: { src: lanes, alt: "Looking down the polished five-pin bowling lanes toward the pins" },
  lanesBlacklight: {
    src: lanesBlacklight,
    alt: "The bowling lanes lit in deep blue blacklight with screens overhead",
  },
  lanesInterior: {
    src: lanesInterior,
    alt: "Inside Sunset: tables and seating looking out over the row of bowling lanes",
  },
  shoe: { src: shoe, alt: "A bowling shoe with glowing green flames on a blacklit lane" },
  poutine: { src: poutine, alt: "Poutine with fries, cheese curds and gravy in a red checked boat" },
} satisfies Record<string, { src: StaticImageData; alt: string }>;

export type Photo = (typeof photos)[keyof typeof photos];

export type Attraction = {
  slug: "bowling" | "glow-golf" | "arcade";
  name: string;
  kicker: string;
  blurb: string;
  from: string;
  photo: Photo;
};

export const attractions: Attraction[] = [
  {
    slug: "bowling",
    name: "5-Pin Bowling",
    kicker: "12 lanes",
    blurb:
      "Twelve lanes of classic Canadian 5-pin with automatic scoring and bowling ramps, so the littlest bowlers can roll too.",
    from: "From $20 per person",
    photo: photos.pins,
  },
  {
    slug: "glow-golf",
    name: "Glow Mini-Golf",
    kicker: "9 holes",
    blurb:
      "Nine indoor holes under blacklight, with neon fairways and jungle creatures glowing from every corner.",
    from: "From $10 per person",
    photo: photos.glowCourse,
  },
  {
    slug: "arcade",
    name: "Redemption Arcade",
    kicker: "Win prizes",
    blurb:
      "Load up an arcade card, chase the high score and trade your points for prizes at the counter.",
    from: "Card deals vary",
    photo: photos.arcade,
  },
];

export type Offer = {
  id: string;
  name: string;
  price: number;
  unit: "per group" | "per person";
  people: string;
  duration?: string;
  includes?: string;
  detailHref: string;
  /** Opens the demo booking flow with this option preselected. */
  bookHref: string;
  featured?: boolean;
};

export const offers: Offer[] = [
  {
    id: "combo",
    name: "Ultimate Group Combo",
    price: PRICES.combo,
    unit: "per group",
    people: "Up to 6 people",
    includes: "Bowling, glow mini-golf and 160 arcade credits",
    detailHref: "/experiences#combo",
    bookHref: "/book?experience=combo",
    featured: true,
  },
  {
    id: "group-bowling",
    name: "Group Bowling",
    price: PRICES.groupBowling,
    unit: "per group",
    people: "4 to 6 people",
    duration: "1 hour",
    detailHref: "/experiences#bowling",
    bookHref: "/book?experience=bowling&guests=4",
  },
  {
    id: "group-golf",
    name: "Glow Mini-Golf",
    price: PRICES.groupGolf,
    unit: "per group",
    people: "5 to 6 people",
    duration: "1 hour",
    detailHref: "/experiences#glow-golf",
    bookHref: "/book?experience=golf&guests=5",
  },
  {
    id: "aycp-bowling",
    name: "All-You-Can-Play Bowling",
    price: PRICES.bowlingPerPerson,
    unit: "per person",
    people: "1 to 3 people",
    duration: "1 hour",
    detailHref: "/experiences#bowling",
    bookHref: "/book?experience=bowling&guests=2",
  },
  {
    id: "solo-golf",
    name: "Individual Mini-Golf",
    price: PRICES.golfPerPerson,
    unit: "per person",
    people: "1 to 3 people",
    detailHref: "/experiences#glow-golf",
    bookHref: "/book?experience=golf&guests=2",
  },
];

export const offerById = (id: string) => offers.find((o) => o.id === id)!;

// Package labels are concept-only. The live site's names differ between pages.
export const partyPackages = [
  {
    id: "classic",
    label: "Classic Party",
    price: PRICES.partyClassic,
    arcade: false,
    includes: [
      "2 hours of all-you-can-play bowling",
      "2 hours of glow mini-golf",
      "2 chicken fingers and fries, or a hotdog and fries",
      "A drink for every guest",
    ],
  },
  {
    id: "arcade",
    label: "Party + Arcade",
    price: PRICES.partyArcade,
    arcade: true,
    includes: [
      "Everything in the Classic Party",
      "An arcade card for every guest",
    ],
  },
] as const;

export const leagues = [
  { name: "Youth Bowling League (YBC)", who: "Bowlers under 19, with coaches on hand" },
  { name: "Wednesday Afternoon Seniors", who: "Bowlers aged 55 and up" },
  { name: "Friday Night Doubles", who: "Adults, all skill levels" },
  { name: "Tuesday Night Teams", who: "Teams of four, a mix of ages" },
];

export const menuHighlights = [
  "Poutine",
  "Loaded nachos",
  "Chicken fingers",
  "Burgers",
  "Onion rings",
  "Mozza sticks",
  "Fries",
  "Wraps",
];
