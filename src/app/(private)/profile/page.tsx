"use client";

import { ClientForm } from "@/components/forms/clientForm";
import { ProviderForm } from "@/components/forms/providerForm";
import { ServiceForm } from "@/components/forms/serviceForm";
import { Modal } from "@/components/modal";
import { ModalExclusion } from "@/components/modalExclusion";
import { ModalLogout } from "@/components/modalLogout";
import { ServiceCard } from "@/components/serviceCard";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loadin";
import { useAuth } from "@/hooks/useAuth";
import { deleteService } from "@/services/servicesService";
import { Service } from "@/types/Service";
import { logout } from "@/utils/logout";
import { PencilIcon } from "@phosphor-icons/react";
import { isAxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Profile() {
  const { logout: authLogout, user } = useAuth();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [serviceToDeleteId, setServiceToDeleteId] = useState<string | null>(null);
  const [modalNewServiceIsOpen, setModalNewServiceIsOpen] = useState(false);
  const [myServices, setMyServices] = useState<Service[]>([]);
  const [serviceToEdit, setServiceToEdit] = useState<Service | null>(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const fetchUserServices = useCallback(async () => {
    if (!user?.id) {
      setIsLoading(false);
      return;
    }

    if (user.role === "client") {
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

  function handleCloseModal() {
    setModalIsOpen(false);
  }

  function handleOpenModal() {
    setModalIsOpen(true);
  }

  const handleOpenAddModalNewService = () => {
    setServiceToEdit(null);
    setModalNewServiceIsOpen(true);
  };

  function handleCloseModalNewService() {
    setModalNewServiceIsOpen(false);
  }

  const handleOpenEditModal = (service: Service) => {
    setServiceToEdit(service);
    setModalNewServiceIsOpen(true);
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

  function handleLogout() {
    authLogout();
    logout();
    setIsLogoutModalOpen(false);
  }


  return (
    <main className="relative">
      <header className="pt-6 pb-8 bg-black dark:bg-black-200">
        <h1 className="text-white text-3xl text-center">Meu perfil</h1>
      </header>

      {!isLoading && !user && <Loading />}

      {user && (
        <div className="px-4">
          <div className="shadow border border-gray-200 dark:border-black rounded-3xl relative -top-4 p-6 bg-white dark:bg-black-200 w-full max-w-2xl mx-auto">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-xl">Informações da Conta</p>
              <button onClick={handleOpenModal}>
                <PencilIcon />
              </button>
            </div>

            <div className="mt-6">
              <p className="text-sm text-zinc-500">Nome</p>
              <p>{user?.name}</p>
            </div>

            <div className="my-4">
              <p className="text-sm text-zinc-500">Email</p>
              <p>{user?.email}</p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">Telefone</p>
              <p>{user?.address?.phone}</p>
            </div>
          </div>

          {user?.role === "provider" && (
            <>
              <div className="mt-6 shadow border border-gray-200 dark:border-black rounded-3xl relative -top-4 p-6 bg-white dark:bg-black-200 w-full max-w-2xl mx-auto">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-xl">Meus serviços</p>
                </div>

                {isLoading && (
                  <div className="mt-6">
                    <p>Carregando serviços...</p>
                  </div>
                )}

                {myServices?.map((service) => (
                  <div key={service.id} className="mt-3">
                    <ServiceCard
                      owner={user}
                      service={service}
                      onEdit={() => handleOpenEditModal(service)}
                      onDelete={() => handleOpenDeleteModal(service.id)}
                    />
                  </div>
                ))}
              </div>

              <div className="w-full max-w-2xl mx-auto grid place-items-center mb-2">
                <Button
                  className="w-full"
                  onClick={handleOpenAddModalNewService}
                >
                  Cadastrar serviço
                </Button>
              </div>
            </>
          )}
          <div className="w-full max-w-2xl mx-auto grid place-items-center lg:hidden">
            <Button
              className="w-full"
              onClick={() => setIsLogoutModalOpen(true)}
              variant="black"
            >
              Sair
            </Button>
          </div>
        </div>
      )}

      <ModalLogout
        open={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />

      <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <div
          className="max-h-dvh rounded-2xl overflow-y-auto pb-4"
          onClick={handleCloseModal}
        >
          <div
            className="max-w-lg mx-auto rounded-2xl p-4 bg-white dark:bg-black-200"
            onClick={(e) => e.stopPropagation()}
          >
            {user?.role === "provider" && (
              <ProviderForm mode="edit" defaultValues={user} />
            )}
            {user?.role === "client" && <ClientForm mode="edit" defaultValues={user} />}
          </div>
        </div>
      </Modal>

      <Modal open={modalNewServiceIsOpen} onClose={handleCloseModalNewService}>
        <div className="h-dvh pt-1 pb-4 overflow-y-auto" onClick={() => setModalNewServiceIsOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="w-fit mx-auto">
            <ServiceForm
              onCancel={handleCloseModalNewService}
              onServiceAdded={() => {
                fetchUserServices();
                handleCloseModalNewService();
              }}
              serviceToEdit={serviceToEdit}
            />
          </div>
        </div>
      </Modal>

      <ModalExclusion open={deleteModalIsOpen} onClose={handleCloseDeleteModal} onConfirm={handleDeleteService} />
    </main>
  );
}
