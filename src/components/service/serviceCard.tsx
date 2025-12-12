"use client";

import { Service } from "@/types/Service";
import { User } from "@/types/User";
import { formatToBRL } from "@/utils/formatToBRL";
import { whatsAppMessage } from "@/utils/whatsAppMessage";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import {
  PencilIcon,
  TrashIcon,
  StarIcon,
  LaptopIcon,
  BuildingIcon,
  ArrowsCounterClockwiseIcon,
} from "@phosphor-icons/react";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";

type ServiceCardProps = {
  service: Service;
  owner: User;
  onEditAction?: (service: Service) => void;
  onDeleteAction?: (serviceId: string) => void;
  onActiveAction?: (service: Service) => void;
};

const highlightColorMap = {
  enterprise: {
    bg: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-300 dark:border-red-700",
    badge: "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300",
  },
  premium: {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-300 dark:border-amber-700",
    badge: "bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300",
  },
  plus: {
    bg: "bg-lime-50 dark:bg-lime-950/30",
    border: "border-lime-300 dark:border-lime-700",
    badge: "bg-lime-100 dark:bg-lime-900 text-lime-700 dark:text-lime-300",
  },
};

export function ServiceCard({
  service,
  owner,
  onEditAction: onEdit,
  onDeleteAction: onDelete,
  onActiveAction: onActive,
}: ServiceCardProps) {
  const {
    title,
    description,
    price,
    id,
    typeOfChange,
    isHighlighted,
    highlightLevel,
  } = service;
  const { user } = useAuth();
  const pathname = usePathname();

  const showSeeProfile = user?.id !== owner.id;

  const highlightColors =
    isHighlighted && highlightLevel ? highlightColorMap[highlightLevel] : null;
  const baseBg = highlightColors?.bg ?? "bg-white dark:bg-black-200";
  const baseBorder =
    highlightColors?.border ?? "border-gray-200 dark:border-gray-700";

  return (
    <article
      className={`p-4 rounded-xl grid gap-3 border shadow-md transition-all ${baseBg} ${baseBorder}`}
      aria-labelledby={`service-title-${id}`}
      aria-describedby={description ? `service-desc-${id}` : undefined}
    >
      {isHighlighted && highlightLevel && (
        <div
          className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg w-fit ${highlightColors?.badge}`}
          role="status"
          aria-label={`Serviço em destaque: ${
            highlightLevel === "enterprise"
              ? "Premium"
              : highlightLevel === "premium"
              ? "Plus"
              : "Básico"
          }`}
        >
          <StarIcon size={14} weight="fill" aria-hidden="true" />
          <span className="capitalize">
            {highlightLevel === "enterprise"
              ? "Destaque Premium"
              : highlightLevel === "premium"
              ? "Destaque Plus"
              : "Destaque"}
          </span>
        </div>
      )}

      <header className="flex items-start justify-between">
        <Link
          href={`/service/${id}`}
          className="flex-1 hover:opacity-75 transition"
          aria-label={`Ver detalhes do serviço ${title} oferecido por ${owner.name}`}
        >
          <h3
            id={`service-title-${id}`}
            className="font-bold text-black dark:text-white leading-none text-2xl"
          >
            {title}
          </h3>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {owner.name}
          </span>

          {service.category.name && (
            <p className="mt-3 font-medium text-sm bg-lime-400/10 dark:bg-lime-500/20 px-2 py-0.5 rounded-lg w-fit text-black dark:text-white">
              {service?.category.name &&
                capitalizeFirstLetter(service.category.name)}
            </p>
          )}
        </Link>
        {(onActive || onEdit || onDelete) && (
          <div
            className="flex items-center gap-2"
            role="group"
            aria-label="Ações do serviço"
          >
            {onActive && (
              <button
                className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                aria-label={`Ativar ou desativar serviço ${title}`}
                onClick={() => onActive(service)}
                type="button"
              >
                <PencilIcon size={18} aria-hidden="true" />
              </button>
            )}
            {onEdit && (
              <button
                className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                aria-label={`Editar serviço ${title}`}
                onClick={() => onEdit(service)}
                type="button"
              >
                <PencilIcon size={18} aria-hidden="true" />
              </button>
            )}

            {onDelete && (
              <button
                className="bg-red-100 dark:bg-red-900 rounded-lg p-2 text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 transition"
                aria-label={`Excluir serviço ${title}`}
                onClick={() => onDelete(service.id)}
                type="button"
              >
                <TrashIcon size={18} aria-hidden="true" />
              </button>
            )}
          </div>
        )}
      </header>

      {description && (
        <p
          id={`service-desc-${id}`}
          className="text-sm text-gray-600 dark:text-gray-300 font-semibold"
        >
          {description}
        </p>
      )}

      <footer className="flex flex-col md:flex-row items-center justify-between flex-wrap gap-2">
        <section className="grid gap-2" aria-label="Informações do serviço">
          <p
            className="font-bold text-black dark:text-white text-lg"
            aria-label={`Preço: ${formatToBRL(price)}${
              typeOfChange ? ` por ${typeOfChange}` : ""
            }`}
          >
            {formatToBRL(price)}
            {typeOfChange ? `/${typeOfChange}` : ""}
          </p>
          {service.serviceType && (
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 flex items-center gap-1.5"
              role="status"
              aria-label={`Tipo de atendimento: ${
                service.serviceType === "in_person"
                  ? "Presencial"
                  : service.serviceType === "online"
                  ? "Online"
                  : "Presencial e Online"
              }`}
            >
              {service.serviceType === "in_person" && (
                <>
                  <BuildingIcon size={16} aria-hidden="true" />
                  <span>Presencial</span>
                </>
              )}
              {service.serviceType === "online" && (
                <>
                  <LaptopIcon size={16} aria-hidden="true" />
                  <span>Online</span>
                </>
              )}
              {service.serviceType === "all" && (
                <>
                  <ArrowsCounterClockwiseIcon size={16} aria-hidden="true" />
                  <span>Presencial + Online</span>
                </>
              )}
            </span>
          )}
          {owner?.address?.cityName && (
            <address className="text-xs text-gray-500 dark:text-gray-400 not-italic">
              {owner.address.cityName}, {owner.address.stateName}
            </address>
          )}
        </section>

        <nav className="flex items-center gap-2" aria-label="Ações disponíveis">
          {id && showSeeProfile && pathname !== `/provider/${owner.id}` && (
            <Link
              href={`/provider/${owner.id}`}
              className="px-3 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black hover:brightness-95 font-semibold transition focus:outline-none focus:ring-2 focus:ring-lime-400"
              aria-label={`Ver perfil completo de ${owner.name}`}
            >
              Ver perfil
            </Link>
          )}

          {owner?.address?.phone && showSeeProfile && (
            <Link
              href={whatsAppMessage({
                ownerPhone: owner.address.phone,
                ownerName: owner.name,
                serviceTitle: service.title,
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-lg bg-lime-400 text-black dark:text-black hover:brightness-95 font-semibold transition focus:outline-none focus:ring-2 focus:ring-lime-500"
              aria-label={`Solicitar serviço ${title} via WhatsApp com ${owner.name}`}
            >
              Solicitar
            </Link>
          )}
        </nav>
      </footer>
    </article>
  );
}
