'use client'

import { CategoryItem } from "@/components/categoryItem";
import { ServiceCard } from "@/components/serviceCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useCategories } from "@/hooks/useCategories";
import { useCitiesByState } from "@/hooks/useCitiesByState";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useServices } from "@/hooks/useServices";
import { Category } from "@/types/Category";
import { states } from "@/utils/states/states";
import { useEffect, useState } from "react";

export default function Start() {
  const { categories } = useCategories();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const [selectedState, setSelectedState] = useLocalStorage("selectedState", "");
  const [selectedCity, setSelectedCity] = useLocalStorage("selectedCity", "");
  const { cities, loading: citiesLoading } = useCitiesByState(selectedState);

  const { services, fetchServices } = useServices();

  const handleSearch = async (categoryParam?: Category | null) => {
    const categoryId = categoryParam?.id ?? selectedCategory?.id ?? null;
    fetchServices({ stateId: selectedState, cityId: selectedCity, searchTerm, categoryId });
  };

  useEffect(() => {
    handleSearch();
  }, [selectedCategory]);

  useEffect(() => {
    handleSearch();
  }, [selectedCity]);

  return (
    <div className="py-4 grid gap-y-6 max-w-3xl mx-auto">
      <div className="grid md:grid-cols-2 gap-2">
        <Select
          id="state"
          name="state"
          label="Estado"
          value={selectedState}
          onChange={(e) => {
            setSelectedState(e.target.value);
            setSelectedCity("");
          }}
          defaultValue="Selecione o Estado"
          options={states.map((state) => ({
            label: state.name,
            value: state.id,
          }))}
        />

        <Select
          id="city"
          name="city"
          label="Cidade"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          defaultValue={
            citiesLoading ? "Carregando cidades..." : "Selecione a Cidade"
          }
          options={cities.map((city) => ({
            label: city.name,
            value: city.id,
          }))}
        />
      </div>

      <h1 className="font-semibold text-2xl">Categorias</h1>
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

      <div className="grid md:grid-cols-[1fr_auto] gap-y-1 gap-x-2 items-end">
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

      {services.length > 0 ? (
        <div className="grid gap-2.5">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              ownerName={
                service.company?.companyName ||
                service.provider?.profile.user?.name
              }
            />
          ))}
        </div>
      ) : (
        <p>Nenhum serviço encontrado</p>
      )}
    </div>
  );
}