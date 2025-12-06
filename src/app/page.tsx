"use client";

import { AdvancedFilters } from "@/components/advancedFilters";
import { CategoryItem } from "@/components/categoryItem";
import { HowItWorksCard } from "@/components/howItWorksCard";
import { LocationModal } from "@/components/locationModal";
import { ServiceCard } from "@/components/serviceCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCategories } from "@/hooks/useCategories";
import { useCitiesByState } from "@/hooks/useCitiesByState";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useServices } from "@/hooks/useServices";
import { Category } from "@/types/Category";
import { MapPinIcon, SuitcaseIcon } from "@phosphor-icons/react";
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

  return (
    <>
      <div className="bg-white dark:bg-black-200 grid gap-y-6 px-4 md:px-6 pb-2">
        <div className="grid md:grid-cols-[1fr_auto] gap-y-1 gap-x-2 items-end mt-3">
          <Input
            label="Termo de Busca:"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Digite o nome do serviço"
            className="w-full"
          />
          <Button className="mt-2" onClick={() => handleSearch()}>
            Buscar
          </Button>
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

      <div className="px-4 md:px-6 py-4 grid gap-y-6">
        <HowItWorksCard />

        <div className="flex items-center justify-between flex-wrap gap-2 w-full max-w-2xl mx-auto">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-bold text-lg md:text-2xl">
              Mostrando serviços
              {cityName ? ` em: ${cityName}` : " em todo o Brasil"}
            </p>
          </div>
          <div className="grid md:flex gap-2 flex-wrap w-full">
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
              className="flex items-center gap-2 border border-lime-400 py-3.5 px-6 rounded-xl hover:brightness-90 bg-white dark:bg-black-200 transition"
              onClick={handleChangeLocation}
            >
              <MapPinIcon size={18} />
              Alterar localização
            </button>

            {cityName && (
              <button
                className="flex items-center gap-2 border border-transparent py-3.5 px-6 rounded-xl hover:brightness-90 bg-lime-400 dark:bg-lime-600 transition"
                onClick={handleClearLocation}
              >
                Limpar localização
              </button>
            )}
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
          <div className="w-full max-w-2xl mx-auto text-center py-12">
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
                <Button
                  variant="accent"
                  onClick={() => {
                    setSelectedCategory(null);
                    setSearchTerm("");
                    setPriceRange({ min: 0, max: 10000 });
                    setMinRating(0);
                    setSortBy("relevance");
                    setServiceType("");
                    handleClearLocation();
                    handleSearch(null);
                  }}
                >
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
