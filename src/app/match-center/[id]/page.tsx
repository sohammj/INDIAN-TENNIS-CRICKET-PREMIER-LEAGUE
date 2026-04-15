import { notFound } from "next/navigation";
import { matches } from "@/lib/data";
import { StadiumBg } from "@/components/ui/stadium-bg";

export default async function MatchDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const match = matches.find((m) => m.id === id);

  if (!match) return notFound();

  return (
    <StadiumBg overlay="light">
      <div className="min-h-screen bg-white pt-16">
        <div className="border-b border-black/10 bg-[#f7f7f3] px-6 py-8 lg:px-20">
          <div className="grid gap-6 lg:grid-cols-[1fr_180px_1fr] lg:items-start">
            <div>
              <div
                className="display-font text-5xl uppercase"
                style={{ color: match.teamA.color }}
              >
                {match.teamA.name}
              </div>
              <div className="display-font mt-3 text-7xl leading-none text-[#7fb800]">
                {match.scoreA}
              </div>
              <div className="mono-font mt-2 text-xs uppercase tracking-[0.2em] text-black/40">
                {match.teamA.city}
              </div>
            </div>

            <div className="text-center">
              <div className="display-font text-3xl text-black/30">VS</div>
              <div className="mono-font mt-3 text-xs uppercase tracking-[0.24em] text-[#7fb800]">
                {match.overs}
              </div>
              <div className="mono-font mt-2 text-xs uppercase tracking-[0.18em] text-black/40">
                {match.badge}
              </div>
            </div>

            <div className="text-right">
              <div
                className="display-font text-5xl uppercase"
                style={{ color: match.teamB.color }}
              >
                {match.teamB.name}
              </div>
              <div className="display-font mt-3 text-7xl leading-none text-black">
                {match.teamB.short}
              </div>
              <div className="mono-font mt-2 text-xs uppercase tracking-[0.2em] text-black/40">
                {match.teamB.city}
              </div>
            </div>
          </div>
        </div>

        <div className="grid min-h-[540px] lg:grid-cols-[1fr_320px]">
          <main className="px-6 py-10 lg:px-20">
            <div className="glow-card p-6">
              <div className="ui-font text-lg font-bold uppercase tracking-[0.18em] text-[#7fb800]">
                Scorecard
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[680px] border-collapse">
                  <thead>
                    <tr className="border-b border-black/10">
                      {["Batter", "R", "B", "4s", "6s", "SR"].map((head) => (
                        <th
                          key={head}
                          className="mono-font px-3 py-3 text-left text-[10px] uppercase tracking-[0.22em] text-black/40"
                        >
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {match.scorecard?.batting.map((row) => (
                      <tr key={row.name} className="border-b border-black/10">
                        <td
                          className={`px-3 py-3 text-sm ${
                            row.strike ? "font-medium text-black" : "text-black/70"
                          }`}
                        >
                          {row.name}
                        </td>
                        <td
                          className={`px-3 py-3 text-sm ${
                            row.strike
                              ? "display-font text-lg text-[#7fb800]"
                              : "text-black/60"
                          }`}
                        >
                          {row.runs}
                        </td>
                        <td className="px-3 py-3 text-sm text-black/60">
                          {row.balls}
                        </td>
                        <td className="px-3 py-3 text-sm text-black/60">
                          {row.fours}
                        </td>
                        <td className="px-3 py-3 text-sm text-black/60">
                          {row.sixes}
                        </td>
                        <td className="px-3 py-3 text-sm text-black/60">
                          {row.strikeRate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8">
                <div className="ui-font text-lg font-bold uppercase tracking-[0.18em] text-[#7fb800]">
                  Bowling
                </div>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full min-w-[620px] border-collapse">
                    <thead>
                      <tr className="border-b border-black/10">
                        {["Bowler", "O", "R", "W", "Eco"].map((head) => (
                          <th
                            key={head}
                            className="mono-font px-3 py-3 text-left text-[10px] uppercase tracking-[0.22em] text-black/40"
                          >
                            {head}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {match.scorecard?.bowling.map((row) => (
                        <tr key={row.name} className="border-b border-black/10">
                          <td className="px-3 py-3 text-sm text-black/70">
                            {row.name}
                          </td>
                          <td className="px-3 py-3 text-sm text-black/60">
                            {row.overs}
                          </td>
                          <td className="px-3 py-3 text-sm text-black/60">
                            {row.runs}
                          </td>
                          <td className="px-3 py-3 text-sm text-[#7fb800]">
                            {row.wickets}
                          </td>
                          <td className="px-3 py-3 text-sm text-black/60">
                            {row.economy}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>

          <aside className="border-l border-black/10 bg-[#f7f7f3] p-7">
            <div className="mono-font text-[10px] uppercase tracking-[0.24em] text-[#7fb800]">
              This Over
            </div>

            <div className="mt-5 flex gap-2">
              {match.balls?.map((ball, index) => (
                <span
                  key={`${ball.label}-${index}`}
                  className={`mono-font flex h-10 w-10 items-center justify-center rounded-full border text-xs ${
                    ball.type === "four"
                      ? "border-[#c8ff00]/40 bg-[#c8ff00] text-black"
                      : ball.type === "six"
                      ? "border-[rgba(232,200,74,0.3)] bg-[var(--gold)] text-black"
                      : ball.type === "wide"
                      ? "border-[rgba(139,92,246,0.3)] bg-[rgba(139,92,246,0.12)] text-violet-700"
                      : ball.type === "dot"
                      ? "border-black/10 bg-black/[0.03] text-black/55"
                      : ball.type === "wicket"
                      ? "border-red-400/30 bg-red-500/10 text-red-500"
                      : "border-[#c8ff00]/30 bg-[#c8ff00]/10 text-[#7fb800]"
                  }`}
                >
                  {ball.label}
                </span>
              ))}
            </div>

            <div className="mt-8 mono-font text-[10px] uppercase tracking-[0.24em] text-[#7fb800]">
              Commentary
            </div>

            <div className="mt-4 space-y-4">
              {match.commentary?.map((item) => (
                <div key={`${item.over}-${item.text}`} className="flex gap-3">
                  <div className="mono-font min-w-[36px] text-[10px] uppercase tracking-[0.16em] text-[#7fb800]">
                    {item.over}
                  </div>
                  <div className="text-sm text-black/65">{item.text}</div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </StadiumBg>
  );
}