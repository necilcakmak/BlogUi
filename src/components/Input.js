import React from "react";

const Input = (props) => {
  const { label, error, name, onChange, type, value, placeholder, disable } =
    props;
  const className = error ? "form-control is-invalid " : "form-control";
  return (
    <div className="form-group">
      <label className="text-body font-weight-bold">{label}</label>
      <input
        className={className}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        disabled={disable}
        placeholder={placeholder}
      />
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};
export default Input;
