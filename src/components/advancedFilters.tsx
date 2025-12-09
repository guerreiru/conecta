"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { FadersHorizontalIcon, XIcon } from "@phosphor-icons/react";
import { useState } from "react";

const filterOptions = [
  { value: "relevance", label: "Relevância" },
  { value: "price_asc", label: "Preço (menor)" },
  { value: "price_desc", label: "Preço (maior)" },
  { value: "rating_desc", label: "Melhor avaliado" },
  { value: "newest", label: "Mais recente" },
];

const ratingOptions = [
  { value: "0", label: "Qualquer" },
  { value: "3", label: "⭐ 3 estrelas ou mais" },
  { value: "4", label: "⭐ 4 estrelas ou mais" },
  { value: "5", label: "⭐ 5 estrelas" },
];

const serviceTypeOptions = [
  { value: "", label: "Qualquer um" },
  { value: "in_person", label: "Presencial" },
  { value: "online", label: "Online" },
  { value: "all", label: "Presencial + Online" },
];

interface AdvancedFiltersProps {
  priceRange: { min: number; max: number };
  setPriceRange: (range: { min: number; max: number }) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  serviceType: string;
  setServiceType: (type: string) => void;
  onApply: () => void;
}

export function AdvancedFilters({
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
  sortBy,
  setSortBy,
  serviceType,
  setServiceType,
  onApply,
}: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const hasActiveFilters =
    priceRange.min > 0 ||
    priceRange.max < 10000 ||
    minRating > 0 ||
    sortBy !== "relevance" ||
    serviceType;

  const handleReset = () => {
    setPriceRange({ min: 0, max: 10000 });
    setMinRating(0);
    setSortBy("relevance");
    setServiceType("");
    onApply();
  };

  const handleApply = () => {
    onApply();
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 border border-gray-200 py-2.5 px-3.5 rounded-full hover:brightness-90 bg-white dark:bg-black-200 shadow transition"
      >
        <FadersHorizontalIcon size={18} />
        <span>Filtros</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-end md:items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-black-200 rounded-t-2xl md:rounded-2xl w-full md:w-96 max-h-[90vh] overflow-y-auto shadow-lg p-6 space-y-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">Filtros Avançados</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
              >
                <XIcon size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="font-semibold text-sm mb-2 block">
                  Faixa de Preço
                </label>
                <div className="flex gap-2 items-end">
                  <div className="flex-1">
                    <Input
                      type="number"
                      label="Mín"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange({
                          ...priceRange,
                          min: Number(e.target.value),
                        })
                      }
                      min="0"
                    />
                  </div>
                  <span className="text-gray-400 pb-2">—</span>
                  <div className="flex-1">
                    <Input
                      type="number"
                      label="Máx"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange({
                          ...priceRange,
                          max: Number(e.target.value),
                        })
                      }
                      max="100000"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="font-semibold text-sm mb-2 block">
                  Avaliação Mínima
                </label>
                <Select
                  value={minRating.toString()}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  options={ratingOptions}
                  defaultValue="Qualquer"
                />
              </div>

              <div>
                <label className="font-semibold text-sm mb-2 block">
                  Tipo de Atendimento
                </label>
                <Select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  options={serviceTypeOptions}
                  defaultValue="Qualquer um"
                />
              </div>

              <div>
                <label className="font-semibold text-sm mb-2 block">
                  Ordenar por
                </label>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  options={filterOptions}
                  defaultValue="Selecione ordenação"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              {hasActiveFilters && (
                <Button
                  variant="unstyled"
                  onClick={handleReset}
                  className="flex-1 border border-red-600 text-red-600 hover:bg-red-50"
                >
                  Limpar
                </Button>
              )}
              <Button onClick={handleApply} className="flex-1">
                Aplicar Filtros
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
