"use client";

import { ChangeEmailForm } from "@/components/forms/changeEmailForm";
import { ChangePasswordForm } from "@/components/forms/changePasswordForm";
import { ClientForm } from "@/components/forms/clientForm";
import { ProviderForm } from "@/components/forms/providerForm";
import { Modal } from "@/components/modal";
import { ModalLogout } from "@/components/modalLogout";
import { ProfileInfoCard } from "@/components/profile/profileInfoCard";
import { ProfileModal } from "@/components/profile/profileModal";
import { ProfileInfoCardSkeleton } from "@/components/skeletons/profileInfoCardSkeleton";
import { Button } from "@/components/ui/button";
import { SUCCESS_MESSAGES } from "@/constants/messages";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Profile() {
  const router = useRouter();
  const { logout: authLogout, user, loading } = useAuth();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isChangeEmailModalOpen, setIsChangeEmailModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);

  async function handleLogout() {
    setIsLogoutModalOpen(false);
    toast.success(SUCCESS_MESSAGES.LOGOUT_SUCCESS);
    await authLogout();
  }

  useEffect(() => {
    if (modalIsOpen || isChangeEmailModalOpen || isChangePasswordModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [modalIsOpen, isChangeEmailModalOpen, isChangePasswordModalOpen]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user]);

  return (
    <main className="relative">
      {!user && loading && <ProfileInfoCardSkeleton />}

      {user && (
        <div className="px-4">
          <ProfileInfoCard
            user={user}
            onEdit={() => setModalIsOpen(true)}
            onChangeEmail={() => setIsChangeEmailModalOpen(true)}
            onChangePassword={() => setIsChangePasswordModalOpen(true)}
          />

          <div className="w-full max-w-2xl mx-auto grid place-items-center mt-2">
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
                onDataSubmit={() => setModalIsOpen(false)}
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
