import Link from "next/link";
import { PinFormation } from "@/components/motifs";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ConceptNotice } from "@/components/concept-notice";

export default function NotFound() {
  return (
    <>
      <ConceptNotice />
      <SiteHeader />
      <main id="main" className="flex-1">
        <section className="shell flex min-h-[70dvh] flex-col items-start justify-center py-24">
          <PinFormation className="text-2xl text-coral" />
          <h1 className="display mt-8 text-[clamp(3.4rem,12vw,9rem)] leading-[0.86]">Gutter ball.</h1>
          <p className="mt-6 max-w-[40ch] text-lg text-ink-soft">
            That page doesn&apos;t exist. Let&apos;s get you back on the lane.
          </p>
          <Link href="/" className="btn btn-dark mt-10">
            Back to home
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
