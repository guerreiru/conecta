"use client";

import { useChangePassword } from "@/hooks/useServiceQueries";
import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";

const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, "Senha deve ter pelo menos 6 caracteres"),
    newPassword: z
      .string()
      .min(6, "Nova senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string().min(6, "Confirmação obrigatória"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

interface ChangePasswordFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export function ChangePasswordForm({
  onCancel,
  onSuccess,
}: ChangePasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const changePasswordMutation = useChangePassword();
  const { logout } = useAuth();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function onSubmit(data: ChangePasswordFormData) {
    changePasswordMutation.mutate(
      {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
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
      <h2 className="text-2xl font-bold mb-4">Alterar Senha</h2>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Ao alterar sua senha, você precisará fazer login novamente.
      </p>

      <Input
        label="Senha Atual"
        type={showCurrentPassword ? "text" : "password"}
        {...register("currentPassword")}
        error={errors.currentPassword?.message}
        autoComplete="current-password"
        rightIcon={
          showCurrentPassword ? (
            <EyeSlashIcon
              size={18}
              onClick={() => setShowCurrentPassword(false)}
              className="cursor-pointer"
            />
          ) : (
            <EyeIcon
              size={18}
              onClick={() => setShowCurrentPassword(true)}
              className="cursor-pointer"
            />
          )
        }
      />

      <Input
        label="Nova Senha"
        type={showNewPassword ? "text" : "password"}
        {...register("newPassword")}
        error={errors.newPassword?.message}
        autoComplete="new-password"
        rightIcon={
          showNewPassword ? (
            <EyeSlashIcon
              size={18}
              onClick={() => setShowNewPassword(false)}
              className="cursor-pointer"
            />
          ) : (
            <EyeIcon
              size={18}
              onClick={() => setShowNewPassword(true)}
              className="cursor-pointer"
            />
          )
        }
      />

      <Input
        label="Confirmar Nova Senha"
        type={showConfirmPassword ? "text" : "password"}
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
        autoComplete="new-password"
        rightIcon={
          showConfirmPassword ? (
            <EyeSlashIcon
              size={18}
              onClick={() => setShowConfirmPassword(false)}
              className="cursor-pointer"
            />
          ) : (
            <EyeIcon
              size={18}
              onClick={() => setShowConfirmPassword(true)}
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
          disabled={changePasswordMutation.isPending}
          className="flex-1"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={changePasswordMutation.isPending}
          className="flex-1"
        >
          {changePasswordMutation.isPending ? "Alterando..." : "Alterar Senha"}
        </Button>
      </div>
    </form>
  );
}
