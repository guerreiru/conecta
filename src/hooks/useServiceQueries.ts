import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { deleteService } from "@/services/servicesService";
import { Service } from "@/types/Service";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/constants/messages";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

export const serviceKeys = {
  all: ["services"] as const,
  lists: () => [...serviceKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...serviceKeys.lists(), filters] as const,
  details: () => [...serviceKeys.all, "detail"] as const,
  detail: (id: string) => [...serviceKeys.details(), id] as const,
  byProvider: (userId: string) =>
    [...serviceKeys.all, "provider", userId] as const,
  search: (params: Record<string, string>) =>
    [...serviceKeys.all, "search", params] as const,
};

export function useProviderServices(userId?: string) {
  return useQuery({
    queryKey: serviceKeys.byProvider(userId || ""),
    queryFn: async () => {
      if (!userId) return [];

      const response = await api.get(`/services/provider/${userId}`);
      const services = response.data as Service[];

      // Ordenar por título alfabeticamente para manter ordem consistente
      return services.sort((a, b) => a.title.localeCompare(b.title));
    },
    enabled: !!userId,
  });
}

export function useDeleteService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (serviceId: string) => deleteService(serviceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.all });
      toast.success(SUCCESS_MESSAGES.SERVICE_DELETED);
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        const message =
          error.response?.data?.message || ERROR_MESSAGES.SERVICE_DELETE_ERROR;
        toast.error(message);
        return;
      }
      toast.error(ERROR_MESSAGES.SERVICE_DELETE_ERROR);
    },
  });
}

export interface SearchServicesParams {
  stateId?: string;
  cityId?: string;
  searchTerm?: string;
  categoryId?: string | null;
  priceMin?: number;
  priceMax?: number;
  minRating?: number;
  sortBy?: string;
  serviceType?: string;
}

export function useSearchServices(params: SearchServicesParams) {
  const queryParams = new URLSearchParams({
    ...(params.stateId && { stateId: params.stateId }),
    ...(params.cityId && { cityId: params.cityId }),
    searchTerm: params.searchTerm || "",
    categoryId: params.categoryId || "",
    ...(params.priceMin !== undefined && {
      priceMin: params.priceMin.toString(),
    }),
    ...(params.priceMax !== undefined && {
      priceMax: params.priceMax.toString(),
    }),
    ...(params.minRating !== undefined && {
      minRating: params.minRating.toString(),
    }),
    sortBy: params.sortBy || "relevance",
    ...(params.serviceType && { serviceType: params.serviceType }),
  });

  return useQuery({
    queryKey: serviceKeys.search({
      stateId: params.stateId || "",
      cityId: params.cityId || "",
      searchTerm: params.searchTerm || "",
      categoryId: params.categoryId || "",
      priceMin: params.priceMin?.toString() || "",
      priceMax: params.priceMax?.toString() || "",
      minRating: params.minRating?.toString() || "",
      sortBy: params.sortBy || "relevance",
      serviceType: params.serviceType || "",
    }),
    queryFn: async () => {
      const response = await api.get(
        `/services/search?${queryParams.toString()}`
      );
      const services: Service[] = response.data?.data ?? response.data ?? [];
      return services;
    },
    enabled: true,
    staleTime: 1000 * 60 * 5,
  });
}

interface ServicePayload {
  title: string;
  description: string;
  price: number;
  typeOfChange: string;
  categoryId: string;
  userId: string;
}

export function useCreateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ServicePayload) => api.post("/services", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.all });
      toast.success(SUCCESS_MESSAGES.SERVICE_CREATED);
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        const message =
          error.response?.data?.message || ERROR_MESSAGES.SERVICE_CREATE_ERROR;
        toast.error(message);
        return;
      }
      toast.error(ERROR_MESSAGES.SERVICE_CREATE_ERROR);
    },
  });
}

export function useUpdateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ServicePayload }) =>
      api.put(`/services/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.all });
      toast.success(SUCCESS_MESSAGES.SERVICE_UPDATED);
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        const message =
          error.response?.data?.message || ERROR_MESSAGES.SERVICE_UPDATE_ERROR;
        toast.error(message);
        return;
      }
      toast.error(ERROR_MESSAGES.SERVICE_UPDATE_ERROR);
    },
  });
}

export function useActivateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (serviceId: string) =>
      api.patch(`/services/${serviceId}/activate`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.all });
      toast.success("Serviço ativado com sucesso!");
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Erro ao ativar serviço";
        toast.error(message);
        return;
      }
      toast.error("Erro ao ativar serviço");
    },
  });
}

export function useDeactivateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (serviceId: string) =>
      api.patch(`/services/${serviceId}/deactivate`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.all });
      toast.success("Serviço desativado com sucesso!");
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Erro ao desativar serviço";
        toast.error(message);
        return;
      }
      toast.error("Erro ao desativar serviço");
    },
  });
}

interface ChangeEmailPayload {
  newEmail: string;
  currentPassword: string;
}

export function useChangeEmail() {
  return useMutation({
    mutationFn: async (data: ChangeEmailPayload) => {
      const response = await api.put("/auth/change-email", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Email alterado com sucesso! Faça login novamente.", {
        autoClose: 2000,
      });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Erro ao alterar email";
        toast.error(message);
        return;
      }
      toast.error("Erro ao alterar email");
    },
  });
}

interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export function useChangePassword() {
  return useMutation({
    mutationFn: async (data: ChangePasswordPayload) => {
      const response = await api.put("/auth/change-password", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Senha alterada com sucesso! Faça login novamente.", {
        autoClose: 2000,
      });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Erro ao alterar senha";
        toast.error(message);
        return;
      }
      toast.error("Erro ao alterar senha");
    },
  });
}
