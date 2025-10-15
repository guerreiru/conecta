"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { api } from "@/services/api";
import { Profile } from "@/types/Profile";
import { User } from "@/types/User";
import { ReactNode, useEffect, useState } from "react";
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

      const { user } = data;
      setUser(user);
      setActiveProfile(user.profiles[0]);
      toast.success("Login realizado com sucesso!");
      return { message: "success" };
    }

    toast.error(data.message || "Erro desconhecido");
    setLoading(true);

    return { message: data.message };
  }

  async function logout() {
    try {
      await api.post("/auth/logout");
      setUser(null);
      setActiveProfile(null);
      toast.success("Logout realizado com sucesso!");
    } catch {
      toast.error("Erro ao realizar logout");
    }
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

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/refresh", {
          method: "POST",
          credentials: "include",
        });

        const data = await res.json();

        if (data.user) {
          setUser(data.user);
          setActiveProfile(data.user.profiles[0]);
        }
      } catch (error) {
        setUser(null);
        setActiveProfile(null);
      } finally {
        setLoading(false)
      }
    };

    checkAuth();
  }, []);

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