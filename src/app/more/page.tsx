import Link from "next/link";
import { StadiumBg } from "@/components/ui/stadium-bg";

export default function MorePage() {
  return (
    <StadiumBg overlay="light">
      <div className="min-h-screen flex flex-col pt-24">
        
        <div className="flex-1 section-shell section-space">
          <div className="section-label">More</div>

          <h1 className="section-title">
            Supplementary <span className="hl">Sections</span>
          </h1>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Link
              href="/more/about"
              className="glow-card p-6 transition hover:-translate-y-1"
            >
              <div className="ui-font text-2xl font-bold uppercase text-black">
                About Us
              </div>
            </Link>

            <Link
              href="/more/contact"
              className="glow-card p-6 transition hover:-translate-y-1"
            >
              <div className="ui-font text-2xl font-bold uppercase text-black">
                Contact Us
              </div>
            </Link>

            <Link
              href="/more/master-franchise"
              className="glow-card p-6 transition hover:-translate-y-1"
            >
              <div className="ui-font text-2xl font-bold uppercase text-black">
                Master Franchise
              </div>
            </Link>

            <Link
              href="/more/subscription-history"
              className="glow-card p-6 transition hover:-translate-y-1"
            >
              <div className="ui-font text-2xl font-bold uppercase text-black">
                Subscription History
              </div>
            </Link>
          </div>
        </div>

      </div>
    </StadiumBg>
  );
}