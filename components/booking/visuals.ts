import { photos, type Photo } from "@/data/attractions";
import type { ExperienceId } from "@/lib/booking/config";

/** Photo and colour treatment per experience, matching the public site's attraction panels. */
export const visuals: Record<ExperienceId, { photo: Photo; card: string; muted: string; chip: string }> = {
  bowling: { photo: photos.pins, card: "on-dark bg-cobalt text-cream", muted: "text-cream/80", chip: "bg-cream/15" },
  golf: { photo: photos.glowCourse, card: "on-dark bg-midnight text-cream", muted: "text-cream/75", chip: "bg-cream/10 text-lime" },
  combo: {
    photo: photos.lanesBlacklight,
    card: "bg-[linear-gradient(150deg,var(--color-sun),var(--color-coral)_70%)] text-midnight",
    muted: "text-midnight/80",
    chip: "bg-midnight/10",
  },
  birthday: { photo: photos.glowEntrance, card: "bg-cream-2 text-midnight", muted: "text-ink-soft", chip: "bg-midnight/8" },
  "group-event": { photo: photos.lanesInterior, card: "bg-cream-2 text-midnight", muted: "text-ink-soft", chip: "bg-midnight/8" },
};
