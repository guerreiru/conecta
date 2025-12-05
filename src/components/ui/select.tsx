import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { forwardRef, type SelectHTMLAttributes, type Ref } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
}

function SelectRef(props: SelectProps, ref: Ref<HTMLSelectElement>) {
  const {
    error,
    id,
    label,
    name,
    options,
    defaultValue = "Selecione",
    ...rest
  } = props;

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="font-semibold" htmlFor={id || name}>
          {label}
        </label>
      )}
      <div className="relative w-full">
        <select
          id={id || name}
          name={name || id}
          ref={ref}
          {...rest}
          className="appearance-none min-h-12 bg-white dark:bg-black-200 rounded-lg px-3 pr-10 py-2 text-base leading-none disabled:bg-gray-200 disabled:text-gray-400 dark:disabled:bg-zinc-600 dark:disabled:text-zinc-400 w-full border border-gray-200"
        >
          <option value="" disabled>{defaultValue}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {capitalizeFirstLetter(opt.label)}
            </option>
          ))}
        </select>

        {/* Ícone da seta */}
        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 dark:text-zinc-300"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          width={18}
          height={18}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </div>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export const Select = forwardRef(SelectRef);
