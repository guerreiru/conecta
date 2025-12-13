"use client";

import { Review } from "@/types/Review";
import { StarIcon } from "@phosphor-icons/react";

interface ReviewListProps {
  reviews?: Review[];
  isLoading?: boolean;
}

export function ReviewList({ reviews, isLoading }: ReviewListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-200 dark:bg-gray-700 rounded-lg h-24 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center p3-8 text-gray-500 dark:text-gray-400">
        <p>Nenhuma avaliação ainda. Seja o primeiro a avaliar!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-white dark:bg-black-200 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="font-semibold text-black dark:text-white">
                {review.user?.name || "Usuário anônimo"}
              </p>
              <div className="flex gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    size={16}
                    weight={star <= review.rating ? "fill" : "regular"}
                    className={
                      star <= review.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-500">
              {new Date(
                review.updatedAt || review.createdAt
              ).toLocaleDateString("pt-BR")}
            </p>
          </div>
          {review.comment && (
            <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
          )}
        </div>
      ))}
    </div>
  );
}
