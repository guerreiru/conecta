"use client";

import { ActiveFilters } from "@/components/activeFilters";
import { AdvancedFilters } from "@/components/advancedFilters";
import { CategoryItem } from "@/components/categoryItem";
import { HowItWorksCard } from "@/components/howItWorksCard";
import { LocationModal } from "@/components/locationModal";
import { ServiceCard } from "@/components/service/serviceCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useCategories } from "@/hooks/useCategories";
import { useCitiesByState } from "@/hooks/useCitiesByState";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useServices } from "@/hooks/useServices";
import { Category } from "@/types/Category";
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  SuitcaseIcon,
} from "@phosphor-icons/react";
import { useCallback, useEffect, useState } from "react";

export default function Start() {
  const { categories } = useCategories();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const [selectedState, setSelectedState] = useLocalStorage(
    "selectedState",
    ""
  );
  const [selectedCity, setSelectedCity] = useLocalStorage("selectedCity", "");
  const { services, fetchServices } = useServices();
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
  }, [selectedCategory, selectedCity]);

  useEffect(() => {
    if (selectedCity) {
      const city = cities.find((c) => c.id === selectedCity);

      if (city) {
        setCityName(city.name);
      }
    }
  }, [cities, selectedCity]);

  function handleChangeLocation() {
    setIsModalOpen(true);
  }

  function handleClearLocation() {
    setSelectedState("");
    setSelectedCity("");
    setCityName("");
  }

  function handleClearAllFilters() {
    setSelectedCategory(null);
    setSearchTerm("");
    setPriceRange({ min: 0, max: 10000 });
    setMinRating(0);
    setSortBy("relevance");
    setServiceType("");
    handleClearLocation();

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
        {user?.id && (
          <div>
            <p className="text-2xl font-bold mt-4">Olá, {user.name}!</p>
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
                  handleSearch();
                }}
                onClearCategory={() => {
                  setSelectedCategory(null);
                }}
                onClearLocation={handleClearLocation}
                onClearPriceRange={() => {
                  setPriceRange({ min: 0, max: 10000 });
                  handleSearch();
                }}
                onClearMinRating={() => {
                  setMinRating(0);
                  handleSearch();
                }}
                onClearSortBy={() => {
                  setSortBy("relevance");
                  handleSearch();
                }}
                onClearServiceType={() => {
                  setServiceType("");
                  handleSearch();
                }}
                onClearAll={handleClearAllFilters}
              />
            </div>
          </div>
        </div>

        {services.length > 0 ? (
          <div className="grid gap-2.5 w-full max-w-2xl mx-auto">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                owner={service.user}
              />
            ))}
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
    </>
  );
}
