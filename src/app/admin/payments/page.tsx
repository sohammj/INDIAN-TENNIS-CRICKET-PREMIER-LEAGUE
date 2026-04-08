import { AdminSidebar } from "@/components/layout/admin-sidebar";

const payments = [
  { id: "PAY-001", player: "Rohit Kadam", amount: "₹999", method: "Razorpay", status: "Paid" },
  { id: "PAY-002", player: "Arjun Varma", amount: "₹999", method: "Razorpay", status: "Pending" },
  { id: "PAY-003", player: "Suresh Kumar", amount: "₹1499", method: "UPI", status: "Paid" },
];

export default function AdminPaymentsPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#0b0b0b]">
      <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-[260px_1fr]">
        <AdminSidebar />
        <main className="p-8 lg:p-10">
          <div className="section-label">Admin Module</div>
          <h1 className="section-title">Payments</h1>

          <div className="mt-10 overflow-x-auto glow-card p-4">
            <table className="w-full min-w-[760px] border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  {["Transaction ID", "Player", "Amount", "Method", "Status"].map((head) => (
                    <th key={head} className="mono-font px-4 py-4 text-left text-xs uppercase tracking-[0.22em] text-white/40">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {payments.map((row) => (
                  <tr key={row.id} className="border-b border-white/10">
                    <td className="px-4 py-4 text-sm">{row.id}</td>
                    <td className="px-4 py-4 text-sm text-white/70">{row.player}</td>
                    <td className="px-4 py-4 text-sm text-white/70">{row.amount}</td>
                    <td className="px-4 py-4 text-sm text-white/70">{row.method}</td>
                    <td className="px-4 py-4 text-sm text-[var(--flame)]">{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}