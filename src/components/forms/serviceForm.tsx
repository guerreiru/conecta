"use client";

import { useCategories } from "@/hooks/useCategories";
import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { Service } from "@/types/Service";

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

type ServiceFormProps = {
  onCancel: () => void;
  onServiceAdded: () => void;
  serviceToEdit?: Service | null;
}

export function ServiceForm({ onCancel, onServiceAdded, serviceToEdit }: ServiceFormProps) {
  const { categories } = useCategories();
  const { user } = useAuth();

  const isEditing = !!serviceToEdit;
  const submitButtonText = isEditing ? "Salvar Alterações" : "Cadastrar Serviço";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: serviceToEdit?.title || "",
      description: serviceToEdit?.description || "",
      price: Number(serviceToEdit?.price || 1),
      typeOfChange: serviceToEdit?.typeOfChange || "hora",
      categoryId: serviceToEdit?.category.id || categories[0]?.id || "",
    },
  });

  function handleOnCancel() {
    reset();
    onCancel();
  }

  async function onSubmit(data: ProductFormData) {
    if (!user?.id) {
      return
    }

    const servicePayload = {
      ...data,
      userId: user.id,
    };

    try {
      if (isEditing) {
        await api.put(`/services/${serviceToEdit.id}`, servicePayload);
        toast.success("Serviço atualizado com sucesso");
      } else {
        await api.post("/services", servicePayload);
        toast.success("Serviço criado com sucesso");
      }

      onServiceAdded();
      reset();
    } catch (error) {
      if (isAxiosError(error)) {
        const message =
          error.response?.data.message ||
          "Erro ao realizar a operação, tente novamente mais tarde ou entre em contado com o suporte";
        toast.error(message);
        return;
      }

      toast.error(
        "Erro ao realizar a operação, tente novamente mais tarde ou entre em contado com o suporte"
      );
    }
  }

  return (
    <div className="px-4">
      <div className="w-full max-w-xl mx-auto bg-gray-200 dark:bg-black rounded-3xl">
        <header className="bg-linear-to-b from-lime-400 to-lime-500 py-8 px-6 w-full rounded-t-3xl text-center">
          <p className="font-bold text-2xl mb-2 dark:text-black-200">
            {isEditing ? "Editar Serviço" : "Adicionar Novo Serviço"}
          </p>
          <p className="dark:text-black-200 text-sm">Preencha as informações do serviço</p>
        </header>
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 grid gap-4 overflow-y-auto max-h-dvh">
          <Input
            label="Nome do serviço"
            placeholder="Ex: Curso de informática"
            {...register("title")}
            error={errors.title?.message}
          />

          <Select
            label="Categoria do serviço"
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
            {...register("categoryId")}
          />

          <div className="grid md:grid-cols-2 gap-4">
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
          </div>

          <Textarea
            label="Descrição do serviço"
            placeholder="Descreva o serviço"
            rows={4}
            {...register("description")}
            error={errors.description?.message}
          />

          <div className="grid grid-cols-2 gap-4">
            <Button disabled={isSubmitting} variant="accent" onClick={handleOnCancel}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : submitButtonText}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
