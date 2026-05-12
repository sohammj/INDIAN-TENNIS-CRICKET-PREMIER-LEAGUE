import { StadiumBg } from "@/components/ui/stadium-bg";
import { API_URL } from "@/lib/api";

type ApiTeam = {
  id: string;
  name: string;
  city: string | null;
  zone: string | null;
  logoUrl: string | null;
  createdAt: string;
};

async function getTeams(): Promise<ApiTeam[]> {
  const res = await fetch(`${API_URL}/api/teams`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch teams");
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

export default async function TeamsPage() {
  const teams = await getTeams();

  return (
    <StadiumBg overlay="light">
      <div className="section-shell section-space">
        <div className="section-label">All Franchises</div>

        <h1 className="section-title">
          Teams <span className="hl">&</span> City Profiles
        </h1>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {teams.map((team) => (
            <div
              key={team.id}
              className="glow-card group relative overflow-hidden p-7 text-center transition hover:-translate-y-1 hover:border-[var(--line2)]"
            >
              <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[#c8ff00] transition-transform duration-300 group-hover:scale-x-100" />

              <div className="mx-auto mb-4 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#c8ff00]/15 display-font text-2xl font-bold text-black">
                {getTeamShort(team.name)}
              </div>

              <div className="display-font text-2xl uppercase text-black">
                {team.name}
              </div>

              <div className="mono-font mt-2 text-[10px] uppercase tracking-[0.2em] text-black/40">
                {team.city || "City TBA"} · {team.zone || "Zone TBA"}
              </div>

              <div className="mt-4 text-sm leading-6 text-black/60">
                Official ITCPL franchise profile. Full squad, statistics, and match
                history will appear here as the tournament data is updated.
              </div>

              <div className="mt-6 flex items-center justify-around">
                <div>
                  <div className="display-font text-2xl text-black">0</div>
                  <div className="mono-font text-[10px] uppercase tracking-[0.18em] text-black/40">
                    Wins
                  </div>
                </div>

                <div>
                  <div className="display-font text-2xl text-black">0</div>
                  <div className="mono-font text-[10px] uppercase tracking-[0.18em] text-black/40">
                    Played
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {teams.map((team) => (
            <div key={`${team.id}-roster`} className="glow-card p-6">
              <div className="ui-font text-lg font-bold uppercase tracking-[0.18em] text-[#7fb800]">
                {team.name} Roster
              </div>

              <div className="mt-5 rounded-2xl border border-black/10 bg-white/50 p-5 text-sm text-black/60">
                Player roster connection will come next after we add team-player
                assignments in the backend.
              </div>
            </div>
          ))}
        </div>
      </div>
    </StadiumBg>
  );
}