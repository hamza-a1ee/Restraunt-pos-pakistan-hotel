import { IOption } from "@/shared/interface/shared.interface";
import { TOneParamCallback } from "@/shared/types/callbacks.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { cn } from "@/lib/utils";

interface Props {
  items: IOption[];
  contentClassName?: string;
  placeholder?: string;
  onChange?: TOneParamCallback<string>;
  error?: string;
}

export default function CustomSelect({
  items,
  placeholder,
  contentClassName,
  error,
  onChange,
}: Props) {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-full h-10">
        <SelectValue
          placeholder={placeholder}
          className={cn("w-full text-black text-xs")}
        />
      </SelectTrigger>
      <SelectContent
        className={cn("bg-white flex flex-col gap-y-2", contentClassName)}
      >
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
        {error && (
          <label htmlFor="error" className="text-xs text-red-600">
            {error}
          </label>
        )}
      </SelectContent>
    </Select>
  );
}
