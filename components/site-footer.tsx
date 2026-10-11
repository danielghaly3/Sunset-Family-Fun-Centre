import Link from "next/link";
import { business, emailHref, hoursSummary, navLinks } from "@/data/business";
import { DIRECTIONS_URL, FACEBOOK_URL } from "@/lib/constants";
import { ExternalLink } from "./book-link";
import { emailParts } from "./visit-info";
import { PinFormation } from "./motifs";

export function SiteFooter() {
  return (
    <footer className="on-dark relative overflow-hidden bg-midnight text-cream">
      <div className="shell pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1.4fr_1fr]">
          <div>
            <p className="display text-[clamp(3rem,7vw,5.5rem)] text-cream">
              Bowl.<br />
              <span className="text-lime">Glow.</span><br />
              <span className="outline-text [--fill:var(--color-midnight)] [--stroke:var(--color-coral)]">Play.</span>
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="label text-cream/60">Explore</h2>
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-lg hover:text-coral">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="label text-cream/60">Visit</h2>
            <address className="mt-5 space-y-3 text-lg not-italic">
              <ExternalLink href={DIRECTIONS_URL} className="block hover:text-coral">
                {business.street}
                <br />
                {business.city}, {business.province} {business.postal}
              </ExternalLink>
              <a href={business.phoneHref} className="block hover:text-coral">
                {business.phone}
              </a>
              <a href={emailHref()} className="block text-base hover:text-coral">
                {emailParts()}
              </a>
            </address>
          </div>

          <div>
            <h2 className="label text-cream/60">Hours</h2>
            <dl className="mt-5 space-y-3">
              {hoursSummary.map((h) => (
                <div key={h.days}>
                  <dt className="text-cream/70">{h.days}</dt>
                  <dd className="text-lg">{h.time}</dd>
                </div>
              ))}
            </dl>
            <ul className="mt-8 space-y-3">
              <li>
                <Link href="/book" className="link-arrow text-coral">
                  Book online (demo)
                </Link>
              </li>
              <li>
                <ExternalLink href={FACEBOOK_URL} className="link-arrow">
                  Sunset on Facebook
                </ExternalLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-cream/15 pt-8 text-sm text-cream/65 md:flex-row md:items-center md:justify-between">
          <p className="flex items-center gap-3">
            <PinFormation className="text-[0.7rem] text-coral" />
            {business.name}, {business.city}, Ontario
          </p>
          <p>
            Independent website redesign concept. Not the official Sunset Family Fun Centre website.{" "}
            <Link href="/demo-admin" className="underline underline-offset-4 hover:text-cream">
              Staff dashboard demo
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
