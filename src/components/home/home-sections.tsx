import Link from "next/link";
import { matches, news, rankings, teams, tickerItems, videos } from "@/lib/data";

export function HomeTicker() {
  const items = [...tickerItems, ...tickerItems];
  return (
    <div className="ticker-wrap bg-[#c8ff00]">
      <div className="ticker-track">
        {items.map((item, index) => (
          <span key={`${item}-${index}`} className="text-black font-bold">{item}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── SHARED LIGHT CARD ─── */
const lightCard =
  "rounded-none border border-gray-200 bg-white transition hover:border-gray-400 hover:shadow-sm";

export function MatchPreviewSection() {
  return (
    <section className="section-shell section-space bg-white">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <div className="mono-font text-[11px] uppercase tracking-[0.3em] text-gray-400">
            Today&apos;s Action
          </div>
          <h2 className="display-font mt-1 text-[2.8rem] uppercase leading-tight text-gray-900">
            Match <span className="text-[var(--flame)]">Centre</span>
          </h2>
        </div>
        <Link
          href="/match-center"
          className="ui-font border border-[var(--flame)] px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-[var(--flame)] hover:bg-[var(--flame)] hover:text-white"
        >
          All Matches →
        </Link>
      </div>

      <div className="space-y-3">
        {matches.map((match) => (
          <Link
            key={match.id}
            href={`/match-center/${match.id}`}
            className={`${lightCard} grid gap-5 p-6 lg:grid-cols-[1fr_220px_1fr_120px]`}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-full display-font text-sm font-bold"
                style={{ background: `${match.teamA.color}22`, color: match.teamA.color }}
              >
                {match.teamA.short}
              </div>
              <div>
                <div className="ui-font text-lg font-bold uppercase text-gray-900">{match.teamA.name}</div>
                <div className="mono-font mt-1 text-[11px] uppercase tracking-[0.18em] text-gray-400">
                  {match.teamA.city}
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="mono-font inline-block border border-gray-200 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-[var(--flame)]">
                {match.badge}
              </div>
              <div className="mt-3 flex items-center justify-center gap-3">
                <div>
                  <div className="display-font text-3xl text-gray-900">{match.scoreA}</div>
                  <div className="mono-font mt-1 text-[10px] uppercase tracking-[0.16em] text-gray-400">
                    {match.overs}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 text-right">
              <div>
                <div className="ui-font text-lg font-bold uppercase text-gray-900">{match.teamB.name}</div>
                <div className="mono-font mt-1 text-[11px] uppercase tracking-[0.18em] text-gray-400">
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
              <div className="mono-font text-[10px] uppercase tracking-[0.18em] text-gray-400">
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
    <section className="section-shell section-space bg-gray-50 pt-0">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <div className="mono-font text-[11px] uppercase tracking-[0.3em] text-gray-400">
            Performance Board
          </div>
          <h2 className="display-font mt-1 text-[2.8rem] uppercase leading-tight text-gray-900">
            MVP <span className="text-[var(--flame)]">&</span> Rankings
          </h2>
        </div>
        <Link
          href="/rankings"
          className="ui-font border border-[var(--flame)] px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-[var(--flame)] hover:bg-[var(--flame)] hover:text-white"
        >
          View Rankings →
        </Link>
      </div>

      <div className="overflow-x-auto border border-gray-200 bg-white">
        <table className="w-full min-w-[760px] border-collapse">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {["Rank", "Player", "Player ID", "Zone", "City", "Points"].map((head) => (
                <th
                  key={head}
                  className="mono-font px-4 py-4 text-left text-xs uppercase tracking-[0.22em] text-gray-400"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rankings.map((player) => (
              <tr key={player.playerId} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="display-font px-4 py-4 text-3xl text-gray-900">{player.rank}</td>
                <td className="ui-font px-4 py-4 text-base font-bold uppercase text-gray-900">{player.name}</td>
                <td className="mono-font px-4 py-4 text-sm text-gray-400">{player.playerId}</td>
                <td className="mono-font px-4 py-4 text-sm text-gray-400">{player.zone}</td>
                <td className="mono-font px-4 py-4 text-sm text-gray-400">{player.city}</td>
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
    <section className="section-shell section-space bg-white pt-0">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <div className="mono-font text-[11px] uppercase tracking-[0.3em] text-gray-400">
            League Franchises
          </div>
          <h2 className="display-font mt-1 text-[2.8rem] uppercase leading-tight text-gray-900">
            Teams <span className="text-[var(--flame)]">Preview</span>
          </h2>
        </div>
        <Link
          href="/teams"
          className="ui-font border border-[var(--flame)] px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-[var(--flame)] hover:bg-[var(--flame)] hover:text-white"
        >
          All Teams →
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {teams.map((team) => (
          <Link
            key={team.slug}
            href="/teams"
            className={`${lightCard} p-6 hover:-translate-y-1`}
          >
            <div
              className="mb-4 flex h-16 w-16 items-center justify-center rounded-full display-font text-2xl font-bold"
              style={{ background: `${team.color}18`, color: team.color }}
            >
              {team.short}
            </div>
            <div className="display-font text-2xl uppercase text-gray-900">{team.name}</div>
            <div className="mono-font mt-2 text-[11px] uppercase tracking-[0.2em] text-gray-400">
              {team.city}
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
              <div>
                <div className="display-font text-2xl text-gray-900">{team.wins}</div>
                <div className="mono-font text-[10px] uppercase tracking-[0.18em] text-gray-400">Wins</div>
              </div>
              <div>
                <div className="display-font text-2xl text-gray-900">{team.played}</div>
                <div className="mono-font text-[10px] uppercase tracking-[0.18em] text-gray-400">Played</div>
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
    <section className="section-shell section-space bg-gray-50 pt-0">
      <div className="grid gap-8 xl:grid-cols-3">
        <div>
          <div className="mono-font text-[11px] uppercase tracking-[0.3em] text-gray-400">Featured Videos</div>
          <h2 className="display-font mt-1 text-[2.5rem] uppercase leading-tight text-gray-900">
            Videos <span className="text-[var(--flame)]">Section</span>
          </h2>
          <div className="mt-6 space-y-4">
            {videos.map((video) => (
              <Link key={video.title} href="/videos" className={`${lightCard} block p-5`}>
                <div className="mono-font text-[10px] uppercase tracking-[0.2em] text-[var(--flame)]">
                  {video.category}
                </div>
                <div className="ui-font mt-2 text-lg font-bold uppercase text-gray-900">{video.title}</div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="mono-font text-[11px] uppercase tracking-[0.3em] text-gray-400">External Coverage</div>
          <h2 className="display-font mt-1 text-[2.5rem] uppercase leading-tight text-gray-900">
            News <span className="text-[var(--flame)]">Section</span>
          </h2>
          <div className="mt-6 space-y-4">
            {news.map((item) => (
              <Link key={item.title} href="/news" className={`${lightCard} block p-5`}>
                <div className="mono-font text-[10px] uppercase tracking-[0.2em] text-[var(--flame)]">
                  {item.source}
                </div>
                <div className="ui-font mt-2 text-lg font-bold uppercase text-gray-900">{item.title}</div>
                <p className="mt-3 text-sm text-gray-500">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="mono-font text-[11px] uppercase tracking-[0.3em] text-gray-400">More</div>
          <h2 className="display-font mt-1 text-[2.5rem] uppercase leading-tight text-gray-900">
            More <span className="text-[var(--flame)]">Pages</span>
          </h2>
          <div className="mt-6 space-y-4">
            {["Contact Us", "About Us", "Master Franchise", "Subscription History"].map((item) => (
              <Link key={item} href="/more" className={`${lightCard} block p-5`}>
                <div className="ui-font text-lg font-bold uppercase text-gray-900">{item}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}