"use client";

import { ChangeEmailForm } from "@/components/forms/changeEmailForm";
import { ChangePasswordForm } from "@/components/forms/changePasswordForm";
import { ClientForm } from "@/components/forms/clientForm";
import { ProviderForm } from "@/components/forms/providerForm";
import { Modal } from "@/components/modal";
import { ModalExclusion } from "@/components/modalExclusion";
import { ModalLogout } from "@/components/modalLogout";
import { ProfileInfoCard } from "@/components/profile/profileInfoCard";
import { ProfileModal } from "@/components/profile/profileModal";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { SUCCESS_MESSAGES } from "@/constants/messages";
import { useAuth } from "@/hooks/useAuth";
import { useDeleteService } from "@/hooks/useServiceQueries";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Profile() {
  const { logout: authLogout, user, loading } = useAuth();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [serviceToDeleteId, setServiceToDeleteId] = useState<string | null>(
    null
  );
  // const [modalNewServiceIsOpen, setModalNewServiceIsOpen] = useState(false);
  // const [serviceToEdit] = useState<Service | null>(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isChangeEmailModalOpen, setIsChangeEmailModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);

  const deleteServiceMutation = useDeleteService();

  // const hasReachedServiceLimit = myServices.length >= FREE_PLAN_SERVICE_LIMIT;

  // const handleOpenAddModalNewService = () => {
  //   if (hasReachedServiceLimit) {
  //     toast.warning(
  //       `Você atingiu o limite de ${FREE_PLAN_SERVICE_LIMIT} serviços gratuitos. Assine um plano para adicionar mais!`,
  //       { autoClose: 3000 }
  //     );
  //     return;
  //   }
  //   setServiceToEdit(null);
  //   setModalNewServiceIsOpen(true);
  // };

  // const handleOpenEditModal = (service: Service) => {
  //   setServiceToEdit(service);
  //   setModalNewServiceIsOpen(true);
  // };

  // const handleOpenDeleteModal = (serviceId: string) => {
  //   setServiceToDeleteId(serviceId);
  //   setDeleteModalIsOpen(true);
  // };

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
      {!user && loading && <Loading />}

      {user && (
        <div className="px-4">
          <ProfileInfoCard
            user={user}
            onEdit={() => setModalIsOpen(true)}
            onChangeEmail={() => setIsChangeEmailModalOpen(true)}
            onChangePassword={() => setIsChangePasswordModalOpen(true)}
          />

          {/* {user.role === "provider" && (
            <ProfileServicesCard
              user={user}
              services={myServices}
              isLoading={isLoading}
              onEdit={handleOpenEditModal}
              onDelete={handleOpenDeleteModal}
              onAddService={handleOpenAddModalNewService}
            />
          )} */}

          <div className="w-full max-w-2xl mx-auto grid place-items-center md:hidden mt-1">
            <Button
              className="w-full bg-black-200 text-white dark:bg-white dark:text-black-200"
              onClick={() => setIsLogoutModalOpen(true)}
              variant="unstyled"
            >
              Sair
            </Button>
          </div>
        </div>
      )}

      {/* Modals */}
      <ModalLogout
        open={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />

      <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <div
          className="max-h-dvh rounded-2xl overflow-y-auto pb-4 px-4"
          onClick={() => setModalIsOpen(false)}
        >
          <div
            className="max-w-lg mx-auto rounded-2xl p-4 bg-white dark:bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            {user?.role === "provider" && (
              <ProviderForm
                mode="edit"
                defaultValues={user}
                onCancel={() => setModalIsOpen(false)}
              />
            )}
            {user?.role === "client" && (
              <ClientForm
                mode="edit"
                defaultValues={user}
                onCancel={() => setModalIsOpen(false)}
              />
            )}
          </div>
        </div>
      </Modal>

      {/* <Modal
        open={modalNewServiceIsOpen}
        onClose={() => setModalNewServiceIsOpen(false)}
      >
        <div
          className="h-dvh pt-1 pb-4 overflow-y-auto"
          onClick={() => setModalNewServiceIsOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()} className="w-fit mx-auto">
            <ServiceForm
              onCancelAction={() => setModalNewServiceIsOpen(false)}
              onServiceAddedAction={() => setModalNewServiceIsOpen(false)}
              serviceToEdit={serviceToEdit}
            />
          </div>
        </div>
      </Modal> */}

      <ModalExclusion
        open={deleteModalIsOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteService}
      />

      <ProfileModal
        open={isChangeEmailModalOpen}
        onClose={() => setIsChangeEmailModalOpen(false)}
      >
        <ChangeEmailForm
          onCancel={() => setIsChangeEmailModalOpen(false)}
          onSuccess={() => setIsChangeEmailModalOpen(false)}
        />
      </ProfileModal>

      <ProfileModal
        open={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
      >
        <ChangePasswordForm
          onCancel={() => setIsChangePasswordModalOpen(false)}
          onSuccess={() => setIsChangePasswordModalOpen(false)}
        />
      </ProfileModal>
    </main>
  );
}
