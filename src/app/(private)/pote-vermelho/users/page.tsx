"use client";

import { useAuth } from "@/hooks/useAuth";
import { api } from "@/services/api";
import { User } from "@/types/User";
import { UsersResponse } from "@/types/UsersResponse";
import { useEffect, useState } from "react";
import { UserCard } from "./userCard"; // Corrigido para PascalCase
import { toast } from "react-toastify";

const UserCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-lg animate-pulse h-48">
    <div className="flex justify-between items-start">
      <div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-1"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
      </div>
      <div className="h-4 w-10 bg-gray-300 dark:bg-gray-600 rounded"></div>
    </div>
    <div className="mt-4 space-y-2">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
    </div>
  </div>
);

export default function Users() {
  const { user, loading } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (loading || !user) return;

    async function fetchUsers() {
      try {
        const { data } = await api<UsersResponse>("/users");
        setUsers(data.data);
      } catch (error) {
        toast.error("Erro ao buscar usuários:");
      } finally {
        setIsFetching(false);
      }
    }

    fetchUsers();
  }, [loading, user]);

  const handleRemoveUser = (userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  if (!user && !loading) return null;

  if (loading || isFetching) {
    return (
      <div className="min-h-[calc(100vh_-_65px)] bg-gray-50 dark:bg-gray-900 p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Gerenciamento de Usuários
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <UserCardSkeleton />
          <UserCardSkeleton />
          <UserCardSkeleton />
          <UserCardSkeleton />
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="min-h-[calc(100vh_-_65px)] bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-8">
        <p className="text-xl text-gray-500 dark:text-gray-400">
          Nenhum usuário encontrado.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh_-_65px)] bg-gray-50 dark:bg-gray-900 p-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Gerenciamento de Usuários
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {users.map((user) => (
          <UserCard key={user.id} user={user} onRemoveUser={handleRemoveUser} />
        ))}
      </div>
    </div>
  );
}
