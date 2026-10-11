// Calendar maths on plain "YYYY-MM-DD" keys, so a date never shifts with the viewer's own timezone.
// "Now" is always read in Port Elgin time.

export const TIME_ZONE = "America/Toronto";

export type DateKey = string;
export type Now = { date: DateKey; hour: number; minute: number };

export function torontoNow(at: Date = new Date()): Now {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(at);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "0";
  return { date: `${get("year")}-${get("month")}-${get("day")}`, hour: Number(get("hour")), minute: Number(get("minute")) };
}

export const toKey = (y: number, m: number, d: number): DateKey =>
  `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

export function parseKey(key: DateKey) {
  const [y, m, d] = key.split("-").map(Number);
  return { y, m, d };
}

export const isDateKey = (v: unknown): v is DateKey =>
  typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) && toUtc(v).toISOString().startsWith(v);

const toUtc = (key: DateKey) => {
  const { y, m, d } = parseKey(key);
  return new Date(Date.UTC(y, m - 1, d));
};

/** 0 = Sunday */
export const weekday = (key: DateKey) => toUtc(key).getUTCDay();

export function addDays(key: DateKey, days: number): DateKey {
  const dt = toUtc(key);
  dt.setUTCDate(dt.getUTCDate() + days);
  return toKey(dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate());
}

export const daysInMonth = (y: number, m: number) => new Date(Date.UTC(y, m, 0)).getUTCDate();

export const formatDate = (key: DateKey, opts: Intl.DateTimeFormatOptions = {}) =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "UTC",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    ...opts,
  }).format(toUtc(key));

export const formatTime = (hour: number) => `${hour % 12 || 12}:00 ${hour < 12 ? "AM" : "PM"}`;
