export interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {
  cls: string;
  pendingApiCall?: boolean;
  text: string;
  disabled?: boolean;
  onClick?: ((event: React.MouseEvent<HTMLButtonElement>) => void) | undefined;
}
