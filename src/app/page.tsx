"use client";

import { CategoryItem } from "@/components/categoryItem";
import { HowItWorksCard } from "@/components/howItWorksCard";
import { LocationModal } from "@/components/locationModal";
import { ServiceCard } from "@/components/serviceCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useCategories } from "@/hooks/useCategories";
import { useCitiesByState } from "@/hooks/useCitiesByState";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useServices } from "@/hooks/useServices";
import { Category } from "@/types/Category";
import { MapPinIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

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
  const { user } = useAuth()

  const handleSearch = async (categoryParam?: Category | null) => {
    const categoryId = categoryParam?.id ?? selectedCategory?.id ?? null;
    fetchServices({
      stateId: selectedState,
      cityId: selectedCity,
      searchTerm,
      categoryId,
    });
  };

  useEffect(() => {
    handleSearch();
  }, [selectedCategory, selectedCity]);

  useEffect(() => {
    if (selectedCity) {
      const city = cities.find(
        (c) => c.id === selectedCity
      );

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
      <div className="bg-white dark:bg-black-200 grid gap-y-6 px-4 md:px-6 pb-6">
        {user?.name && <div>
          <p className="font-bold text-2xl mt-4">Olá, {user.name}</p>
        </div>}

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
          <p className="font-bold text-xl md:text-2xl">Mostrando serviços em: {cityName}</p>
          <button className="flex items-center gap-2 border border-lime-400 py-3.5 px-6 rounded-xl hover:brightness-90 bg-white dark:bg-black-200" onClick={handleChangeLocation}>
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
          <p>Nenhum serviço encontrado</p>
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