import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Every booking button goes to the site's own (demo) booking flow, optionally with an option preselected. */
export function BookLink({
  children = "Book now",
  className = "btn btn-primary",
  href = "/book",
  hideIcon = false,
}: {
  children?: React.ReactNode;
  className?: string;
  href?: string;
  hideIcon?: boolean;
}) {
  return (
    <Link href={href} className={className}>
      {children}
      {!hideIcon && <ArrowRight aria-hidden className="size-4 shrink-0" strokeWidth={2.5} />}
    </Link>
  );
}

export function ExternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener" className={className}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
