"use client";

import { DashboardCard } from "@/components/dashboardCard";
import { ServiceForm } from "@/components/forms/serviceForm";
import { Modal } from "@/components/modal";
import { ModalExclusion } from "@/components/modalExclusion";
import { PlanBadge } from "@/components/planBadge";
import { ServiceSkeletonList } from "@/components/skeletons/serviceSkeletonList";
import { UserSkeleton } from "@/components/skeletons/userSkeleton";
import { FREE_PLAN_SERVICE_LIMIT } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import {
  useActivateService,
  useDeactivateService,
  useDeleteService,
  useProviderServices,
} from "@/hooks/useServiceQueries";
import { Service } from "@/types/Service";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { formatToBRL } from "@/utils/formatToBRL";
import {
  CurrencyDollarIcon,
  EyeIcon,
  EyeSlashIcon,
  LightningIcon,
  MapPinIcon,
  PencilIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
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

  async function handleDeleteService() {
    if (!serviceToDeleteId) return;

    deleteServiceMutation.mutate(serviceToDeleteId, {
      onSuccess: () => {
        handleCloseDeleteModal();
      },
    });
  }

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

  if (loading || !user) {
    return <UserSkeleton />;
  }

  return (
    <div className="max-w-3xl mx-auto w-full px-4">
      <header className="py-5 md:py-10 flex md:items-center justify-between gap-x-2 gap-y-4 flex-col md:flex-row flex-wrap">
        <section>
          <div className="flex items-center gap-5">
            <h1 className="font-extrabold text-2xl md:text-3xl text-black dark:text-white">
              Olá, {user.name}
            </h1>
            <PlanBadge title="Gratuito" variant="free" />
          </div>

          {user.role === "provider" && (
            <p className="text-black/80 dark:text-gray-200 text-sm mt-1 md:mt-0">
              Atualize seus serviços e atraia mais clientes
            </p>
          )}
        </section>

        {user.role === "provider" && (
          <section className="flex flex-col gap-2">
            <button
              className={`px-4 py-3.5 rounded-xl font-bold dark:text-black-50 text-sm transition-all ${
                canAddService
                  ? "bg-lime-400 text-black hover:brightness-90"
                  : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-60"
              }`}
              aria-label="Adicionar novo serviço"
              onClick={handleOpenAddModal}
              disabled={!canAddService}
            >
              Adicionar Serviço
            </button>
            {!canAddService && (
              <p className="text-xs text-black/70 dark:text-white md:text-center">
                Limite de {FREE_PLAN_SERVICE_LIMIT} serviço(s) atingido.{" "}
              </p>
            )}
          </section>
        )}
      </header>

      {user.role === "provider" && (
        <>
          {isLoading ? (
            <ServiceSkeletonList />
          ) : (
            <>
              <section className="grid grid-cols-3 gap-2 flex-wrap">
                <DashboardCard
                  title="Serviços"
                  value={String(myServices.length)}
                  icon={<LightningIcon size={16} />}
                />
                <DashboardCard
                  title="Nota média"
                  value={
                    servicesAverageRating > 0
                      ? servicesAverageRating.toFixed(1)
                      : "N/A"
                  }
                  icon={<LightningIcon size={16} />}
                />
                <DashboardCard
                  title="Avaliações"
                  value={totalReviews > 0 ? totalReviews.toString() : "N/A"}
                  icon={<LightningIcon size={16} />}
                />
              </section>

              <section
                className="py-4 text-black dark:text-gray-200"
                aria-labelledby="meus-servicos"
              >
                <h2
                  id="meus-servicos"
                  className="text-2xl mt-5 font-semibold dark:text-white text-center"
                >
                  Serviços
                </h2>

                {myServices.length > 0 ? (
                  <ul className="grid mt-6 gap-4">
                    {myServices.map((service) => (
                      <li key={service.id}>
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
                              <h3 className="font-bold text-lg dark:text-white">
                                {service.title}
                              </h3>
                              <p className="mt-3 font-medium text-sm bg-lime-400/10 dark:bg-lime-500/20 px-2 py-0.5 rounded-lg w-fit text-black dark:text-white">
                                {service.category.name &&
                                  capitalizeFirstLetter(service.category.name)}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                className={`${
                                  service.isActive
                                    ? "bg-gray-400 dark:bg-gray-700 text-gray-100 dark:text-gray-300"
                                    : "bg-green-100 dark:bg-green-800"
                                } rounded-lg p-2 w-fit`}
                                aria-label={`Ativar serviço ${service.title}`}
                                onClick={() => handleActiveService(service)}
                              >
                                {service.isActive && (
                                  <span title="Desativar serviço">
                                    <EyeSlashIcon
                                      size={18}
                                      aria-hidden="true"
                                    />
                                  </span>
                                )}
                                {!service.isActive && (
                                  <span title="Ativar serviço">
                                    <EyeIcon size={18} aria-hidden="true" />
                                  </span>
                                )}
                              </button>
                              <button
                                className="bg-gray-200 dark:bg-gray-700 rounded-lg p-2 w-fit"
                                aria-label={`Editar serviço ${service.title}`}
                                onClick={() => handleOpenEditModal(service)}
                              >
                                <PencilIcon size={18} aria-hidden="true" />
                              </button>
                              <button
                                className="bg-red-50 dark:bg-red-900 rounded-lg p-2 w-fit text-red-600 dark:text-red-300"
                                aria-label={`Excluir serviço ${service.title}`}
                                onClick={() =>
                                  handleOpenDeleteModal(service.id)
                                }
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
                            {formatToBRL(service.price)} /{" "}
                            {service.typeOfChange}
                          </p>

                          {user.address && (
                            <p className="text-stone-500 dark:text-gray-300 text-sm flex items-center gap-1 mt-1">
                              <MapPinIcon size={14} aria-hidden="true" />
                              {user.address.cityName}, {user.address.stateName}
                            </p>
                          )}
                        </article>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-stone-500 dark:text-gray-400">
                    Você ainda não cadastrou serviços.
                  </p>
                )}
              </section>
            </>
          )}
        </>
      )}

      <Modal open={modalIsOpen} onClose={handleCloseModal}>
        <div
          className="h-dvh pt-1 pb-4 overflow-y-auto"
          onClick={handleCloseModal}
        >
          <div onClick={(e) => e.stopPropagation()} className="w-fit mx-auto">
            <ServiceForm
              onCancelAction={handleCloseModal}
              onServiceAddedAction={handleCloseModal}
              serviceToEdit={serviceToEdit}
            />
          </div>
        </div>
      </Modal>

      <ModalExclusion
        open={deleteModalIsOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteService}
      />
    </div>
  );
}
