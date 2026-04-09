"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";

export default function SignInPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");

    const result = login(username, password);

    if (!result.ok) {
      setErr("Invalid username or password.");
      return;
    }

    if (result.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div
      className="min-h-[calc(100vh-4rem)] bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(8,8,8,0.86), rgba(8,8,8,0.92)), url('/stadium.jpg')",
      }}
    >
      <div className="section-shell flex min-h-[calc(100vh-4rem)] items-center justify-center py-20">
        <form onSubmit={handleSubmit} className="glow-card w-full max-w-md space-y-5 p-8">
          <div>
            <div className="section-label">Secure Access</div>
            <h1 className="section-title">Sign In</h1>
            <p className="mt-4 text-sm text-white/55">
              Use mock credentials.
            </p>
          </div>

          <div className="rounded border border-white/10 bg-white/[0.03] p-4 text-sm text-white/65">
            <div><span className="text-[var(--flame)]">Admin:</span> admin / admin123</div>
            <div className="mt-2"><span className="text-[var(--flame)]">Player:</span> player / player123</div>
          </div>

          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full border border-white/10 bg-black/40 px-4 py-3 outline-none"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="w-full border border-white/10 bg-black/40 px-4 py-3 outline-none"
          />

          {err ? (
            <div className="rounded border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {err}
            </div>
          ) : null}

          <button className="ui-font w-full bg-[var(--flame)] px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-black">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}