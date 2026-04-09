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
    <StadiumBg overlay="dark">
        <div className="min-h-[calc(100vh-4rem)] bg-[#0d0d0d]">
        <div className="border-b border-white/10 bg-[var(--surface)] px-6 py-8 lg:px-20">
            <div className="grid gap-6 lg:grid-cols-[1fr_180px_1fr] lg:items-start">
            <div>
                <div className="display-font text-5xl uppercase" style={{ color: match.teamA.color }}>
                {match.teamA.name}
                </div>
                <div className="display-font mt-3 text-7xl leading-none text-[var(--flame)]">
                {match.scoreA}
                </div>
                <div className="mono-font mt-2 text-xs uppercase tracking-[0.2em] text-white/40">
                {match.teamA.city}
                </div>
            </div>

            <div className="text-center">
                <div className="display-font text-3xl text-white/30">VS</div>
                <div className="mono-font mt-3 text-xs uppercase tracking-[0.24em] text-[var(--flame)]">
                {match.overs}
                </div>
                <div className="mono-font mt-2 text-xs uppercase tracking-[0.18em] text-white/40">
                {match.badge}
                </div>
            </div>

            <div className="text-right">
                <div className="display-font text-5xl uppercase" style={{ color: match.teamB.color }}>
                {match.teamB.name}
                </div>
                <div className="display-font mt-3 text-7xl leading-none text-white">
                {match.teamB.short}
                </div>
                <div className="mono-font mt-2 text-xs uppercase tracking-[0.2em] text-white/40">
                {match.teamB.city}
                </div>
            </div>
            </div>
        </div>

        <div className="grid min-h-[540px] lg:grid-cols-[1fr_320px]">
            <main className="px-6 py-10 lg:px-20">
            <div className="glow-card p-6">
                <div className="ui-font text-lg font-bold uppercase tracking-[0.18em] text-[var(--flame)]">
                Scorecard
                </div>

                <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[680px] border-collapse">
                    <thead>
                    <tr className="border-b border-white/10">
                        {["Batter", "R", "B", "4s", "6s", "SR"].map((head) => (
                        <th
                            key={head}
                            className="mono-font px-3 py-3 text-left text-[10px] uppercase tracking-[0.22em] text-white/40"
                        >
                            {head}
                        </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {match.scorecard?.batting.map((row) => (
                        <tr key={row.name} className="border-b border-white/10">
                        <td className={`px-3 py-3 text-sm ${row.strike ? "text-white font-medium" : "text-white/70"}`}>
                            {row.name}
                        </td>
                        <td className={`px-3 py-3 text-sm ${row.strike ? "text-[var(--flame)] display-font text-lg" : "text-white/60"}`}>
                            {row.runs}
                        </td>
                        <td className="px-3 py-3 text-sm text-white/60">{row.balls}</td>
                        <td className="px-3 py-3 text-sm text-white/60">{row.fours}</td>
                        <td className="px-3 py-3 text-sm text-white/60">{row.sixes}</td>
                        <td className="px-3 py-3 text-sm text-white/60">{row.strikeRate}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>

                <div className="mt-8">
                <div className="ui-font text-lg font-bold uppercase tracking-[0.18em] text-[var(--flame)]">
                    Bowling
                </div>
                <div className="mt-4 overflow-x-auto">
                    <table className="w-full min-w-[620px] border-collapse">
                    <thead>
                        <tr className="border-b border-white/10">
                        {["Bowler", "O", "R", "W", "Eco"].map((head) => (
                            <th
                            key={head}
                            className="mono-font px-3 py-3 text-left text-[10px] uppercase tracking-[0.22em] text-white/40"
                            >
                            {head}
                            </th>
                        ))}
                        </tr>
                    </thead>
                    <tbody>
                        {match.scorecard?.bowling.map((row) => (
                        <tr key={row.name} className="border-b border-white/10">
                            <td className="px-3 py-3 text-sm text-white/70">{row.name}</td>
                            <td className="px-3 py-3 text-sm text-white/60">{row.overs}</td>
                            <td className="px-3 py-3 text-sm text-white/60">{row.runs}</td>
                            <td className="px-3 py-3 text-sm text-[var(--flame)]">{row.wickets}</td>
                            <td className="px-3 py-3 text-sm text-white/60">{row.economy}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
            </main>

            <aside className="border-l border-white/10 bg-[var(--surface)] p-7">
            <div className="mono-font text-[10px] uppercase tracking-[0.24em] text-[var(--flame)]">
                This Over
            </div>

            <div className="mt-5 flex gap-2">
                {match.balls?.map((ball, index) => (
                <span
                    key={`${ball.label}-${index}`}
                    className={`mono-font flex h-10 w-10 items-center justify-center rounded-full border text-xs ${
                    ball.type === "four"
                        ? "border-[rgba(255,58,0,0.3)] bg-[var(--flame)] text-black"
                        : ball.type === "six"
                        ? "border-[rgba(232,200,74,0.3)] bg-[var(--gold)] text-black"
                        : ball.type === "wide"
                        ? "border-[rgba(139,92,246,0.3)] bg-[rgba(139,92,246,0.2)] text-violet-300"
                        : ball.type === "dot"
                        ? "border-white/10 bg-white/5 text-white/55"
                        : ball.type === "wicket"
                        ? "border-red-400/30 bg-red-500/10 text-red-300"
                        : "border-[rgba(255,58,0,0.3)] bg-[rgba(255,58,0,0.12)] text-[var(--flame)]"
                    }`}
                >
                    {ball.label}
                </span>
                ))}
            </div>

            <div className="sec-div mt-8 mono-font text-[10px] uppercase tracking-[0.24em] text-[var(--flame)]">
                Commentary
            </div>

            <div className="mt-4 space-y-4">
                {match.commentary?.map((item) => (
                <div key={`${item.over}-${item.text}`} className="flex gap-3">
                    <div className="mono-font min-w-[36px] text-[10px] uppercase tracking-[0.16em] text-[var(--flame)]">
                    {item.over}
                    </div>
                    <div className="text-sm text-white/65">{item.text}</div>
                </div>
                ))}
            </div>
            </aside>
        </div>
        </div>
    </StadiumBg>
  );
}