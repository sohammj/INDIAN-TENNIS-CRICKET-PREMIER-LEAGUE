import Link from "next/link";
import { matches } from "@/lib/data";
import { StadiumBg } from "@/components/ui/stadium-bg";

export default function MatchCenterPage() {
  return (
    <StadiumBg overlay="light">
      <div className="section-shell section-space pt-28">
        <div className="section-label text-[#c8ff00]">Central Hub</div>

        <h1 className="section-title text-black">
          Match <span className="hl text-[#c8ff00] drop-shadow-[0_0_12px_rgba(200,255,0,0.22)]">Center</span>
        </h1>

        <div className="mt-10 space-y-3">
          {matches.map((match) => {
            const live = match.status === "live";
            const upcoming = match.status === "upcoming";

            return (
              <Link
                key={match.id}
                href={`/match-center/${match.id}`}
                className={`group grid gap-5 border p-6 transition duration-300 backdrop-blur-sm lg:grid-cols-[1fr_220px_1fr_120px] ${
                  live
                    ? "border-l-2 border-l-emerald-400 border-white/10 bg-black/28 hover:border-[#c8ff00]/35 hover:bg-black/34"
                    : upcoming
                    ? "border-l-2 border-l-[#c8ff00] border-white/10 bg-black/28 hover:border-[#c8ff00]/35 hover:bg-black/34"
                    : "border-l-2 border-l-white/20 border-white/10 bg-black/24 hover:border-white/20 hover:bg-black/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="display-font flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold"
                    style={{
                      background: `${match.teamA.color}22`,
                      color: match.teamA.color,
                    }}
                  >
                    {match.teamA.short}
                  </div>

                  <div>
                    <div className="ui-font text-lg font-bold uppercase text-white">
                      {match.teamA.name}
                    </div>
                    <div className="mono-font mt-1 text-[11px] uppercase tracking-[0.18em] text-white/40">
                      {match.teamA.city}
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div
                    className={`mono-font inline-flex rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.24em] ${
                      live
                        ? "border border-emerald-400/30 bg-emerald-400/10 text-emerald-400"
                        : upcoming
                        ? "border border-[#c8ff00]/35 bg-[#c8ff00]/10 text-[#c8ff00]"
                        : "border border-white/10 bg-white/[0.03] text-white/45"
                    }`}
                  >
                    {match.badge}
                  </div>

                  <div className="mt-3">
                    <div className="display-font text-3xl text-white">
                      {match.scoreA}
                    </div>
                    <div className="mono-font mt-1 text-[10px] uppercase tracking-[0.16em] text-white/40">
                      {match.overs}
                    </div>
                  </div>

                  <div className="mono-font mt-2 text-[10px] uppercase tracking-[0.16em] text-white/35">
                    {live
                      ? "Live Match"
                      : upcoming
                      ? "Scheduled Clash"
                      : "Final Result"}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 text-right">
                  <div>
                    <div className="ui-font text-lg font-bold uppercase text-white">
                      {match.teamB.name}
                    </div>
                    <div className="mono-font mt-1 text-[11px] uppercase tracking-[0.18em] text-white/40">
                      {match.teamB.city}
                    </div>
                    <div className="mono-font mt-2 text-[10px] uppercase tracking-[0.16em] text-white/40">
                      {match.scoreB}
                    </div>
                  </div>

                  <div
                    className="display-font flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold"
                    style={{
                      background: `${match.teamB.color}22`,
                      color: match.teamB.color,
                    }}
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