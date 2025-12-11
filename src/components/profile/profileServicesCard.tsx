"use client";

import { Service } from "@/types/Service";
import { User } from "@/types/User";
import { ServiceCard } from "@/components/service/serviceCard";
import { Button } from "@/components/ui/button";
import { FREE_PLAN_SERVICE_LIMIT } from "@/constants";

interface ProfileServicesCardProps {
  user: User;
  services: Service[];
  isLoading: boolean;
  onEdit: (service: Service) => void;
  onDelete: (serviceId: string) => void;
  onAddService: () => void;
}

export function ProfileServicesCard({
  user,
  services,
  isLoading,
  onEdit,
  onDelete,
  onAddService,
}: ProfileServicesCardProps) {
  const hasReachedServiceLimit = services.length >= FREE_PLAN_SERVICE_LIMIT;
  const canAddService = !hasReachedServiceLimit;

  return (
    <>
      <div className="mt-6 shadow border border-gray-200 dark:border-black rounded-3xl relative -top-4 p-6 bg-white dark:bg-black-200 w-full max-w-2xl mx-auto">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-xl">Meus serviços</p>
        </div>

        {isLoading && (
          <div className="mt-6">
            <p>Carregando serviços...</p>
          </div>
        )}

        {services.map((service) => (
          <div key={service.id} className="mt-3">
            <ServiceCard
              owner={user}
              service={service}
              onEditAction={() => onEdit(service)}
              onDeleteAction={() => onDelete(service.id)}
            />
          </div>
        ))}
      </div>

      <div className="w-full max-w-2xl mx-auto grid place-items-center mb-2">
        <Button
          className={`w-full transition-all ${
            canAddService
              ? ""
              : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-60"
          }`}
          onClick={onAddService}
          disabled={!canAddService}
        >
          Cadastrar serviço
        </Button>
        {/* {!canAddService && (
          <p className="text-xs text-center mt-2 text-gray-600 dark:text-gray-400">
            Limite de {FREE_PLAN_SERVICE_LIMIT} serviços atingido.{" "}
            <a href="/plans" className="text-lime-500 underline font-medium">
              Assine um plano!
            </a>
          </p>
        )} */}
      </div>
    </>
  );
}
