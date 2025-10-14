import { InputHTMLAttributes } from "react";

type InputProps = {
  label?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function Input({ label, error, id, name, ...props }: InputProps) {
  return (
    <fieldset className="grid gap-1">
      {label && (
        <label className="font-semibold text-xs" htmlFor={id || name}>
          {label}
        </label>
      )}
      <input
        {...props}
        id={id || name}
        name={name || id}
        className={`p-3.5 bg-white dark:bg-black-200 rounded-lg disabled:bg-zinc-500 ${
          error ? "border-red-500" : ""
        }`}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </fieldset>
  );
}
