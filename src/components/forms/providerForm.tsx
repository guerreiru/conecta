import { useCepLookup } from "@/hooks/useCepLookup";
import { api } from "@/services/api";
import { addressSchema } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { AddressFields } from "./addressFields";
import { useAuth } from "@/hooks/useAuth";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { useState } from "react";

const providerSchemaCreate = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  specialty: z.string().optional(),
  bio: z.string().optional(),
  address: addressSchema,
});

type ProviderFormData = z.infer<typeof providerSchemaCreate>;

type ProviderFormProps = {
  mode: "create" | "edit";
  defaultValues?: Partial<ProviderFormData> & { id?: string };
  onCancel?: () => void;
};

export function ProviderForm({
  mode,
  defaultValues,
  onCancel,
}: ProviderFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProviderFormData>({
    resolver: zodResolver(providerSchemaCreate),
    defaultValues,
  });
  const { updateUser, user } = useAuth();
  const { addressEditable } = useCepLookup(watch, setValue);
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(data: ProviderFormData) {
    const providerData = {
      ...data,
      role: "provider",
    };

    try {
      if (mode === "create") {
        await api.post("/users", providerData);
        toast.success("Profissional cadastrado com sucesso!");
      } else {
        const res = await api.put(`/users/${defaultValues?.id}`, providerData);

        const updatedUser = res.data;

        if (updatedUser.id) {
          updateUser(updatedUser);
        }

        toast.success("Profissional atualizado com sucesso!");
      }

      if (mode === "create") {
        reset();
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

  function togglePasswordVisibility() {
    setShowPassword((prev) => !prev);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        id="name"
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

      <Input
        label="Especialidade"
        {...register("specialty")}
        error={errors.specialty?.message}
      />

      <Input label="Sobre" {...register("bio")} error={errors.bio?.message} />

      <AddressFields
        register={register}
        errors={errors.address}
        addressEditable={addressEditable}
        setValue={setValue}
      />

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
