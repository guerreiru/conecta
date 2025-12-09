"use client";

import { Input } from "@/components/ui/input";
import { useCitiesByState } from "@/hooks/useCitiesByState";
import { addressSchema } from "@/utils/schemas";
import { states } from "@/utils/states/states";
import { useState } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import z from "zod";
import { Select } from "../ui/select";

const address = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  specialty: z.string().optional(),
  bio: z.string().optional(),
  address: addressSchema,
});

export type AddressFormData = z.infer<typeof address>;

type AddressFieldsProps = {
  registerAction: UseFormRegister<AddressFormData>;
  setValueAction: UseFormSetValue<AddressFormData>;
  addressEditable: Record<string, boolean>;
  errors?: FieldErrors<AddressFormData["address"]>;
};

export function AddressFields({
  registerAction: register,
  setValueAction: setValue,
  addressEditable,
  errors,
}: AddressFieldsProps) {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const { cities, loading: citiesLoading } = useCitiesByState(selectedState);

  return (
    <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-x-3 py-2">
      <div className="col-span-2 mb-2">
        <legend className="font-semibold">Endereço</legend>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Digite o CEP para preencher automaticamente os campos de endereço
        </p>
      </div>

      <Input
        label="CEP"
        {...register("address.zipCode")}
        error={errors?.zipCode?.message}
      />
      <Input
        label="Rua"
        {...register("address.street")}
        disabled={!addressEditable.street}
        error={errors?.street?.message}
      />
      <Input
        label="Número"
        {...register("address.number")}
        error={errors?.number?.message}
      />
      <Input
        label="Bairro"
        {...register("address.neighborhood")}
        disabled={!addressEditable.neighborhood}
        error={errors?.neighborhood?.message}
      />

      {!addressEditable.stateId ? (
        <Input
          label="Estado"
          {...register("address.stateName")}
          disabled={!addressEditable.stateId}
          error={errors?.stateId?.message}
        />
      ) : (
        <Select
          label="Estado"
          value={selectedState}
          onChange={(e) => {
            setSelectedState(e.target.value);
            setSelectedCity("");
            setValue("address.stateId", e.target.value);
          }}
          defaultValue="Selecione o estado"
          options={states.map((state) => ({
            label: state.name,
            value: state.id,
          }))}
        />
      )}

      {!addressEditable.cityName ? (
        <Input
          label="Cidade"
          {...register("address.cityName")}
          disabled={!addressEditable.cityId}
          error={errors?.cityName?.message}
        />
      ) : (
        <Select
          label="Cidade"
          value={selectedCity}
          onChange={(e) => {
            setSelectedCity(e.target.value);
            setValue("address.cityId", e.target.value);
          }}
          disabled={!selectedState || citiesLoading}
          defaultValue={
            citiesLoading ? "Carregando cidades..." : "Selecione a cidade"
          }
          options={cities.map((cities) => ({
            label: cities.name,
            value: cities.id,
          }))}
        />
      )}

      <Input
        label="Telefone"
        {...register("address.phone")}
        error={errors?.phone?.message}
      />
      <Input
        label="Site"
        {...register("address.website")}
        error={errors?.website?.message}
      />
    </fieldset>
  );
}
