"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { creds, UserRole } from "@/lib/data";

type SessionUser = {
  username: string;
  role: Exclude<UserRole, "public">;
  name: string;
  initials: string;
};

type AuthContextType = {
  user: SessionUser | null;
  login: (username: string, password: string) => { ok: boolean; role?: "player" | "admin" };
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = "itcpl-auth-user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const login = (username: string, password: string) => {
    const normalized = username.trim().toLowerCase();

    const matched =
      normalized === creds.admin.username
        ? creds.admin
        : normalized === creds.player.username
        ? creds.player
        : null;

    if (!matched || matched.password !== password) {
      return { ok: false as const };
    }

    const nextUser: SessionUser = {
      username: matched.username,
      role: matched.role,
      name: matched.name,
      initials: matched.initials,
    };

    setUser(nextUser);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));

    return { ok: true as const, role: matched.role };
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}