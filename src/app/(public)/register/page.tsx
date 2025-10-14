"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await api.post("https://conecta-api-l0kh.onrender.com/users", data);
      toast.success("Usuário cadastrado com sucesso!!");
      reset();
    } catch (error) {
      if (isAxiosError(error)) {
        const message =
          error.response?.data.message ||
          "Erro ao realizar o cadastro, tente novamente mais tarde ou entre em contado com o suporte";
        toast.error(message);
        return;
      }

      toast.error(
        "Erro ao realizar o cadastro, tente novamente mais tarde ou entre em contado com o suporte"
      );
    }
  };

  return (
    <div className="flex items-center justify-center pt-6">
      <div className="w-full max-w-md p-6">
        <h1 className="text-3xl font-bold text-center">Cadastro</h1>
        <div className="mt-3 mb-6 text-xs font-semibold text-zinc-500 dark:text-white flex justify-center gap-1.5">
          <p>Já possui conta?</p>
          <Link href="login" className="text-blue-500 cursor-pointer">
            Entrar
          </Link>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              id="name"
              type="text"
              label="Nome"
              {...register("name")}
              error={errors.name?.message}
            />
          </div>

          <div>
            <Input
              id="email"
              type="email"
              label="E-mail"
              {...register("email")}
              error={errors.email?.message}
            />
          </div>

          <div>
            <Input
              id="password"
              type="password"
              label="Senha"
              {...register("password")}
              error={errors.password?.message}
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
