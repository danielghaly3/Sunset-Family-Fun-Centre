// Verified from sunsetfamilyfun.com/general-info (2026-10-11). Published hours, not live status.

export const business = {
  name: "Sunset Family Fun Centre",
  street: "990 Goderich St",
  city: "Port Elgin",
  province: "ON",
  postal: "N0H 2C3",
  phone: "(519) 832-9331",
  phoneHref: "tel:+15198329331",
  email: "sunsetfamilyfuncentre@gmail.com",
} as const;

export const emailHref = (subject?: string) =>
  `mailto:${business.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;

export type DayHours = { day: string; short: string; open: number; close: number };

/** 24h clock, used for both the text list and the hours chart. */
export const weekHours: DayHours[] = [
  { day: "Monday", short: "Mon", open: 16, close: 20 },
  { day: "Tuesday", short: "Tue", open: 16, close: 20 },
  { day: "Wednesday", short: "Wed", open: 16, close: 20 },
  { day: "Thursday", short: "Thu", open: 16, close: 20 },
  { day: "Friday", short: "Fri", open: 16, close: 20 },
  { day: "Saturday", short: "Sat", open: 11, close: 21 },
  { day: "Sunday", short: "Sun", open: 11, close: 17 },
];

export const hoursSummary = [
  { days: "Monday to Friday", time: "4 PM to 8 PM" },
  { days: "Saturday", time: "11 AM to 9 PM" },
  { days: "Sunday", time: "11 AM to 5 PM" },
];

export const formatHour = (h: number) => `${h % 12 || 12} ${h < 12 ? "AM" : "PM"}`;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/experiences", label: "Attractions" },
  { href: "/parties", label: "Birthday Parties" },
  { href: "/groups", label: "Group Bookings" },
  { href: "/visit", label: "Plan Your Visit" },
] as const;
