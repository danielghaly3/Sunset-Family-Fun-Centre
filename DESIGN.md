# Sunset Family Fun Centre: Redesign Concept DESIGN.md

Independent, speculative redesign concept by Daniel (freelance). Not the official site, not endorsed by Sunset.

## Design read
Overhaul redesign of a local family entertainment venue for parents, teens and groups (mobile-first), with a playful-premium, editorial, retro-sunset language. Built with Next.js 16 + Tailwind v4 + Motion + Lucide.

Dials: `DESIGN_VARIANCE 8 / MOTION_INTENSITY 6 / VISUAL_DENSITY 4`.

## Concept
**"Big fun. Right here."** is the headline system. **"Bowl. Glow. Play."** is the three-attraction trio used for wayfinding and the single marquee.
The recurring graphic devices all come from the venue itself:
- **Striped sunset disc.** A circle with horizontal cut stripes, borrowed from the retro sunset in their own "Sunset Shootout" tournament logo.
- **5-pin formation.** Five dots in a V, the Canadian 5-pin setup (their lanes are 5-pin, not 10-pin).
- **Lane arrows.** The small triangular aiming arrows on a bowling lane, used as dividers and accents.
- **Arcade ticket.** Pricing cards with notched edges like redemption tickets.

## Color tokens
| Token | Hex | Role |
|---|---|---|
| midnight | #121629 | Dark foundation, body text on cream |
| cobalt | #3453B8 | Brand blue (continuity with the existing blue logo), bowling |
| coral | #FF7258 | THE accent: every primary CTA, price signal |
| sun | #FFB45C | Sunset gradient partner to coral only |
| cream | #FFF7EB | Light foundation |
| lime | #D7F36B | Glow accent, on midnight only |
| violet | #875AF4 | Arcade/glow detail, decorative only (never body text) |

Rules: coral CTAs carry midnight text (6.4:1), never white. Max two accents per section. Lime appears only on midnight. Sunset gradient = sun → coral (→ cobalt only in the striped disc).

Theme: a deliberate colour-blocked light page (cream) with midnight "night" blocks for the glow/after-dark moments. This is a composed rhythm, not random inversion. There is no separate dark-mode toggle.

## Typography
- Display: **Bricolage Grotesque** 700-800, uppercase, tight tracking (-0.03em), leading 0.88-0.95. Outline variant via `-webkit-text-stroke` used once per view max.
- Body: **DM Sans** 400/500/700, 16-18px, max 60ch.
- Micro/labels/numbers: **Space Grotesk** 500-700, tracked uppercase for buttons; tabular numerals for prices.
- Eyebrows rationed: max 1 per 3 sections.

## Shape
- Interactive controls: full pill.
- Photos and panels: 28px radius (`rounded-[28px]`), circles for motif crops.
- Tickets: 20px radius with notch cut-outs.

## Grid & spacing
`max-w-[1400px]` container, 16px gutter mobile / 32px desktop. Section padding 80-128px desktop, 64-80px mobile. Every multi-column layout collapses to one column below 768px.

## Motion
Motion (`motion/react`). Entrance reveals (opacity + y), one marquee, subtle scroll-linked zoom on the cinematic photo, magnetic-ish CTA press (scale 0.97). Springs, no linear easing. Everything collapses to static under `prefers-reduced-motion`. No scroll hijack, no constant motion on mobile beyond the marquee (paused for reduced motion).

## Components
Header (sticky, condenses on scroll, full-screen mobile menu), BookLink (internal link to the demo `/book` flow, with optional preselection), Photo (next/image with designed fallback), Ticket (price card), Reveal, Marquee, SunsetDisc, PinFormation, LaneArrows.

## Do / Don't
- Do send every booking button to the internal demo booking flow (`/book`). Label every booking screen as a simulated demo.
- Do label prices CAD and note "from the current public website, subject to confirmation".
- Don't invent durations where the source conflicts, testimonials, ratings, policies, wings, or an "Open now" indicator.
- Don't use em/en dashes in visible copy.
- Don't overlay pills/labels on photos.

## Verified facts (source: sunsetfamilyfun.com, fetched 2026-10-11)
- 990 Goderich St, Port Elgin, ON N0H 2C3 / (519) 832-9331 / sunsetfamilyfuncentre@gmail.com
- Hours: Mon-Fri 4-8 PM, Sat 11 AM-9 PM, Sun 11 AM-5 PM
- 12 lanes of 5-pin, up to 6 per lane, automatic scoring, accessible bowling ramps
- Family/Group Bowling (4-6) $80 group, 1 hr. All You Can Play Bowling (1-3) $20/person, 1 hr; extra half hour +$5/person, extra hour +$10/person
- Glow mini-golf: indoor 9-hole, up to 6 at once; group (5-6) $48; individual $10/person (duration conflicts: 30 min vs 1 hr)
- Combo: bowling + glow mini-golf + 160 arcade credits, $150 group (duration conflicts: "2+ hours (1 hour bowl)" vs "1 hour")
- Arcade: redemption, new arcade cards with credit-value deals, points for prizes, pricing varies
- Birthday $26/person (2 hrs): all-you-can-play bowling + mini-golf, 2 chicken fingers & fries OR hotdog & fries + drink. $31/person adds an arcade card (detail page: $10 credit value; homepage: 40 arcade credits). $34 package listed, inclusions unconfirmed. Extra pizzas $25 each. Cake/cupcakes permitted; no other outside food/drink.
- Group bookings: birthdays, family reunions, corporate events, school outings; customizable packages; food and drink; dedicated spaces for groups
- Leagues: YBC youth (under 19), Wednesday seniors (55+), Friday Night Doubles, Tuesday Night Teams
- Outdoor patio; near the shores of Lake Huron
- Facebook: facebook.com/SunsetFamilyFunCentre
