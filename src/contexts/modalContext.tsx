import Modal from "components/modal";
import { ModalProps } from "interfaces/modalProps";
import { ReactNode, createContext, useContext, useState } from "react";

type ModalProviderProps = {
  children: ReactNode;
};

const defaultValue: ModalProps = {
  body: "",
  setBody: () => {},
  onClose: () => {},
  onConfirm: (e: React.MouseEvent<HTMLButtonElement>) => {},
  open: false,
  setOpen: () => {},
  title: "",
  setTitle: () => {},
};

export const ModalContext = createContext(defaultValue);
const ModalProvider = ({ children }: ModalProviderProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [body, setBody] = useState<string>("modal body");
  const [title, setTitle] = useState<string>("modal title");
  const onClose = () => {
    setOpen(false);
  };
  const onConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    
  };
  const data: ModalProps = {
    onConfirm,
    onClose,
    open,
    setOpen,
    body,
    setBody,
    title,
    setTitle,
  };
  return (
    <ModalContext.Provider value={data}>
      <Modal />
      {children}
    </ModalContext.Provider>
  );
};
export const useModal = () => useContext(ModalContext);
export default ModalProvider;
