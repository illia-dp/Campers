import { ButtonProps } from "./Button.types";
import clsx from "clsx";
import css from "./Button.module.css";

const Button = ({
  children,
  type = "button",
  style = "confirm",
  className,
  onClick,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(css.button, css[style], className && className)}
    >
      {children}
    </button>
  );
};

export default Button;
