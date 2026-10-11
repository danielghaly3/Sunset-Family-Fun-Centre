import Link from "next/link";
import { Clock, Users } from "lucide-react";
import type { Offer } from "@/data/attractions";
import { BookLink } from "./book-link";

/** Price card cut like a redemption ticket. */
export function Ticket({ offer, tone = "cream" }: { offer: Offer; tone?: "cream" | "sunset" | "night" }) {
  const surface =
    tone === "sunset"
      ? "bg-[linear-gradient(135deg,var(--color-sun),var(--color-coral))] text-midnight"
      : tone === "night"
        ? "on-dark bg-midnight-2 text-cream"
        : "bg-cream text-midnight";
  const sub = tone === "night" ? "text-cream/70" : "text-midnight/70";
  return (
    <article className={`ticket flex h-full flex-col rounded-[20px] p-6 sm:p-7 ${surface}`}>
      <div className="flex items-start justify-between gap-4">
        <h3 className="display text-[1.65rem] leading-[0.95] sm:text-3xl">{offer.name}</h3>
        <span className={`label shrink-0 rounded-full px-2.5 py-1 text-[0.65rem] ${tone === "night" ? "bg-cream/10" : "bg-midnight/8"}`}>
          {offer.unit === "per group" ? "Group" : "Per person"}
        </span>
      </div>
      {offer.includes && <p className={`mt-3 max-w-[40ch] ${sub}`}>{offer.includes}</p>}

      <p className="mt-auto pt-8">
        <span className="display text-6xl tabular-nums sm:text-7xl">${offer.price}</span>
        <span className={`ml-2 font-[family-name:var(--font-label)] text-sm font-semibold uppercase ${sub}`}>
          CAD {offer.unit}
        </span>
      </p>

      <div className={`mt-5 border-t border-dashed pt-5 ${tone === "night" ? "border-cream/25" : "border-midnight/25"}`}>
        <ul className={`flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium ${sub}`}>
          <li className="flex items-center gap-1.5">
            <Users aria-hidden className="size-4" /> {offer.people}
          </li>
          {offer.duration && (
            <li className="flex items-center gap-1.5">
              <Clock aria-hidden className="size-4" /> {offer.duration}
            </li>
          )}
        </ul>
        <div className="mt-5 flex flex-wrap gap-2">
          <BookLink href={offer.bookHref} className={`btn btn-sm ${tone === "sunset" ? "btn-dark" : "btn-primary"}`}>
            Book now
          </BookLink>
          <Link href={offer.detailHref} className="btn btn-sm btn-ghost">
            View details<span className="sr-only">: {offer.name}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
