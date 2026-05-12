"use client";

import { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { AdminGuard } from "@/components/providers/admin-guard";
import { useAuth } from "@/components/providers/auth-provider";

type TeamPlayerLink = {
  id: string;
  role: string | null;
  status: string;
  player: {
    id: string;
    playerId: string;
    name: string;
    city: string | null;
    zone: string | null;
  };
};

type Team = {
  id: string;
  name: string;
  city: string | null;
  zone: string | null;
  logoUrl: string | null;
  homeMatches?: unknown[];
  awayMatches?: unknown[];
  players?: TeamPlayerLink[];
};

type Player = {
  id: string;
  playerId: string;
  name: string;
  city: string | null;
  zone: string | null;
};

function getShortName(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

export default function AdminTeamsPlayersPage() {
  const { token, loading: authLoading } = useAuth();

  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  const [showCreate, setShowCreate] = useState(false);
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);

  const [assignment, setAssignment] = useState<Record<string, { playerId: string; role: string }>>({});

  const [form, setForm] = useState({
    name: "",
    city: "",
    zone: "",
    logoUrl: "",
  });

  async function fetchData() {
    try {
      const [teamsRes, playersRes] = await Promise.all([
        fetch("http://localhost:4000/api/teams", {
          cache: "no-store",
        }),
        fetch("http://localhost:4000/api/players", {
          cache: "no-store",
        }),
      ]);

      const [teamsData, playersData] = await Promise.all([
        teamsRes.json(),
        playersRes.json(),
      ]);

      setTeams(teamsData);
      setPlayers(playersData);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function resetForm() {
    setForm({
      name: "",
      city: "",
      zone: "",
      logoUrl: "",
    });

    setEditingTeamId(null);
    setShowCreate(false);
  }

  function startEdit(team: Team) {
    setEditingTeamId(team.id);
    setShowCreate(true);

    setForm({
      name: team.name,
      city: team.city ?? "",
      zone: team.zone ?? "",
      logoUrl: team.logoUrl ?? "",
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Team name is required.");
      return;
    }

    const payload = {
      name: form.name,
      city: form.city || undefined,
      zone: form.zone || undefined,
      logoUrl: form.logoUrl || undefined,
    };

    if (editingTeamId) {
      await fetch(`http://localhost:4000/api/teams/${editingTeamId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("http://localhost:4000/api/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    }

    resetForm();
    fetchData();
  }

  async function handleDelete(teamId: string) {
    const confirmed = window.confirm("Delete this team?");

    if (!confirmed) return;

    await fetch(`http://localhost:4000/api/teams/${teamId}`, {
      method: "DELETE",
    });

    fetchData();
  }

  async function assignPlayerToTeam(teamId: string) {
    const selected = assignment[teamId];

    if (!selected?.playerId) {
      alert("Select a player first.");
      return;
    }

    if (!token) {
      alert("Admin token missing. Please login again.");
      return;
    }

    const res = await fetch(`http://localhost:4000/api/teams/${teamId}/players`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        playerId: selected.playerId,
        role: selected.role || undefined,
      }),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => null);
      alert(error?.message || "Failed to assign player.");
      return;
    }

    setAssignment((prev) => ({
      ...prev,
      [teamId]: {
        playerId: "",
        role: "",
      },
    }));

    fetchData();
  }

  async function removePlayerFromTeam(teamId: string, linkId: string) {
    if (!token) {
      alert("Admin token missing. Please login again.");
      return;
    }

    const confirmed = window.confirm("Remove this player from the team?");

    if (!confirmed) return;

    const res = await fetch(
      `http://localhost:4000/api/teams/${teamId}/players/${linkId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      const error = await res.json().catch(() => null);
      alert(error?.message || "Failed to remove player.");
      return;
    }

    fetchData();
  }

  function getAvailablePlayersForTeam(team: Team) {
    const assignedIds = new Set((team.players ?? []).map((link) => link.player.id));

    return players.filter((player) => !assignedIds.has(player.id));
  }

  return (
    <AdminGuard>
      <div className="min-h-[calc(100vh-4rem)] bg-white">
        <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-[260px_1fr]">
          <AdminSidebar />

          <main className="p-8 lg:p-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="section-label">All Franchises</div>
                <h1 className="section-title">
                  Teams <span className="hl">&</span> City Profiles
                </h1>
              </div>

              <button
                onClick={() => {
                  if (showCreate) {
                    resetForm();
                  } else {
                    setShowCreate(true);
                  }
                }}
                className="ui-font rounded-full bg-[#c8ff00] px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-black"
              >
                {showCreate ? "Close Form" : "Create New Team"}
              </button>
            </div>

            {showCreate ? (
              <form
                onSubmit={handleSubmit}
                className="glow-card mt-10 grid gap-4 p-6 md:grid-cols-2"
              >
                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Team name"
                  className="rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none placeholder:text-black/35"
                />

                <input
                  value={form.city}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, city: e.target.value }))
                  }
                  placeholder="City"
                  className="rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none placeholder:text-black/35"
                />

                <input
                  value={form.zone}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, zone: e.target.value }))
                  }
                  placeholder="Zone"
                  className="rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none placeholder:text-black/35"
                />

                <input
                  value={form.logoUrl}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, logoUrl: e.target.value }))
                  }
                  placeholder="Logo URL optional"
                  className="rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none placeholder:text-black/35"
                />

                <button className="ui-font w-fit rounded-full bg-[#c8ff00] px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-black">
                  {editingTeamId ? "Update Team" : "Save Team"}
                </button>
              </form>
            ) : null}

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {loading || authLoading ? (
                <div className="glow-card p-6 text-black/55">
                  Loading teams...
                </div>
              ) : teams.length === 0 ? (
                <div className="glow-card p-6 text-black/55">
                  No teams found. Create your first team.
                </div>
              ) : (
                teams.map((team) => {
                  const played =
                    (team.homeMatches?.length ?? 0) +
                    (team.awayMatches?.length ?? 0);

                  return (
                    <div
                      key={team.id}
                      className="glow-card group relative overflow-hidden p-7 text-center transition hover:-translate-y-1 hover:border-[var(--line2)]"
                    >
                      <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[#c8ff00] transition-transform duration-300 group-hover:scale-x-100" />

                      <div className="mx-auto mb-4 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#c8ff00]/15 display-font text-2xl font-bold text-black">
                        {getShortName(team.name)}
                      </div>

                      <div className="display-font text-2xl uppercase text-black">
                        {team.name}
                      </div>

                      <div className="mono-font mt-2 text-[10px] uppercase tracking-[0.2em] text-black/40">
                        {team.city || "City TBA"} · {team.zone || "Zone TBA"}
                      </div>

                      <div className="mt-4 text-sm leading-6 text-black/55">
                        Official ITCPL team profile. Roster and match history are
                        fetched from the database.
                      </div>

                      <div className="mt-6 flex items-center justify-around">
                        <div>
                          <div className="display-font text-2xl text-black">
                            {team.players?.length ?? 0}
                          </div>
                          <div className="mono-font text-[10px] uppercase tracking-[0.18em] text-black/40">
                            Players
                          </div>
                        </div>

                        <div>
                          <div className="display-font text-2xl text-black">
                            {played}
                          </div>
                          <div className="mono-font text-[10px] uppercase tracking-[0.18em] text-black/40">
                            Played
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex justify-center gap-2">
                        <button
                          onClick={() => startEdit(team)}
                          className="ui-font rounded-full bg-[#c8ff00] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-black"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(team.id)}
                          className="ui-font rounded-full border border-red-500/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {teams.map((team) => {
                const availablePlayers = getAvailablePlayersForTeam(team);

                return (
                  <div key={`${team.id}-roster`} className="glow-card p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="ui-font text-lg font-bold uppercase tracking-[0.18em] text-[#7fb800]">
                        {team.name} Roster
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3 rounded-2xl border border-black/10 bg-[#fafaf7] p-4 md:grid-cols-[1fr_1fr_auto]">
                      <select
                        value={assignment[team.id]?.playerId ?? ""}
                        onChange={(e) =>
                          setAssignment((prev) => ({
                            ...prev,
                            [team.id]: {
                              playerId: e.target.value,
                              role: prev[team.id]?.role ?? "",
                            },
                          }))
                        }
                        className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black outline-none"
                      >
                        <option value="">Select player</option>
                        {availablePlayers.map((player) => (
                          <option key={player.id} value={player.id}>
                            {player.name} · {player.playerId}
                          </option>
                        ))}
                      </select>

                      <input
                        value={assignment[team.id]?.role ?? ""}
                        onChange={(e) =>
                          setAssignment((prev) => ({
                            ...prev,
                            [team.id]: {
                              playerId: prev[team.id]?.playerId ?? "",
                              role: e.target.value,
                            },
                          }))
                        }
                        placeholder="Role e.g. Batter"
                        className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black outline-none placeholder:text-black/35"
                      />

                      <button
                        onClick={() => assignPlayerToTeam(team.id)}
                        className="ui-font rounded-xl bg-[#c8ff00] px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-black"
                      >
                        Assign
                      </button>
                    </div>

                    {players.length === 0 ? (
                      <div className="mt-4 rounded-2xl border border-black/10 bg-white p-4 text-sm text-black/55">
                        No players exist yet. Create player profiles first.
                      </div>
                    ) : availablePlayers.length === 0 ? (
                      <div className="mt-4 rounded-2xl border border-black/10 bg-white p-4 text-sm text-black/55">
                        All available players are already assigned to this team.
                      </div>
                    ) : null}

                    <div className="mt-5 overflow-x-auto">
                      <table className="w-full min-w-[620px] border-collapse">
                        <thead>
                          <tr className="border-b border-black/10">
                            {[
                              "Player ID",
                              "Name",
                              "Role",
                              "City",
                              "Status",
                              "Action",
                            ].map((head) => (
                              <th
                                key={head}
                                className="mono-font px-3 py-3 text-left text-[10px] uppercase tracking-[0.22em] text-black/40"
                              >
                                {head}
                              </th>
                            ))}
                          </tr>
                        </thead>

                        <tbody>
                          {!team.players || team.players.length === 0 ? (
                            <tr>
                              <td
                                colSpan={6}
                                className="px-3 py-6 text-sm text-black/45"
                              >
                                No players assigned to this team yet.
                              </td>
                            </tr>
                          ) : (
                            team.players.map((link) => (
                              <tr
                                key={link.id}
                                className="border-b border-black/10"
                              >
                                <td className="px-3 py-3 text-xs text-black/50">
                                  {link.player.playerId}
                                </td>
                                <td className="px-3 py-3 text-sm font-medium text-black">
                                  {link.player.name}
                                </td>
                                <td className="px-3 py-3 text-sm text-black/60">
                                  {link.role || "—"}
                                </td>
                                <td className="px-3 py-3 text-sm text-black/60">
                                  {link.player.city || "—"}
                                </td>
                                <td className="px-3 py-3 text-sm text-[#7fb800]">
                                  {link.status}
                                </td>
                                <td className="px-3 py-3">
                                  <button
                                    onClick={() =>
                                      removePlayerFromTeam(team.id, link.id)
                                    }
                                    className="ui-font rounded-full border border-red-500/20 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-red-500"
                                  >
                                    Remove
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}