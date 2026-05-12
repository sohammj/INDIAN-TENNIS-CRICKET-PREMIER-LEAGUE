"use client";

import { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { AdminGuard } from "@/components/providers/admin-guard";
import { useAuth } from "@/components/providers/auth-provider";

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN" | "SCORER";
  createdAt: string;
  playerProfile: {
    id: string;
    playerId: string;
    phone: string | null;
    city: string | null;
    zone: string | null;
  } | null;
};

export default function AdminUsersPage() {
  const { token, loading } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (loading || !token) return;

    async function fetchUsers() {
      try {
        const res = await fetch("http://localhost:4000/api/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setUsers(data);
      } finally {
        setPageLoading(false);
      }
    }

    fetchUsers();
  }, [token, loading]);

  return (
    <AdminGuard>
      <div className="min-h-[calc(100vh-4rem)] bg-white">
        <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-[260px_1fr]">
          <AdminSidebar />

          <main className="p-8 lg:p-10">
            <div className="section-label">Admin Module</div>
            <h1 className="section-title">User Management</h1>

            <div className="mt-10 overflow-x-auto glow-card p-4">
              <table className="w-full min-w-[900px] border-collapse">
                <thead>
                  <tr className="border-b border-black/10">
                    {["Name", "Email", "Role", "Player ID", "City", "Zone", "Joined"].map(
                      (head) => (
                        <th
                          key={head}
                          className="mono-font px-4 py-4 text-left text-xs uppercase tracking-[0.22em] text-black/40"
                        >
                          {head}
                        </th>
                      )
                    )}
                  </tr>
                </thead>

                <tbody>
                  {pageLoading ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-sm text-black/50">
                        Loading users...
                      </td>
                    </tr>
                  ) : users.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-sm text-black/50">
                        No users found.
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user.id} className="border-b border-black/10">
                        <td className="px-4 py-4 text-sm font-medium text-black">
                          {user.name}
                        </td>
                        <td className="px-4 py-4 text-sm text-black/60">
                          {user.email}
                        </td>
                        <td className="px-4 py-4 text-sm text-[#7fb800]">
                          {user.role}
                        </td>
                        <td className="px-4 py-4 text-sm text-black/60">
                          {user.playerProfile?.playerId || "—"}
                        </td>
                        <td className="px-4 py-4 text-sm text-black/60">
                          {user.playerProfile?.city || "—"}
                        </td>
                        <td className="px-4 py-4 text-sm text-black/60">
                          {user.playerProfile?.zone || "—"}
                        </td>
                        <td className="px-4 py-4 text-sm text-black/60">
                          {new Date(user.createdAt).toLocaleDateString("en-IN")}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}