"use client";

import { ServiceForm } from "@/components/forms/serviceForm";
import { Modal } from "@/components/modal";
import { ModalExclusion } from "@/components/modalExclusion";
import { useAuth } from "@/hooks/useAuth";
import {
  useActivateService,
  useDeactivateService,
  useDeleteService,
  useProviderServices,
} from "@/hooks/useServiceQueries";
import { useSubscription } from "@/hooks/useSubscription";
import { Service } from "@/types/Service";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { formatToBRL } from "@/utils/formatToBRL";
import {
  CurrencyDollarIcon,
  EyeIcon,
  EyeSlashIcon,
  MapPinIcon,
  PencilIcon,
  PlusIcon,
  SuitcaseIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const PLAN_LIMITS = {
  free: 1,
  plus: 5,
  premium: 15,
  enterprise: 50,
};

export default function Home() {
  const { user } = useAuth();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [serviceToDeleteId, setServiceToDeleteId] = useState<string | null>(
    null
  );
  const [serviceToEdit, setServiceToEdit] = useState<Service | null>(null);

  const { data: myServices = [], isLoading } = useProviderServices(
    user?.role === "provider" ? user.id : undefined
  );

  const { data: subscription, isLoading: isLoadingSubscription } =
    useSubscription();

  const deleteServiceMutation = useDeleteService();
  const activateServiceMutation = useActivateService();
  const deactivateServiceMutation = useDeactivateService();

  const currentPlan = subscription?.plan || "free";
  const serviceLimit =
    PLAN_LIMITS[currentPlan as keyof typeof PLAN_LIMITS] || 1;
  const hasReachedServiceLimit = myServices.length >= serviceLimit;
  const canAddService = !hasReachedServiceLimit;
  const activeServicesCount = myServices.filter(
    (service) => service.isActive
  ).length;

  const handleOpenAddModal = () => {
    if (!canAddService) {
      const planName =
        currentPlan === "free" ? "gratuito" : currentPlan.toUpperCase();
      toast.warning(
        `Você atingiu o limite de ${serviceLimit} serviço(s) do plano ${planName}. ${
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

  if (!user || isLoading || isLoadingSubscription) {
    return (
      <section className="grid gap-4 py-4 text-black dark:text-gray-200">
        <p>Carregando...</p>
      </section>
    );
  }

  if (!user.id) {
    return (
      <section className="grid gap-4 py-4 text-black dark:text-gray-200">
        <p>Erro: Usuário não autenticado ou ID de usuário ausente.</p>
      </section>
    );
  }

  return (
    <main className="min-h-screen">
      <header className="px-4 py-5 md:px-8 md:py-10 bg-gradient-to-b from-lime-400 to-lime-500 dark:from-lime-500 dark:to-lime-600 flex md:items-center justify-between gap-x-2 gap-y-4 flex-col md:flex-row">
        <div>
          <h1 className="font-bold text-3xl text-black dark:text-black-200">
            Bem-vindo, {user.name}
          </h1>

          {user.role === "provider" && (
            <>
              <p className="text-black/80 dark:text-black-100">
                Gerencie seus serviços e atraia mais clientes
              </p>

              <section
                aria-label="Resumo de serviços ativos"
                className="bg-white/40 dark:bg-white/20 max-w-fit px-5 py-3 rounded-2xl flex items-center gap-2 mt-2 shadow-md text-black dark:text-black-200"
              >
                <SuitcaseIcon size={24} aria-hidden="true" />
                <div>
                  <p className="text-black/70 dark:text-black-100">
                    Serviços Ativos
                  </p>
                  <span aria-label="Quantidade de serviços ativos">
                    {activeServicesCount} de {serviceLimit}
                  </span>
                </div>
              </section>

              {/* NOVO: Badge do plano */}
              <div className="mt-2">
                <span className="text-xs bg-black/20 dark:bg-black/30 px-3 py-1 rounded-full text-black dark:text-black-200">
                  Plano:{" "}
                  {currentPlan === "free"
                    ? "Gratuito"
                    : currentPlan.toUpperCase()}
                </span>
              </div>
            </>
          )}
        </div>

        {user.role === "provider" && (
          <div className="flex flex-col gap-2">
            <button
              className={`px-4 py-3.5 rounded-xl text-white dark:text-black-50 flex items-center gap-1.5 text-sm transition-all ${
                canAddService
                  ? "bg-black dark:bg-black-200 hover:brightness-90"
                  : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-60"
              }`}
              aria-label="Adicionar novo serviço"
              onClick={handleOpenAddModal}
              disabled={!canAddService}
            >
              <PlusIcon size={18} aria-hidden="true" />
              <span>Adicionar Serviço</span>
            </button>
            {!canAddService && (
              <Link
                href="/plans"
                className="text-xs text-black/70 dark:text-black-100 md:text-center max-w-xs"
              >
                Limite de {serviceLimit} serviço(s) atingido.{" "}
                <span className="underline">
                  {currentPlan === "free"
                    ? "Assine um plano!"
                    : "Faça upgrade!"}
                </span>
              </Link>
            )}
          </div>
        )}
      </header>

      {user.role === "provider" && (
        <section
          className="p-4 md:p-8 text-black dark:text-gray-200"
          aria-labelledby="meus-servicos"
        >
          <h2
            id="meus-servicos"
            className="text-xl font-semibold dark:text-white"
          >
            Meus Serviços
          </h2>

          {myServices.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-4">
              {myServices.map((service) => (
                <li key={service.id}>
                  <article
                    className={`${
                      !service.isActive ? "opacity-60" : ""
                    } p-6 bg-white dark:bg-black-200 rounded-2xl shadow-sm h-full border border-gray-200 dark:border-gray-700`}
                  >
                    <header className="flex items-center justify-between">
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
                          className="bg-gray-200 dark:bg-gray-700 rounded-lg p-2 w-fit"
                          aria-label={`Editar serviço ${service.title}`}
                          onClick={() => handleOpenEditModal(service)}
                        >
                          <PencilIcon size={18} aria-hidden="true" />
                        </button>
                        <button
                          className="bg-red-50 dark:bg-red-900 rounded-lg p-2 w-fit text-red-600 dark:text-red-300"
                          aria-label={`Excluir serviço ${service.title}`}
                          onClick={() => handleOpenDeleteModal(service.id)}
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
    </main>
  );
}
