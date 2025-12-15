"use client";

import { useAuth } from "@/hooks/useAuth";
import { api } from "@/services/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const [usersCount, setUsersCount] = useState(0);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (loading || !user) return;

    async function fetchUsers() {
      try {
        const { data } = await api("/users/count");
        setUsersCount(data.count);
      } catch (error) {
        toast.error("Erro ao buscar usuários:");
      } finally {
        setIsFetching(false);
      }
    }

    fetchUsers();
  }, [loading, user]);

  if (!user && !loading) {
    return null;
  }

  if (loading || isFetching) {
    return <p>Carregando usuários...</p>;
  }

  return (
    <div className="grid place-items-center h-[calc(100vh_-_65px)]">
      <div className="bg-white dark:bg-black-200 shadow p-4 rounded-md">
        <Link href="/pote-vermelho/users">Usuários {usersCount}</Link>
      </div>
    </div>
  );
}
