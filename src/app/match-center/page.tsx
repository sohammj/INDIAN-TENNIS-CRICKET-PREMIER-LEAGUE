import Link from "next/link";
import { StadiumBg } from "@/components/ui/stadium-bg";
import { API_URL } from "@/lib/api";

type ApiTeam = {
  id: string;
  name: string;
  city: string | null;
  zone: string | null;
  logoUrl: string | null;
};

type ApiTournament = {
  id: string;
  name: string;
  city: string | null;
  zone: string | null;
};

type ApiMatch = {
  id: string;
  tournamentId: string | null;
  teamAId: string;
  teamBId: string;
  venue: string | null;
  matchDate: string | null;
  status: string;
  createdAt: string;
  tournament: ApiTournament | null;
  teamA: ApiTeam;
  teamB: ApiTeam;
};

async function getMatches(): Promise<ApiMatch[]> {
  const res = await fetch(`${API_URL}/api/matches`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch matches");
  }

  return res.json();
}

function getTeamShort(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

function formatMatchDate(date: string | null) {
  if (!date) return "Date TBA";

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export default async function MatchCenterPage() {
  const matches = await getMatches();

  return (
    <StadiumBg overlay="light">
      <div className="section-shell section-space pt-28">
        <div className="section-label text-[#c8ff00]">Central Hub</div>

        <h1 className="section-title text-black">
          Match{" "}
          <span className="hl text-[#c8ff00] drop-shadow-[0_0_12px_rgba(200,255,0,0.22)]">
            Center
          </span>
        </h1>

        <div className="mt-10 space-y-3">
          {matches.map((match) => {
            const status = match.status.toLowerCase();
            const live = status === "live";
            const upcoming = status === "upcoming";

            return (
              <Link
                key={match.id}
                href={`/match-center/${match.id}`}
                className={`group grid gap-5 border p-6 transition duration-300 backdrop-blur-sm lg:grid-cols-[1fr_220px_1fr_160px] ${
                  live
                    ? "border-l-2 border-l-emerald-400 border-white/10 bg-black/28 hover:border-[#c8ff00]/35 hover:bg-black/34"
                    : upcoming
                    ? "border-l-2 border-l-[#c8ff00] border-white/10 bg-black/28 hover:border-[#c8ff00]/35 hover:bg-black/34"
                    : "border-l-2 border-l-white/20 border-white/10 bg-black/24 hover:border-white/20 hover:bg-black/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="display-font flex h-11 w-11 items-center justify-center rounded-full bg-[#c8ff00]/15 text-sm font-bold text-[#c8ff00]">
                    {getTeamShort(match.teamA.name)}
                  </div>

                  <div>
                    <div className="ui-font text-lg font-bold uppercase text-white">
                      {match.teamA.name}
                    </div>
                    <div className="mono-font mt-1 text-[11px] uppercase tracking-[0.18em] text-white/40">
                      {match.teamA.city || "City TBA"}
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
                    {match.status}
                  </div>

                  <div className="mt-3">
                    <div className="display-font text-3xl text-white">VS</div>
                    <div className="mono-font mt-1 text-[10px] uppercase tracking-[0.16em] text-white/40">
                      {formatMatchDate(match.matchDate)}
                    </div>
                  </div>

                  <div className="mono-font mt-2 text-[10px] uppercase tracking-[0.16em] text-white/35">
                    {match.tournament?.name || "Tournament TBA"}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 text-right">
                  <div>
                    <div className="ui-font text-lg font-bold uppercase text-white">
                      {match.teamB.name}
                    </div>
                    <div className="mono-font mt-1 text-[11px] uppercase tracking-[0.18em] text-white/40">
                      {match.teamB.city || "City TBA"}
                    </div>
                    <div className="mono-font mt-2 text-[10px] uppercase tracking-[0.16em] text-white/40">
                      {match.teamB.zone || "Zone TBA"}
                    </div>
                  </div>

                  <div className="display-font flex h-11 w-11 items-center justify-center rounded-full bg-[#c8ff00]/15 text-sm font-bold text-[#c8ff00]">
                    {getTeamShort(match.teamB.name)}
                  </div>
                </div>

                <div className="text-right">
                  <div className="mono-font text-[10px] uppercase tracking-[0.18em] text-white/40">
                    {match.venue || "Venue TBA"}
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