"use client";

import { XIcon } from "@phosphor-icons/react";
import { Category } from "@/types/Category";

interface ActiveFiltersProps {
  searchTerm: string;
  selectedCategory: Category | null;
  cityName: string;
  priceRange: { min: number; max: number };
  minRating: number;
  sortBy: string;
  serviceType: string;
  onClearSearchTerm: () => void;
  onClearCategory: () => void;
  onClearLocation: () => void;
  onClearPriceRange: () => void;
  onClearMinRating: () => void;
  onClearSortBy: () => void;
  onClearServiceType: () => void;
  onClearAll: () => void;
}

export function ActiveFilters({
  searchTerm,
  selectedCategory,
  cityName,
  priceRange,
  minRating,
  sortBy,
  serviceType,
  onClearSearchTerm,
  onClearCategory,
  onClearLocation,
  onClearPriceRange,
  onClearMinRating,
  onClearSortBy,
  onClearServiceType,
}: ActiveFiltersProps) {
  const hasActiveFilters =
    searchTerm ||
    selectedCategory ||
    cityName ||
    priceRange.min > 0 ||
    priceRange.max < 10000 ||
    minRating > 0 ||
    sortBy !== "relevance" ||
    serviceType;

  if (!hasActiveFilters) {
    return null;
  }

  const sortByLabels: Record<string, string> = {
    relevance: "Relevância",
    price_asc: "Menor preço",
    price_desc: "Maior preço",
    rating: "Melhor avaliação",
    newest: "Mais recentes",
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex flex-wrap gap-2">
        {searchTerm && (
          <FilterChip
            label={`Busca: "${searchTerm}"`}
            onRemove={onClearSearchTerm}
          />
        )}

        {selectedCategory && (
          <FilterChip
            label={`Categoria: ${selectedCategory.name}`}
            onRemove={onClearCategory}
          />
        )}

        {cityName && (
          <FilterChip label={`Local: ${cityName}`} onRemove={onClearLocation} />
        )}

        {(priceRange.min > 0 || priceRange.max < 10000) && (
          <FilterChip
            label={`Preço: R$ ${priceRange.min} - R$ ${priceRange.max}`}
            onRemove={onClearPriceRange}
          />
        )}

        {minRating > 0 && (
          <FilterChip
            label={`Avaliação mínima: ${minRating} ★`}
            onRemove={onClearMinRating}
          />
        )}

        {sortBy !== "relevance" && (
          <FilterChip label={sortByLabels[sortBy]} onRemove={onClearSortBy} />
        )}

        {serviceType && (
          <FilterChip
            label={`Tipo: ${
              serviceType === "in_person"
                ? "Presencial"
                : serviceType === "online"
                ? "Remoto"
                : "Todos"
            }`}
            onRemove={onClearServiceType}
          />
        )}
      </div>
    </div>
  );
}
interface FilterChipProps {
  label: string;
  onRemove: () => void;
}

function FilterChip({ label, onRemove }: FilterChipProps) {
  return (
    <button
      onClick={onRemove}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-lime-50 dark:bg-lime-900/20 text-lime-700 dark:text-lime-300 border border-lime-200 dark:border-lime-700 rounded-full text-sm font-medium hover:bg-lime-100 dark:hover:bg-lime-900/30 transition"
    >
      <span>{label}</span>
      <XIcon size={14} weight="bold" />
    </button>
  );
}
