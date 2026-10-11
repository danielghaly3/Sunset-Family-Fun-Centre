import { Hero } from "@/components/home/hero";
import { PlayStrip } from "@/components/home/play-strip";
import { PickYourPlay } from "@/components/home/pick-your-play";
import { Cinematic } from "@/components/home/cinematic";
import { Birthdays } from "@/components/home/birthdays";
import { WaysToPlay } from "@/components/home/ways-to-play";
import { GroupsTeaser } from "@/components/home/groups-teaser";
import { Food } from "@/components/home/food";
import { VisitBlock } from "@/components/home/visit-block";
import { FinalCta } from "@/components/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <PlayStrip />
      <PickYourPlay />
      <Cinematic />
      <Birthdays />
      <WaysToPlay />
      <GroupsTeaser />
      <Food />
      <VisitBlock />
      <FinalCta />
    </>
  );
}
