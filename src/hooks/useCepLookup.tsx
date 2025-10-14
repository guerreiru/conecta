"use client";

import { AddressFormData } from "@/components/forms/addressFields";
import { api } from "@/services/api";
import { City } from "@/types/City";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { states } from "@/utils/states/states";
import { useEffect, useState } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";

type AddressEditable = Record<string, boolean>;

type FormWithAddress = {
  address: {
    zipCode: string;
    street?: string;
    neighborhood?: string;
    cityName?: string;
    cityId?: string;
    stateName?: string;
    stateId?: string;
  };
};

export function useCepLookup(
  watch: UseFormWatch<AddressFormData>,
  setValue: UseFormSetValue<AddressFormData>
) {
  const cepValue = watch("address.zipCode");
  const [addressEditable, setAddressEditable] = useState<AddressEditable>({
    street: false,
    neighborhood: false,
    cityName: false,
    cityId: false,
    stateName: false,
    stateId: false,
  });

  useEffect(() => {
    if (!cepValue || cepValue.replace(/\D/g, "").length < 8) return;

    const timer = setTimeout(async () => {
      const data = await fetchAddressByCep(cepValue);
      type AddressKeys = keyof FormWithAddress["address"];

      if (data) {
        Object.entries(data).forEach(([key, value]) =>
          setValue(`address.${key as AddressKeys}`, value || "")
        );

        setAddressEditable({
          street: !data.street,
          neighborhood: !data.neighborhood,
          cityName: false,
          cityId: false,
          stateName: false,
          stateId: false
        });
      } else {
        const addressKeysToClear: AddressKeys[] = [
          "street",
          "neighborhood",
          "cityName",
          "cityId",
          "stateName",
          "stateId",
        ];
        addressKeysToClear.forEach((key) => {
          setValue(`address.${key as AddressKeys}`, "" as string);
        });

        setAddressEditable({
          street: true,
          neighborhood: true,
          cityName: true,
          cityId: true,
          stateName: true,
          stateId: true
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [cepValue, setValue]);

  return { addressEditable };
}

async function fetchAddressByCep(zipCode: string) {
  try {
    const cleanedCep = zipCode.replace(/\D/g, "").slice(0, 8);
    if (cleanedCep.length !== 8) return null;

    const res = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);
    const data = await res.json();

    if (data.erro) return null;

    const state = states.find((state) => state.acronym.toUpperCase() === data.uf);
    let city: City | null = null

    if (state?.id) {
      const res = await api(`/cities?name=${data.localidade}&stateId=${state?.id}`)

      if (res.data) {
        city = res.data[0]
      }
    }

    return {
      street: data.logradouro || "",
      neighborhood: data.bairro || "",
      cityName: city?.name || "",
      cityId: city?.id || "",
      stateName: state?.name ? capitalizeFirstLetter(state.name) : "",
      stateId: state?.id || ""
    };
  } catch {
    return null;
  }
}