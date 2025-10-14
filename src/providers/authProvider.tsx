"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { LoginResponse } from "@/types/LoginResponse";
import { Profile } from "@/types/Profile";
import { User } from "@/types/User";
import { ReactNode, useState } from "react";
import { toast } from "react-toastify";

export function AuthProvider({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser?: null | User;
}) {
  const [user, setUser] = useState(initialUser || null);
  const [loading, setLoading] = useState(false);
  const [activeProfile, setActiveProfile] = useState<Profile | null>(null);

  async function login(email: string, password: string) {
    setLoading(true);
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await res.json();

    if (data.user) {
      const { user } = data as LoginResponse;
      setUser(user);
      setActiveProfile(user.profiles[0]);
      return { message: "success" };
    }

    toast.error(data.message || "Erro desconhecido");
    return { message: data.message };
  }

  async function logout() {
    setUser(null);
    document.cookie = "accessToken=; Max-Age=0; path=/;";
    document.cookie = "refreshToken=; Max-Age=0; path=/;";
    return { message: "success" };
  }

  function handleUpdateUser(profile: Profile) {
    setUser((user) => {
      if (user?.id) {
        return { ...user, profiles: [...user.profiles, profile] };
      }
      return null;
    });
  }

  function handleSetActiveProfile(profile: Profile) {
    setActiveProfile(profile);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        handleUpdateUser,
        activeProfile,
        handleSetActiveProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
