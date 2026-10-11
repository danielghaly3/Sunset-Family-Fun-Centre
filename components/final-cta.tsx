import { BookLink } from "./book-link";
import { SunsetDisc } from "./motifs";

export function FinalCta({
  title = "Ready for some fun?",
  sub = "Your next great day out is waiting at Sunset.",
}: {
  title?: string;
  sub?: string;
}) {
  return (
    <section aria-labelledby="final-title" className="on-dark relative overflow-hidden bg-midnight pt-24 text-center text-cream sm:pt-32">
      <div className="shell relative z-10">
        <h2 id="final-title" className="display reveal mx-auto max-w-[12ch] text-[clamp(3.4rem,10vw,9rem)] leading-[0.86]">
          {title}
        </h2>
        <p className="mx-auto mt-6 max-w-[36ch] text-lg text-cream/80 sm:text-xl">{sub}</p>
        <div className="mt-10 flex flex-col items-center gap-3">
          <BookLink className="btn btn-primary">Book your fun</BookLink>
          <p className="text-sm text-cream/60">Demo booking with simulated availability. Nothing is reserved or charged.</p>
        </div>
      </div>
      <div aria-hidden className="relative mx-auto mt-16 h-[calc(min(86vw,880px)*0.8)] w-[min(86vw,880px)] overflow-hidden">
        <SunsetDisc className="reveal absolute inset-x-0 top-0 aspect-square w-full" />
      </div>
    </section>
  );
}
