"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { discoverTournaments } from "@/lib/data";
import { PaymentModal } from "@/components/ui/payment-modal";
import { StadiumBg } from "@/components/ui/stadium-bg";
import { useAuth } from "@/components/providers/auth-provider";

type DashboardData = {
  user: {
    id: string;
    name: string;
    email: string;
    role: "USER" | "ADMIN" | "SCORER";
    createdAt: string;
  };
  playerProfile: {
    id: string;
    playerId: string;
    phone: string | null;
    city: string | null;
    zone: string | null;
    address: string | null;
    photoUrl: string | null;
  } | null;
  overview: {
    matchesPlayed: number;
    tournamentsPlayed: number;
    totalRuns: number;
    totalWickets: number;
    paymentsMade: number;
    mvpPoints: number;
  };
  batting: {
    runs: number;
    ballsFaced: number;
    strikeRate: number;
    average: number;
    fours: number;
    sixes: number;
  };
  bowling: {
    overs: number;
    wickets: number;
    runsConceded: number;
    economy: number;
    dotBalls: number;
  };
  fielding: {
    catches: number;
    runOuts: number;
  };
  tournaments: {
    id: string;
    name: string;
    city: string | null;
    zone: string | null;
    status: string;
    registrationStatus: string;
  }[];
  teams: {
    id: string;
    name: string;
    city: string | null;
    zone: string | null;
    role: string | null;
    status: string;
  }[];
};

