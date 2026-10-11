// Simple geometric marks drawn from the venue itself. Decorative only.

export function SunsetDisc({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`sunset-disc ${className}`} />;
}

/** Five pins in the Canadian 5-pin V formation, seen from above. */
export function PinFormation({ className = "", dot = "bg-current" }: { className?: string; dot?: string }) {
  const rows = [[0, 0, 0, 0, 1, 0, 0, 0, 0].map(Boolean), [0, 0, 1, 0, 0, 0, 1, 0, 0].map(Boolean), [1, 0, 0, 0, 0, 0, 0, 0, 1].map(Boolean)];
  return (
    <span aria-hidden className={`inline-grid gap-[0.35em] ${className}`}>
      {[...rows].reverse().map((row, r) => (
        <span key={r} className="grid grid-cols-9 gap-[0.18em]">
          {row.map((on, c) => (
            <span key={c} className={`block size-[0.5em] rounded-full ${on ? dot : ""}`} />
          ))}
        </span>
      ))}
    </span>
  );
}

/** The aiming arrows painted on a bowling lane. */
export function LaneArrows({ count = 7, className = "" }: { count?: number; className?: string }) {
  return (
    <div aria-hidden className={`flex items-end gap-[0.6em] ${className}`}>
      {Array.from({ length: count }, (_, i) => {
        const lift = Math.abs(i - (count - 1) / 2);
        return (
          <span
            key={i}
            className="block h-[1.1em] w-[0.7em] bg-current [clip-path:polygon(50%_0,100%_100%,0_100%)]"
            style={{ marginBottom: `${lift * 0.35}em` }}
          />
        );
      })}
    </div>
  );
}
