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

const providerSchemaCreate = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  specialty: z.string().optional(),
  bio: z.string().optional(),
  address: addressSchema,
});

const providerSchemaEdit = z
  .object({
    name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z.email("E-mail inválido"),
    specialty: z.string().optional(),
    bio: z.string().optional(),
    address: addressSchema,
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    newPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.newPassword) {
        return !!data.password && !!data.newPassword;
      }
      return true;
    },
    {
      message: "Informe a senha atual e a nova senha para alterar",
      path: ["newPassword"],
    }
  );

type ProviderFormData = z.infer<typeof providerSchemaEdit>;

type ProviderFormProps = {
  mode: "create" | "edit";
  defaultValues?: Partial<ProviderFormData> & { id?: string };
};

export function ProviderForm({ mode, defaultValues }: ProviderFormProps) {
  const schema = mode === "create" ? providerSchemaCreate : providerSchemaEdit;
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProviderFormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });
  const { handleSetUser } = useAuth()

  const { addressEditable } = useCepLookup(watch, setValue);

  async function onSubmit(data: ProviderFormData) {
    const providerDate = {
      ...data,
      role: "provider",
    }

    try {
      if (mode === "create") {
        await api.post("/users", providerDate);
        toast.success("Profissional cadastrado com sucesso!");
      } else {
        const res = await api.put(`/users/${defaultValues?.id}`, providerDate);
        const updatedUser = res.data;
        if (updatedUser.id) {
          handleSetUser(updatedUser);
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        id="name"
        label="Nome"
        {...register("name")}
        error={errors.name?.message}
      />

      <Input
        id="email"
        type="email"
        label="E-mail"
        {...register("email")}
        error={errors.email?.message}
        disabled={mode === "edit"}
      />

      {mode === "create" && (
        <Input
          id="password"
          type="password"
          label="Senha"
          {...register("password")}
          error={errors.password?.message}
        />
      )}

      {mode === "edit" && (
        <>
          <Input
            id="password"
            type="password"
            label="Senha atual"
            {...register("password")}
            error={errors.password?.message}
          />

          <Input
            id="newPassword"
            type="password"
            label="Nova senha"
            {...register("newPassword")}
            error={errors.newPassword?.message}
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

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting
          ? mode === "create"
            ? "Cadastrando..."
            : "Salvando..."
          : mode === "create"
            ? "Cadastrar"
            : "Salvar alterações"}
      </Button>
    </form>
  );
}
