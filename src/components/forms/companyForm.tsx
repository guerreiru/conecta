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

const companySchema = z.object({
  companyName: z.string().optional(),
  address: addressSchema,
});

type CompanyFormData = z.infer<typeof companySchema>;

type CompanyFormProps = {
  userId: string;
};

export function CompanyForm({ userId }: CompanyFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
    setError
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
  });

  const { addressEditable } = useCepLookup(watch, setValue);
  const { handleUpdateUser } = useAuth();

  async function onSubmit(data: CompanyFormData) {
    if (userId) {
      if (!data.companyName) {
        setError('companyName', {
          message: "Nome da empresa é obrigatório",
          type: 'required'
        })
      }
      try {
        const res = await api.post("/companies", {
          ...data,
          userId,
        });

        if (res.data.id) {
          const companyResultToProfile = convertResultToProfile(
            "company",
            res.data
          );
          handleUpdateUser(companyResultToProfile);
          toast.success("Enpresa cadastrada com sucesso!");
          reset();
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
        label="Nome da empresa"
        {...register("companyName")}
        error={errors.companyName?.message}
      />

      <AddressFields
        register={register}
        errors={errors.address}
        addressEditable={addressEditable}
        setValue={setValue}
      />

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Cadastrando..." : "Cadastrar empresa"}
      </Button>
    </form>
  );
}
