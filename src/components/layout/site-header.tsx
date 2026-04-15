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

  const isHome = pathname === "/";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition ${
        isHome
          ? "border-white/20 bg-white/20"
          : "border-black/10 bg-white/90"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <TennisBall />
          <span className="text-black display-font text-2xl font-semibold uppercase tracking-[0.28em]">
            ITC <span className="text-[#c8ff00]">PL</span>
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
                className="ui-font relative text-sm font-semibold uppercase tracking-[0.28em] text-black/60 transition hover:text-[#c8ff00]"
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="header-active"
                    className="absolute -bottom-[22px] left-0 h-[2px] w-full bg-[#c8ff00]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {!user ? (
            <>
              <Link
                href="/auth/sign-in"
                className={`ui-font px-4 py-2 text-sm font-bold uppercase tracking-[0.22em] transition ${
                  isHome
                    ? "border border-white/20 text-black hover:border-black hover:text-black"
                    : "border border-black/10 text-black hover:border-black hover:text-black"
                }`}
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="ui-font bg-[#c8ff00] px-4 py-2 text-sm font-bold uppercase tracking-[0.22em] text-black transition hover:bg-[#d4ff33]"
              >
                Register — ₹999
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <div className="display-font flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#c8ff00] to-lime-400 text-sm text-black">
                  {user.initials}
                </div>
                <div
                  className={`ui-font text-sm uppercase tracking-[0.18em] ${
                    isHome ? "text-white/70" : "text-black/70"
                  }`}
                >
                  {user.name}
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className={`ui-font px-4 py-2 text-sm font-bold uppercase tracking-[0.22em] transition ${
                  isHome
                    ? "border border-white/15 text-white hover:border-[#c8ff00] hover:text-[#c8ff00]"
                    : "border border-black/10 text-black hover:border-[#c8ff00] hover:text-[#7fb800]"
                }`}
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