import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { matches } from "@/lib/data";

export default function AdminMatchesPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#0b0b0b]">
      <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-[260px_1fr]">
        <AdminSidebar />
        <main className="p-8 lg:p-10">
          <div className="section-label">Admin Module</div>
          <h1 className="section-title">Match Management</h1>

          <div className="mt-10 space-y-4">
            {matches.map((match) => (
              <div key={match.id} className="glow-card p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="ui-font text-xl font-bold uppercase">
                      {match.teamA.name} vs {match.teamB.name}
                    </div>
                    <div className="mono-font mt-2 text-xs uppercase tracking-[0.2em] text-white/40">
                      {match.venue} · {match.overs}
                    </div>
                  </div>
                  <div className="mono-font text-sm uppercase tracking-[0.2em] text-[var(--flame)]">
                    {match.badge}
                  </div>
                </div>

                <div className="mt-5 flex gap-3">
                  <button className="ui-font bg-[var(--flame)] px-4 py-2 text-sm font-bold uppercase tracking-[0.16em] text-black">
                    Edit Match
                  </button>
                  <button className="ui-font border border-white/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.16em] text-white">
                    View Summary
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}