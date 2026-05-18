export const API_URL =
  typeof window === "undefined"
    ? (process.env.NEXT_PUBLIC_API_URL ?? "")
    : "";

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const value = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));

  return value ? decodeURIComponent(value.split("=")[1]) : null;
}

export async function ensureCsrfToken(): Promise<string | null> {
  const res = await fetch(`${API_URL}/api/auth/csrf`, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) return null;

  const data: { csrfToken?: string } = await res.json();
  // Prefer response body — cookie may not yet be committed to document.cookie
  return data.csrfToken ?? getCookie("csrfToken") ?? null;
}

export async function csrfHeaders(): Promise<Record<string, string>> {
  const csrfToken = await ensureCsrfToken();

  if (!csrfToken) return {};

  return {
    "x-csrf-token": csrfToken,
  };
}
