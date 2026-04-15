import { AdminSidebar } from "@/components/layout/admin-sidebar";

const users = [
  { name: "Rohit Kadam", email: "rohit@itcpl.com", role: "Player", status: "Active" },
  { name: "Arjun Varma", email: "arjun@itcpl.com", role: "Player", status: "Pending" },
  { name: "League Admin", email: "admin@itcpl.com", role: "Admin", status: "Active" },
];

export default function AdminUsersPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white">
      <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-[260px_1fr]">
        <AdminSidebar />
        <main className="p-8 lg:p-10">
          <div className="section-label">Admin Module</div>
          <h1 className="section-title">User Management</h1>

          <div className="mt-10 overflow-x-auto glow-card p-4">
            <table className="w-full min-w-[700px] border-collapse">
              <thead>
                <tr className="border-b border-black/10">
                  {["Name", "Email", "Role", "Status"].map((head) => (
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
                {users.map((user) => (
                  <tr key={user.email} className="border-b border-black/10">
                    <td className="px-4 py-4 text-sm text-black">{user.name}</td>
                    <td className="px-4 py-4 text-sm text-black/60">{user.email}</td>
                    <td className="px-4 py-4 text-sm text-black/60">{user.role}</td>
                    <td className="px-4 py-4 text-sm text-[#7fb800]">{user.status}</td>
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