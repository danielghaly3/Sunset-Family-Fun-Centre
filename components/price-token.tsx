/** Arcade-token style price badge with circular text around the rim. */
export function PriceToken({
  price,
  ring,
  className = "",
}: {
  price: number;
  ring: string;
  className?: string;
}) {
  return (
    <div className={`aspect-square ${className}`}>
      <div className="relative grid size-full place-items-center rounded-full bg-midnight text-cream shadow-[0_30px_60px_-30px_rgb(18_22_41/0.8)] ring-[6px] ring-cream">
        <svg viewBox="0 0 200 200" aria-hidden className="a-spin absolute inset-0 size-full text-sun">
          <defs>
            <path id="token-ring" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
          </defs>
          <text className="fill-current font-[family-name:var(--font-label)] text-[13.5px] font-bold tracking-[0.2em] uppercase">
            <textPath href="#token-ring" textLength="486" lengthAdjust="spacing">
            {ring}
          </textPath>
          </text>
        </svg>
        <p className="text-center leading-none">
          <span className="label block text-[0.6rem] text-cream/70">From</span>
          <span className="display block text-[clamp(2.4rem,7vw,3.8rem)] tabular-nums">${price}</span>
          <span className="label mt-1 block text-[0.6rem] text-cream/70">CAD per person</span>
        </p>
      </div>
    </div>
  );
}
