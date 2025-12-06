"use client";

import { ERROR_MESSAGES } from "@/constants/messages";
import { AuthContext } from "@/contexts/AuthContext";
import { api } from "@/services/api";
import { User } from "@/types/User";
import { isAxiosError } from "axios";
import { redirect } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await api.get("/auth/me");
        setUser(response.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  async function login(email: string, password: string) {
    setLoading(true);
    try {
      const response = await api.post("/auth/login", { email, password });

      setUser(response.data.user);
      toast.success(`Olá ${response.data.user.name || ""}!`);

      return { success: true };
    } catch (error) {
      if (isAxiosError(error)) {
        const message =
          error.response?.data?.message || ERROR_MESSAGES.LOGIN_ERROR;
        toast.error(message);
        return { success: false, message };
      }

      toast.error("Erro inesperado, tente novamente");
      return { success: false, message: "Erro inesperado" };
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      setUser(null);
      redirect("/");
    }
  }
  function updateUser(updatedUser: User) {
    setUser(updatedUser);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
