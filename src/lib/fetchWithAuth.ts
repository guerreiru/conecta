import { cookies } from "next/headers";

const API_BASE_URL =
  process.env.API_BASE_URL || "https://conecta-api-l0kh.onrender.com";

export async function fetchWithAuth(input: string, init?: RequestInit) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  let res = await fetch(`${API_BASE_URL}${input}`, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
      "Content-Type": "application/json",
    },
  });

  if (res.status === 401 && refreshToken) {
    const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (refreshRes.ok) {
      const { accessToken: newAccessToken } = await refreshRes.json();

      cookieStore.set({
        name: "accessToken",
        value: newAccessToken,
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      });

      res = await fetch(`${API_BASE_URL}${input}`, {
        ...init,
        headers: {
          ...(init?.headers || {}),
          Authorization: `Bearer ${newAccessToken}`,
          "Content-Type": "application/json",
        },
      });
    }
  }

  return res;
}
