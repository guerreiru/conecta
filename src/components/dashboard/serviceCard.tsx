import { Service } from "@/types/Service";
import { User } from "@/types/User";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { formatToBRL } from "@/utils/formatToBRL";
import {
  CurrencyDollarIcon,
  EyeIcon,
  EyeSlashIcon,
  MapPinIcon,
  PencilIcon,
  TrashIcon,
} from "@phosphor-icons/react";

type ServiceCardProps = {
  service: Service;
  owner: User;
  onEditAction?: (service: Service) => void;
  onDeleteAction?: (serviceId: string) => void;
  onActiveAction?: (service: Service) => void;
};

export function ServiceCard({
  service,
  owner,
  onEditAction,
  onDeleteAction,
  onActiveAction,
}: ServiceCardProps) {
  return (
    <article
      className={`${
        !service.isActive ? "opacity-60" : ""
      } px-4 py-6 md:px-6 bg-white dark:bg-black-200 rounded-2xl shadow-sm h-full border border-gray-200 dark:border-gray-700 relative overflow-hidden`}
    >
      <div className="absolute -top-0.5 right-0">
        {!service.isActive && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-tr-xl">
            Inativo
          </span>
        )}
        {service.isActive && (
          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-tr-xl">
            Ativo
          </span>
        )}
      </div>

      <header className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h3 className="font-bold text-lg dark:text-white">{service.title}</h3>
          <p className="mt-3 font-medium text-sm bg-lime-400/10 dark:bg-lime-500/20 px-2 py-0.5 rounded-lg w-fit text-black dark:text-white">
            {service.category.name &&
              capitalizeFirstLetter(service.category.name)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="rounded-lg p-2 w-fit"
            aria-label={`Ativar serviço ${service.title}`}
            onClick={() => onActiveAction && onActiveAction(service)}
          >
            {service.isActive && (
              <span title="Desativar serviço">
                <EyeSlashIcon size={18} aria-hidden="true" />
              </span>
            )}
            {!service.isActive && (
              <span title="Ativar serviço">
                <EyeIcon size={18} aria-hidden="true" />
              </span>
            )}
          </button>
          <button
            className="rounded-lg p-2 w-fit"
            aria-label={`Editar serviço ${service.title}`}
            onClick={() => onEditAction && onEditAction(service)}
          >
            <PencilIcon size={18} aria-hidden="true" />
          </button>
          <button
            className="rounded-lg p-2 w-fit text-red-600 dark:text-red-300"
            aria-label={`Excluir serviço ${service.title}`}
            onClick={() => onDeleteAction && onDeleteAction(service.id)}
          >
            <TrashIcon size={18} aria-hidden="true" />
          </button>
        </div>
      </header>

      <p className="text-stone-500 dark:text-gray-400 my-4">
        {service.description}
      </p>

      <p className="text-stone-500 dark:text-gray-300 text-sm flex items-center gap-1">
        <CurrencyDollarIcon size={14} aria-hidden="true" />
        {formatToBRL(service.price)} / {service.typeOfChange}
      </p>

      {owner.address && (
        <p className="text-stone-500 dark:text-gray-300 text-sm flex items-center gap-1 mt-1">
          <MapPinIcon size={14} aria-hidden="true" />
          {owner.address.cityName}, {owner.address.stateName}
        </p>
      )}
    </article>
  );
}
