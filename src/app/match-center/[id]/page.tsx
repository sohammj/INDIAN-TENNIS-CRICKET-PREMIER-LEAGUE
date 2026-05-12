import { notFound } from "next/navigation";
import { StadiumBg } from "@/components/ui/stadium-bg";

type ApiTeam = {
  id: string;
  name: string;
  city: string | null;
  zone: string | null;
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

async function getMatch(id: string): Promise<ApiMatch | null> {
  const res = await fetch(`http://localhost:4000/api/matches/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Failed to fetch match");
  }

  return res.json();
}

function formatMatchDate(date: string | null) {
  if (!date) return "Date TBA";

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date(date));
}

export default async function MatchDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const match = await getMatch(id);

  if (!match) return notFound();

  return (
    <StadiumBg overlay="light">
      <div className="min-h-screen bg-white pt-16">
        <div className="border-b border-black/10 bg-[#f7f7f3] px-6 py-8 lg:px-20">
          <div className="grid gap-6 lg:grid-cols-[1fr_180px_1fr] lg:items-start">
            <div>
              <div className="display-font text-5xl uppercase text-[#7fb800]">
                {match.teamA.name}
              </div>

              <div className="display-font mt-3 text-7xl leading-none text-black">
                VS
              </div>

              <div className="mono-font mt-2 text-xs uppercase tracking-[0.2em] text-black/40">
                {match.teamA.city || "City TBA"}
              </div>
            </div>

            <div className="text-center">
              <div className="display-font text-3xl text-black/30">
                {match.status}
              </div>

              <div className="mono-font mt-3 text-xs uppercase tracking-[0.24em] text-[#7fb800]">
                {formatMatchDate(match.matchDate)}
              </div>

              <div className="mono-font mt-2 text-xs uppercase tracking-[0.18em] text-black/40">
                {match.tournament?.name || "Tournament"}
              </div>
            </div>

            <div className="text-right">
              <div className="display-font text-5xl uppercase text-black">
                {match.teamB.name}
              </div>

              <div className="display-font mt-3 text-7xl leading-none text-[#7fb800]">
                VS
              </div>

              <div className="mono-font mt-2 text-xs uppercase tracking-[0.2em] text-black/40">
                {match.teamB.city || "City TBA"}
              </div>
            </div>
          </div>
        </div>

        <div className="grid min-h-[540px] lg:grid-cols-[1fr_320px]">
          <main className="px-6 py-10 lg:px-20">
            <div className="glow-card p-6">
              <div className="ui-font text-lg font-bold uppercase tracking-[0.18em] text-[#7fb800]">
                Match Information
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-black/10 bg-white/60 p-6">
                  <div className="mono-font text-[10px] uppercase tracking-[0.2em] text-black/40">
                    Venue
                  </div>

                  <div className="mt-3 text-2xl font-semibold text-black">
                    {match.venue || "Venue TBA"}
                  </div>
                </div>

                <div className="rounded-2xl border border-black/10 bg-white/60 p-6">
                  <div className="mono-font text-[10px] uppercase tracking-[0.2em] text-black/40">
                    Tournament
                  </div>

                  <div className="mt-3 text-2xl font-semibold text-black">
                    {match.tournament?.name || "Tournament"}
                  </div>
                </div>

                <div className="rounded-2xl border border-black/10 bg-white/60 p-6">
                  <div className="mono-font text-[10px] uppercase tracking-[0.2em] text-black/40">
                    Team A
                  </div>

                  <div className="mt-3 text-2xl font-semibold text-black">
                    {match.teamA.name}
                  </div>
                </div>

                <div className="rounded-2xl border border-black/10 bg-white/60 p-6">
                  <div className="mono-font text-[10px] uppercase tracking-[0.2em] text-black/40">
                    Team B
                  </div>

                  <div className="mt-3 text-2xl font-semibold text-black">
                    {match.teamB.name}
                  </div>
                </div>
              </div>
            </div>
          </main>

          <aside className="border-l border-black/10 bg-[#f7f7f3] p-7">
            <div className="mono-font text-[10px] uppercase tracking-[0.24em] text-[#7fb800]">
              Match Status
            </div>

            <div className="mt-4 rounded-2xl border border-[#c8ff00]/30 bg-[#c8ff00]/10 p-5">
              <div className="display-font text-3xl uppercase text-black">
                {match.status}
              </div>

              <div className="mono-font mt-3 text-[10px] uppercase tracking-[0.18em] text-black/45">
                Live scoring integration will be connected next.
              </div>
            </div>

            <div className="mt-8 mono-font text-[10px] uppercase tracking-[0.24em] text-[#7fb800]">
              Match Timeline
            </div>

            <div className="mt-4 space-y-4">
              <div className="rounded-xl border border-black/10 bg-white/60 p-4">
                <div className="text-sm text-black/65">
                  Match scheduled for{" "}
                  <span className="font-semibold text-black">
                    {formatMatchDate(match.matchDate)}
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-black/10 bg-white/60 p-4">
                <div className="text-sm text-black/65">
                  Venue confirmed as{" "}
                  <span className="font-semibold text-black">
                    {match.venue || "Venue TBA"}
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </StadiumBg>
  );
}