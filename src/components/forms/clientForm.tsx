import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAuth } from "@/hooks/useAuth";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const clientSchemaCreate = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type ClientFormData = z.infer<typeof clientSchemaCreate>;

type ClientFormProps = {
  mode: "create" | "edit";
  defaultValues?: Partial<ClientFormData> & { id?: string };
  onCancel?: () => void;
};

export function ClientForm({ mode, defaultValues, onCancel }: ClientFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchemaCreate),
    defaultValues,
  });

  const { updateUser, login } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  function togglePasswordVisibility() {
    setShowPassword((prev) => !prev);
  }

  async function onSubmit(data: ClientFormData) {
    try {
      if (mode === "create") {
        const res = await api.post("/users", data);

        if (res.data.id) {
          const loginResult = await login(data.email, data.password);
          if (loginResult.success) {
            reset();
            router.push("/");
          }
        }
      } else {
        const { password, ...rest } = data;

        const res = await api.put(`/users/${defaultValues?.id}`, rest);
        const updatedUser = res.data;
        if (updatedUser.id) {
          updateUser(updatedUser);
        }

        toast.success("Usuário atualizado com sucesso!");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const message =
          error.response?.data.message || "Erro ao processar, tente mais tarde";
        toast.error(message);
        return;
      }

      toast.error("Erro inesperado, tente novamente");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        id="name"
        type="text"
        label="Nome"
        {...register("name")}
        error={errors.name?.message}
      />

      {mode === "create" && (
        <>
          <Input
            id="email"
            type="email"
            label="E-mail"
            {...register("email")}
            error={errors.email?.message}
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
        </>
      )}

      <div className="flex items-center justify-between gap-4 flex-wrap md:flex-nowrap">
        {mode === "edit" && (
          <Button onClick={onCancel} variant="border" className="w-full">
            Cancelar
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting
            ? mode === "create"
              ? "Cadastrando..."
              : "Salvando..."
            : mode === "create"
            ? "Cadastrar"
            : "Salvar alterações"}
        </Button>
      </div>
    </form>
  );
}
