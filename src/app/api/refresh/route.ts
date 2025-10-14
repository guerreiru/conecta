import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return new Response("Sem refresh token", { status: 401 });
  }

  const res = await fetch(
    "https://conecta-api-l0kh.onrender.com/auth/refresh",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );

  if (!res.ok) {
    return new Response("Falha ao renovar", { status: 403 });
  }

  const data = await res.json();
  const newAccessToken = data.accessToken;

  cookieStore.set("accessToken", newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 15 * 60,
  });

  return Response.json({ success: true });
}
