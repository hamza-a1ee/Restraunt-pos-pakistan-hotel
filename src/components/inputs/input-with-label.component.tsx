import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
  labelClassName?: string;
  error?: string;
}
export default function InputWithLabel({
  label,
  placeholder,
  labelClassName,
  className,
  error,
  ...props
}: Props) {
  return (
    <div className="w-full flex flex-col gap-y-2">
      <label className={cn("text-base font-semibold ", labelClassName)}>
        {label}
      </label>
      <Input
        className={cn("placeholder:text-placeholder text-black", className)}
        placeholder={placeholder}
        {...props}
      />
      <label htmlFor="error" className="text-xs text-red-600">
        {error}
      </label>
    </div>
  );
}
