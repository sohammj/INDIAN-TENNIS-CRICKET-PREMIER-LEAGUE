"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push("/auth/sign-in");
      return;
    }

    if (user.role !== "ADMIN") {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) return null;
  if (!user || user.role !== "ADMIN") return null;

  return <>{children}</>;
}