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
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";

const providerSchemaCreate = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.email("E-mail inválido"),
  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .optional(),
  specialty: z.string().optional(),
  bio: z.string().optional(),
  address: addressSchema,
});

const providerSchemaEdit = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string(),
  specialty: z.string().optional(),
  bio: z.string().optional(),
  password: z.string().optional(),
  address: addressSchema,
});

type ProviderFormCreateData = z.infer<typeof providerSchemaCreate>;
type ProviderFormEditData = z.infer<typeof providerSchemaEdit>;

type ProviderFormProps = {
  mode: "create" | "edit";
  defaultValues?: Partial<ProviderFormCreateData> & { id?: string };
  onCancel?: () => void;
};

export function ProviderForm({
  mode,
  defaultValues,
  onCancel,
}: ProviderFormProps) {
  const createForm = useForm<ProviderFormCreateData>({
    resolver: zodResolver(providerSchemaCreate),
    defaultValues,
  });

  const editForm = useForm<ProviderFormEditData>({
    resolver: zodResolver(providerSchemaEdit),
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    setError,
    reset,
  } = mode === "create" ? createForm : editForm;

  const { updateUser, login } = useAuth();
  const router = useRouter();
  const { addressEditable } = useCepLookup(watch, setValue);
  const [showPassword, setShowPassword] = useState(false);

  console.log(errors);

  async function onSubmit(data: ProviderFormCreateData | ProviderFormEditData) {
    const providerData = {
      ...data,
      role: "provider",
    };

    try {
      if (mode === "create" && data.email && data.password) {
        await api.post("/users", providerData);
        const loginResult = await login(data.email, data.password);
        if (loginResult.success) {
          reset();
          router.push("/");
        }
      } else if (mode === "create" && !data.password) {
        setError("password", {
          type: "manual",
          message: "Senha é obrigatória para cadastro",
        });
        return;
      }

      if (mode === "edit" && defaultValues?.id) {
        const res = await api.put(`/users/${defaultValues?.id}`, {
          name: data.name,
          specialty: data.specialty,
          bio: data.bio,
          address: data.address,
        });

        const updatedUser = res.data;

        if (updatedUser.id) {
          updateUser(updatedUser);
        }

        toast.success("Profissional atualizado com sucesso!");
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

      <Textarea
        label="Sobre"
        {...register("bio")}
        error={errors.bio?.message}
        rows={4}
      />

      <AddressFields
        registerAction={register}
        errors={errors.address}
        addressEditable={addressEditable}
        setValueAction={setValue}
      />

      <div className="flex items-center justify-between gap-4 flex-wrap md:flex-nowrap">
        {mode === "edit" && (
          <Button
            onClick={onCancel}
            variant="unstyled"
            className="w-full bg-black text-white dark:bg-white dark:text-black"
          >
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
