import { ConfirmationModalProps } from "interfaces/modalContextProps";
import React from "react";

export const Modal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  message,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className={`${"modal"} ${"display-block"}`}>
      <div className="modal-main">
        <div className="modal-head">
          <h5 className="modal-title">Uyarı</h5>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={onConfirm}>
            Evet
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
            onClick={onClose}
          >
            Hayır
          </button>
        </div>
      </div>
    </div>
  );
};
