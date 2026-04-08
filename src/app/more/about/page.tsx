import { StadiumBg } from "@/components/ui/stadium-bg";
export default function AboutPage() {
  return (
    <StadiumBg overlay="dark">
        <div
        className="min-h-[calc(100vh-4rem)] bg-cover bg-center"
        style={{
            backgroundImage:
            "linear-gradient(rgba(8,8,8,0.9), rgba(8,8,8,0.94)), url('/stadium.jpg')",
        }}
        >
        <div className="section-shell section-space">
            <div className="section-label">Organisation</div>
            <h1 className="section-title">About Us</h1>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="glow-card p-6">
                <div className="ui-font text-xl font-bold uppercase text-[var(--flame)]">League Overview</div>
                <p className="mt-4 text-sm leading-7 text-white/65">
                ITCPL is a high-energy Indian tennis cricket platform focused on live scoring,
                league storytelling, player rankings, franchise visibility, and tournament operations.
                </p>
            </div>

            <div className="glow-card p-6">
                <div className="ui-font text-xl font-bold uppercase text-[var(--flame)]">Core Committee</div>
                <div className="mt-4 space-y-3 text-sm text-white/65">
                <div>League Commissioner - Amit Deshpande</div>
                <div>Operations Head - Rohan Vyas</div>
                <div>Scoring Director - Neeraj Patil</div>
                <div>Partnerships Lead - Shrey Shah</div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </StadiumBg>
  );
}