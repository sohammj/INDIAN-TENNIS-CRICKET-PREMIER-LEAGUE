"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-r border-gray-200 bg-white p-6">
      <div className="mono-font border-b border-gray-200 pb-4 text-[11px] uppercase tracking-[0.24em] text-gray-400">
        Admin Panel · ITCPL 2026
      </div>

      <div className="mt-6 space-y-1">
        {adminNav.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block ui-font px-4 py-3 text-sm font-bold uppercase tracking-[0.18em] transition ${
                active
                  ? "border-l-2 border-[var(--flame)] bg-[rgba(255,58,0,0.06)] text-[var(--flame)]"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}