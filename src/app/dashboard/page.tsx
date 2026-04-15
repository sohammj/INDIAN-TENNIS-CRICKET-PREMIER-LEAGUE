"use client";

import { useState } from "react";
import { dashboardPerformance, dashboardStats, discoverTournaments } from "@/lib/data";
import { PaymentModal } from "@/components/ui/payment-modal";
import { StadiumBg } from "@/components/ui/stadium-bg";

function PerfCard({
  title,
  rows,
}: {
  title: string;
  rows: string[][];
}) {
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
            <span className="mono-font uppercase tracking-[0.18em] text-black/45">{label}</span>
            <span className="ui-font text-base font-bold uppercase text-black">{value}</span>
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
    <StadiumBg overlay="light">
        <div className="section-shell section-space">
          <div className="section-label">Player Dashboard</div>
          <h1 className="section-title">
            Performance <span className="hl">Overview</span>
          </h1>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {dashboardStats.map((item) => (
              <div key={item.label} className="glow-card p-6">
                <div className="mono-font text-[10px] uppercase tracking-[0.22em] text-black/40">
                  {item.label}
                </div>
                <div className="display-font mt-3 text-5xl text-black">{item.value}</div>
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
              <div className="ui-font text-lg font-bold uppercase tracking-[0.18em] text-[#7fb800]">
                Discover Tournaments
              </div>

              <div className="mt-5 space-y-4">
                {discoverTournaments.map((tour) => (
                  <div key={tour.id} className="rounded-2xl border border-black/10 bg-[#fafaf7] p-4">
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
                        <div className="display-font text-3xl text-[#7fb800]">{tour.fee}</div>
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
                  defaultValue="Rohit Kadam"
                  className="rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none"
                />
                <input
                  defaultValue="rohit@itcpl.com"
                  className="rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none"
                />
                <input
                  defaultValue="+91 98765 43210"
                  className="rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none"
                />
                <input
                  defaultValue="Mumbai"
                  className="rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none"
                />
                <input
                  defaultValue="Linking Road, Bandra West"
                  className="rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none"
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