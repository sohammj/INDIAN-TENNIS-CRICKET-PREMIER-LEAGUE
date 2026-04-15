import { StadiumBg } from "@/components/ui/stadium-bg";

export default function AboutPage() {
  return (
    <StadiumBg overlay="light">
      <div className="min-h-screen flex flex-col pt-24">
        
        <div className="flex-1 section-shell section-space">
          <div className="section-label">Organisation</div>

          <h1 className="section-title">About Us</h1>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="glow-card p-6">
              <div className="ui-font text-xl font-bold uppercase text-[#7fb800]">
                League Overview
              </div>

              <p className="mt-4 text-sm leading-7 text-black/65">
                ITCPL is a high-energy Indian tennis cricket platform focused on live
                scoring, league storytelling, player rankings, franchise visibility,
                and tournament operations.
              </p>
            </div>

            <div className="glow-card p-6">
              <div className="ui-font text-xl font-bold uppercase text-[#7fb800]">
                Core Committee
              </div>

              <div className="mt-4 space-y-3 text-sm text-black/65">
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