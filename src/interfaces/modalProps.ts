import { Dispatch, SetStateAction } from "react";

export interface ModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  onConfirm?: ((e: React.MouseEvent<HTMLButtonElement>) => void) | undefined;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  body: string;
  setBody: Dispatch<SetStateAction<string>>;
}
