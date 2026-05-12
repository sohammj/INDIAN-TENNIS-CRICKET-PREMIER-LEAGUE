"use client";

import { useEffect, useMemo, useState } from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { AdminGuard } from "@/components/providers/admin-guard";
import { API_URL } from "@/lib/api";
type RankingPlayer = {
  id: string;
  rank: string;
  playerId: string;
  name: string;
  city: string | null;
  zone: string | null;
  matches: number;
  runs: number;
  wickets: number;
  catches: number;
  runOuts: number;
  points: number;
  mvpPoints: number;
  team: string;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function AdminRankingsPage() {
  const [zone, setZone] = useState("All");
  const [query, setQuery] = useState("");
  const [rankings, setRankings] = useState<RankingPlayer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRankings() {
      try {
        const res = await fetch("http://localhost:4000/api/rankings", {
          cache: "no-store",
        });

        const data = await res.json();
        setRankings(data);
      } finally {
        setLoading(false);
      }
    }

    fetchRankings();
  }, []);

  const filtered = useMemo(() => {
    return rankings.filter((player) => {
      const zoneOk = zone === "All" || player.zone === zone;
      const q = query.toLowerCase();

      const searchOk =
        !q ||
        player.name.toLowerCase().includes(q) ||
        player.playerId.toLowerCase().includes(q) ||
        (player.city ?? "").toLowerCase().includes(q) ||
        (player.team ?? "").toLowerCase().includes(q);

      return zoneOk && searchOk;
    });
  }, [zone, query, rankings]);

  return (
    <AdminGuard>
      <div className="min-h-[calc(100vh-4rem)] bg-white">
        <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-[260px_1fr]">
          <AdminSidebar />

          <main className="p-8 lg:p-10">
            <div className="section-label">Leaderboard</div>

            <h1 className="section-title">
              MVP <span className="hl">&</span> Player Rankings
            </h1>

            <div className="mt-4 rounded-2xl border border-black/10 bg-[#fafaf7] p-4 text-sm leading-6 text-black/55">
              Rankings are auto-calculated from match statistics. Admin cannot
              manually edit points, runs, wickets, or MVP standings.
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {["All", "West", "North", "South", "East"].map((item) => (
                <button
                  key={item}
                  onClick={() => setZone(item)}
                  className={`ui-font rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] transition ${
                    zone === item
                      ? "border-[#c8ff00] bg-[#c8ff00] text-black"
                      : "border-black/10 bg-white text-black/55 hover:bg-black/[0.03]"
                  }`}
                >
                  {item}
                </button>
              ))}

              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search player, city, team or ID"
                className="mono-font ml-auto min-w-[240px] rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-black outline-none placeholder:text-black/35"
              />
            </div>

            <div className="mt-8 overflow-x-auto glow-card">
              <table className="w-full min-w-[1080px] border-collapse">
                <thead>
                  <tr className="border-b border-black/10">
                    {[
                      "Rank",
                      "Player",
                      "Player ID",
                      "Team",
                      "Zone",
                      "City",
                      "Matches",
                      "Runs",
                      "Wickets",
                      "MVP Points",
                      "Total Points",
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
                  {loading ? (
                    <tr>
                      <td colSpan={11} className="px-4 py-10 text-sm text-black/50">
                        Loading rankings...
                      </td>
                    </tr>
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan={11} className="px-4 py-10 text-sm text-black/50">
                        No ranking data found. Rankings will appear after players
                        and match stats are added.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((player) => (
                      <tr
                        key={player.id}
                        className="border-b border-black/10 hover:bg-[#c8ff00]/[0.08]"
                      >
                        <td className="display-font px-4 py-4 text-3xl text-black">
                          {player.rank}
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c8ff00] text-sm font-bold text-black">
                              {getInitials(player.name)}
                            </div>

                            <div>
                              <div className="ui-font text-sm font-bold uppercase text-black">
                                {player.name}
                              </div>

                              <div className="mono-font mt-1 text-[10px] uppercase tracking-[0.16em] text-black/40">
                                Auto-ranked performer
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="mono-font px-4 py-4 text-sm text-black/55">
                          {player.playerId}
                        </td>

                        <td className="mono-font px-4 py-4 text-sm text-black/55">
                          {player.team}
                        </td>

                        <td className="mono-font px-4 py-4 text-sm text-[#7fb800]">
                          {player.zone || "—"}
                        </td>

                        <td className="mono-font px-4 py-4 text-sm text-black/55">
                          {player.city || "—"}
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

                        <td className="mono-font px-4 py-4 text-sm text-black/55">
                          {player.mvpPoints}
                        </td>

                        <td className="display-font px-4 py-4 text-2xl text-[#7fb800]">
                          {player.points}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}