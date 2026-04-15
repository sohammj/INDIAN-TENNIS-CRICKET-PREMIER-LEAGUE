import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { news, videos } from "@/lib/data";

export default function AdminContentPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white">
      <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-[260px_1fr]">
        <AdminSidebar />
        <main className="p-8 lg:p-10">
          <div className="section-label">Admin Module</div>
          <h1 className="section-title">Content CMS</h1>

          <div className="mt-10 grid gap-6 xl:grid-cols-2">
            <div className="glow-card p-6">
              <div className="ui-font text-lg font-bold uppercase tracking-[0.18em] text-[#7fb800]">
                News Entries
              </div>
              <div className="mt-5 space-y-3">
                {news.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-black/10 bg-[#fafaf7] p-4"
                  >
                    <div className="ui-font text-sm font-bold uppercase text-black">
                      {item.title}
                    </div>
                    <div className="mono-font mt-2 text-[10px] uppercase tracking-[0.18em] text-black/40">
                      {item.source} · {item.date} · {item.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glow-card p-6">
              <div className="ui-font text-lg font-bold uppercase tracking-[0.18em] text-[#7fb800]">
                Video Entries
              </div>
              <div className="mt-5 space-y-3">
                {videos.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-black/10 bg-[#fafaf7] p-4"
                  >
                    <div className="ui-font text-sm font-bold uppercase text-black">
                      {item.title}
                    </div>
                    <div className="mono-font mt-2 text-[10px] uppercase tracking-[0.18em] text-black/40">
                      {item.category} · {item.youtubeId}
                    </div>
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