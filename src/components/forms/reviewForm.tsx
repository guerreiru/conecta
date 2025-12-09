"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import {
  useCreateReview,
  useDeleteReview,
  useUpdateReview,
} from "@/hooks/useReviewQueries";
import { Review } from "@/types/Review";
import { zodResolver } from "@hookform/resolvers/zod";
import { PencilIcon, StarIcon, TrashIcon } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const reviewSchema = z.object({
  rating: z.number().min(1, "Selecione uma avaliação").max(5),
  comment: z
    .string()
    .max(200, "Máximo 200 caracteres")
    .optional()
    .or(z.literal("")),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  serviceId: string;
  providerId: string;
  userReview?: Review | null;
  onSuccess?: () => void;
}

export function ReviewForm({
  serviceId,
  providerId,
  userReview,
}: ReviewFormProps) {
  const { user } = useAuth();
  const createReview = useCreateReview();
  const updateReview = useUpdateReview();
  const deleteReview = useDeleteReview(serviceId);
  const [hoverRating, setHoverRating] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: userReview
      ? {
          rating: userReview.rating,
          comment: userReview.comment,
        }
      : { rating: 0, comment: "" },
  });

  const currentRating = watch("rating");

  useEffect(() => {
    if (userReview) {
      reset({
        rating: userReview.rating,
        comment: userReview.comment || "",
      });
    }
  }, [userReview, reset]);

  if (!user || user.id === providerId) {
    return null;
  }

  async function onSubmit(data: ReviewFormData) {
    if (userReview && isEditing) {
      updateReview.mutate(
        { reviewId: userReview.id, payload: data, serviceId },
        {
          onSuccess: () => {
            setIsEditing(false);
          },
        }
      );
    } else if (!userReview) {
      createReview.mutate(
        { ...data, serviceId },
        {
          onSuccess: () => {
            reset({ rating: 0, comment: "" });
          },
        }
      );
    }
  }

  async function handleDelete() {
    if (
      userReview &&
      window.confirm("Tem certeza que deseja remover sua avaliação?")
    ) {
      deleteReview.mutate(userReview.id);
    }
  }

  return (
    <div className="bg-white dark:bg-black-200 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <h3 className="font-semibold mb-4">
        {userReview && isEditing
          ? "Editar sua avaliação"
          : userReview
          ? "Sua avaliação"
          : "Deixe uma avaliação"}
      </h3>

      {userReview && !isEditing ? (
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  size={20}
                  weight={star <= userReview.rating ? "fill" : "regular"}
                  className={
                    star <= userReview.rating
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition"
                title="Editar"
              >
                <PencilIcon size={18} />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded transition text-red-600 dark:text-red-400"
                title="Deletar"
              >
                <TrashIcon size={18} />
              </button>
            </div>
          </div>
          {userReview.comment && (
            <p className="text-gray-700 dark:text-gray-300">
              {userReview.comment}
            </p>
          )}
          <p className="text-xs text-gray-500">
            {new Date(
              userReview.updatedAt || userReview.createdAt
            ).toLocaleDateString("pt-BR")}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-semibold mb-2 block">
              Sua avaliação
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setValue("rating", star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition"
                >
                  <StarIcon
                    size={32}
                    weight={
                      star <= (hoverRating || currentRating)
                        ? "fill"
                        : "regular"
                    }
                    className={
                      star <= (hoverRating || currentRating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                </button>
              ))}
            </div>
            {errors.rating && (
              <p className="text-red-500 text-xs mt-1">
                {errors.rating.message}
              </p>
            )}
            <input
              type="hidden"
              {...register("rating", { valueAsNumber: true })}
            />
          </div>

          <Textarea
            label="Seu comentário (opcional)"
            placeholder="Compartilhe sua experiência com este serviço... (máximo 200 caracteres)"
            rows={4}
            {...register("comment")}
            error={errors.comment?.message}
          />

          <div className="flex gap-2">
            {userReview && isEditing && (
              <Button
                type="button"
                variant="border"
                onClick={() => {
                  setIsEditing(false);
                  reset();
                }}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
            )}
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting
                ? "Enviando..."
                : userReview && isEditing
                ? "Atualizar"
                : "Enviar avaliação"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
