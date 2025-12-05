"use client";

import { ChangeEmailForm } from "@/components/forms/changeEmailForm";
import { ChangePasswordForm } from "@/components/forms/changePasswordForm";
import { ClientForm } from "@/components/forms/clientForm";
import { ProviderForm } from "@/components/forms/providerForm";
import { ServiceForm } from "@/components/forms/serviceForm";
import { Modal } from "@/components/modal";
import { ModalExclusion } from "@/components/modalExclusion";
import { ModalLogout } from "@/components/modalLogout";
import { ServiceCard } from "@/components/serviceCard";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { FREE_PLAN_SERVICE_LIMIT } from "@/constants";
import { SUCCESS_MESSAGES } from "@/constants/messages";
import { useAuth } from "@/hooks/useAuth";
import {
  useProviderServices,
  useDeleteService,
} from "@/hooks/useServiceQueries";
import { Service } from "@/types/Service";
import { PencilIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Profile() {
  const { logout: authLogout, user } = useAuth();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [serviceToDeleteId, setServiceToDeleteId] = useState<string | null>(
    null
  );
  const [modalNewServiceIsOpen, setModalNewServiceIsOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState<Service | null>(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isChangeEmailModalOpen, setIsChangeEmailModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);

  const { data: myServices = [], isLoading } = useProviderServices(
    user?.role === "provider" ? user?.id : undefined
  );
  const deleteServiceMutation = useDeleteService();

  const hasReachedServiceLimit = myServices.length >= FREE_PLAN_SERVICE_LIMIT;
  const canAddService = !hasReachedServiceLimit;

  function handleCloseModal() {
    setModalIsOpen(false);
  }

  function handleOpenModal() {
    setModalIsOpen(true);
  }

  const handleOpenAddModalNewService = () => {
    if (!canAddService) {
      toast.warning(
        `Você atingiu o limite de ${FREE_PLAN_SERVICE_LIMIT} serviços gratuitos. Assine um plano para adicionar mais!`,
        { autoClose: 3000 }
      );
      return;
    }
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

  function handleDeleteService() {
    if (!serviceToDeleteId) return;

    deleteServiceMutation.mutate(serviceToDeleteId, {
      onSuccess: () => {
        handleCloseDeleteModal();
      },
    });
  }

  async function handleLogout() {
    setIsLogoutModalOpen(false);
    toast.success(SUCCESS_MESSAGES.LOGOUT_SUCCESS);
    await authLogout();
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

            {user?.role === "provider" && (
              <div className="mb-6">
                <p className="text-sm text-zinc-500">Telefone</p>
                <p>{user?.address?.phone}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 mt-4">
              <Button
                variant="accent"
                onClick={() => setIsChangeEmailModalOpen(true)}
                className="w-full"
              >
                Alterar Email
              </Button>
              <Button
                variant="accent"
                onClick={() => setIsChangePasswordModalOpen(true)}
                className="w-full"
              >
                Alterar Senha
              </Button>
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
                  className={`w-full transition-all ${
                    canAddService
                      ? ""
                      : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-60"
                  }`}
                  onClick={handleOpenAddModalNewService}
                  disabled={!canAddService}
                >
                  Cadastrar serviço
                </Button>
                {!canAddService && (
                  <p className="text-xs text-center mt-2 text-gray-600 dark:text-gray-400">
                    Limite de {FREE_PLAN_SERVICE_LIMIT} serviços atingido.{" "}
                    <a
                      href="/plans"
                      className="text-lime-500 hover:underline font-medium"
                    >
                      Assine um plano!
                    </a>
                  </p>
                )}
              </div>
            </>
          )}
          <div className="w-full max-w-2xl mx-auto grid place-items-center lg:hidden mt-1">
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
          className="max-h-dvh rounded-2xl overflow-y-auto pb-4 px-4"
          onClick={handleCloseModal}
        >
          <div
            className="max-w-lg mx-auto rounded-2xl p-4 bg-white dark:bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            {user?.role === "provider" && (
              <ProviderForm
                mode="edit"
                defaultValues={user}
                onCancel={handleCloseModal}
              />
            )}
            {user?.role === "client" && (
              <ClientForm
                mode="edit"
                defaultValues={user}
                onCancel={handleCloseModal}
              />
            )}
          </div>
        </div>
      </Modal>

      <Modal open={modalNewServiceIsOpen} onClose={handleCloseModalNewService}>
        <div
          className="h-dvh pt-1 pb-4 overflow-y-auto"
          onClick={() => setModalNewServiceIsOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()} className="w-fit mx-auto">
            <ServiceForm
              onCancel={handleCloseModalNewService}
              onServiceAdded={handleCloseModalNewService}
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

      <Modal
        open={isChangeEmailModalOpen}
        onClose={() => setIsChangeEmailModalOpen(false)}
      >
        <div
          className="max-h-dvh rounded-2xl overflow-y-auto pb-4 px-4"
          onClick={() => setIsChangeEmailModalOpen(false)}
        >
          <div
            className="max-w-lg mx-auto rounded-2xl p-6 bg-white dark:bg-black-200"
            onClick={(e) => e.stopPropagation()}
          >
            <ChangeEmailForm
              onCancel={() => setIsChangeEmailModalOpen(false)}
              onSuccess={() => setIsChangeEmailModalOpen(false)}
            />
          </div>
        </div>
      </Modal>

      <Modal
        open={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
      >
        <div
          className="max-h-dvh rounded-2xl overflow-y-auto pb-4 px-4"
          onClick={() => setIsChangePasswordModalOpen(false)}
        >
          <div
            className="max-w-lg mx-auto rounded-2xl p-6 bg-white dark:bg-black-200"
            onClick={(e) => e.stopPropagation()}
          >
            <ChangePasswordForm
              onCancel={() => setIsChangePasswordModalOpen(false)}
              onSuccess={() => setIsChangePasswordModalOpen(false)}
            />
          </div>
        </div>
      </Modal>
    </main>
  );
}
