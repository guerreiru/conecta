import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "accent";

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
    "p-3.5 rounded-lg font-bold font-sans text-black-200 active:shadow-none transition cursor-pointer";

  const variantStyles: Record<ButtonVariant, string> = {
    primary: "bg-lime-400",
    accent: "bg-white",
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
