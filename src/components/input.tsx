import { FC } from "react";
import { InputProps } from "../interfaces/inputProps";


const Input: FC<InputProps> = ({
  disabled,
  label,
  message,
  error,
  success,
  onChange,
  placeholder,
  name,
  type,
  value,
  minLength,
  maxLength,
  ...props
}) => {
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
        disabled={disabled}
        placeholder={placeholder}
        min={minLength}
      />
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

export default Input;
