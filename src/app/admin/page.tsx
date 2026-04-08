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
    <div className="min-h-[calc(100vh-4rem)] bg-[#0b0b0b]">
      <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-[260px_1fr]">
        <aside className="border-r border-white/10 bg-black/70 p-6">
          <div className="mono-font border-b border-white/10 pb-4 text-[11px] uppercase tracking-[0.24em] text-white/45">
            Admin Panel · ITCPL 2026
          </div>

          <div className="mt-6 space-y-2">
            {adminNav.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block ui-font px-4 py-3 text-sm font-bold uppercase tracking-[0.18em] ${
                  index === 0
                    ? "bg-[rgba(255,58,0,0.08)] text-[var(--flame)]"
                    : "text-white/60 hover:bg-white/[0.03]"
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
                <div className="mono-font text-[10px] uppercase tracking-[0.22em] text-white/40">
                  {item.label}
                </div>
                <div className="display-font mt-3 text-5xl">{item.value}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 xl:grid-cols-2">
            <div className="glow-card p-6">
              <div className="ui-font text-lg font-bold uppercase tracking-[0.18em] text-[var(--flame)]">
                Teams & Players
              </div>
              <div className="mt-5 overflow-x-auto">
                <table className="w-full min-w-[620px] border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      {["Player ID", "Name", "City", "Role", "Team", "Status"].map((head) => (
                        <th key={head} className="mono-font px-3 py-3 text-left text-[10px] uppercase tracking-[0.22em] text-white/40">
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {teams.flatMap((team) =>
                      team.roster.map((player) => (
                        <tr key={player.playerId} className="border-b border-white/10">
                          <td className="px-3 py-3 text-xs text-white/50">{player.playerId}</td>
                          <td className="px-3 py-3 text-sm font-medium">{player.name}</td>
                          <td className="px-3 py-3 text-sm text-white/60">{player.city}</td>
                          <td className="px-3 py-3 text-sm text-white/60">{player.role}</td>
                          <td className="px-3 py-3 text-sm text-white/60">{team.name}</td>
                          <td className="px-3 py-3 text-sm text-[var(--flame)]">{player.status}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="glow-card p-6">
              <div className="ui-font text-lg font-bold uppercase tracking-[0.18em] text-[var(--flame)]">
                Rankings & Points
              </div>
              <div className="mt-5 space-y-3">
                {rankings.map((player) => (
                  <div key={player.playerId} className="flex items-center justify-between border border-white/10 p-4">
                    <div>
                      <div className="ui-font text-sm font-bold uppercase">{player.name}</div>
                      <div className="mono-font mt-1 text-[10px] uppercase tracking-[0.18em] text-white/40">
                        {player.playerId}
                      </div>
                    </div>
                    <div className="display-font text-2xl text-[var(--flame)]">{player.points}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-6 xl:grid-cols-2">
            <div className="glow-card p-6">
              <div className="ui-font text-lg font-bold uppercase tracking-[0.18em] text-[var(--flame)]">
                Live Scoring Controls
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {["0", "1", "2", "3", "4", "6", "Wd", "Nb", "Wicket", "Run Out"].map((item) => (
                  <button
                    key={item}
                    className="ui-font border border-white/10 bg-white/[0.03] px-4 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white/80"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="glow-card p-6">
              <div className="ui-font text-lg font-bold uppercase tracking-[0.18em] text-[var(--flame)]">
                Content CMS
              </div>
              <div className="mt-5 space-y-3">
                {news.map((item) => (
                  <div key={item.title} className="flex items-center justify-between border border-white/10 p-4">
                    <div>
                      <div className="ui-font text-sm font-bold uppercase">{item.title}</div>
                      <div className="mono-font mt-1 text-[10px] uppercase tracking-[0.18em] text-white/40">
                        {item.source} · {item.date}
                      </div>
                    </div>
                    <div className="text-sm text-[var(--flame)]">{item.status}</div>
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