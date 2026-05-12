"use client";

import { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { AdminGuard } from "@/components/providers/admin-guard";
import { API_URL } from "@/lib/api";

type Team = {
  id: string;
  name: string;
  city: string | null;
  zone: string | null;
};

type Tournament = {
  id: string;
  name: string;
  city: string | null;
  zone: string | null;
};

type Match = {
  id: string;
  tournamentId: string | null;
  teamAId: string;
  teamBId: string;
  venue: string | null;
  matchDate: string | null;
  status: string;
  summary: string | null;
  tournament: Tournament | null;
  teamA: Team;
  teamB: Team;
};

function formatDate(date: string | null) {
  if (!date) return "Date TBA";

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export default function AdminMatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);

  const [form, setForm] = useState({
    tournamentId: "",
    teamAId: "",
    teamBId: "",
    venue: "",
    matchDate: "",
    status: "UPCOMING",
  });

  async function fetchData() {
    try {
      const [matchesRes, teamsRes, tournamentsRes] = await Promise.all([
        fetch(`${API_URL}/api/matches`, { cache: "no-store" }),
        fetch(`${API_URL}/api/teams`, { cache: "no-store" }),
        fetch(`${API_URL}/api/tournaments`, { cache: "no-store" }),
      ]);

      const [matchesData, teamsData, tournamentsData] = await Promise.all([
        matchesRes.json(),
        teamsRes.json(),
        tournamentsRes.json(),
      ]);

      setMatches(matchesData);
      setTeams(teamsData);
      setTournaments(tournamentsData);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleCreateMatch(e: React.FormEvent) {
    e.preventDefault();

    if (!form.teamAId || !form.teamBId) {
      alert("Select both teams.");
      return;
    }

    if (form.teamAId === form.teamBId) {
      alert("Team A and Team B cannot be the same.");
      return;
    }

    await fetch("http://localhost:4000/api/matches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tournamentId: form.tournamentId || undefined,
        teamAId: form.teamAId,
        teamBId: form.teamBId,
        venue: form.venue || undefined,
        matchDate: form.matchDate
          ? new Date(form.matchDate).toISOString()
          : undefined,
        status: form.status,
      }),
    });

    setForm({
      tournamentId: "",
      teamAId: "",
      teamBId: "",
      venue: "",
      matchDate: "",
      status: "UPCOMING",
    });

    setShowCreate(false);
    fetchData();
  }

  return (
    <AdminGuard>
      <div className="min-h-[calc(100vh-4rem)] bg-white">
        <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-[260px_1fr]">
          <AdminSidebar />

          <main className="p-8 lg:p-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="section-label">Admin Module</div>
                <h1 className="section-title">Match Management</h1>
              </div>

              <button
                onClick={() => setShowCreate((prev) => !prev)}
                className="ui-font rounded-full bg-[#c8ff00] px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-black"
              >
                {showCreate ? "Close Form" : "Create New Match"}
              </button>
            </div>

            {showCreate ? (
              <form
                onSubmit={handleCreateMatch}
                className="glow-card mt-10 grid gap-4 p-6 md:grid-cols-2"
              >
                <select
                  value={form.tournamentId}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      tournamentId: e.target.value,
                    }))
                  }
                  className="rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none"
                >
                  <option value="">Select Tournament Optional</option>
                  {tournaments.map((tournament) => (
                    <option key={tournament.id} value={tournament.id}>
                      {tournament.name}
                    </option>
                  ))}
                </select>

                <input
                  value={form.venue}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, venue: e.target.value }))
                  }
                  placeholder="Venue"
                  className="rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none placeholder:text-black/35"
                />

                <select
                  value={form.teamAId}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, teamAId: e.target.value }))
                  }
                  className="rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none"
                >
                  <option value="">Select Team A</option>
                  {teams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>

                <select
                  value={form.teamBId}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, teamBId: e.target.value }))
                  }
                  className="rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none"
                >
                  <option value="">Select Team B</option>
                  {teams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>

                <input
                  type="datetime-local"
                  value={form.matchDate}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      matchDate: e.target.value,
                    }))
                  }
                  className="rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none"
                />

                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, status: e.target.value }))
                  }
                  className="rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none"
                >
                  <option value="UPCOMING">UPCOMING</option>
                  <option value="LIVE">LIVE</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>

                <button className="ui-font w-fit rounded-full bg-[#c8ff00] px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-black">
                  Save Match
                </button>
              </form>
            ) : null}

            <div className="mt-10 space-y-4">
              {loading ? (
                <div className="glow-card p-6 text-black/55">
                  Loading matches...
                </div>
              ) : matches.length === 0 ? (
                <div className="glow-card p-6 text-black/55">
                  No matches found. Create your first match.
                </div>
              ) : (
                matches.map((match) => (
                  <div key={match.id} className="glow-card p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <div className="ui-font text-xl font-bold uppercase text-black">
                          {match.teamA.name} vs {match.teamB.name}
                        </div>

                        <div className="mono-font mt-2 text-xs uppercase tracking-[0.2em] text-black/40">
                          {match.venue || "Venue TBA"} ·{" "}
                          {formatDate(match.matchDate)}
                        </div>

                        <div className="mono-font mt-2 text-[10px] uppercase tracking-[0.18em] text-black/35">
                          {match.tournament?.name || "Tournament TBA"}
                        </div>
                      </div>

                      <div className="mono-font text-sm uppercase tracking-[0.2em] text-[#7fb800]">
                        {match.status}
                      </div>
                    </div>

                    <div className="mt-5 flex gap-3">
                      <button className="ui-font rounded-full bg-[#c8ff00] px-4 py-2 text-sm font-bold uppercase tracking-[0.16em] text-black">
                        Edit Match
                      </button>

                      <button className="ui-font rounded-full border border-black/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.16em] text-black">
                        View Summary
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}