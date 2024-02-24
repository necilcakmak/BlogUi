
export interface ModalContextProps {
  showModal: (message: string, onConfirm: () => void) => void;
  hideModal: () => void;
}
export interface ConfirmationModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
}