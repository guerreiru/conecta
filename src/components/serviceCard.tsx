"use client";

import { Service } from "@/types/Service";
import { User } from "@/types/User";
import { formatToBRL } from "@/utils/formatToBRL";
import { whatsAppMessage } from "@/utils/whatsAppMessage";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { PencilIcon, TrashIcon } from "@phosphor-icons/react";

type ServiceCardProps = {
  service: Service;
  owner: User;
  onEdit?: (service: Service) => void;
  onDelete?: (serviceId: string) => void;
};

export function ServiceCard({ service, owner, onEdit, onDelete }: ServiceCardProps) {
  const { title, description, price, id, typeOfChange } = service;
  const { user } = useAuth();
  const pathname = usePathname();

  const showSeeProfile = user?.id !== owner.id;

  return (
    <article className="p-4 bg-white dark:bg-black-200 rounded-xl grid gap-3 border border-gray-200 dark:border-gray-700 shadow-md">

      <header className="flex items-start justify-between">
        <div>
          <span className="text-xs text-gray-500 dark:text-gray-400">{owner.name}</span>
          <h3 className="font-semibold text-black dark:text-white leading-snug">
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {onEdit && (
            <button
              className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 text-black dark:text-white"
              aria-label={`Editar serviço ${service.title}`}
              onClick={() => onEdit(service)}
            >
              <PencilIcon aria-hidden="true" role="img" focusable="false" />
            </button>
          )}

          {onDelete && (
            <button
              className="bg-red-100 dark:bg-red-900 rounded-lg p-2 text-red-600 dark:text-red-300"
              aria-label={`Excluir serviço ${service.title}`}
              onClick={() => onDelete(service.id)}
            >
              <TrashIcon aria-hidden="true" role="img" focusable="false" />
            </button>
          )}
        </div>
      </header>

      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {description}
        </p>
      )}

      <footer className="flex items-center justify-between flex-wrap gap-2">
        <p className="font-bold text-black dark:text-white">
          {formatToBRL(price)}
          {typeOfChange ? `/${typeOfChange}` : ""}
        </p>

        <div className="flex items-center gap-2">
          {id && showSeeProfile && pathname !== `/provider/${owner.id}` && (
            <Link
              href={`/provider/${owner.id}`}
              className="px-3 py-2 rounded-lg bg-gray-100 text-black hover:brightness-95"
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
              className="px-3 py-2 rounded-lg bg-lime-400 text-black dark:text-black hover:brightness-95"
            >
              Solicitar
            </Link>
          )}
        </div>
      </footer>
    </article>
  );
}
