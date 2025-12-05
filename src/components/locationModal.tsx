"use client";
import { City } from "@/types/City";
import { states } from "@/utils/states/states";
import { MapPinIcon } from "@phosphor-icons/react";
import { useEffect, useMemo } from "react";
import { Select } from "./ui/select";

type LocationModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedState: string;
  selectedCity: string;
  setSelectedState: (state: string) => void;
  setSelectedCity: (city: string) => void;
  cities: City[];
  loading: boolean;
};

export function LocationModal({
  isOpen,
  setIsOpen,
  selectedCity,
  selectedState,
  setSelectedCity,
  setSelectedState,
  cities,
  loading,
}: LocationModalProps) {
  useEffect(() => {
    if (selectedState && selectedCity) {
      setIsOpen(false);
    }
  }, [selectedState, selectedCity, setIsOpen]);

  const stateOptions = useMemo(
    () =>
      states.map((s) => ({
        label: s.name,
        value: s.id,
      })),
    []
  );

  const cityOptions = useMemo(
    () =>
      cities.map((c) => ({
        label: c.name,
        value: c.id,
      })),
    [cities]
  );

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 px-4 z-50">
      <div className="bg-lime-400 rounded-lg shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="px-6 pb-6 pt-7 text-center grid place-items-center">
          <div className="bg-black rounded-full p-4 mb-4">
            <MapPinIcon size={24} className="text-lime-400" />
          </div>
          <h2 className="text-2xl font-bold text-black">
            Qual sua localização?
          </h2>
          <p className="text-black mt-2 text-sm">
            Para encontrar os melhores profissionais na sua região
          </p>
        </div>

        <div className="bg-background dark:bg-black p-6 pb-7 rounded-b-lg">
          <div className="mt-4 grid place-items-center gap-4">
            <Select
              id="state"
              name="state"
              label="Estado"
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedCity("");
              }}
              defaultValue="Selecione o estado"
              options={stateOptions}
            />

            <Select
              id="city"
              name="city"
              label="Cidade"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              disabled={!selectedState || loading}
              defaultValue={
                loading ? "Carregando cidades..." : "Selecione a cidade"
              }
              options={cityOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
