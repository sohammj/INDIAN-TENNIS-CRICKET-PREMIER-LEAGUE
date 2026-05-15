"use client";

import { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { useAuth } from "@/components/providers/auth-provider";
import { API_URL } from "@/lib/api";

type Payment = {
  id: string;
  amount: number;
  currency: string;
  status: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
  provider: string;
  providerRef: string | null;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
  player: {
    name: string;
    playerId: string;
  } | null;
  tournament: {
    name: string;
  } | null;
};

export default function AdminPaymentsPage() {
  const { token, loading } = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (loading || !token) return;

    async function fetchPayments() {
      try {
        const res = await fetch(`${API_URL}/api/admin/payments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setPayments(data);
      } finally {
        setPageLoading(false);
      }
    }

    fetchPayments();
  }, [token, loading]);

  return (
      <div className="min-h-[calc(100vh-4rem)] bg-white">
        <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-[260px_1fr]">
          <AdminSidebar />

          <main className="p-8 lg:p-10">
            <div className="section-label">Admin Module</div>
            <h1 className="section-title">Payments</h1>

            <div className="mt-10 overflow-x-auto glow-card p-4">
              <table className="w-full min-w-[980px] border-collapse">
                <thead>
                  <tr className="border-b border-black/10">
                    {[
                      "Transaction ID",
                      "User",
                      "Player",
                      "Tournament",
                      "Amount",
                      "Method",
                      "Status",
                      "Date",
                    ].map((head) => (
                      <th
                        key={head}
                        className="mono-font px-4 py-4 text-left text-xs uppercase tracking-[0.22em] text-black/40"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {pageLoading ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-8 text-sm text-black/50">
                        Loading payments...
                      </td>
                    </tr>
                  ) : payments.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-8 text-sm text-black/50">
                        No payment records found.
                      </td>
                    </tr>
                  ) : (
                    payments.map((row) => (
                      <tr key={row.id} className="border-b border-black/10">
                        <td className="px-4 py-4 text-sm text-black">
                          {row.providerRef || row.id}
                        </td>
                        <td className="px-4 py-4 text-sm text-black/70">
                          {row.user.name}
                          <div className="text-xs text-black/40">{row.user.email}</div>
                        </td>
                        <td className="px-4 py-4 text-sm text-black/70">
                          {row.player?.name || "—"}
                        </td>
                        <td className="px-4 py-4 text-sm text-black/70">
                          {row.tournament?.name || "—"}
                        </td>
                        <td className="px-4 py-4 text-sm text-black/70">
                          ₹{row.amount}
                        </td>
                        <td className="px-4 py-4 text-sm text-black/70">
                          {row.provider}
                        </td>
                        <td className="px-4 py-4 text-sm text-[#7fb800]">
                          {row.status}
                        </td>
                        <td className="px-4 py-4 text-sm text-black/60">
                          {new Date(row.createdAt).toLocaleDateString("en-IN")}
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
  );
}