import { InfoIcon } from "@phosphor-icons/react";
import { Modal } from "./modal";
import { Button } from "./ui/button";

type ModalExclusion = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ModalLogout({ open, onClose, onConfirm }: ModalExclusion) {
  return <Modal open={open} onClose={onClose}>
    <div className="px-4">
      <div className="max-w-fit mx-auto bg-gray-200 dark:bg-black-200 rounded-3xl">
        <div className="p-6 text-center">
          <InfoIcon
            size={48}
            className="mx-auto text-red-500"
            aria-hidden="true"
          />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 dark:text-gray-200">
            Confirmar Logout
          </h3>
          <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
            Você tem certeza que deseja sair da sua conta?
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              onClick={onClose}
              variant="accent"
            >
              Cancelar
            </Button>
            <Button
              onClick={onConfirm}
              variant="danger"
            >
              Sim, sair
            </Button>
          </div>
        </div>
      </div>
    </div>
  </Modal>
}