function PerfCard({ title, rows }: { title: string; rows: string[][] }) {
  return (
    <div className="glow-card p-6">
      <div className="ui-font text-lg font-bold uppercase tracking-[0.18em] text-[#7fb800]">
        {title}
      </div>

      <div className="mt-5 space-y-3">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between border-b border-black/10 pb-3 text-sm"
          >
            <span className="mono-font uppercase tracking-[0.18em] text-black/45">
              {label}
            </span>
            <span className="ui-font text-base font-bold uppercase text-black">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, token, loading } = useAuth();

  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [selectedTournament, setSelectedTournament] = useState<null | {
    title: string;
    amount: string;
  }>(null);

  useEffect(() => {
    if (loading) return;

    if (!user || !token) {
      router.push("/auth/sign-in");
      return;
    }

    async function fetchDashboard() {
      try {
        const res = await fetch("http://localhost:4000/api/dashboard/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          router.push("/auth/sign-in");
          return;
        }

        const data = await res.json();
        setDashboard(data);
      } catch {
        router.push("/auth/sign-in");
      } finally {
        setPageLoading(false);
      }
    }

    fetchDashboard();
  }, [user, token, loading, router]);

  const statCards = useMemo(() => {
    if (!dashboard) return [];

    return [
      ["Matches Played", dashboard.overview.matchesPlayed],
      ["Tournaments Played", dashboard.overview.tournamentsPlayed],
      ["Total Runs", dashboard.overview.totalRuns],
      ["Total Wickets", dashboard.overview.totalWickets],
    ];
  }, [dashboard]);

  if (loading || pageLoading) return null;
  if (!user || !dashboard) return null;

  return (
    <StadiumBg overlay="light">
      <div className="section-shell section-space">
        <div className="section-label">Player Dashboard</div>

        <h1 className="section-title">
          Performance <span className="hl">Overview</span>
        </h1>

        <div className="mt-4 rounded-2xl border border-black/10 bg-white/70 p-4">
          <div className="ui-font text-lg font-bold uppercase text-black">
            Welcome, {dashboard.user.name}
          </div>

          <div className="mono-font mt-2 text-[10px] uppercase tracking-[0.18em] text-black/45">
            {dashboard.user.email} · {dashboard.user.role}
          </div>
        </div>

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

        <div className="mt-10 grid gap-6 xl:grid-cols-3">
          <PerfCard
            title="Batting"
            rows={[
              ["Runs", String(dashboard.batting.runs)],
              ["Balls Faced", String(dashboard.batting.ballsFaced)],
              ["Strike Rate", String(dashboard.batting.strikeRate)],
              ["Average", String(dashboard.batting.average)],
              ["4s / 6s", `${dashboard.batting.fours} / ${dashboard.batting.sixes}`],
            ]}
          />

          <PerfCard
            title="Bowling"
            rows={[
              ["Overs", String(dashboard.bowling.overs)],
              ["Wickets", String(dashboard.bowling.wickets)],
              ["Runs Conceded", String(dashboard.bowling.runsConceded)],
              ["Economy", String(dashboard.bowling.economy)],
              ["Dot Balls", String(dashboard.bowling.dotBalls)],
            ]}
          />

          <PerfCard
            title="Fielding / Profile"
            rows={[
              ["Catches", String(dashboard.fielding.catches)],
              ["Run Outs", String(dashboard.fielding.runOuts)],
              ["MVP Points", String(dashboard.overview.mvpPoints)],
              ["Payments Made", String(dashboard.overview.paymentsMade)],
              ["Teams", String(dashboard.teams.length)],
            ]}
          />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="glow-card p-6">
            <div className="ui-font text-lg font-bold uppercase tracking-[0.18em] text-[#7fb800]">
              My Registered Tournaments
            </div>

            <div className="mt-5 space-y-4">
              {dashboard.tournaments.length === 0 ? (
                <div className="rounded-2xl border border-black/10 bg-[#fafaf7] p-4 text-sm text-black/55">
                  You have not registered for any tournaments yet.
                </div>
              ) : (
                dashboard.tournaments.map((tour) => (
                  <div
                    key={tour.id}
                    className="rounded-2xl border border-black/10 bg-[#fafaf7] p-4"
                  >
                    <div className="ui-font text-lg font-bold uppercase text-black">
                      {tour.name}
                    </div>
                    <div className="mono-font mt-2 text-[10px] uppercase tracking-[0.18em] text-black/40">
                      {tour.city || "City TBA"} · {tour.zone || "Zone TBA"} ·{" "}
                      {tour.status}
                    </div>
                    <div className="mt-3 text-sm text-[#7fb800]">
                      Registration: {tour.registrationStatus}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="ui-font mt-8 text-lg font-bold uppercase tracking-[0.18em] text-[#7fb800]">
              Discover Tournaments
            </div>

            <div className="mt-5 space-y-4">
              {discoverTournaments.map((tour) => (
                <div
                  key={tour.id}
                  className="rounded-2xl border border-black/10 bg-[#fafaf7] p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="ui-font text-lg font-bold uppercase text-black">
                        {tour.title}
                      </div>
                      <div className="mono-font mt-2 text-[10px] uppercase tracking-[0.18em] text-black/40">
                        {tour.city} · {tour.date} · {tour.format}
                      </div>
                      <div className="mt-3 text-sm text-black/55">{tour.slots}</div>
                    </div>

                    <div className="text-right">
                      <div className="display-font text-3xl text-[#7fb800]">
                        {tour.fee}
                      </div>
                      <button
                        onClick={() =>
                          setSelectedTournament({
                            title: tour.title,
                            amount: tour.fee,
                          })
                        }
                        className="ui-font mt-3 rounded-full bg-[#c8ff00] px-4 py-2 text-sm font-bold uppercase tracking-[0.18em] text-black"
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glow-card p-6">
            <div className="ui-font text-lg font-bold uppercase tracking-[0.18em] text-[#7fb800]">
              Profile Settings
            </div>

            <div className="mt-5 grid gap-4">
              <input
                defaultValue={dashboard.user.name}
                className="rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none"
              />

              <input
                defaultValue={dashboard.user.email}
                className="rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none"
              />

              <input
                defaultValue={dashboard.playerProfile?.phone ?? ""}
                placeholder="Phone number"
                className="rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none placeholder:text-black/35"
              />

              <input
                defaultValue={dashboard.playerProfile?.city ?? ""}
                placeholder="City"
                className="rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none placeholder:text-black/35"
              />

              <input
                defaultValue={dashboard.playerProfile?.address ?? ""}
                placeholder="Address"
                className="rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none placeholder:text-black/35"
              />

              <button className="ui-font w-fit rounded-full bg-[#c8ff00] px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-black">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <PaymentModal
        open={!!selectedTournament}
        onClose={() => setSelectedTournament(null)}
        tournamentTitle={selectedTournament?.title ?? ""}
        amount={selectedTournament?.amount ?? ""}
      />
    </StadiumBg>
  );
}