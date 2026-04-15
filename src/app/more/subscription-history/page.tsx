import { StadiumBg } from "@/components/ui/stadium-bg";

const subscriptions = [
  { id: "SUB-001", plan: "Player Entry", amount: "₹999", status: "Paid", date: "09 Apr 2026" },
  { id: "SUB-002", plan: "Weekend Tournament", amount: "₹1499", status: "Pending", date: "15 Apr 2026" },
];

export default function SubscriptionHistoryPage() {
  return (
    <StadiumBg overlay="light">
      <div className="min-h-screen flex flex-col pt-24">
        
        <div className="flex-1 section-shell section-space">
          <div className="section-label">User Records</div>

          <h1 className="section-title">Subscription History</h1>

          <div className="mt-10 overflow-x-auto glow-card p-4">
            <table className="w-full min-w-[700px] border-collapse">
              <thead>
                <tr className="border-b border-black/10">
                  {["Subscription ID", "Plan", "Amount", "Status", "Date"].map((head) => (
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
                {subscriptions.map((item) => (
                  <tr key={item.id} className="border-b border-black/10">
                    <td className="px-4 py-4 text-sm text-black">{item.id}</td>
                    <td className="px-4 py-4 text-sm text-black/70">{item.plan}</td>
                    <td className="px-4 py-4 text-sm text-black/70">{item.amount}</td>
                    <td className="px-4 py-4 text-sm text-[#7fb800]">{item.status}</td>
                    <td className="px-4 py-4 text-sm text-black/70">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </StadiumBg>
  );
}