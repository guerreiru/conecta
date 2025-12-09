"use client";

import { ServiceReviewStats } from "@/types/Review";
import { StarIcon } from "@phosphor-icons/react";

interface ReviewStatsProps {
  stats: ServiceReviewStats | undefined;
  isLoading?: boolean;
}

export function ReviewStats({ stats, isLoading }: ReviewStatsProps) {
  if (isLoading || !stats) {
    return (
      <div className="bg-white dark:bg-black-200 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>
    );
  }

  const { averageRating, totalReviews, ratingDistribution } = stats;

  if (totalReviews === 0) {
    return (
      <div className="bg-white dark:bg-black-200 rounded-lg p-4 border border-gray-200 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400">
        Sem avaliações ainda
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-black-200 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <div className="grid grid-cols-2 gap-4 md:gap-6">
        {/* Score geral */}
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-black dark:text-white">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-sm text-gray-500">/5</span>
          </div>
          <div className="flex gap-0.5 mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                size={16}
                weight={star <= Math.round(averageRating) ? "fill" : "regular"}
                className={
                  star <= Math.round(averageRating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {totalReviews} avaliações
          </p>
        </div>

        {/* Distribuição */}
        <div className="space-y-1">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count =
              ratingDistribution[rating as keyof typeof ratingDistribution];
            const percentage =
              totalReviews > 0 ? (count / totalReviews) * 100 : 0;

            return (
              <div key={rating} className="flex items-center gap-2">
                <span className="text-xs text-gray-500 w-4">{rating}★</span>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                  <div
                    className="bg-yellow-400 h-full rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 w-6 text-right">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
