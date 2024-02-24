import { Modal } from "components/modal";
import { ModalContextProps } from "interfaces/modalContextProps";
import { ReactNode, createContext, useContext, useState } from "react";

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modalMessage, setModalMessage] = useState("");
  const [onConfirmCallback, setOnConfirmCallback] = useState<() => void>(
    () => () => {}
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (message: string, onConfirm: () => void) => {
    setModalMessage(message);
    setOnConfirmCallback(() => onConfirm);
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <Modal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={hideModal}
        onConfirm={() => {
          onConfirmCallback();
          hideModal();
        }}
      />
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
