"use client";

import { ActiveFilters } from "@/components/activeFilters";
import { AdvancedFilters } from "@/components/advancedFilters";
import { CategoryItem } from "@/components/categoryItem";
import { HowItWorksCard } from "@/components/howItWorksCard";
import { LocationModal } from "@/components/locationModal";
import { ServiceCard } from "@/components/service/serviceCard";
import { ServiceSkeleton } from "@/components/skeletons/serviceSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useCitiesByState } from "@/hooks/useCitiesByState";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useServices } from "@/hooks/useServices";
import { Category } from "@/types/Category";
import { categories } from "@/utils/categories";
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  SuitcaseIcon,
  ArrowUpIcon,
} from "@phosphor-icons/react";
import { useCallback, useEffect, useState } from "react";

export default function Start() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [selectedState, setSelectedState] = useLocalStorage(
    "selectedState",
    ""
  );
  const [selectedCity, setSelectedCity] = useLocalStorage("selectedCity", "");
  const {
    services,
    fetchServices,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    totalServices,
    isLoading,
  } = useServices();
  const { cities } = useCitiesByState(selectedState);
  const [cityName, setCityName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("relevance");
  const [serviceType, setServiceType] = useState("");
  const { user } = useAuth();

  const handleSearch = useCallback(
    async (categoryParam?: Category | null) => {
      const categoryId = categoryParam?.id ?? selectedCategory?.id ?? null;
      fetchServices({
        stateId: selectedState,
        cityId: selectedCity,
        searchTerm,
        categoryId,
        priceMin: priceRange.min,
        priceMax: priceRange.max,
        minRating,
        sortBy,
        serviceType,
      });
    },
    [
      selectedCategory,
      selectedState,
      selectedCity,
      searchTerm,
      priceRange,
      minRating,
      sortBy,
      serviceType,
      fetchServices,
    ]
  );

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedCity]);

  useEffect(() => {
    if (selectedCity) {
      const city = cities.find((c) => c.id === selectedCity);

      if (city) {
        setCityName(city.name);
      }
    }
  }, [cities, selectedCity]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleChangeLocation() {
    setIsModalOpen(true);
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const handleFetchWithOverrides = useCallback(
    (
      overrides: Partial<{
        stateId: string;
        cityId: string;
        searchTerm: string;
        categoryId: string | null;
        priceMin: number;
        priceMax: number;
        minRating: number;
        sortBy: string;
        serviceType: string;
      }> = {}
    ) => {
      fetchServices({
        stateId: selectedState,
        cityId: selectedCity,
        searchTerm,
        categoryId: selectedCategory?.id ?? null,
        priceMin: priceRange.min,
        priceMax: priceRange.max,
        minRating,
        sortBy,
        serviceType,
        ...overrides,
      });
    },
    [
      selectedState,
      selectedCity,
      searchTerm,
      selectedCategory,
      priceRange,
      minRating,
      sortBy,
      serviceType,
      fetchServices,
    ]
  );

  function handleClearLocation() {
    setSelectedState("");
    setSelectedCity("");
    setCityName("");
    handleFetchWithOverrides({ stateId: "", cityId: "" });
  }

  function handleClearAllFilters() {
    setSelectedCategory(null);
    setSearchTerm("");
    setPriceRange({ min: 0, max: 10000 });
    setMinRating(0);
    setSortBy("relevance");
    setServiceType("");
    setSelectedState("");
    setSelectedCity("");
    setCityName("");

    fetchServices({
      stateId: "",
      cityId: "",
      searchTerm: "",
      categoryId: null,
      priceMin: 0,
      priceMax: 10000,
      minRating: 0,
      sortBy: "relevance",
      serviceType: "",
    });
  }

  return (
    <>
      <div className="bg-white dark:bg-black-200 grid gap-y-6 px-4 md:px-6 pb-2">
        <div className="mt-4">
          {user?.id && (
            <div className="pb-2">
              <p className="text-2xl font-bold">Olá, {user.name}!</p>
              <span className="text-sm text-gray-400">{cityName}</span>
            </div>
          )}
          <div className="grid md:grid-cols-[1fr_auto] gap-y-1 gap-x-2 max-w-2xl mx-auto w-full">
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Digite o nome do serviço"
              className="w-full"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
              rightIcon={<MagnifyingGlassIcon size={18} />}
            />
          </div>
        </div>

        <ul className="flex overflow-x-auto pb-2 whitespace-nowrap gap-2 custom-scrollbar">
          <li
            className="cursor-pointer block"
            onClick={() => {
              setSelectedCategory(null);
            }}
          >
            <CategoryItem name="Todas" active={!selectedCategory} />
          </li>
          {categories.map((category) => (
            <li
              key={category.id}
              className="cursor-pointer"
              onClick={() => {
                setSelectedCategory(category);
              }}
            >
              <CategoryItem
                name={category.name}
                description={category.description}
                active={selectedCategory?.name === category.name}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="px-4 md:px-6 py-4 grid gap-y-5">
        <div className="max-w-2xl mx-auto w-full">
          <HowItWorksCard />
        </div>

        <div className="flex items-center justify-between flex-wrap gap-2 w-full max-w-2xl mx-auto">
          <div className="w-full">
            <p className="font-bold text-center text-lg md:text-2xl">
              Mostrando serviços
              {cityName ? ` em: ${cityName}` : " em todo o Brasil"}
            </p>
          </div>
          <div className="grid md:flex gap-2 flex-wrap w-full">
            <div className="flex items-center justify-center w-full flex-wrap gap-2">
              <AdvancedFilters
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                minRating={minRating}
                setMinRating={setMinRating}
                sortBy={sortBy}
                setSortBy={setSortBy}
                serviceType={serviceType}
                setServiceType={setServiceType}
                onApply={handleSearch}
              />
              <button
                className="flex items-center gap-2 border border-gray-200 py-2.5 px-3.5 rounded-full hover:brightness-90 bg-white dark:bg-black-200 shadow transition"
                onClick={handleChangeLocation}
              >
                <MapPinIcon size={18} />
                Alterar localização
              </button>
              <ActiveFilters
                searchTerm={searchTerm}
                selectedCategory={selectedCategory}
                cityName={cityName}
                priceRange={priceRange}
                minRating={minRating}
                sortBy={sortBy}
                serviceType={serviceType}
                onClearSearchTerm={() => {
                  setSearchTerm("");
                  handleFetchWithOverrides({ searchTerm: "" });
                }}
                onClearCategory={() => {
                  setSelectedCategory(null);
                  handleFetchWithOverrides({ categoryId: null });
                }}
                onClearLocation={handleClearLocation}
                onClearPriceRange={() => {
                  setPriceRange({ min: 0, max: 10000 });
                  handleFetchWithOverrides({ priceMin: 0, priceMax: 10000 });
                }}
                onClearMinRating={() => {
                  setMinRating(0);
                  handleFetchWithOverrides({ minRating: 0 });
                }}
                onClearSortBy={() => {
                  setSortBy("relevance");
                  handleFetchWithOverrides({ sortBy: "relevance" });
                }}
                onClearServiceType={() => {
                  setServiceType("");
                  handleFetchWithOverrides({ serviceType: "" });
                }}
                onClearAll={handleClearAllFilters}
              />
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="grid gap-4 w-full max-w-2xl mx-auto">
            <div className="grid gap-2.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <ServiceSkeleton key={n} />
              ))}
            </div>
          </div>
        )}

        {services.length > 0 ? (
          <div className="grid gap-4 w-full max-w-2xl mx-auto">
            <div className="grid gap-2.5">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  owner={service.user}
                />
              ))}
            </div>

            <div className="text-center space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Mostrando {services.length} de {totalServices} resultados
              </p>

              {hasNextPage && (
                <Button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  variant="accent"
                  className="w-full max-w-xs"
                >
                  {isFetchingNextPage ? "Carregando..." : "Ver mais"}
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full max-w-2xl mx-auto text-center">
            <div className="bg-white dark:bg-black-200 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="mb-4">
                <SuitcaseIcon
                  size={48}
                  className="mx-auto text-gray-400 dark:text-gray-600"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">
                Nenhum serviço encontrado
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Não encontramos serviços{" "}
                {selectedCategory && `de "${selectedCategory.name}" `}
                {cityName ? `em ${cityName}` : "em todo o Brasil"}.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="accent" onClick={handleClearAllFilters}>
                  Limpar filtros
                </Button>
                <Button onClick={handleChangeLocation}>
                  Tentar outra localização
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <LocationModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        selectedState={selectedState}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        setSelectedState={setSelectedState}
      />

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-4 bg-lime-400 hover:bg-lime-500 text-black dark:text-black-200 p-4 rounded-full shadow-lg transition-all hover:scale-110 z-50"
          aria-label="Voltar ao topo"
        >
          <ArrowUpIcon size={24} weight="bold" />
        </button>
      )}
    </>
  );
}
