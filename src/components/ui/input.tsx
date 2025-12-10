import { InputHTMLAttributes, ReactNode } from "react";

type InputProps = {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export function Input({
  label,
  error,
  id,
  name,
  leftIcon,
  rightIcon,
  ...props
}: InputProps) {
  return (
    <fieldset className="grid gap-1">
      {label && (
        <label className="font-semibold" htmlFor={id || name}>
          {label}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {leftIcon}
          </span>
        )}

        {rightIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            {rightIcon}
          </span>
        )}

        <input
          {...props}
          id={id || name}
          name={name || id}
          className={`
            w-full px-3 py-2 min-h-12 bg-white dark:bg-black-200 rounded-lg disabled:bg-gray-100 dark:disabled:bg-zinc-700/75 disabled:cursor-no-drop border 
            ${error ? "border-red-500" : "border-gray-200"} 
            ${leftIcon ? "pl-10" : ""}
            ${rightIcon ? "pr-10" : ""}
          `}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </fieldset>
  );
}
