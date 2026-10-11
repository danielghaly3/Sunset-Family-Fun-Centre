import { Info } from "lucide-react";

/** Unmistakable demo label for every booking screen. */
export function DemoBanner({ children }: { children?: React.ReactNode }) {
  return (
    <div role="note" className="flex items-start gap-3 rounded-2xl border-2 border-dashed border-midnight/25 bg-cream-2 px-4 py-3.5 text-[0.95rem]">
      <span className="label shrink-0 rounded-full bg-midnight px-2.5 py-1 text-[0.65rem] text-lime">Demo</span>
      <p className="flex-1 leading-snug">
        {children ?? (
          <>
            <strong className="font-semibold">Simulated booking.</strong> Availability is sample data and is not
            connected to Sunset&apos;s real schedule. Nothing is reserved, charged or sent.
          </>
        )}
      </p>
      <Info aria-hidden className="mt-0.5 hidden size-5 shrink-0 text-ink-soft sm:block" />
    </div>
  );
}
