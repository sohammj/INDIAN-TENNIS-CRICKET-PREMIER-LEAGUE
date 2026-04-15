import { teams } from "@/lib/data";
import { StadiumBg } from "@/components/ui/stadium-bg";

export default function TeamsPage() {
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
                key={team.slug}
                className="glow-card group relative overflow-hidden p-7 text-center transition hover:-translate-y-1 hover:border-[var(--line2)]"
              >
                <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[#c8ff00] transition-transform duration-300 group-hover:scale-x-100" />

                <div
                  className="mx-auto mb-4 flex h-[72px] w-[72px] items-center justify-center rounded-full display-font text-2xl font-bold"
                  style={{ background: `${team.color}18`, color: team.color }}
                >
                  {team.short}
                </div>

                <div className="display-font text-2xl uppercase text-black">{team.name}</div>
                <div className="mono-font mt-2 text-[10px] uppercase tracking-[0.2em] text-black/40">
                  {team.city}
                </div>

                <div className="mt-4 text-sm leading-6 text-black/60">{team.description}</div>

                <div className="mt-6 flex items-center justify-around">
                  <div>
                    <div className="display-font text-2xl text-black">{team.wins}</div>
                    <div className="mono-font text-[10px] uppercase tracking-[0.18em] text-black/40">
                      Wins
                    </div>
                  </div>
                  <div>
                    <div className="display-font text-2xl text-black">{team.played}</div>
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
              <div key={`${team.slug}-roster`} className="glow-card p-6">
                <div
                  className="ui-font text-lg font-bold uppercase tracking-[0.18em]"
                  style={{ color: team.color }}
                >
                  {team.name} Roster
                </div>

                <div className="mt-5 overflow-x-auto">
                  <table className="w-full min-w-[560px] border-collapse">
                    <thead>
                      <tr className="border-b border-black/10">
                        {["Player ID", "Name", "Role", "City", "Status"].map((head) => (
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
                      {team.roster.map((player) => (
                        <tr key={player.playerId} className="border-b border-black/10">
                          <td className="px-3 py-3 text-xs text-black/50">{player.playerId}</td>
                          <td className="px-3 py-3 text-sm font-medium text-black">{player.name}</td>
                          <td className="px-3 py-3 text-sm text-black/60">{player.role}</td>
                          <td className="px-3 py-3 text-sm text-black/60">{player.city}</td>
                          <td className="px-3 py-3 text-sm text-[#7fb800]">{player.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
    </StadiumBg>
  );
}