"use client";

import Link from "next/link";
import { Review } from "@/types/Review";
import { ReviewForm } from "@/components/forms/reviewForm";
import { ReviewList } from "@/components/reviewList";
import { ReviewStats } from "@/components/reviewStats";
import { ServiceReviewStats } from "@/types/Review";

interface ServiceReviewSectionProps {
  serviceId: string;
  providerId: string;
  currentUserId?: string;
  isOwnService: boolean;
  reviews?: Review[];
  userReview?: Review | null;
  stats?: ServiceReviewStats;
  reviewsLoading: boolean;
  statsLoading: boolean;
}

export function ServiceReviewSection({
  serviceId,
  providerId,
  currentUserId,
  isOwnService,
  reviews,
  userReview,
  stats,
  reviewsLoading,
  statsLoading,
}: ServiceReviewSectionProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-black dark:text-white">
        Avaliações
      </h2>

      <ReviewStats stats={stats} isLoading={statsLoading} />

      {currentUserId && !isOwnService && (
        <div className="bg-white dark:bg-black-200 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-black dark:text-white mb-4">
            {userReview ? "Editar Sua Avaliação" : "Fazer uma Avaliação"}
          </h3>
          <ReviewForm
            serviceId={serviceId}
            providerId={providerId}
            userReview={userReview}
          />
        </div>
      )}

      {!currentUserId && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-blue-900 dark:text-blue-200">
            <Link href="/login" className="font-semibold underline">
              Faça login
            </Link>{" "}
            para deixar uma avaliação
          </p>
        </div>
      )}

      {isOwnService && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
          <p className="text-amber-900 dark:text-amber-200">
            Você não pode avaliar seu próprio serviço
          </p>
        </div>
      )}

      <ReviewList reviews={reviews} isLoading={reviewsLoading} />
    </div>
  );
}
