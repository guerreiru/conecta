import { useState } from "react";
import { api } from "@/services/api";
import { Service } from "@/types/Service";

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
      const res = await api(
        `/services/search?stateId=${stateId}&cityId=${cityId}&searchTerm=${searchTerm}&categoryId=${categoryId}`
      );
      setServices(res.data?.data ?? res.data ?? []);
    }
  };

  return { services, fetchServices };
}