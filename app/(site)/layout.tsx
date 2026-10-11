import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ConceptNotice } from "@/components/concept-notice";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <ConceptNotice />
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
