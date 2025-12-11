import { useState, useMemo } from "react";
import {
  useInfiniteSearchServices,
  SearchServicesParams,
} from "./useServiceQueries";

export function useServices() {
  const [searchParams, setSearchParams] = useState<
    Omit<SearchServicesParams, "page">
  >({
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
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteSearchServices(searchParams);

  const services = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) ?? [];
  }, [data]);

  const totalServices = data?.pages[0]?.total ?? 0;
  const currentPage = data?.pages[data.pages.length - 1]?.page ?? 1;
  const lastPage = data?.pages[0]?.lastPage ?? 1;

  const fetchServices = (params: Omit<SearchServicesParams, "page">) => {
    setSearchParams(params);
  };

  return {
    services,
    fetchServices,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    totalServices,
    currentPage,
    lastPage,
  };
}
