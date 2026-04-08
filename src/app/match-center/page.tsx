import Link from "next/link";
import { matches } from "@/lib/data";
import { StadiumBg } from "@/components/ui/stadium-bg";

export default function MatchCenterPage() {
  return (
    <StadiumBg overlay="dark">
        <div className="section-shell section-space">
        <div className="section-label">Central Hub</div>
        <h1 className="section-title">
            Match <span className="hl">Center</span>
        </h1>

        <div className="mt-10 space-y-3">
            {matches.map((match) => {
            const live = match.status === "live";
            const upcoming = match.status === "upcoming";

            return (
                <Link
                key={match.id}
                href={`/match-center/${match.id}`}
                className={`glow-card grid gap-5 p-6 transition hover:border-[var(--line2)] lg:grid-cols-[1fr_220px_1fr_120px] ${
                    live ? "border-l-2 border-l-emerald-400" : upcoming ? "border-l-2 border-l-[var(--flame)]" : "border-l-2 border-l-white/20"
                }`}
                >
                <div className="flex items-center gap-3">
                    <div
                    className="flex h-11 w-11 items-center justify-center rounded-full display-font text-sm font-bold"
                    style={{ background: `${match.teamA.color}22`, color: match.teamA.color }}
                    >
                    {match.teamA.short}
                    </div>
                    <div>
                    <div className="ui-font text-lg font-bold uppercase">{match.teamA.name}</div>
                    <div className="mono-font mt-1 text-[11px] uppercase tracking-[0.18em] text-white/40">
                        {match.teamA.city}
                    </div>
                    </div>
                </div>

                <div className="text-center">
                    <div
                    className={`mono-font inline-block px-3 py-1 text-[10px] uppercase tracking-[0.24em] ${
                        live
                        ? "border border-emerald-400/30 bg-emerald-400/10 text-emerald-400"
                        : upcoming
                        ? "border border-[var(--line2)] bg-[rgba(255,58,0,0.08)] text-[var(--flame)]"
                        : "border border-white/10 bg-white/[0.03] text-white/45"
                    }`}
                    >
                    {match.badge}
                    </div>

                    <div className="mt-3 flex items-center justify-center gap-3">
                    <div>
                        <div className="display-font text-3xl">{match.scoreA}</div>
                        <div className="mono-font mt-1 text-[10px] uppercase tracking-[0.16em] text-white/40">
                        {match.overs}
                        </div>
                    </div>
                    </div>

                    <div className="mono-font mt-2 text-[10px] uppercase tracking-[0.16em] text-white/35">
                    {match.status === "live" ? "Live Match" : match.status === "upcoming" ? "Scheduled Clash" : "Final Result"}
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 text-right">
                    <div>
                    <div className="ui-font text-lg font-bold uppercase">{match.teamB.name}</div>
                    <div className="mono-font mt-1 text-[11px] uppercase tracking-[0.18em] text-white/40">
                        {match.teamB.city}
                    </div>
                    <div className="mono-font mt-2 text-[10px] uppercase tracking-[0.16em] text-white/40">
                        {match.scoreB}
                    </div>
                    </div>
                    <div
                    className="flex h-11 w-11 items-center justify-center rounded-full display-font text-sm font-bold"
                    style={{ background: `${match.teamB.color}22`, color: match.teamB.color }}
                    >
                    {match.teamB.short}
                    </div>
                </div>

                <div className="text-right">
                    <div className="mono-font text-[10px] uppercase tracking-[0.18em] text-white/40">
                    {match.venue}
                    </div>
                </div>
                </Link>
            );
            })}
        </div>
        </div>
    </StadiumBg>
  );
}