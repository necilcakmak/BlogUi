import React from "react";

const Button = (props) => {
  const { onClick, type, cls, txt, pending } = props;
  return (
    <button
      className={"btn btn-" + cls}
      type={type}
      disabled={pending}
      onClick={onClick}
    >
      {pending && <span className="spinner-border spinner-border-sm"></span>}
      {txt}
    </button>
  );
};
export default Button;
