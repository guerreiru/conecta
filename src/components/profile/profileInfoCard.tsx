"use client";

import { User } from "@/types/User";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "@phosphor-icons/react";

interface ProfileInfoCardProps {
  user: User;
  onEdit: () => void;
  onChangeEmail: () => void;
  onChangePassword: () => void;
}

export function ProfileInfoCard({
  user,
  onEdit,
  onChangeEmail,
  onChangePassword,
}: ProfileInfoCardProps) {
  return (
    <div className="shadow border border-gray-200 dark:border-black rounded-3xl relative -top-4 p-6 bg-white dark:bg-black-200 w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-xl">Informações da Conta</p>
        <button onClick={onEdit}>
          <PencilIcon />
        </button>
      </div>

      <div className="mt-6">
        <p className="text-sm text-zinc-500">Nome</p>
        <p className="capitalize">{user.name}</p>
      </div>

      <div className="my-4">
        <p className="text-sm text-zinc-500">Email</p>
        <p>{user.email}</p>
      </div>

      {user.role === "provider" && (
        <div className="mb-6">
          <p className="text-sm text-zinc-500">Telefone</p>
          <p>{user.address?.phone}</p>
        </div>
      )}

      <div className="mb-6">
        <p className="text-sm text-zinc-500">Sobre mim</p>
        <p className="first-letter:capitalize">{user.bio}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <Button
          variant="unstyled"
          onClick={onChangeEmail}
          className="w-full bg-[#DCF96A]"
        >
          Alterar Email
        </Button>
        <Button
          variant="unstyled"
          onClick={onChangePassword}
          className="w-full bg-[#DCF96A]"
        >
          Alterar Senha
        </Button>
      </div>
    </div>
  );
}
