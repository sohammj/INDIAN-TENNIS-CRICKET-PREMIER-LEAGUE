"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";
import { StadiumBg } from "@/components/ui/stadium-bg";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");

    const result = await register(name, email, password);

    if (!result.ok) {
      setErr(
        "Could not create account. Use a valid email and a strong password."
      );
      return;
    }

    router.replace("/dashboard");
  };

  return (
    <StadiumBg overlay="light">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center px-6 py-20">
        <form onSubmit={handleSubmit} className="glow-card w-full space-y-4 p-8">
          <h1 className="display-font text-5xl uppercase text-black">
            Register
          </h1>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            autoComplete="name"
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none placeholder:text-black/35"
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            type="email"
            autoComplete="email"
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none placeholder:text-black/35"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            autoComplete="new-password"
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none placeholder:text-black/35"
          />

          <p className="text-xs leading-5 text-black/45">
            Password must be at least 8 characters and include uppercase,
            lowercase, number, and special character.
          </p>

          {err ? (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500">
              {err}
            </div>
          ) : null}

          <button className="ui-font w-full rounded-full bg-[#c8ff00] px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-black">
            Create Account
          </button>
        </form>
      </div>
    </StadiumBg>
  );
}