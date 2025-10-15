import { TextareaHTMLAttributes } from "react";

type TextareaProps = {
  label?: string;
  error?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ label, error, id, name, ...props }: TextareaProps) {
  return (
    <fieldset className="grid gap-1">
      {label && (
        <label className="font-semibold" htmlFor={id || name}>
          {label}
        </label>
      )}
      <textarea
        {...props}
        id={id || name}
        name={name || id}
        className={`px-3 py-2 min-h-12 bg-white dark:bg-black-200 rounded-lg disabled:bg-zinc-500 resize-none ${error ? "border-red-500" : ""
          }`}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </fieldset>
  );
}
