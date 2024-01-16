import { ChangeEventHandler } from "react";

export interface InputProps {
    label?: string;
    error?: string;
    message?: string;
    success?: boolean;
    disabled?: boolean;
    placeholder?: string;
    name?: string;
    type?: 'text' | 'number' | 'email' | 'password';
    value?: string;
    minLength?:string;
    maxLength?:string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
  }
  