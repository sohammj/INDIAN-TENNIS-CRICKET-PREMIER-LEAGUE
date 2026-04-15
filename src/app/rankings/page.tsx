"use client";

import { useMemo, useState } from "react";
import { rankings } from "@/lib/data";
import { StadiumBg } from "@/components/ui/stadium-bg";

export default function RankingsPage() {
  const [zone, setZone] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return rankings.filter((player) => {
      const zoneOk = zone === "All" || player.zone === zone;
      const q = query.toLowerCase();
      const searchOk =
        !q ||
        player.name.toLowerCase().includes(q) ||
        player.playerId.toLowerCase().includes(q) ||
        player.city.toLowerCase().includes(q);
      return zoneOk && searchOk;
    });
  }, [zone, query]);

  return (
    <StadiumBg overlay="light">
      <div className="min-h-screen flex flex-col pt-24">
        <div className="flex-1 section-shell section-space">
          <div className="section-label">Leaderboard</div>

          <h1 className="section-title">
            MVP <span className="hl">&</span> Player Rankings
          </h1>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {["All", "West", "North", "South", "East"].map((item) => (
              <button
                key={item}
                onClick={() => setZone(item)}
                className={`ui-font rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] transition ${
                  zone === item
                    ? "border-[#c8ff00] bg-[#c8ff00] text-black"
                    : "border-black/10 bg-white text-black/60 hover:bg-black/[0.03]"
                }`}
              >
                {item}
              </button>
            ))}

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search player, city or ID"
              className="mono-font ml-auto min-w-[240px] rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-black outline-none placeholder:text-black/35"
            />
          </div>

          <div className="mt-8 overflow-x-auto glow-card">
            <table className="w-full min-w-[980px] border-collapse">
              <thead>
                <tr className="border-b border-black/10">
                  {[
                    "Rank",
                    "Player",
                    "Player ID",
                    "Zone",
                    "City",
                    "Matches",
                    "Runs",
                    "Wickets",
                    "Points",
                  ].map((head) => (
                    <th
                      key={head}
                      className="mono-font px-4 py-4 text-left text-[10px] uppercase tracking-[0.22em] text-black/40"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filtered.map((player) => (
                  <tr
                    key={player.playerId}
                    className="border-b border-black/10 hover:bg-[#c8ff00]/[0.08]"
                  >
                    <td className="display-font px-4 py-4 text-3xl text-black">
                      {player.rank}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                          style={{ background: player.gradient }}
                        >
                          {player.initials}
                        </div>

                        <div>
                          <div className="ui-font text-sm font-bold uppercase text-black">
                            {player.name}
                          </div>
                          <div className="mono-font mt-1 text-[10px] uppercase tracking-[0.16em] text-black/40">
                            Elite Performer
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="mono-font px-4 py-4 text-sm text-black/55">
                      {player.playerId}
                    </td>
                    <td className="mono-font px-4 py-4 text-sm text-[#7fb800]">
                      {player.zone}
                    </td>
                    <td className="mono-font px-4 py-4 text-sm text-black/55">
                      {player.city}
                    </td>
                    <td className="mono-font px-4 py-4 text-sm text-black/55">
                      {player.matches}
                    </td>
                    <td className="mono-font px-4 py-4 text-sm text-black/55">
                      {player.runs}
                    </td>
                    <td className="mono-font px-4 py-4 text-sm text-black/55">
                      {player.wickets}
                    </td>
                    <td className="display-font px-4 py-4 text-2xl text-[#7fb800]">
                      {player.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </StadiumBg>
  );
}