import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import {
  getServiceReviews,
  getUserReview,
  createReview,
  updateReview,
  deleteReview,
  getServiceStats,
} from "@/services/reviewsService";
import { CreateReviewPayload, UpdateReviewPayload } from "@/types/Review";
import { ERROR_MESSAGES } from "@/constants/messages";

export const reviewKeys = {
  all: ["reviews"] as const,
  byService: (serviceId: string) =>
    [...reviewKeys.all, "service", serviceId] as const,
  myReview: (serviceId: string) =>
    [...reviewKeys.all, "my-review", serviceId] as const,
  stats: (serviceId: string) =>
    [...reviewKeys.all, "stats", serviceId] as const,
};

export function useServiceReviews(serviceId: string) {
  return useQuery({
    queryKey: reviewKeys.byService(serviceId),
    queryFn: () => getServiceReviews(serviceId),
    enabled: !!serviceId,
    staleTime: 30000, // 30 segundos
  });
}

export function useUserReview(serviceId: string, userId?: string) {
  return useQuery({
    queryKey: reviewKeys.myReview(serviceId),
    queryFn: () => getUserReview(serviceId),
    enabled: !!serviceId && !!userId, // Só executa se tiver serviceId E userId
    staleTime: 30000, // 30 segundos
  });
}

export function useServiceStats(serviceId: string) {
  return useQuery({
    queryKey: reviewKeys.stats(serviceId),
    queryFn: () => getServiceStats(serviceId),
    enabled: !!serviceId,
    staleTime: 30000, // 30 segundos
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateReviewPayload) => createReview(payload),
    onSuccess: async (data, variables) => {
      const serviceId = variables.serviceId;

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: reviewKeys.byService(serviceId),
          refetchType: "active",
        }),
        queryClient.invalidateQueries({
          queryKey: reviewKeys.myReview(serviceId),
          refetchType: "active",
        }),
        queryClient.invalidateQueries({
          queryKey: reviewKeys.stats(serviceId),
          refetchType: "active",
        }),
      ]);

      toast.success("Avaliação enviada com sucesso!");
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        const message =
          error.response?.data?.message || ERROR_MESSAGES.SERVICE_CREATE_ERROR;
        toast.error(message);
        return;
      }
      toast.error("Erro ao enviar avaliação");
    },
  });
}

export function useUpdateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      reviewId,
      payload,
    }: {
      reviewId: string;
      serviceId: string;
      payload: UpdateReviewPayload;
    }) => updateReview(reviewId, payload),

    onSuccess: async (_, { serviceId }) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: reviewKeys.byService(serviceId),
        }),
        queryClient.invalidateQueries({
          queryKey: reviewKeys.myReview(serviceId),
        }),
        queryClient.invalidateQueries({
          queryKey: reviewKeys.stats(serviceId),
        }),
      ]);

      toast.success("Avaliação atualizada com sucesso!");
    },

    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Erro ao atualizar");
        return;
      }
      toast.error("Erro ao atualizar avaliação");
    },
  });
}

export function useDeleteReview(serviceId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId: string) => deleteReview(reviewId),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: reviewKeys.byService(serviceId),
          refetchType: "active",
        }),
        queryClient.invalidateQueries({
          queryKey: reviewKeys.myReview(serviceId),
          refetchType: "active",
        }),
        queryClient.invalidateQueries({
          queryKey: reviewKeys.stats(serviceId),
          refetchType: "active",
        }),
      ]);

      toast.success("Avaliação removida com sucesso!");
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Erro ao remover avaliação";
        toast.error(message);
        return;
      }
      toast.error("Erro ao remover avaliação");
    },
  });
}
