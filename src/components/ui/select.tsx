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
        <label className="font-semibold text-xs" htmlFor={id || name}>
          {label}
        </label>
      )}
      <select
        id={id || name}
        name={name || id}
        ref={ref}
        {...rest}
        className="min-h-[54px] bg-white dark:bg-black-200 rounded-lg p-3.5 text-base leading-none disabled:bg-gray-200 disabled:text-gray-400 dark:disabled:bg-zinc-600 dark:disabled:text-zinc-400"
      >
        <option value="">{defaultValue}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {capitalizeFirstLetter(opt.label)}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export const Select = forwardRef(SelectRef);
