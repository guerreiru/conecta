"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import { api } from "@/services/api";
import { Service } from "@/types/Service";
import { User } from "@/types/User";
import { useAuth } from "@/hooks/useAuth";
import {
  useServiceReviews,
  useUserReview,
  useServiceStats,
} from "@/hooks/useReviewQueries";
import { Button } from "@/components/ui/button";
import { ServiceInfo } from "@/components/service/serviceInfo";
import { ServiceProvider } from "@/components/service/serviceProvider";
import { ServiceSidebar } from "@/components/service/serviceSidebar";
import { ServiceReviewSection } from "@/components/service/serviceReviewSection";

interface ServiceDetail extends Service {
  user: User;
}

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const serviceId = params.id as string;
  const { user: currentUser } = useAuth();

  const [service, setService] = useState<ServiceDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { data: reviews, isLoading: reviewsLoading } =
    useServiceReviews(serviceId);
  const { data: userReview } = useUserReview(serviceId, currentUser?.id);
  const { data: stats, isLoading: statsLoading } = useServiceStats(serviceId);

  useEffect(() => {
    async function fetchService() {
      try {
        const response = await api.get<ServiceDetail>(`/services/${serviceId}`);
        setService(response.data);
      } catch (error) {
        console.error("Erro ao carregar serviço:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (serviceId) {
      fetchService();
    }
  }, [serviceId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black-100 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Carregando...</div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black-100">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              Serviço não encontrado
            </p>
          </div>
        </div>
      </div>
    );
  }

  const isOwnService = currentUser?.id === service.user.id;

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto p-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Coluna principal */}
          <div className="md:col-span-2 space-y-8">
            <ServiceInfo service={service} />

            <ServiceProvider
              user={service.user}
              serviceTitle={service.title}
              isOwnService={isOwnService}
            />

            <ServiceReviewSection
              serviceId={serviceId}
              providerId={service.user.id}
              currentUserId={currentUser?.id}
              isOwnService={isOwnService}
              reviews={reviews}
              userReview={userReview}
              stats={stats}
              reviewsLoading={reviewsLoading}
              statsLoading={statsLoading}
            />
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1 hidden md:block">
            <ServiceSidebar
              price={service.price}
              stats={stats}
              serviceType={service.serviceType}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
