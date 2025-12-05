import { useState } from "react";
import { useSearchServices, SearchServicesParams } from "./useServiceQueries";

export function useServices() {
  const [searchParams, setSearchParams] = useState<SearchServicesParams>({
    stateId: "",
    cityId: "",
    searchTerm: "",
    categoryId: null,
  });

  const {
    data: services = [],
    isLoading,
    isError,
  } = useSearchServices(searchParams);

  const fetchServices = (params: SearchServicesParams) => {
    setSearchParams(params);
  };

  return {
    services,
    fetchServices,
    isLoading,
    isError,
  };
}
