"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

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
  login: (email: string, password: string) => Promise<{ ok: boolean; role?: User["role"] }>;
  register: (name: string, email: string, password: string) => Promise<{ ok: boolean; role?: User["role"] }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const USER_KEY = "itcpl-auth-user";
const TOKEN_KEY = "itcpl-auth-token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const clearSession = () => {
    setUser(null);
    setToken(null);
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.removeItem(TOKEN_KEY);
  };

  useEffect(() => {
    async function verifySession() {
      const storedToken = window.localStorage.getItem(TOKEN_KEY);

      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:4000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (!res.ok) {
          clearSession();
          setLoading(false);
          return;
        }

        const verifiedUser = await res.json();

        setUser(verifiedUser);
        setToken(storedToken);
        window.localStorage.setItem(USER_KEY, JSON.stringify(verifiedUser));
      } catch {
        clearSession();
      } finally {
        setLoading(false);
      }
    }

    verifySession();
  }, []);

  const saveSession = (nextUser: User, nextToken: string) => {
    setUser(nextUser);
    setToken(nextToken);
    window.localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    window.localStorage.setItem(TOKEN_KEY, nextToken);
  };

  const login = async (email: string, password: string) => {
    const res = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) return { ok: false };

    const data = await res.json();
    saveSession(data.user, data.token);

    return { ok: true, role: data.user.role };
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await fetch("http://localhost:4000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) return { ok: false };

    const data = await res.json();
    saveSession(data.user, data.token);

    return { ok: true, role: data.user.role };
  };

  const logout = () => {
    clearSession();
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