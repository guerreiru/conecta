import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "accent" | "black" | "danger" | "border";

type ButtonProps = {
  variant?: ButtonVariant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "px-3 py-2  min-h-12 rounded-lg font-bold font-sans text-black-200 active:shadow-none transition cursor-pointer hover:brightness-95";

  const variantStyles: Record<ButtonVariant, string> = {
    primary: "bg-lime-400",
    accent: "bg-white",
    black: "bg-black text-white",
    danger: "bg-red-600 text-white",
    border: "border border-lime-400 text-lime-400 bg-transparent",
  };

  return (
    <button
      className={clsx(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
