import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  id: string;
  name: string;
  price?: number;
  checked?: boolean;
}
export default function MenuItem({
  id,
  name,
  price,
  className,
  checked,
  ...props
}: Props) {
  return (
    <div
      key={id}
      className={cn(
        "w-full rounded-md  min-h-11 px-2 bg-amber-500 text-white flex  gap-x-2 justify-between items-center  duration-200 ease-in-out transition-all cursor-pointer hover:opacity-85 p-2",
        className
      )}
      {...props}
    >
      <Checkbox
        checked={checked}
        // className={cn("w-4 h-4 ", "data-[state=checked]:bg-white border border-")}
      />
      <span className="truncate font-bold">{name}</span>
      <span>{price}</span>
    </div>
  );
}
