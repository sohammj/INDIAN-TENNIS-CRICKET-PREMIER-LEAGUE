import Link from "next/link";
import { StadiumBg } from "@/components/ui/stadium-bg";
export default function MorePage() {
  return (
    <StadiumBg overlay="dark">
        <div className="section-shell section-space">
        <div className="section-label">More</div>
        <h1 className="section-title">
            Supplementary <span className="hl">Sections</span>
        </h1>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Link href="/more/about" className="glow-card p-6">
            <div className="ui-font text-2xl font-bold uppercase">About Us</div>
            </Link>
            <Link href="/more/contact" className="glow-card p-6">
            <div className="ui-font text-2xl font-bold uppercase">Contact Us</div>
            </Link>
            <Link href="/more/master-franchise" className="glow-card p-6">
            <div className="ui-font text-2xl font-bold uppercase">Master Franchise</div>
            </Link>
            <Link href="/more/subscription-history" className="glow-card p-6">
            <div className="ui-font text-2xl font-bold uppercase">Subscription History</div>
            </Link>
        </div>
        </div>
    </StadiumBg>
  );
}