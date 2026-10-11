import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
});
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"] });
const space = Space_Grotesk({ variable: "--font-space", subsets: ["latin"] });

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sunset Family Fun Centre | Bowling, Glow Mini-Golf & Arcade in Port Elgin",
    template: "%s | Sunset Family Fun Centre",
  },
  description:
    "5-pin bowling, glow-in-the-dark mini-golf, a redemption arcade and birthday parties at 990 Goderich St, Port Elgin, Ontario. Website redesign concept.",
  // Concept demo: keep it out of search results so it never competes with the real site.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#fff7eb",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-CA"
      className={`${bricolage.variable} ${dmSans.variable} ${space.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="btn btn-dark btn-sm fixed top-3 left-3 z-50 -translate-y-24 focus:translate-y-0"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
