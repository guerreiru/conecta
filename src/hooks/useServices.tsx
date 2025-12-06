import { useState } from "react";
import { useSearchServices, SearchServicesParams } from "./useServiceQueries";

export function useServices() {
  const [searchParams, setSearchParams] = useState<SearchServicesParams>({
    stateId: undefined,
    cityId: undefined,
    searchTerm: "",
    categoryId: null,
    priceMin: 0,
    priceMax: 10000,
    minRating: 0,
    sortBy: "relevance",
    serviceType: "",
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
