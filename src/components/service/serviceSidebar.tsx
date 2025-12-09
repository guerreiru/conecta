"use client";

import { ServiceReviewStats } from "@/types/Review";
import { formatToBRL } from "@/utils/formatToBRL";

interface ServiceSidebarProps {
  price: string;
  stats?: ServiceReviewStats;
  serviceType?: string;
}

export function ServiceSidebar({
  price,
  stats,
  serviceType,
}: ServiceSidebarProps) {
  return (
    <div className="sticky top-4 space-y-4">
      <div className="bg-white dark:bg-black-200 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Preço</p>
            <p className="text-2xl font-bold text-lime-500">
              {formatToBRL(price)}
            </p>
          </div>

          {stats && (
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Avaliação
              </p>
              <p className="text-2xl font-bold text-yellow-400">
                {stats.averageRating.toFixed(1)}
              </p>
              <p className="text-xs text-gray-500">
                ({stats.totalReviews} avaliações)
              </p>
            </div>
          )}
        </div>
      </div>

      {serviceType && (
        <div className="bg-white dark:bg-black-200 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Tipo de Serviço
          </p>
          <p className="font-semibold text-black dark:text-white">
            {serviceType === "in_person"
              ? "Presencial"
              : serviceType === "online"
              ? "Online"
              : "Presencial + Online"}
          </p>
        </div>
      )}
    </div>
  );
}
