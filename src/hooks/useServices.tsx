import { useState } from "react";
import { useSearchServices, SearchServicesParams } from "./useServiceQueries";
import { sortByHighlight } from "@/utils/sortByHighlight";

export function useServices() {
  const [searchParams, setSearchParams] = useState<SearchServicesParams>({
    stateId: "",
    cityId: "",
    searchTerm: "",
    categoryId: null,
  });

  const {
    data: rawServices = [],
    isLoading,
    isError,
  } = useSearchServices(searchParams);

  const services = sortByHighlight(rawServices);

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
