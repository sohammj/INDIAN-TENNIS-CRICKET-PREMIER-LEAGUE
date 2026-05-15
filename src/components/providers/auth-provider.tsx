"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { API_URL, csrfHeaders } from "@/lib/api";

type User = {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN" | "SCORER";
  createdAt?: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ ok: boolean; role?: User["role"] }>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ ok: boolean; role?: User["role"] }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Temporary compatibility for existing admin pages that still send Bearer token.
  const [token, setToken] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  const clearSession = () => {
    setUser(null);
    setToken(null);
  };

  async function refreshSession() {
    const res = await fetch(`${API_URL}/api/auth/refresh`, {
      method: "POST",
      credentials: "include",
      headers: {
        ...(await csrfHeaders()),
      },
    });

    if (!res.ok) {
      clearSession();
      return false;
    }

    const data = await res.json();

    setUser(data.user);
    setToken(data.token);

    return true;
  }

  useEffect(() => {
    async function verifySession() {
      try {
        const res = await fetch(`${API_URL}/api/auth/me`, {
          credentials: "include",
        });

        if (res.ok) {
          const verifiedUser = await res.json();

          setUser(verifiedUser);
          setLoading(false);
          return;
        }

        await refreshSession();
      } catch {
        clearSession();
      } finally {
        setLoading(false);
      }
    }

    verifySession();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(await csrfHeaders()),
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) return { ok: false };

    const data = await res.json();

    setUser(data.user);
    setToken(data.token);

    return { ok: true, role: data.user.role };
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(await csrfHeaders()),
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) return { ok: false };

    const data = await res.json();

    setUser(data.user);
    setToken(data.token);

    return { ok: true, role: data.user.role };
  };

  const logout = async () => {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          ...(await csrfHeaders()),
        },
      });
    } finally {
      clearSession();
    }
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      login,
      register,
      logout,
    }),
    [user, token, loading]
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