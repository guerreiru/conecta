import { FREE_PLAN_SERVICE_LIMIT } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import {
  useActivateService,
  useDeactivateService,
  useDeleteService,
  useProviderServices,
} from "@/hooks/useServiceQueries";
import { Service } from "@/types/Service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function useDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [serviceToDeleteId, setServiceToDeleteId] = useState<string | null>(
    null
  );
  const [serviceToEdit, setServiceToEdit] = useState<Service | null>(null);

  const { data: myServices = [], isLoading } = useProviderServices(
    user?.role === "provider" ? user.id : undefined
  );

  const deleteServiceMutation = useDeleteService();
  const activateServiceMutation = useActivateService();
  const deactivateServiceMutation = useDeactivateService();

  const currentPlan = "free";

  const hasReachedServiceLimit = myServices.length >= FREE_PLAN_SERVICE_LIMIT;
  const canAddService = !hasReachedServiceLimit;

  const servicesWithReviews = myServices.filter(
    (service) => service.reviewCount && service.reviewCount > 0
  );

  const totalRating = servicesWithReviews.reduce(
    (acc, service) => acc + (Number(service.averageRating) || 0),
    0
  );

  const servicesAverageRating =
    servicesWithReviews.length > 0
      ? totalRating / servicesWithReviews.length
      : 0;

  const totalReviews = myServices.reduce((acc, service) => {
    if (service.reviewCount) {
      return acc + service.reviewCount;
    }
    return acc;
  }, 0);

  const handleOpenAddModal = () => {
    if (!canAddService) {
      const planName =
        currentPlan === "free" ? "gratuito" : String(currentPlan).toUpperCase();
      toast.warning(
        `Você atingiu o limite de ${FREE_PLAN_SERVICE_LIMIT} serviço(s) do plano ${planName}. ${
          currentPlan === "free"
            ? "Assine um plano para adicionar mais!"
            : "Faça upgrade para cadastrar mais serviços!"
        }`,
        { autoClose: 3000 }
      );
      return;
    }
    setServiceToEdit(null);
    setModalIsOpen(true);
  };

  const handleOpenEditModal = (service: Service) => {
    setServiceToEdit(service);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setServiceToEdit(null);
  };

  const handleOpenDeleteModal = (serviceId: string) => {
    setServiceToDeleteId(serviceId);
    setDeleteModalIsOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setServiceToDeleteId(null);
    setDeleteModalIsOpen(false);
  };

  const handleDeleteService = async () => {
    if (!serviceToDeleteId) return;

    deleteServiceMutation.mutate(serviceToDeleteId, {
      onSuccess: () => {
        handleCloseDeleteModal();
      },
    });
  };

  const handleActiveService = (service: Service) => {
    if (service.isActive) {
      deactivateServiceMutation.mutate(service.id);
    } else {
      activateServiceMutation.mutate(service.id);
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [modalIsOpen]);

  return {
    user,
    loading,
    isLoading,
    myServices,
    servicesAverageRating,
    totalReviews,
    canAddService,
    modalIsOpen,
    deleteModalIsOpen,
    serviceToEdit,
    handleOpenAddModal,
    handleOpenEditModal,
    handleCloseModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteService,
    handleActiveService,
  };
}
