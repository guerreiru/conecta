import { useAuth } from "@/hooks/useAuth";
import { useCepLookup } from "@/hooks/useCepLookup";
import { api } from "@/services/api";
import { convertResultToProfile } from "@/utils/convertResultToProfile";
import { addressSchema } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { AddressFields } from "./addressFields";

const providerSchema = z.object({
  providerName: z.string().optional(),
  specialty: z.string().optional(),
  bio: z.string().optional(),
  address: addressSchema,
});

type ProviderFormData = z.infer<typeof providerSchema>;

type ProviderFormProps = {
  userId: string;
};

export function ProviderForm({ userId }: ProviderFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProviderFormData>({
    resolver: zodResolver(providerSchema),
  });

  const { addressEditable } = useCepLookup(watch, setValue);
  const { handleUpdateUser } = useAuth();

  async function onSubmit(data: ProviderFormData) {

    if (userId) {
      try {
        const res = await api.post("/providers", {
          ...data,
          userId,
        });

        if (res.data.id) {
          const providerResultToProfile = convertResultToProfile(
            "provider",
            res.data
          );
          handleUpdateUser(providerResultToProfile);
          toast.success("Profissional cadastrado com sucesso!");
          reset()
        }
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
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Apelido"
        {...register("providerName")}
        error={errors.providerName?.message}
      />

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
        {isSubmitting ? "Cadastrando..." : "Cadastrar prestador"}
      </Button>
    </form>
  );
}
