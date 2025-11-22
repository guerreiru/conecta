import { TrashIcon } from "@phosphor-icons/react";
import { Modal } from "./modal";
import { Button } from "./ui/button";

type ModalExclusion = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ModalExclusion({ open, onClose, onConfirm }: ModalExclusion) {
  return <Modal open={open} onClose={onClose}>
    <div className="px-4">
      <div className="max-w-fit mx-auto bg-gray-200 dark:bg-black rounded-3xl">
        <div className="p-6 text-center">
          <TrashIcon
            size={48}
            className="mx-auto text-red-500"
            aria-hidden="true"
          />
          <h3 className="text-lg font-semibold text-gray-800 text-center">
            Confirmar Exclusão
          </h3>
          <p className="mb-6 text-sm text-gray-600">
            Você tem certeza que deseja excluir este serviço?
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
              Sim, excluir
            </Button>
          </div>
        </div>
      </div>
    </div>
  </Modal>
}