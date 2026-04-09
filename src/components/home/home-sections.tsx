import Link from "next/link";
import { matches, news, rankings, teams, tickerItems, videos } from "@/lib/data";

export function HomeTicker() {
  const items = [...tickerItems, ...tickerItems];
  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {items.map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}

export function MatchPreviewSection() {
  return (
    <section className="section-shell section-space">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <div className="section-label">Today&apos;s Action</div>
          <h2 className="section-title">
            Match <span className="hl">Centre</span>
          </h2>
        </div>
        <Link
          href="/match-center"
          className="ui-font border border-[var(--flame)] px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-[var(--flame)] hover:bg-[var(--flame)] hover:text-black"
        >
          All Matches →
        </Link>
      </div>

      <div className="space-y-3">
        {matches.map((match) => (
         <Link
            key={match.id}
            href={`/match-center/${match.id}`}
            className="glow-card grid gap-5 p-6 transition hover:border-[var(--line2)] lg:grid-cols-[1fr_220px_1fr_120px]"
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-full display-font text-sm font-bold"
                style={{ background: `${match.teamA.color}22`, color: match.teamA.color }}
              >
                {match.teamA.short}
              </div>
              <div>
                <div className="ui-font text-lg font-bold uppercase">{match.teamA.name}</div>
                <div className="mono-font mt-1 text-[11px] uppercase tracking-[0.18em] text-white/40">
                  {match.teamA.city}
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="mono-font inline-block border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-[var(--flame)]">
                {match.badge}
              </div>
              <div className="mt-3 flex items-center justify-center gap-3">
                <div>
                  <div className="display-font text-3xl">{match.scoreA}</div>
                  <div className="mono-font mt-1 text-[10px] uppercase tracking-[0.16em] text-white/40">
                    {match.overs}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 text-right">
              <div>
                <div className="ui-font text-lg font-bold uppercase">{match.teamB.name}</div>
                <div className="mono-font mt-1 text-[11px] uppercase tracking-[0.18em] text-white/40">
                  {match.teamB.city}
                </div>
              </div>
              <div
                className="flex h-11 w-11 items-center justify-center rounded-full display-font text-sm font-bold"
                style={{ background: `${match.teamB.color}22`, color: match.teamB.color }}
              >
                {match.teamB.short}
              </div>
            </div>

            <div className="text-right">
              <div className="mono-font text-[10px] uppercase tracking-[0.18em] text-white/40">
                {match.venue}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function RankingsPreviewSection() {
  return (
    <section className="section-shell section-space pt-0">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <div className="section-label">Performance Board</div>
          <h2 className="section-title">
            MVP <span className="hl">&</span> Rankings
          </h2>
        </div>
        <Link
          href="/rankings"
          className="ui-font border border-[var(--flame)] px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-[var(--flame)] hover:bg-[var(--flame)] hover:text-black"
        >
          View Rankings →
        </Link>
      </div>

      <div className="overflow-x-auto glow-card">
        <table className="w-full min-w-[760px] border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              {["Rank", "Player", "Player ID", "Zone", "City", "Points"].map((head) => (
                <th
                  key={head}
                  className="mono-font px-4 py-4 text-left text-xs uppercase tracking-[0.22em] text-white/40"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rankings.map((player) => (
              <tr key={player.playerId} className="border-b border-white/10 hover:bg-white/[0.02]">
                <td className="display-font px-4 py-4 text-3xl">{player.rank}</td>
                <td className="ui-font px-4 py-4 text-base font-bold uppercase">{player.name}</td>
                <td className="mono-font px-4 py-4 text-sm text-white/55">{player.playerId}</td>
                <td className="mono-font px-4 py-4 text-sm text-white/55">{player.zone}</td>
                <td className="mono-font px-4 py-4 text-sm text-white/55">{player.city}</td>
                <td className="display-font px-4 py-4 text-2xl text-[var(--flame)]">{player.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function TeamsPreviewSection() {
  return (
    <section className="section-shell section-space pt-0">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <div className="section-label">League Franchises</div>
          <h2 className="section-title">
            Teams <span className="hl">Preview</span>
          </h2>
        </div>
        <Link
          href="/teams"
          className="ui-font border border-[var(--flame)] px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-[var(--flame)] hover:bg-[var(--flame)] hover:text-black"
        >
          All Teams →
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {teams.map((team) => (
          <Link key={team.slug} href="/teams" className="glow-card p-6 transition hover:-translate-y-1 hover:border-[var(--line2)]">
            <div
              className="mb-4 flex h-16 w-16 items-center justify-center rounded-full display-font text-2xl font-bold"
              style={{ background: `${team.color}22`, color: team.color }}
            >
              {team.short}
            </div>
            <div className="display-font text-2xl uppercase">{team.name}</div>
            <div className="mono-font mt-2 text-[11px] uppercase tracking-[0.2em] text-white/40">
              {team.city}
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div>
                <div className="display-font text-2xl">{team.wins}</div>
                <div className="mono-font text-[10px] uppercase tracking-[0.18em] text-white/40">Wins</div>
              </div>
              <div>
                <div className="display-font text-2xl">{team.played}</div>
                <div className="mono-font text-[10px] uppercase tracking-[0.18em] text-white/40">Played</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function VideosNewsMoreSection() {
  return (
    <section className="section-shell section-space pt-0">
      <div className="grid gap-8 xl:grid-cols-3">
        <div>
          <div className="section-label">Featured Videos</div>
          <h2 className="section-title text-[2.5rem]">
            Videos <span className="hl">Section</span>
          </h2>
          <div className="mt-6 space-y-4">
            {videos.map((video) => (
              <Link key={video.title} href="/videos" className="glow-card block p-5">
                <div className="mono-font text-[10px] uppercase tracking-[0.2em] text-[var(--flame)]">
                  {video.category}
                </div>
                <div className="ui-font mt-2 text-lg font-bold uppercase">{video.title}</div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="section-label">External Coverage</div>
          <h2 className="section-title text-[2.5rem]">
            News <span className="hl">Section</span>
          </h2>
          <div className="mt-6 space-y-4">
            {news.map((item) => (
              <Link key={item.title} href="/news" className="glow-card block p-5">
                <div className="mono-font text-[10px] uppercase tracking-[0.2em] text-[var(--flame)]">
                  {item.source}
                </div>
                <div className="ui-font mt-2 text-lg font-bold uppercase">{item.title}</div>
                <p className="mt-3 text-sm text-white/55">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="section-label">More</div>
          <h2 className="section-title text-[2.5rem]">
            More <span className="hl">Pages</span>
          </h2>
          <div className="mt-6 space-y-4">
            {[
              "Contact Us",
              "About Us",
              "Master Franchise",
              "Subscription History",
            ].map((item) => (
              <Link key={item} href="/more" className="glow-card block p-5">
                <div className="ui-font text-lg font-bold uppercase">{item}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}