"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";
import { StadiumBg } from "@/components/ui/stadium-bg";

export default function SignInPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");

    const result = await login(email, password);

    if (!result.ok) {
      setErr("Invalid email or password.");
      return;
    }

    if (result.role === "ADMIN") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <StadiumBg overlay="light">
      <div className="min-h-screen flex flex-col pt-24">
        <div className="flex-1 section-shell flex items-center justify-center py-20">
          <form onSubmit={handleSubmit} className="glow-card w-full max-w-md space-y-5 p-8">
            <div>
              <div className="section-label">Secure Access</div>
              <h1 className="section-title">Sign In</h1>
              <p className="mt-4 text-sm text-black/55">
                Sign in using your registered email and password.
              </p>
            </div>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              type="email"
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none placeholder:text-black/35"
            />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none placeholder:text-black/35"
            />

            {err ? (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500">
                {err}
              </div>
            ) : null}

            <button className="ui-font w-full rounded-full bg-[#c8ff00] px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-black">
              Login
            </button>
          </form>
        </div>
      </div>
    </StadiumBg>
  );
}