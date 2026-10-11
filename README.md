# Sunset Family Fun Centre: Website Redesign Concept

An independent, speculative redesign concept by Daniel (freelance web designer) for Sunset Family Fun Centre, Port Elgin, Ontario. **Not the official website and not endorsed by Sunset.** It includes a **demo-only** booking system (`/book`) and a demo staff dashboard (`/demo-admin`) to show how customers could book directly on Sunset's own site. Availability is simulated and bookings are stored only in the visitor's browser: nothing is reserved, charged or sent.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Checks:

```bash
npm run lint
npx tsc --noEmit
npm test           # booking rules self-check (Node 23.6+)
npm run build && npm start
```

Requires Node 20.9+ (built and tested on Node 24, Next.js 16.4).

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New > Project**, import the repo, and keep the detected Next.js defaults (no environment variables needed).
3. Deploy. Every route is statically prerendered.

Or from the terminal: `npx vercel` (preview) then `npx vercel --prod`.

The site sets `robots: noindex` so the concept never competes with the real site in search. Remove it in `app/layout.tsx` if the owner adopts the design.

## Where to change things

| What | File |
|---|---|
| Map, Facebook, food menu links | `lib/constants.ts` |
| Published prices (shared by price cards and booking) | `data/pricing.ts` |
| Booking rules: experiences, guest limits, slot lengths, lane count, demo capacities | `lib/booking/config.ts` |
| Simulated availability | `lib/booking/availability.ts` |
| Address, phone, email, hours, navigation | `data/business.ts` |
| Attractions, prices, party packages, leagues, photos | `data/attractions.ts` |
| Colours, type, buttons, motion | `app/globals.css` |
| Design rules and verified facts | `DESIGN.md` |

## Pages

`/` home, `/experiences` attractions and prices, `/parties` birthday parties, `/groups` group bookings, `/visit` plan your visit, `/book` demo booking, `/book/confirmation` demo confirmation, `/demo-admin` demo staff dashboard, plus a custom 404.

## Demo booking system

- **Customer flow (`/book`):** experience, guests, date, time, details, review. Every "Book now" button opens it, preselecting the right option where it can (for example `/book?experience=bowling&guests=4`).
- **Instant demo bookings:** bowling, glow mini-golf and the combo. Bowling and combo get a simulated lane (1 to 12) and never double-book a lane.
- **Requests:** birthday parties and group events are sent as requests for the team to confirm.
- **Time:** start times follow the published opening hours, in America/Toronto time. Past times are disabled and the calendar opens 90 days ahead.
- **Sample availability:** generated from the date and hour, so it looks the same every time and "Reset demo" restores the same starting state.
- **Storage:** bookings are saved in `localStorage` (key `sunset-demo-bookings-v1`) on the device that made them. Corrupt data is ignored, and blocked storage shows a clear message.
- **Dashboard (`/demo-admin`):**
  - overview stats and a 12-lane board for any date and hour
  - a day schedule
  - reservations with customer details and a cancel button; cancelling frees the lane
  - "Reset demo"
- **Not a real system:** there's no backend, payments, emails or texts, and no real customer data. It is not a secure admin system.

Demo assumptions to confirm with Sunset before building it for real:
- **Mini-golf:** capacity of 4 groups per hour, 1-hour tee times, and $10 per person for 4 players.
- **Birthday parties:** guest range of 1 to 40.
- **Group events:** 2 to 200 guests.

## Temporary visual assets

All photos are **temporary concept assets** copied from Sunset's own public website (sunsetfamilyfun.com, Wix media host `static.wixstatic.com`) on 2026-10-11. They need the owner's permission before any public or commercial use. Files were only rotated (EXIF), resized and renamed.

| File | Source media ID | Notes |
|---|---|---|
| `public/images/arcade-skeeball.jpg` | `4f5d5a_13d26ed47a5d4b3f92e77d3431d12577` | Venue photo |
| `public/images/bowling-pins-ball.jpg` | `4f5d5a_473fe28fd2364540b3a359a13ae3a8c0` | Venue photo |
| `public/images/glow-golf-course.jpg` | `4f5d5a_8874c4b0d3f9422089403dd1805bebc4` | Venue photo (also used for the share image `app/opengraph-image.jpg`) |
| `public/images/glow-golf-entrance.jpg` | `4f5d5a_9d3e3630530747e6988be005e493ffdd` | Venue photo |
| `public/images/lanes-brunswick.jpg` | `4f5d5a_9e43ed3e7d114cbd8374bb26aa7839df` | Venue photo |
| `public/images/lanes-blacklight.jpg` | `4f5d5a_c66e67362cd946f1ad9dd34b138e69cf` | Venue photo, low resolution (896 px) |
| `public/images/lanes-interior.jpg` | `4f5d5a_c44dced31b1847d9a0affde52cac9ee8` | Venue photo |
| `public/images/glow-bowling-shoe.jpg` | `4f5d5a_be25dc90dad94607b34e9f5881cf57e3` | From their site; may be stock, confirm origin |
| `public/images/food-poutine.jpg` | `4f5d5a_3bedf3cf316f47bf947dc631bdb1ea58` | From their food page; likely stock, confirm licence |

The logo mark, sunset disc, 5-pin formation and lane arrows are simple CSS/SVG shapes made for this concept. The existing Sunset logo and mascot were not used.

## Business details the owner must verify before launch

- **Hours.** Published hours are shown, not live status. Confirm seasonal or holiday changes.
- **Individual mini-golf duration.** The homepage says 30 min; other pages say 1 hour. No duration is shown.
- **Combo duration.** "2+ hours (1 hour bowl)" vs "1 hour". No duration is shown.
- **$31 party arcade value.** The homepage says 40 arcade credits; the detail page says a $10 credit card. Shown as "an arcade card for every guest".
- **Party package names.** The live site's names disagree across pages (the $26 page text calls itself the "Strike Package"). "Classic Party" and "Party + Arcade" are concept labels only.
- **$34 Turkey package.** Inclusions are unconfirmed. It is mentioned only as "contact the team".
- **Party policies.** Guest minimums, deposits, refunds and availability are not public. The FAQ says "contact the team".
- **Group bookings.** Customizable packages and dedicated spaces are paraphrased from the current group page. Confirm current offer.
- **Leagues.** Names and audiences are from the current Leagues page. Schedules and prices are intentionally not shown; confirm the current season.
- **Food.** Menu highlights come from the current food page (no wings are listed there, so none are claimed). No food prices are shown except the $25 extra party pizza.
- **Prices.** All prices are as listed on the current public website, in CAD, and subject to confirmation.
- **Outdoor patio and "near Lake Huron".** Both are taken from the current homepage copy.
- **Photo permissions.** See the asset table above.
