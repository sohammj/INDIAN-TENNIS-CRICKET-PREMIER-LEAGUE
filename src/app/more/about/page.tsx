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
                The Indian Tennis Cricket Premier League (ITCPL) is more than just a tournament; it is a revolution designed to give India’s most popular grassroots sport the cinematic stage it deserves. While the IPL celebrates the leather ball, we celebrate the soul of Indian streets. Our slogan, “Gully se Glory Tak,” perfectly captures our mission: transforming raw, backyard talent into national sporting icons.
                Tennis cricket is the heartbeat of every Indian neighborhood, yet its heroes often remain unsung. We are changing that by professionalizing the format with international-standard production, massive stadiums, and high-stakes competition. By bridging the gap between local playgrounds and floodlit arenas, we provide a platform where a player’s journey doesn’t end at the neighborhood corner but leads to the spotlight of a national league.
                This league is a scout’s dream and a player’s ultimate breakthrough. We are hunting for the fastest bowlers, the most audacious hitters, and the sharpest fielders who have honed their skills with a tennis ball. For every kid dreaming of greatness, the ITCPL is the bridge from the dust of the gully to the golden glory of professional cricket. Join us as we turn local legends into household names.
              </p>
            </div>

            <div className="glow-card p-6">
              <div className="ui-font text-xl font-bold uppercase text-[#7fb800]">
                Core Committee
              </div>

              <div className="mt-4 space-y-3 text-sm text-black/65">
                <div>League Commissioner - Sparsh Waghmare</div>
                <div>Operations Head - XYZ</div>
                <div>Scoring Director -  XYZ</div>
                <div>Partnerships Lead - XYZ</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </StadiumBg>
  );
}