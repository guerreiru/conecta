"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useCategories } from "@/hooks/useCategories";
import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const productSchema = z.object({
  title: z
    .string()
    .min(3, "O título deve ter pelo menos 3 caracteres")
    .max(100, "O título deve ter no máximo 100 caracteres"),
  description: z
    .string()
    .max(500, "A descrição deve ter no máximo 500 caracteres"),
  price: z
    .number("O preço deve ser um número")
    .positive("O preço deve ser maior que zero"),
  typeOfChange: z
    .string()
    .min(3, "O tipo de cobrança deve ter pelo menos 1 caracter")
    .max(100, "O tipo de cobrança deve máximo 10 caracteres"),
  categoryId: z.uuid("ID da categoria inválido"),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function NewServiceForm() {
  const { categories } = useCategories();
  const { activeProfile } = useAuth();

  const companyId = activeProfile?.company?.id;
  const providerId = activeProfile?.provider?.id;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      typeOfChange: "hora",
    },
  });

  async function onSubmit(data: ProductFormData) {
    const companyId = activeProfile?.company?.id;
    const providerId = activeProfile?.provider?.id;

    const service = {
      ...data,
      companyId,
      providerId,
    };

    try {
      await api.post("/services", service);
      toast.success("Serviço criado com secesso");
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
  }

  if (!companyId && !providerId) {
    return <p>Nenhum perfil localizado</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 grid gap-4 max-w-3xl mx-auto">
      <Input
        label="Titulo do serviço"
        placeholder="Ex: Curso de informática"
        {...register("title")}
        error={errors.title?.message}
      />

      <Textarea
        label="Descrição do serviço"
        placeholder="Descreva o serviço"
        rows={4}
        {...register("description")}
        error={errors.description?.message}
      />

      <Input
        label="Preço do serviço"
        type="number"
        step="0.01"
        {...register("price", { valueAsNumber: true })}
        error={errors.price?.message}
      />

      <Input
        label="Tipo de Cobrança"
        placeholder="Exemplo: por hora"
        type="text"
        {...register("typeOfChange")}
        error={errors.typeOfChange?.message}
      />

      <Select
        label="Categoria do serviço"
        options={categories.map((category) => ({
          label: category.name,
          value: category.id,
        }))}
        {...register("categoryId")}
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Salvando..." : "Cadastrar Serviço"}
      </Button>
    </form>
  );
}
