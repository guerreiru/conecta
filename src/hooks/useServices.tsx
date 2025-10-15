import { useState } from "react";
import { api } from "@/services/api";
import { Service } from "@/types/Service";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

interface FetchServicesParams {
  stateId: string;
  cityId: string;
  searchTerm: string;
  categoryId: string | null;
}

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);

  const fetchServices = async ({
    stateId,
    cityId,
    searchTerm,
    categoryId,
  }: FetchServicesParams) => {
    if (stateId && cityId) {
      try {
        const res = await api(
          `/services/search?stateId=${stateId}&cityId=${cityId}&searchTerm=${searchTerm}&categoryId=${categoryId}`
        );

        setServices(res.data?.data ?? res.data ?? []);
      } catch (error) {
        if (isAxiosError(error)) {
          const message =
            error.response?.data.message ||
            "Erro ao buscar serviços, tente novamente mais tarde ou entre em contado com o suporte";
          toast.error(message);
          return;
        }

        toast.error(
          "Erro ao buscar serviços, tente novamente mais tarde ou entre em contado com o suporte"
        );
      }
    }
  };

  return { services, fetchServices };
}