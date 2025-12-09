"use client";

import { useChangeEmail } from "@/hooks/useServiceQueries";
import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";

const changeEmailSchema = z
  .object({
    newEmail: z.string().email("Email inválido"),
    confirmEmail: z.string().email("Email inválido"),
    currentPassword: z
      .string()
      .min(6, "Senha deve ter pelo menos 6 caracteres"),
  })
  .refine((data) => data.newEmail === data.confirmEmail, {
    message: "Os emails não coincidem",
    path: ["confirmEmail"],
  });

type ChangeEmailFormData = z.infer<typeof changeEmailSchema>;

interface ChangeEmailFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export function ChangeEmailForm({ onCancel, onSuccess }: ChangeEmailFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangeEmailFormData>({
    resolver: zodResolver(changeEmailSchema),
  });

  const changeEmailMutation = useChangeEmail();
  const { logout } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(data: ChangeEmailFormData) {
    changeEmailMutation.mutate(
      {
        newEmail: data.newEmail,
        currentPassword: data.currentPassword,
      },
      {
        onSuccess: () => {
          onSuccess();
          setTimeout(() => {
            logout();
          }, 2000);
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Alterar Email</h2>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Ao alterar seu email, você precisará fazer login novamente com o novo
        email.
      </p>

      <Input
        label="Novo Email"
        type="email"
        {...register("newEmail")}
        error={errors.newEmail?.message}
        autoComplete="email"
      />

      <Input
        label="Confirmar Novo Email"
        type="email"
        {...register("confirmEmail")}
        error={errors.confirmEmail?.message}
        autoComplete="email"
      />

      <Input
        label="Senha Atual"
        type={showPassword ? "text" : "password"}
        {...register("currentPassword")}
        error={errors.currentPassword?.message}
        autoComplete="current-password"
        rightIcon={
          showPassword ? (
            <EyeSlashIcon
              size={18}
              onClick={() => setShowPassword(false)}
              className="cursor-pointer"
            />
          ) : (
            <EyeIcon
              size={18}
              onClick={() => setShowPassword(true)}
              className="cursor-pointer"
            />
          )
        }
      />

      <div className="flex gap-4 pt-4">
        <Button
          type="button"
          variant="danger"
          onClick={onCancel}
          disabled={changeEmailMutation.isPending}
          className="flex-1"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={changeEmailMutation.isPending}
          className="flex-1"
        >
          {changeEmailMutation.isPending ? "Alterando..." : "Alterar Email"}
        </Button>
      </div>
    </form>
  );
}
