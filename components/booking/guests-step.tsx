"use client";

import { Minus, Plus, Users } from "lucide-react";
import { PRICES } from "@/data/pricing";
import { EVENT_TYPES, PARTY_PACKAGES, type Experience, type PartyPackage } from "@/lib/booking/config";

type Tier = { label: string; price: string; active: boolean };

function tiers(exp: Experience, guests: number): Tier[] {
  switch (exp.id) {
    case "bowling":
      return [
        { label: "1 to 3 bowlers", price: `$${PRICES.bowlingPerPerson} per person`, active: guests <= 3 },
        { label: "4 to 6 bowlers", price: `$${PRICES.groupBowling} group rate`, active: guests >= 4 },
      ];
    case "golf":
      return [
        { label: "1 to 4 players", price: `$${PRICES.golfPerPerson} per person`, active: guests <= 4 },
        { label: "5 to 6 players", price: `$${PRICES.groupGolf} group rate`, active: guests >= 5 },
      ];
    case "combo":
      return [{ label: "Up to 6 people", price: `$${PRICES.combo} per group`, active: true }];
    default:
      return [];
  }
}

export function GuestsStep({
  exp,
  guests,
  onGuests,
  pkg,
  onPkg,
  eventType,
  onEventType,
  onSwitchToGroup,
}: {
  exp: Experience;
  guests: number;
  onGuests: (n: number) => void;
  pkg: PartyPackage;
  onPkg: (p: PartyPackage) => void;
  eventType: string;
  onEventType: (t: string) => void;
  onSwitchToGroup: () => void;
}) {
  const atMax = guests >= exp.maxGuests;
  const laneLimited = exp.id === "bowling" || exp.id === "golf" || exp.id === "combo";
  const round = "grid size-14 place-items-center rounded-full bg-midnight text-cream transition-[transform,opacity] active:scale-95 disabled:cursor-not-allowed disabled:opacity-25 sm:size-16";

  return (
    <div className="space-y-10">
      <div className="flex flex-col items-center gap-6 rounded-[24px] bg-cream p-6 sm:flex-row sm:justify-between sm:p-8">
        <div className="flex items-center gap-3 self-start sm:self-center">
          <span className="grid size-11 place-items-center rounded-full bg-cream-2 text-cobalt">
            <Users aria-hidden className="size-5" />
          </span>
          <div>
            <p id="guests-label" className="font-semibold">Number of guests</p>
            <p className="text-sm text-ink-soft">
              {exp.minGuests} to {exp.maxGuests} {exp.id === "bowling" ? "per lane" : "guests"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5" role="group" aria-labelledby="guests-label">
          <button type="button" className={round} onClick={() => onGuests(guests - 1)} disabled={guests <= exp.minGuests} aria-label="Remove a guest">
            <Minus aria-hidden className="size-6" strokeWidth={2.5} />
          </button>
          <output aria-live="polite" className="display w-24 text-center text-7xl tabular-nums sm:text-8xl">
            {guests}
            <span className="sr-only"> {guests === 1 ? "guest" : "guests"}</span>
          </output>
          <button type="button" className={round} onClick={() => onGuests(guests + 1)} disabled={atMax} aria-label="Add a guest">
            <Plus aria-hidden className="size-6" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {laneLimited && atMax && (
        <div className="flex flex-col gap-4 rounded-[24px] bg-cobalt p-6 text-cream sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[46ch]">
            <strong className="block font-semibold">Bringing more than {exp.maxGuests}?</strong>
            {exp.id === "golf" ? "Groups on the course are up to 6 players." : "Each lane holds up to 6 bowlers."} Send a group
            request and the team will plan the right setup with you.
          </p>
          <button type="button" onClick={onSwitchToGroup} className="btn btn-sm bg-cream text-midnight hover:bg-sun">
            Switch to group request
          </button>
        </div>
      )}
      {!laneLimited && atMax && (
        <p className="rounded-2xl bg-cream p-4 text-ink-soft">For more than {exp.maxGuests} guests, please call the team.</p>
      )}

      {tiers(exp, guests).length > 0 && (
        <div>
          <h3 className="label text-ink-soft">Pricing</h3>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {tiers(exp, guests).map((t) => (
              <li
                key={t.label}
                className={`rounded-2xl p-5 transition-colors duration-300 ${t.active ? "bg-midnight text-cream" : "bg-cream text-midnight/75"}`}
              >
                <p className="font-semibold">{t.label}</p>
                <p className="display mt-1 text-2xl">{t.price}</p>
                {t.active && <p className="sr-only">Applies to your group</p>}
              </li>
            ))}
          </ul>
          {exp.id === "golf" && (
            <p className="mt-3 text-sm text-ink-soft">Published: $10 per person for 1 to 3 players. 4 players at $10 each is a demo assumption.</p>
          )}
        </div>
      )}

      {exp.id === "birthday" && (
        <fieldset>
          <legend className="label text-ink-soft">Party package</legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {(Object.keys(PARTY_PACKAGES) as PartyPackage[]).map((id) => {
              const p = PARTY_PACKAGES[id];
              const on = pkg === id;
              return (
                <label
                  key={id}
                  className={`cursor-pointer rounded-2xl p-5 transition-colors duration-300 has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-cobalt ${
                    on ? "bg-midnight text-cream" : "bg-cream hover:bg-cream/70"
                  }`}
                >
                  <input type="radio" name="pkg" className="sr-only" checked={on} onChange={() => onPkg(id)} />
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="display text-2xl">{p.label}</span>
                    <span className="display text-2xl">${p.price}</span>
                  </span>
                  <span className={`mt-2 block text-sm ${on ? "text-cream/80" : "text-ink-soft"}`}>
                    {p.includes}. Per person, 2 hours.
                  </span>
                </label>
              );
            })}
          </div>
          <p className="mt-3 text-sm text-ink-soft">Package names are concept labels. Parties are sent as requests for the team to confirm.</p>
        </fieldset>
      )}

      {exp.id === "group-event" && (
        <fieldset>
          <legend className="label text-ink-soft">What&apos;s the occasion?</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {EVENT_TYPES.map((t) => (
              <label
                key={t}
                className={`cursor-pointer rounded-full px-4 py-2.5 font-medium transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-cobalt ${
                  eventType === t ? "bg-midnight text-cream" : "bg-cream hover:bg-cream/70"
                }`}
              >
                <input type="radio" name="event-type" className="sr-only" checked={eventType === t} onChange={() => onEventType(t)} />
                {t}
              </label>
            ))}
          </div>
        </fieldset>
      )}
    </div>
  );
}
