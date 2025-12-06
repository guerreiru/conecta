"use client";
import { useCitiesByState } from "@/hooks/useCitiesByState";
import { states } from "@/utils/states/states";
import { MapPinIcon } from "@phosphor-icons/react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Select } from "./ui/select";

type LocationModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedState: string;
  selectedCity: string;
  setSelectedState: (state: string) => void;
  setSelectedCity: (city: string) => void;
};

export function LocationModal({
  isOpen,
  setIsOpen,
  selectedCity,
  selectedState,
  setSelectedCity,
  setSelectedState,
}: LocationModalProps) {
  const [tempState, setTempState] = useState(selectedState);
  const [tempCity, setTempCity] = useState(selectedCity);

  const { cities: tempCities, loading: loadingCities } =
    useCitiesByState(tempState);

  useEffect(() => {
    if (isOpen) {
      setTempState(selectedState);
      setTempCity(selectedCity);
    }
  }, [isOpen, selectedState, selectedCity]);

  const handleFilter = () => {
    if (tempState && tempCity) {
      setSelectedState(tempState);
      setSelectedCity(tempCity);
      setIsOpen(false);
    }
  };

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
      tempCities.map((c) => ({
        label: c.name,
        value: c.id,
      })),
    [tempCities]
  );

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [setIsOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60 px-4 z-50"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="bg-lime-400 rounded-lg shadow-lg w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
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
              value={tempState}
              onChange={(e) => {
                setTempState(e.target.value);
                setTempCity("");
              }}
              defaultValue="Selecione o estado"
              options={stateOptions}
            />

            <Select
              id="city"
              name="city"
              label="Cidade"
              value={tempCity}
              onChange={(e) => setTempCity(e.target.value)}
              disabled={!tempState || loadingCities}
              defaultValue={
                loadingCities ? "Carregando cidades..." : "Selecione a cidade"
              }
              options={cityOptions}
            />

            <div className="mt-2 flex gap-4 w-full">
              <Button
                className="w-full"
                variant="border"
                onClick={() => setIsOpen(false)}
              >
                Fechar
              </Button>

              <Button
                className="w-full"
                onClick={handleFilter}
                disabled={!tempState || !tempCity}
              >
                Filtrar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
