"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
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

  const onSubmit = async ({ email, password }: LoginFormData) => {
    const res = await login(email, password);

    if (res.message === "success") {
      router.push("/home");
      router.refresh();
    }
  };

  return (
    <div className="flex items-center justify-center pt-6">
      <div className="w-full max-w-md p-6">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <div className="mt-3 mb-6 text-xs font-semibold text-zinc-500 dark:text-white flex justify-center gap-1.5">
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
            type="password"
            {...register("password")}
            error={errors?.password?.message}
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
