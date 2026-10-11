"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import { business, navLinks } from "@/data/business";
import { BookLink } from "./book-link";
import { SunsetDisc } from "./motifs";

export function Wordmark({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <SunsetDisc className="size-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className={`display text-[1.6rem] ${inverse ? "text-cream" : "text-cobalt"}`}>Sunset</span>
        <span className={`label mt-0.5 text-[0.56rem] tracking-[0.2em] whitespace-nowrap max-[374px]:hidden ${inverse ? "text-cream/70" : "text-midnight/70"}`}>
          Family Fun Centre
        </span>
      </span>
    </span>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));
  // Close the menu whenever the route changes.
  useEffect(() => dialog.current?.close(), [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        scrolled ? "bg-cream/85 shadow-[0_1px_0_rgb(18_22_41/0.08)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div
        className={`shell flex items-center justify-between gap-3 sm:gap-6 transition-[height] duration-500 ${scrolled ? "h-16" : "h-[4.5rem] lg:h-20"}`}
      >
        <Link href="/" aria-label={`${business.name}, home`} className="rounded-lg">
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className="relative rounded-full px-3 py-2 text-[0.95rem] font-medium text-midnight/80 transition-colors hover:bg-midnight/5 hover:text-midnight aria-[current=page]:text-midnight aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-3 aria-[current=page]:after:-bottom-0.5 aria-[current=page]:after:h-[3px] aria-[current=page]:after:rounded-full aria-[current=page]:after:bg-coral"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <BookLink className="btn btn-primary btn-sm max-sm:px-4 max-sm:[&>svg]:hidden">
            <span>
              Book<span className="max-[359px]:hidden"> now</span>
            </span>
          </BookLink>
          <button
            type="button"
            onClick={() => dialog.current?.showModal()}
            className="grid size-11 place-items-center rounded-full bg-midnight text-cream transition-transform active:scale-95 lg:hidden"
            aria-label="Open menu"
            aria-haspopup="dialog"
          >
            <Menu className="size-5" strokeWidth={2.25} />
          </button>
        </div>
      </div>

      <dialog
        ref={dialog}
        aria-label="Menu"
        className="on-dark menu-dialog fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto bg-midnight p-0 text-cream backdrop:bg-midnight/60 lg:hidden"
      >
        <div className="relative isolate flex min-h-full flex-col overflow-hidden">
          <SunsetDisc className="menu-sun absolute -right-24 -bottom-24 -z-10 size-[26rem] opacity-90" />
          <div className="shell flex h-[4.5rem] items-center justify-between">
            <Wordmark inverse />
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              className="grid size-11 place-items-center rounded-full bg-cream text-midnight"
              aria-label="Close menu"
            >
              <X className="size-5" strokeWidth={2.25} />
            </button>
          </div>
          <nav aria-label="Mobile" className="shell mt-6 flex-1">
            <ul className="space-y-1">
              {navLinks.map((l, i) => (
                <li key={l.href} className="menu-item" style={{ "--i": i } as React.CSSProperties}>
                  <Link
                    href={l.href}
                    onClick={() => dialog.current?.close()}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    className="display block py-2 text-[clamp(2.4rem,11vw,3.6rem)] aria-[current=page]:text-coral"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="shell flex flex-col gap-3 pt-10 pb-10 sm:flex-row">
            <BookLink className="btn btn-primary">Book your fun</BookLink>
            <a href={business.phoneHref} className="btn btn-ghost bg-midnight">
              <Phone aria-hidden className="size-4" /> {business.phone}
            </a>
          </div>
        </div>
      </dialog>
    </header>
  );
}
