import { AuthData } from "@/types/AuthData";
import { NextResponse } from "next/server";

const API_BASE_URL =
  process.env.API_BASE_URL || "https://conecta-api-l0kh.onrender.com";

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include",
  });

  const data: AuthData = await res.json();

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }

  const response = NextResponse.json(data);

  const roles = data.user.roles;

  response.cookies.set("roles", JSON.stringify(roles), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  response.cookies.set("accessToken", data.accessToken, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  response.cookies.set("refreshToken", data.refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  return response;
}
