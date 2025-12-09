"use client";

import { Service } from "@/types/Service";
import { User } from "@/types/User";
import { formatToBRL } from "@/utils/formatToBRL";
import { MapPinIcon } from "@phosphor-icons/react";

interface ServiceInfoProps {
  service: Service & { user: User };
}

export function ServiceInfo({ service }: ServiceInfoProps) {
  return (
    <div className="bg-white dark:bg-black-200 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h1 className="text-3xl font-bold text-black dark:text-white mb-4">
        {service.title}
      </h1>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <span className="text-lime-500 font-bold text-2xl">
            {formatToBRL(service.price)}
          </span>
        </div>

        {service.description && (
          <div>
            <h3 className="font-semibold text-black dark:text-white mb-2">
              Descrição
            </h3>
            <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
              {service.description}
            </p>
          </div>
        )}

        {service.user.address && (
          <div className="flex items-start gap-3">
            <MapPinIcon
              size={20}
              className="text-gray-500 mt-1 flex-shrink-0"
            />
            <div className="text-gray-600 dark:text-gray-400">
              <p>{service.user.address.cityName}</p>
              <p className="text-sm">{service.user.address.stateName}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
