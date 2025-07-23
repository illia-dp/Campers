import { ReactNode } from "react";

export type ButtonVariant = "confirm" | "more" | string;

export interface ButtonProps {
  children: ReactNode;
  type?: "button" | "submit";
  style?: ButtonVariant;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}
