"use client";

import { useCategories } from "@/hooks/useCategories";
import { useCreateService, useUpdateService } from "@/hooks/useServiceQueries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
};

export function ServiceForm({
  onCancel,
  onServiceAdded,
  serviceToEdit,
}: ServiceFormProps) {
  const { categories } = useCategories();
  const { user } = useAuth();
  const createServiceMutation = useCreateService();
  const updateServiceMutation = useUpdateService();

  const isEditing = !!serviceToEdit;
  const submitButtonText = isEditing
    ? "Salvar Alterações"
    : "Cadastrar Serviço";
  const isLoading =
    createServiceMutation.isPending || updateServiceMutation.isPending;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
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
    if (!user?.id) return;

    const servicePayload = {
      ...data,
      userId: user.id,
    };

    if (isEditing) {
      updateServiceMutation.mutate(
        { id: serviceToEdit.id, data: servicePayload },
        {
          onSuccess: () => {
            onServiceAdded();
            reset();
          },
        }
      );
    } else {
      createServiceMutation.mutate(servicePayload, {
        onSuccess: () => {
          onServiceAdded();
          reset();
        },
      });
    }
  }

  return (
    <div className="px-4">
      <div className="w-full max-w-xl mx-auto bg-gray-200 dark:bg-black rounded-3xl">
        <header className="bg-linear-to-b from-lime-400 to-lime-500 py-8 px-6 w-full rounded-t-3xl text-center">
          <p className="font-bold text-2xl mb-2 dark:text-black-200">
            {isEditing ? "Editar Serviço" : "Adicionar Novo Serviço"}
          </p>
          <p className="dark:text-black-200 text-sm">
            Preencha as informações do serviço
          </p>
        </header>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 grid gap-4 overflow-y-auto max-h-dvh"
        >
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
              list="billingTypes"
              type="text"
              {...register("typeOfChange")}
              error={errors.typeOfChange?.message}
            />

            <datalist id="billingTypes">
              <option value="Hora" />
              <option value="Diária" />
              <option value="Mês" />
              <option value="Projeto" />
            </datalist>
          </div>

          <Textarea
            label="Descrição do serviço"
            placeholder="Descreva o serviço"
            rows={4}
            {...register("description")}
            error={errors.description?.message}
          />

          <div className="grid grid-cols-2 gap-4">
            <Button
              disabled={isLoading}
              variant="border"
              onClick={handleOnCancel}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : submitButtonText}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
