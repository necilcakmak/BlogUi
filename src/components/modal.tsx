import { ModalContext, useModal } from "contexts/modalContext";
import { ModalProps } from "interfaces/modalProps";
import { FC, useContext, useState } from "react";

const Modal = (): ReturnType<FC> => {
  const { body, onClose, onConfirm, open, title } = useModal();

  return (
    <div className={`${"modal"} ${open ? "display-block" : "display-none"}`}>
      <div className="modal-main">
        <div className="modal-head">
          <h1>{title}</h1>
        </div>
        <div className="modal-body">{body}</div>
        <div className="btn-container">
          <button type="button" className="btn btn-danger" onClick={onClose}>
            Hayır
          </button>
          <button type="button" className="btn btn-success" onClick={onConfirm}>
            Evet
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
