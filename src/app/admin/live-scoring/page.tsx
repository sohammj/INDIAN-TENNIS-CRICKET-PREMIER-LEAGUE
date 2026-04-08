import { AdminSidebar } from "@/components/layout/admin-sidebar";

export default function AdminLiveScoringPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#0b0b0b]">
      <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-[260px_1fr]">
        <AdminSidebar />
        <main className="p-8 lg:p-10">
          <div className="section-label">Admin Module</div>
          <h1 className="section-title">Live Scoring</h1>

          <div className="mt-10 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="glow-card p-6">
              <div className="ui-font text-lg font-bold uppercase tracking-[0.18em] text-[var(--flame)]">
                Ball Input Console
              </div>
              <div className="mt-5 grid grid-cols-2 md:grid-cols-5 gap-3">
                {["0", "1", "2", "3", "4", "6", "Wide", "No Ball", "Wicket", "Run Out"].map((item) => (
                  <button key={item} className="ui-font border border-white/10 bg-white/[0.03] px-4 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white/80">
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="glow-card p-6">
              <div className="ui-font text-lg font-bold uppercase tracking-[0.18em] text-[var(--flame)]">
                Current Over Feed
              </div>
              <div className="mt-5 space-y-3">
                {["1", "Wd", "4", "6", "•", "2"].map((ball, i) => (
                  <div key={i} className="border border-white/10 px-4 py-3 text-sm text-white/70">
                    Ball {i + 1}: {ball}
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