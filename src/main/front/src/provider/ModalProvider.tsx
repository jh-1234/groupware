import ConfirmModal from "@/components/modal/ConfirmModal";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

const ModalProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {createPortal(
        <>
          <ConfirmModal />
        </>,
        document.getElementById("modal-root")!,
      )}
      {children}
    </>
  );
};

export default ModalProvider;
