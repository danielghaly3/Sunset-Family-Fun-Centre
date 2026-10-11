import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { photos } from "@/data/attractions";
import { BookLink } from "../book-link";
import { LaneArrows, PinFormation, SunsetDisc } from "../motifs";
import { Photo } from "../photo";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_88%_35%,#ffdcbc_0%,transparent_70%)]"
      />
      <div className="shell relative grid grid-cols-1 gap-x-10 pt-6 pb-24 [grid-template-areas:'head'_'art'_'copy'] sm:pt-10 lg:min-h-[calc(100dvh-5rem)] lg:grid-cols-[7fr_5fr] lg:content-center lg:pt-4 lg:pb-28 lg:[grid-template-areas:'head_art'_'copy_art']">
        <div className="relative z-10 [grid-area:head] lg:self-end">
          <p className="label a-fade-up flex items-center gap-3 text-ink-soft" style={d(100)}>
            <PinFormation className="text-[0.6rem] text-coral" />
            Port Elgin, Ontario
            <span className="flex gap-3 max-[379px]:hidden">
              <span aria-hidden>/</span> All ages
            </span>
          </p>
          <h1
            id="hero-title"
            className="display mt-5 text-[clamp(3.6rem,20vw,8.6rem)] leading-[0.86] lg:text-[clamp(5rem,10.2vw,10.5rem)]"
          >
            <span className="block overflow-hidden pb-[0.04em]">
              <span className="a-rise block" style={d(150)}>Big fun.</span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="a-rise block text-cobalt" style={d(260)}>Right here.</span>
            </span>
          </h1>
        </div>

        <div className="relative mt-8 [grid-area:art] lg:row-span-2 lg:mt-0" aria-hidden={false}>
          <div className="relative mx-auto aspect-[10/9] w-full max-w-[600px] lg:aspect-[6/7]">
            <SunsetDisc className="a-sunrise absolute top-[2%] -right-[6%] aspect-square w-[74%]" />
            <div
              className="a-iris absolute top-[16%] left-0 aspect-square w-[54%] overflow-hidden rounded-full border-[6px] border-cream shadow-[0_30px_60px_-30px_rgb(18_22_41/0.55)] lg:top-[12%]"
              style={d(350)}
            >
              <Photo
                src={photos.glowCourse.src}
                alt={photos.glowCourse.alt}
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(min-width:1024px) 300px, 54vw"
                className="object-cover object-[50%_60%]"
              />
            </div>
            <div
              className="a-unveil absolute right-[5%] bottom-[3%] aspect-[3/5] w-[31%] rotate-[5deg] overflow-hidden rounded-full border-[6px] border-cream shadow-[0_30px_60px_-30px_rgb(18_22_41/0.55)]"
              style={d(520)}
            >
              <Photo
                src={photos.pins.src}
                alt={photos.pins.alt}
                fill
                sizes="(min-width:1024px) 180px, 31vw"
                className="object-cover"
              />
            </div>
            <div
              className="a-iris absolute bottom-[4%] left-[30%] aspect-square w-[27%] overflow-hidden rounded-full border-[6px] border-cream ring-4 ring-coral shadow-[0_24px_40px_-24px_rgb(18_22_41/0.6)]"
              style={d(680)}
            >
              <Photo
                src={photos.arcade.src}
                alt={photos.arcade.alt}
                fill
                sizes="(min-width:1024px) 160px, 27vw"
                className="object-cover object-[30%_50%]"
              />
            </div>
            <LaneArrows
              count={5}
              className="a-fade-up absolute top-[4%] left-[6%] text-[0.9rem] text-cobalt lg:text-[1.1rem]"
            />
          </div>
        </div>

        <div className="relative z-10 mt-8 [grid-area:copy] lg:mt-8 lg:self-start">
          <p className="a-fade-up max-w-[34ch] text-lg leading-relaxed text-ink-soft sm:text-xl" style={d(420)}>
            Bowling, glow-in-the-dark mini-golf, arcade games and unforgettable celebrations, all together in Port
            Elgin.
          </p>
          <div className="a-fade-up mt-8 flex flex-col gap-3 sm:flex-row" style={d(520)}>
            <BookLink className="btn btn-primary">Book your fun</BookLink>
            <Link href="/experiences" className="btn btn-ghost">
              Explore attractions <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
