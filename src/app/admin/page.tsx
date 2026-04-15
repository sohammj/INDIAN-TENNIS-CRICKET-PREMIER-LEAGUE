import Link from "next/link";
import { adminStats, news, rankings, teams } from "@/lib/data";

const adminNav = [
  { label: "Dashboard", href: "/admin" },
  { label: "Match Management", href: "/admin/matches" },
  { label: "Live Scoring", href: "/admin/live-scoring" },
  { label: "Teams & Players", href: "/admin/teams-players" },
  { label: "User Management", href: "/admin/users" },
  { label: "Rankings & Points", href: "/admin/rankings" },
  { label: "Payments", href: "/admin/payments" },
  { label: "Content CMS", href: "/admin/content" },
];

export default function AdminPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white">
      <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-[260px_1fr]">
        <aside className="border-r border-black/10 bg-[#fafaf7] p-6">
          <div className="mono-font border-b border-black/10 pb-4 text-[11px] uppercase tracking-[0.24em] text-black/45">
            Admin Panel · ITCPL 2026
          </div>

          <div className="mt-6 space-y-2">
            {adminNav.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-xl ui-font px-4 py-3 text-sm font-bold uppercase tracking-[0.18em] transition ${
                  index === 0
                    ? "bg-[#c8ff00]/30 text-black"
                    : "text-black/60 hover:bg-black/[0.03]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </aside>

        <main className="p-8 lg:p-10">
          <div className="section-label">Operational Overview</div>
          <h1 className="section-title">
            Admin <span className="hl">Dashboard</span>
          </h1>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {adminStats.map((item) => (
              <div key={item.label} className="glow-card p-6">
                <div className="mono-font text-[10px] uppercase tracking-[0.22em] text-black/40">
                  {item.label}
                </div>
                <div className="display-font mt-3 text-5xl text-black">{item.value}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 xl:grid-cols-2">
            <div className="glow-card p-6">
              <div className="ui-font text-lg font-bold uppercase tracking-[0.18em] text-[#7fb800]">
                Teams & Players
              </div>
              <div className="mt-5 overflow-x-auto">
                <table className="w-full min-w-[620px] border-collapse">
                  <thead>
                    <tr className="border-b border-black/10">
                      {["Player ID", "Name", "City", "Role", "Team", "Status"].map((head) => (
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
                    {teams.flatMap((team) =>
                      team.roster.map((player) => (
                        <tr key={player.playerId} className="border-b border-black/10">
                          <td className="px-3 py-3 text-xs text-black/50">{player.playerId}</td>
                          <td className="px-3 py-3 text-sm font-medium text-black">{player.name}</td>
                          <td className="px-3 py-3 text-sm text-black/60">{player.city}</td>
                          <td className="px-3 py-3 text-sm text-black/60">{player.role}</td>
                          <td className="px-3 py-3 text-sm text-black/60">{team.name}</td>
                          <td className="px-3 py-3 text-sm text-[#7fb800]">{player.status}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="glow-card p-6">
              <div className="ui-font text-lg font-bold uppercase tracking-[0.18em] text-[#7fb800]">
                Rankings & Points
              </div>
              <div className="mt-5 space-y-3">
                {rankings.map((player) => (
                  <div
                    key={player.playerId}
                    className="flex items-center justify-between rounded-2xl border border-black/10 bg-[#fafaf7] p-4"
                  >
                    <div>
                      <div className="ui-font text-sm font-bold uppercase text-black">
                        {player.name}
                      </div>
                      <div className="mono-font mt-1 text-[10px] uppercase tracking-[0.18em] text-black/40">
                        {player.playerId}
                      </div>
                    </div>
                    <div className="display-font text-2xl text-[#7fb800]">{player.points}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-6 xl:grid-cols-2">
            <div className="glow-card p-6">
              <div className="ui-font text-lg font-bold uppercase tracking-[0.18em] text-[#7fb800]">
                Live Scoring Controls
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {["0", "1", "2", "3", "4", "6", "Wd", "Nb", "Wicket", "Run Out"].map((item) => (
                  <button
                    key={item}
                    className="ui-font rounded-xl border border-black/10 bg-white px-4 py-4 text-sm font-bold uppercase tracking-[0.16em] text-black/80 transition hover:bg-[#c8ff00]/20"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="glow-card p-6">
              <div className="ui-font text-lg font-bold uppercase tracking-[0.18em] text-[#7fb800]">
                Content CMS
              </div>
              <div className="mt-5 space-y-3">
                {news.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between rounded-2xl border border-black/10 bg-[#fafaf7] p-4"
                  >
                    <div>
                      <div className="ui-font text-sm font-bold uppercase text-black">
                        {item.title}
                      </div>
                      <div className="mono-font mt-1 text-[10px] uppercase tracking-[0.18em] text-black/40">
                        {item.source} · {item.date}
                      </div>
                    </div>
                    <div className="text-sm text-[#7fb800]">{item.status}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}