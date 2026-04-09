"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/components/providers/auth-provider";
import { TennisBall } from "@/components/ui/tennis-ball";

const publicNav = [
  { label: "Home", href: "/" },
  { label: "Match Center", href: "/match-center" },
  { label: "Rankings", href: "/rankings" },
  { label: "Teams", href: "/teams" },
  { label: "Videos", href: "/videos" },
  { label: "News", href: "/news" },
  { label: "More", href: "/more" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const navItems = [...publicNav];

  if (user?.role === "player") {
    navItems.push({ label: "Dashboard", href: "/dashboard" });
  }

  if (user?.role === "admin") {
    navItems.push({ label: "Admin", href: "/admin" });
  }

  return (
    // <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur-xl">
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-gradient-to-b from-white/10 via-white/5 to-transparent backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* <Link href="/" className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[var(--flame)]" />
          <span className="display-font text-2xl font-semibold uppercase tracking-[0.28em]">
            ITC <span className="text-[var(--flame)]">PL</span>
          </span>
        </Link> */}
        <Link href="/" className="flex items-center gap-3">
            <TennisBall />
            <span className="display-font text-2xl font-semibold uppercase tracking-[0.28em]">
                ITC <span className="text-[var(--flame)]">PL</span>
            </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className="ui-font relative text-sm font-semibold uppercase tracking-[0.28em] text-white/60 transition hover:text-white"
              >
                {item.label}
                {active ? (
                  <motion.span
                    layoutId="header-active"
                    className="absolute -bottom-[22px] left-0 h-[2px] w-full bg-[var(--flame)]"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {!user ? (
            <>
              <Link
                href="/auth/sign-in"
                className="ui-font border border-[var(--flame)] px-4 py-2 text-sm font-bold uppercase tracking-[0.22em] text-[var(--flame)] transition hover:bg-[var(--flame)] hover:text-black"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="ui-font bg-[var(--flame)] px-4 py-2 text-sm font-bold uppercase tracking-[0.22em] text-black transition hover:bg-[var(--flame-soft)]"
              >
                Register - ₹999
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[var(--flame)] to-orange-400 display-font text-sm">
                  {user.initials}
                </div>
                <div className="ui-font text-sm uppercase tracking-[0.18em] text-white/70">
                  {user.name}
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className="ui-font border border-white/15 px-4 py-2 text-sm font-bold uppercase tracking-[0.22em] text-white transition hover:border-[var(--flame)] hover:text-[var(--flame)]"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}