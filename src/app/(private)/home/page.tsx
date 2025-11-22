"use client";

import { ServiceForm } from "@/components/forms/serviceForm";
import { Modal } from "@/components/modal";
import { ModalExclusion } from "@/components/modalExclusion";
import { useAuth } from "@/hooks/useAuth";
import { deleteService } from "@/services/servicesService";
import { Service } from "@/types/Service";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { formatToBRL } from "@/utils/formatToBRL";
import {
  CurrencyDollarIcon,
  MapPinIcon,
  PencilIcon,
  PlusIcon,
  SuitcaseIcon,
  TrashIcon
} from "@phosphor-icons/react";
import { isAxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const { user } = useAuth();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [serviceToDeleteId, setServiceToDeleteId] = useState<string | null>(null);
  const [myServices, setMyServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [serviceToEdit, setServiceToEdit] = useState<Service | null>(null);

  const fetchUserServices = useCallback(async () => {
    if (!user?.id) {
      setIsLoading(false);
      return;
    }

    if (user.role === 'client') {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/services/provider/${user.id}`
      );

      if (!response.ok) {
        throw new Error("Falha ao carregar serviços.");
      }

      const data = await response.json();
      setMyServices(data);
    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
      setMyServices([]);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchUserServices();
  }, [fetchUserServices]);

  const handleOpenAddModal = () => {
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

    try {
      await deleteService(serviceToDeleteId);
      toast.success("Serviço excluído com sucesso");
      fetchUserServices();
      handleCloseDeleteModal();
    } catch (error) {
      if (isAxiosError(error)) {
        const message =
          error.response?.data.message ||
          "Erro excluir serviço, tente novamente mais tarde ou entre em contado com o suporte";
        toast.error(message);
        return;
      }

      toast.error(
        "Erro excluir serviço, tente novamente mais tarde ou entre em contado com o suporte"
      );
    }
  }

  if (!user || isLoading) {
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

      {/* HEADER */}
      <header className="px-4 py-5 md:px-8 md:py-10 bg-gradient-to-b from-lime-400 to-lime-500 dark:from-lime-500 dark:to-lime-600 flex md:items-center justify-between gap-x-2 gap-y-4 flex-col md:flex-row">
        <div>
          <h1 className="font-bold text-3xl text-black dark:text-black-200">
            Bem-vindo, {user.name}
          </h1>

          {user.role === 'provider' && (
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
                  <p className="text-black/70 dark:text-black-100">Serviços Ativos</p>
                  <span aria-label="Quantidade de serviços ativos">
                    {myServices.length}
                  </span>
                </div>
              </section>
            </>
          )}
        </div>

        {user.role === 'provider' && (
          <button
            className="px-4 py-3.5 bg-black dark:bg-black-200 rounded-xl text-white dark:text-black-50 flex items-center gap-1.5 text-sm"
            aria-label="Adicionar novo serviço"
            onClick={handleOpenAddModal}
          >
            <PlusIcon size={18} aria-hidden="true" />
            <span>Adicionar Serviço</span>
          </button>
        )}
      </header>

      {/* LISTA DE SERVIÇOS */}
      {user.role === 'provider' && (
        <section className="p-4 md:p-8 text-black dark:text-gray-200" aria-labelledby="meus-servicos">
          <h2 id="meus-servicos" className="text-xl font-semibold dark:text-white">
            Meus Serviços
          </h2>

          {myServices.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-4">
              {myServices.map((service) => (
                <li key={service.id}>
                  <article className="p-6 bg-white dark:bg-black-200 rounded-2xl shadow-sm h-full border border-gray-200 dark:border-gray-700">
                    <header className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-lg dark:text-white">{service.title}</h3>
                        <p className="mt-3 font-medium text-sm bg-lime-400/10 dark:bg-lime-500/20 px-2 py-0.5 rounded-lg w-fit text-black dark:text-white">
                          {service.category.name && capitalizeFirstLetter(service.category.name)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
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

                    <p className="text-stone-500 dark:text-gray-400 my-4">{service.description}</p>

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

      {/* MODAL DE INSERÇÃO / EDIÇÃO */}
      <Modal open={modalIsOpen} onClose={handleCloseModal}>
        <div className="h-dvh pt-1 pb-4 overflow-y-auto" onClick={handleCloseModal}>
          <div onClick={(e) => e.stopPropagation()} className="w-fit mx-auto">
            <ServiceForm
              onCancel={handleCloseModal}
              onServiceAdded={() => {
                fetchUserServices();
                handleCloseModal();
              }}
              serviceToEdit={serviceToEdit}
            />
          </div>
        </div>
      </Modal>

      {/* MODAL DE EXCLUSÃO */}
      <ModalExclusion
        open={deleteModalIsOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteService}
      />

    </main>
  );
}
