import { formatHour, weekHours } from "@/data/business";

const START = 10;
const END = 22;
const span = END - START;

const compact = (open: number, close: number) =>
  (open < 12) === (close < 12)
    ? `${open % 12 || 12}-${formatHour(close)}`
    : `${formatHour(open)}-${formatHour(close)}`;

/** Published weekly hours drawn as lanes on a 10 AM to 10 PM timeline. */
export function HoursChart({ dark = false }: { dark?: boolean }) {
  const muted = dark ? "text-cream/60" : "text-ink-soft";
  return (
    <figure>
      <figcaption className="sr-only">Weekly opening hours</figcaption>
      <div className={`mb-3 ml-14 flex justify-between text-xs font-medium ${muted}`} aria-hidden>
        {[10, 13, 16, 19, 22].map((h) => (
          <span key={h}>{formatHour(h)}</span>
        ))}
      </div>
      <ul className="space-y-2">
        {weekHours.map((d) => {
          const weekend = d.open < 16;
          return (
            <li key={d.day} className="flex items-center gap-3">
              <span className={`w-11 shrink-0 font-[family-name:var(--font-label)] text-sm font-semibold uppercase ${muted}`} aria-hidden>
                {d.short}
              </span>
              <div className="relative h-9 flex-1">
                <div
                  className={`absolute inset-y-0 flex items-center rounded-full px-3 text-xs font-bold whitespace-nowrap ${
                    weekend ? "bg-coral text-midnight" : "bg-cobalt text-cream"
                  }`}
                  style={{ left: `${((d.open - START) / span) * 100}%`, width: `${((d.close - d.open) / span) * 100}%` }}
                >
                  <span className="sr-only">
                    {d.day}: {formatHour(d.open)} to {formatHour(d.close)}
                  </span>
                  <span aria-hidden>{compact(d.open, d.close)}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </figure>
  );
}
