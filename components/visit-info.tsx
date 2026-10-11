import { Mail, MapPin, Navigation, Phone } from "lucide-react";
import { business, emailHref } from "@/data/business";
import { DIRECTIONS_URL, MAP_EMBED_URL } from "@/lib/constants";
import { ExternalLink } from "./book-link";

/** Lets a long address wrap at the @ instead of mid-word. */
export const emailParts = () => {
  const [user, domain] = business.email.split("@");
  return (
    <>
      {user}@<wbr />
      {domain}
    </>
  );
};

export function ContactList() {
  const row = "flex items-start gap-4 rounded-2xl p-1 text-lg transition-colors hover:text-cobalt";
  const icon = "mt-0.5 grid size-10 shrink-0 place-items-center rounded-full bg-cream-2 text-cobalt";
  return (
    <address className="space-y-4 not-italic">
      <ExternalLink href={DIRECTIONS_URL} className={row}>
        <span className={icon}><MapPin aria-hidden className="size-5" /></span>
        <span>
          {business.street}
          <br />
          {business.city}, {business.province} {business.postal}
        </span>
      </ExternalLink>
      <a href={business.phoneHref} className={row}>
        <span className={icon}><Phone aria-hidden className="size-5" /></span>
        <span className="self-center">{business.phone}</span>
      </a>
      <a href={emailHref()} className={`${row} min-w-0`}>
        <span className={icon}><Mail aria-hidden className="size-5" /></span>
        <span className="min-w-0 self-center text-base sm:text-lg">{emailParts()}</span>
      </a>
    </address>
  );
}

export function VisitActions() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <ExternalLink href={DIRECTIONS_URL} className="btn btn-dark">
        <Navigation aria-hidden className="size-4" /> Get directions
      </ExternalLink>
      <a href={business.phoneHref} className="btn btn-ghost">
        <Phone aria-hidden className="size-4" /> Call us
      </a>
    </div>
  );
}

export function MapFrame({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_50%_40%,var(--color-cream-2),#f1dcc0)] ${className}`}>
      {/* Shown behind the map while it loads or if the embed is blocked */}
      <p className="absolute inset-0 grid place-items-center p-6 text-center text-ink-soft">
        {business.street}, {business.city}
      </p>
      <iframe
        title={`Map showing ${business.name} at ${business.street}, ${business.city}`}
        src={MAP_EMBED_URL}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="relative size-full border-0 [filter:saturate(0.85)_contrast(1.05)]"
      />
    </div>
  );
}
