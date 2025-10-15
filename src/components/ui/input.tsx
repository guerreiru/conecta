import { InputHTMLAttributes } from "react";

type InputProps = {
  label?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function Input({ label, error, id, name, ...props }: InputProps) {
  return (
    <fieldset className="grid gap-1">
      {label && (
        <label className="font-semibold" htmlFor={id || name}>
          {label}
        </label>
      )}
      <input
        {...props}
        id={id || name}
        name={name || id}
        className={`px-3 py-2 min-h-12 bg-white dark:bg-black-200 rounded-lg disabled:bg-gray-300/70 ${error ? "border-red-500" : ""
          }`}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </fieldset>
  );
}
