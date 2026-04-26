"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { liveMatch } from "@/lib/data";

// const stats = [
//   { value: "16", label: "Franchises" },
//   { value: "20+", label: "Selection Cities" },
//   { value: "T10", label: "Format" },
//   { value: "₹999", label: "Entry Fee" },
// ];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/stadium.jpg"
          alt="Stadium background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Main two-column hero grid */}
      <div className="section-shell relative grid min-h-[calc(100vh-10rem)] items-center gap-12 pt-24 pb-32 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="mono-font mb-6 inline-flex items-center gap-3 border border-emerald-500/30 bg-emerald-900/30 px-4 py-2 text-[11px] uppercase tracking-[0.36em] text-emerald-400">
            <span>◆</span>
            <span>Season 2026 · Registrations Open</span>
          </div>

          <h1 className="display-font  text-[clamp(3.8rem,8vw,7.2rem)] uppercase leading-[0.88] tracking-[0.02em] text-white">
            Indian
            <br />
            <span className="text-[#c8ff00]">Tennis</span>
            <br />
            Cricket
            <br />
            Premier
            <br />
            league
          </h1>

          {/* <div className="mt-12 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.08, duration: 0.45 }}
              >
                <div className="display-font text-5xl leading-none text-white">
                  {stat.value}
                </div>
                <div className="mono-font mt-2 text-[11px] uppercase tracking-[0.26em] text-white/45">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div> */}

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/match-center"
              className="ui-font bg-[var(--flame)] px-6 py-3 text-sm font-bold uppercase tracking-[0.24em] text-black transition hover:bg-[var(--flame-soft)]"
            >
              Explore Match Center
            </Link>
            <Link
              href="/teams"
              className="ui-font border border-white/15 px-6 py-3 text-sm font-bold uppercase tracking-[0.24em] text-white transition hover:border-[var(--flame)] hover:text-[var(--flame)]"
            >
              View Teams
            </Link>
          </div>
          <div className="mt-10 max-w-xl">
            <p className="text-white/75 text-base md:text-lg leading-relaxed">
              The Indian Tennis Cricket Premier League (ITCPL) is a revolution built to
              give India’s most loved grassroots sport the stage it deserves.
            </p>

            <p className="mt-3 text-white/60 text-sm md:text-base leading-relaxed">
              From local gullies to professional stadiums, we are transforming raw street
              talent into national icons — <span className="text-[#c8ff00]">Gully se Glory Tak.</span>
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="justify-self-end"
        >
          <div className="w-full max-w-md space-y-3">
            <div className="glow-card border-t-2 border-t-[var(--flame)] bg-black/60 p-6 backdrop-blur-md">
              <div className="mb-5 flex items-center justify-between">
                <div className="mono-font inline-flex items-center gap-2 border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  {liveMatch.badge}
                </div>
                <span className="mono-font text-[11px] uppercase tracking-[0.24em] text-white/35">
                  {liveMatch.group}
                </span>
              </div>

              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6">
                <div>
                  <div
                    className="display-font text-4xl"
                    style={{ color: liveMatch.teamA.color }}
                  >
                    {liveMatch.teamA.short}
                  </div>
                  <div className="mono-font mt-1 text-[11px] uppercase tracking-[0.22em] text-white/45">
                    {liveMatch.teamA.city}
                  </div>
                </div>
                <div className="text-center">
                  <div className="display-font text-6xl leading-none text-[#c8ff00]">
                    {liveMatch.scoreA}
                  </div>
                  <div className="mono-font mt-2 text-[11px] uppercase tracking-[0.22em] text-white/45">
                    {liveMatch.overs}
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className="display-font text-4xl"
                    style={{ color: liveMatch.teamB.color }}
                  >
                    {liveMatch.teamB.short}
                  </div>
                  <div className="mono-font mt-1 text-[11px] uppercase tracking-[0.22em] text-white/45">
                    {liveMatch.teamB.city}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                {liveMatch.balls?.map((ball, index) => (
                  <span
                    key={`${ball.label}-${index}`}
                    className={`mono-font flex h-10 w-10 items-center justify-center rounded-full border text-xs ${
                      ball.type === "four"
                        ? "border-[rgba(200,255,0,0.4)] bg-[#c8ff00] text-black"
                        : ball.type === "six"
                        ? "border-[rgba(232,200,74,0.3)] bg-[var(--gold)] text-black"
                        : ball.type === "wide"
                        ? "border-[rgba(139,92,246,0.3)] bg-[rgba(139,92,246,0.2)] text-violet-300"
                        : ball.type === "dot"
                        ? "border-white/10 bg-white/5 text-white/55"
                        : ball.type === "wicket"
                        ? "border-red-400/30 bg-red-500/10 text-red-300"
                        : "border-[rgba(255,58,0,0.3)] bg-[rgba(255,58,0,0.12)] text-[var(--flame)]"
                    }`}
                  >
                    {ball.label}
                  </span>
                ))}
              </div>

              <div className="mt-5 space-y-3 border-t border-white/10 pt-4 text-sm">
                {liveMatch.batters?.map((batter) => (
                  <div
                    key={batter.name}
                    className="flex items-center justify-between"
                  >
                    <span
                      className={`ui-font ${
                        batter.strike ? "text-white" : "text-white/70"
                      }`}
                    >
                      {batter.name}
                      {batter.strike ? " ★" : ""}
                    </span>
                    <span
                      className={`display-font text-xl ${
                        batter.strike ? "text-[#c8ff00]" : "text-white"
                      }`}
                    >
                      {batter.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glow-card flex flex-wrap items-center justify-between gap-3 px-6 py-5">
              <span className="flex-1 mono-font text-[11px] uppercase tracking-[0.24em] text-white/40">
                42,310+ Registered
              </span>
              <Link
                href={`/match-center/${liveMatch.id}`}
                className="ui-font whitespace-nowrap bg-[#c8ff00] px-4 py-2 text-sm font-bold uppercase tracking-[0.18em] text-black"
              >
                Watch Live →
              </Link>
            </div>
          </div>
        </motion.div>
        <div> </div>
        <div> </div>

        {/* moved upward inside hero */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="pointer-events-none absolute bottom-8 left-0 right-0 z-20"
        >
          <div className="section-shell text-center">
            <p className="display-font text-[clamp(2.8rem,7.5vw,6rem)] uppercase leading-none tracking-[0.03em]">
              <span className="text-[#FF6B35]">Gully Se</span>
              <span className="mx-4 text-[var(--gold)]">★</span>
              <span className="text-[#c8ff00]">Glory</span>
              <span className="mx-3 text-white/60">·</span>
              <span className="text-[#c8ff00]">Tak</span>
            </p>
            <p className="mono-font mt-3 text-[11px] uppercase tracking-[0.42em] text-white/45">
              ★ T10 Format · 16 Teams
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}