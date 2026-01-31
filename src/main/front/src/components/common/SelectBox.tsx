import { ChevronDown } from "lucide-react";
import type { ChangeEvent } from "react";

interface OptionProps {
  id: number;
  name: string;
}

interface SelectBoxProps {
  options: OptionProps[];
  title?: string;
  value: number | string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  fullWidth?: boolean;
}

export default function SelectBox({
  options,
  title,
  value,
  onChange,
  fullWidth = false,
}: SelectBoxProps) {
  return (
    <div className={`relative ${fullWidth ? "w-full" : "min-w-28"}`}>
      <select
        value={value}
        onChange={onChange}
        className={`w-full appearance-none rounded-md border border-zinc-200 bg-white py-2 pr-10 pl-3 text-sm text-zinc-600 transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none`}
      >
        {title && <option value="">{title}</option>}
        {options?.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>

      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-400">
        <ChevronDown className="h-4 w-4" />
      </div>
    </div>
  );
}
