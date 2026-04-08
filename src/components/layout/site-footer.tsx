export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="section-shell py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="display-font text-2xl uppercase tracking-[0.22em]">
              ITC <span className="text-[var(--flame)]">PL</span>
            </div>
            <p className="mt-3 max-w-xl text-sm text-white/50">
              Public-facing sports tournament platform with live scoring, rankings, teams, videos, news, and expansion-ready sections.
            </p>
          </div>
          <div className="mono-font text-xs uppercase tracking-[0.22em] text-white/40">
            ITCPL Season 2026 - All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
}