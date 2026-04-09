"use client";

import { useState } from "react";
import { dashboardPerformance, dashboardStats, discoverTournaments } from "@/lib/data";
import { PaymentModal } from "@/components/ui/payment-modal";

function PerfCard({
  title,
  rows,
}: {
  title: string;
  rows: string[][];
}) {
  return (
    <div className="glow-card p-6">
      <div className="ui-font text-lg font-bold uppercase tracking-[0.18em] text-[var(--flame)]">
        {title}
      </div>
      <div className="mt-5 space-y-3">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between border-b border-white/10 pb-3 text-sm">
            <span className="mono-font uppercase tracking-[0.18em] text-white/45">{label}</span>
            <span className="ui-font text-base font-bold uppercase">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [selectedTournament, setSelectedTournament] = useState<null | {
    title: string;
    amount: string;
  }>(null);

  return (
    <div
      className="min-h-[calc(100vh-4rem)] bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(8,8,8,0.9), rgba(8,8,8,0.95)), url('/stadium.jpg')",
      }}
    >
      <div className="section-shell section-space">
        <div className="section-label">Player Dashboard</div>
        <h1 className="section-title">
          Performance <span className="hl">Overview</span>
        </h1>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dashboardStats.map((item) => (
            <div key={item.label} className="glow-card p-6">
              <div className="mono-font text-[10px] uppercase tracking-[0.22em] text-white/40">
                {item.label}
              </div>
              <div className="display-font mt-3 text-5xl">{item.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-3">
          <PerfCard title="Batting" rows={dashboardPerformance.batting} />
          <PerfCard title="Bowling" rows={dashboardPerformance.bowling} />
          <PerfCard title="Fielding / Profile" rows={dashboardPerformance.fielding} />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="glow-card p-6">
            <div className="ui-font text-lg font-bold uppercase tracking-[0.18em] text-[var(--flame)]">
              Discover Tournaments
            </div>

            <div className="mt-5 space-y-4">
              {discoverTournaments.map((tour) => (
                <div key={tour.id} className="border border-white/10 bg-white/[0.02] p-4">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="ui-font text-lg font-bold uppercase">{tour.title}</div>
                      <div className="mono-font mt-2 text-[10px] uppercase tracking-[0.18em] text-white/40">
                        {tour.city} · {tour.date} · {tour.format}
                      </div>
                      <div className="mt-3 text-sm text-white/55">{tour.slots}</div>
                    </div>

                    <div className="text-right">
                      <div className="display-font text-3xl text-[var(--flame)]">{tour.fee}</div>
                      <button
                        onClick={() =>
                          setSelectedTournament({
                            title: tour.title,
                            amount: tour.fee,
                          })
                        }
                        className="ui-font mt-3 bg-[var(--flame)] px-4 py-2 text-sm font-bold uppercase tracking-[0.18em] text-black"
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
            <div className="ui-font text-lg font-bold uppercase tracking-[0.18em] text-[var(--flame)]">
              Profile Settings
            </div>
            <div className="mt-5 grid gap-4">
              <input defaultValue="Rohit Kadam" className="border border-white/10 bg-black/40 px-4 py-3 outline-none" />
              <input defaultValue="rohit@itcpl.com" className="border border-white/10 bg-black/40 px-4 py-3 outline-none" />
              <input defaultValue="+91 98765 43210" className="border border-white/10 bg-black/40 px-4 py-3 outline-none" />
              <input defaultValue="Mumbai" className="border border-white/10 bg-black/40 px-4 py-3 outline-none" />
              <input defaultValue="Linking Road, Bandra West" className="border border-white/10 bg-black/40 px-4 py-3 outline-none" />
              <button className="ui-font w-fit bg-[var(--flame)] px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-black">
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
    </div>
  );
}