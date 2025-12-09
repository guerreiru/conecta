"use client";

import { ReactNode } from "react";
import { Modal } from "@/components/modal";

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function ProfileModal({ open, onClose, children }: ProfileModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <div
        className="max-h-dvh rounded-2xl overflow-y-auto pb-4 px-4"
        onClick={onClose}
      >
        <div
          className="max-w-lg mx-auto rounded-2xl p-6 bg-white dark:bg-black-200"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </Modal>
  );
}
