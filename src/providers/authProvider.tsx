"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { api } from "@/services/api";
import { User } from "@/types/User";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  async function login(email: string, password: string) {
    setLoading(true);
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await res.json();

    if (data.user) {
      const user: User = data.user;
      setUser(user);
      toast.success(`Olá ${user.name || ''}!`);
      return { message: "success" };
    }

    toast.error(data.message || "Erro desconhecido");
    setLoading(true);

    return { message: data.message };
  }

  async function logout() {
    try {
      setUser(null);
      await api.post("/auth/logout");
      toast.success("Até mais!");
    } catch {
      toast.error("Erro ao realizar logout");
    }
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
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false)
      }
    };

    checkAuth();
  }, []);

  function handleSetUser(user: User) {
    setUser(user);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        handleSetUser,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}