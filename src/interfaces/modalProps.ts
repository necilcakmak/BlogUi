import { ReactElement } from "react";

export interface ModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm?: ((event: React.MouseEvent<HTMLButtonElement>) => void) | undefined;
    title:string;
    body:string;
}