"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useAuth } from "@/components/providers/auth-provider";
import { API_URL } from "@/lib/api";

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

type AdminOverview = {
  stats: {
    totalUsers: number;
    totalRegisteredPlayers: number;
    totalTeams: number;
    totalMatches: number;
    matchesToday: number;
    paymentsCompleted: number;
  };
  teamsAndPlayers: {
    id: string;
    playerId: string;
    name: string;
    city: string | null;
    zone: string | null;
    role: string | null;
    status: string;
    team: string;
  }[];
  rankings: {
    id: string;
    playerId: string;
    name: string;
    city: string | null;
    zone: string | null;
    team: string;
    mvpPoints: number;
    totalRuns: number;
    totalWickets: number;
  }[];
  recentMatches: {
    id: string;
    tournament: string;
    teamA: string;
    teamB: string;
    venue: string | null;
    matchDate: string | null;
    status: string;
  }[];
};

function formatDate(date: string | null) {
  if (!date) return "Date TBA";

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export default function AdminPage() {
  const { token, loading } = useAuth();

  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!token) return;

    async function fetchOverview() {
      try {
        const res = await fetch(`${API_URL}/api/admin/overview`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          setOverview(null);
          return;
        }

        const data = await res.json();
        setOverview(data);
      } finally {
        setPageLoading(false);
      }
    }

    fetchOverview();
  }, [token, loading]);

  const statCards = overview
    ? [
        ["Registered Players", overview.stats.totalRegisteredPlayers],
        ["Teams", overview.stats.totalTeams],
        ["Matches Today", overview.stats.matchesToday],
        ["Payments Completed", overview.stats.paymentsCompleted],
      ]
    : [];

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

            {pageLoading ? (
              <div className="mt-10 rounded-2xl border border-black/10 bg-[#fafaf7] p-6 text-black/55">
                Loading admin overview...
              </div>
            ) : !overview ? (
              <div className="mt-10 rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-red-500">
                Could not load admin overview.
              </div>
            ) : (
              <>
                <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {statCards.map(([label, value]) => (
                    <div key={label} className="glow-card p-6">
                      <div className="mono-font text-[10px] uppercase tracking-[0.22em] text-black/40">
                        {label}
                      </div>
                      <div className="display-font mt-3 text-5xl text-black">
                        {value}
                      </div>
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
                            {["Player ID", "Name", "City", "Role", "Team", "Status"].map(
                              (head) => (
                                <th
                                  key={head}
                                  className="mono-font px-3 py-3 text-left text-[10px] uppercase tracking-[0.22em] text-black/40"
                                >
                                  {head}
                                </th>
                              )
                            )}
                          </tr>
                        </thead>

                        <tbody>
                          {overview.teamsAndPlayers.length === 0 ? (
                            <tr>
                              <td
                                colSpan={6}
                                className="px-3 py-6 text-sm text-black/45"
                              >
                                No team-player assignments found yet.
                              </td>
                            </tr>
                          ) : (
                            overview.teamsAndPlayers.map((player) => (
                              <tr
                                key={player.id}
                                className="border-b border-black/10"
                              >
                                <td className="px-3 py-3 text-xs text-black/50">
                                  {player.playerId}
                                </td>
                                <td className="px-3 py-3 text-sm font-medium text-black">
                                  {player.name}
                                </td>
                                <td className="px-3 py-3 text-sm text-black/60">
                                  {player.city || "—"}
                                </td>
                                <td className="px-3 py-3 text-sm text-black/60">
                                  {player.role || "—"}
                                </td>
                                <td className="px-3 py-3 text-sm text-black/60">
                                  {player.team}
                                </td>
                                <td className="px-3 py-3 text-sm text-[#7fb800]">
                                  {player.status}
                                </td>
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
                      {overview.rankings.length === 0 ? (
                        <div className="rounded-2xl border border-black/10 bg-[#fafaf7] p-4 text-sm text-black/55">
                          No ranking data yet.
                        </div>
                      ) : (
                        overview.rankings.map((player, index) => (
                          <div
                            key={player.id}
                            className="flex items-center justify-between rounded-2xl border border-black/10 bg-[#fafaf7] p-4"
                          >
                            <div>
                              <div className="ui-font text-sm font-bold uppercase text-black">
                                #{index + 1} · {player.name}
                              </div>
                              <div className="mono-font mt-1 text-[10px] uppercase tracking-[0.18em] text-black/40">
                                {player.playerId} · {player.team}
                              </div>
                              <div className="mt-2 text-xs text-black/45">
                                Runs: {player.totalRuns} · Wickets:{" "}
                                {player.totalWickets}
                              </div>
                            </div>

                            <div className="display-font text-2xl text-[#7fb800]">
                              {player.mvpPoints}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-10 grid gap-6 xl:grid-cols-2">
                  <div className="glow-card p-6">
                    <div className="ui-font text-lg font-bold uppercase tracking-[0.18em] text-[#7fb800]">
                      Recent Matches
                    </div>

                    <div className="mt-5 space-y-3">
                      {overview.recentMatches.length === 0 ? (
                        <div className="rounded-2xl border border-black/10 bg-[#fafaf7] p-4 text-sm text-black/55">
                          No matches created yet.
                        </div>
                      ) : (
                        overview.recentMatches.map((match) => (
                          <div
                            key={match.id}
                            className="rounded-2xl border border-black/10 bg-[#fafaf7] p-4"
                          >
                            <div className="ui-font text-sm font-bold uppercase text-black">
                              {match.teamA} vs {match.teamB}
                            </div>

                            <div className="mono-font mt-2 text-[10px] uppercase tracking-[0.18em] text-black/40">
                              {match.tournament} · {match.venue || "Venue TBA"}
                            </div>

                            <div className="mt-2 text-sm text-black/55">
                              {formatDate(match.matchDate)} ·{" "}
                              <span className="text-[#7fb800]">
                                {match.status}
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="glow-card p-6">
                    <div className="ui-font text-lg font-bold uppercase tracking-[0.18em] text-[#7fb800]">
                      Admin Notes
                    </div>

                    <div className="mt-5 rounded-2xl border border-black/10 bg-[#fafaf7] p-4 text-sm leading-6 text-black/60">
                      News and videos will be managed through Sanity later.
                      This dashboard is now connected to your PostgreSQL data for
                      users, players, teams, matches, rankings, and payments.
                    </div>
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
  );
}