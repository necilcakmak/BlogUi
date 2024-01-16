import Modal from "components/modal";
import { ModalProps } from "interfaces/modalProps";
import { createContext, useContext, useState } from "react";

const defaultValue = {
  body: "",
  onClose: () => {},
  onConfirm: () => {},
  toggleModal: () => {},
  setBodyy: (val: string) => {},
  open: false,
  title: "",
};

export const ModalContext = createContext(defaultValue);
const ModalProvider = ({ children }: any) => {
  const [open, setOpen] = useState<boolean>(false);
  const [body, setBody] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const toggleModal = () => {
    setOpen(!open);
  };
  const onClose = () => {
    setOpen(!open);
  };
  const setBodyy = (val: string) => {
    setBody(val);
  };
  const data = {
    onClose,
    onConfirm: () => {},
    toggleModal,
    open,
    setOpen,
    body,
    setBodyy,
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
