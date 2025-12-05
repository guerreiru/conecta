"use client";

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
  const { cities, loading } = useCitiesByState(selectedState);
  const [cityName, setCityName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = useCallback(
    async (categoryParam?: Category | null) => {
      const categoryId = categoryParam?.id ?? selectedCategory?.id ?? null;
      fetchServices({
        stateId: selectedState,
        cityId: selectedCity,
        searchTerm,
        categoryId,
      });
    },
    [selectedCategory, selectedState, selectedCity, searchTerm, fetchServices]
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

  useEffect(() => {
    if (!selectedState && !selectedCity) {
      setIsModalOpen(true);
    }
  }, [selectedState, selectedCity]);

  function handleChangeLocation() {
    setSelectedCity("");
    setSelectedState("");
    setCityName("");
    setIsModalOpen(true);
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

        <div className="flex items-center justify-between flex-wrap gap-y-2 w-full max-w-2xl mx-auto">
          <p className="font-bold text-xl md:text-2xl">
            Mostrando serviços em: {cityName}
          </p>
          <button
            className="flex items-center gap-2 border border-lime-400 py-3.5 px-6 rounded-xl hover:brightness-90 bg-white dark:bg-black-200"
            onClick={handleChangeLocation}
          >
            <MapPinIcon size={18} />
            Alterar localização
          </button>
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
                em {cityName || "sua região"}.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="accent"
                  onClick={() => {
                    setSelectedCategory(null);
                    setSearchTerm("");
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
        cities={cities}
        loading={loading}
      />
    </>
  );
}
