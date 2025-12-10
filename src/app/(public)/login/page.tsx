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
import { WelcomeSection } from "@/components/welcomeSection";

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
    <div className="grid grid-cols-1 lg:grid-cols-2 px-6 md:px-12 py-7 md:min-h-[calc(100vh-65px)] gap-8">
      <WelcomeSection />

      <section
        className="grid place-items-center"
        aria-labelledby="login-heading"
      >
        <div className="w-full max-w-md px-6 py-8 bg-white dark:bg-black-200 rounded-3xl shadow-xl">
          <h2 id="login-heading" className="text-3xl font-bold text-center">
            Login
          </h2>
          <p className="mt-3 mb-6 font-semibold text-zinc-500 dark:text-white text-center">
            Ainda não tem uma conta?{" "}
            <Link
              href="/register"
              className="text-blue-500 hover:text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
            >
              Criar Conta
            </Link>
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            noValidate
            aria-label="Formulário de login"
          >
            <Input
              label="Email"
              id="email"
              type="email"
              autoComplete="email"
              {...register("email")}
              error={errors?.email?.message}
              aria-invalid={!!errors?.email}
              aria-describedby={errors?.email ? "email-error" : undefined}
            />

            <Input
              label="Senha"
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              {...register("password")}
              error={errors?.password?.message}
              aria-invalid={!!errors?.password}
              aria-describedby={errors?.password ? "password-error" : undefined}
              rightIcon={
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? (
                    <EyeSlashIcon size={18} aria-hidden="true" />
                  ) : (
                    <EyeIcon size={18} aria-hidden="true" />
                  )}
                </button>
              }
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
              aria-busy={isSubmitting}
            >
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;
