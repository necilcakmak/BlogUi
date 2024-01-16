import { ButtonProps } from "interfaces/buttonProps";
import React from "react";

export const Button: React.FC<ButtonProps> = (props) => {
  const { cls, type, disabled, onClick, text } = props;

  return (
    <button
      className={"btn btn-" + cls}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {disabled && <span className="spinner-border spinner-border-sm"></span>}
      {text}
    </button>
  );
};
