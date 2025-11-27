"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit({ email, password }: LoginFormData) {
    const result = await login(email, password);

    if (result.success) {
      router.push("/");
      router.refresh();
    }
  }

  function togglePasswordVisibility() {
    setShowPassword((prev) => !prev);
  }

  return (
    <div className="flex items-center justify-center pt-6 px-4">
      <div className="w-full max-w-md px-6 py-8 bg-white dark:bg-black-200 rounded-3xl shadow-xl">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <div className="mt-3 mb-6 font-semibold text-zinc-500 dark:text-white flex flex-wrap justify-center gap-1.5">
          <p>Ainda não tem uma conta?</p>
          <Link href="/register" className="text-blue-500 cursor-pointer">
            Criar Conta
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email"
            id="email"
            type="email"
            {...register("email")}
            error={errors?.email?.message}
          />

          <Input
            label="Senha"
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            error={errors?.password?.message}
            rightIcon={
              showPassword ? (
                <EyeSlashIcon
                  size={18}
                  onClick={togglePasswordVisibility}
                  className="cursor-pointer"
                />
              ) : (
                <EyeIcon
                  size={18}
                  onClick={togglePasswordVisibility}
                  className="cursor-pointer"
                />
              )
            }
          />

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
