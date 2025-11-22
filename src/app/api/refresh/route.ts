import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return new Response("Sem refresh token", { status: 401 });
  }

  const res = await fetch("http://localhost:3001/auth/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
    credentials: "include",
  });

  const data = await res.json();

  if (!data.accessToken) {
    return new Response("Falha ao renovar", { status: 403 });
  }

  const newAccessToken = data.accessToken;

  cookieStore.set("accessToken", newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 15 * 60,
  });

  return Response.json(data);
}
