"use client";

import { DashboardStats } from "@/components/dashboard/dashboardStats";
import { Header } from "@/components/dashboard/header";
import { ServiceList } from "@/components/dashboard/serviceList";
import { ServiceForm } from "@/components/forms/serviceForm";
import { Modal } from "@/components/modal";
import { ModalExclusion } from "@/components/modalExclusion";
import { ServiceSkeletonList } from "@/components/skeletons/serviceSkeletonList";
import { UserSkeleton } from "@/components/skeletons/userSkeleton";
import { useDashboard } from "@/hooks/useDashboard";

export default function Home() {
  const {
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
  } = useDashboard();

  if (loading || !user) {
    return <UserSkeleton />;
  }

  return (
    <div className="max-w-3xl mx-auto w-full px-4">
      <Header
        user={user}
        canAddService={canAddService}
        openAddModalAction={handleOpenAddModal}
      />

      {user.role === "provider" && (
        <>
          {isLoading ? (
            <ServiceSkeletonList />
          ) : (
            <>
              <DashboardStats
                servicesCount={myServices.length}
                averageRating={servicesAverageRating}
                totalReviews={totalReviews}
              />

              <ServiceList
                services={myServices}
                owner={user}
                onEditAction={handleOpenEditModal}
                onDeleteAction={handleOpenDeleteModal}
                onActiveAction={handleActiveService}
              />
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
