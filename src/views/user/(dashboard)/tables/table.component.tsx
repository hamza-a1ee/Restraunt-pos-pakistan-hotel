import { cn } from "@/lib/utils";
import { TVoidCallback } from "@/shared/types/callbacks.types";
import { Ellipsis } from "lucide-react";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  label: string;
  onEdit?: TVoidCallback;
}
export default function TableComp({
  className,
  label,
  onEdit,
  ...props
}: Props) {
  return (
    <div
      className={cn(
        "min-w-[300px] h-[220px] flex justify-center p-1 rounded-xl hover:shadow-lg duration-200 cursor-pointer items-center text-lg capitalize border border-black  text-gray-700 font-bold object-contain bg-cover bg-no-repeat",
        className
      )}
      style={{
        backgroundImage: `url('/assets/images/dine2.jpg')`,
      }}
      {...props}
    >
      Table {label}
      {onEdit && (
        <Ellipsis
          className="bg-white text-black hover:bg-slate-200 absolute top-3 right-3 rounded-full"
          size={24}
          onClick={onEdit}
        />
      )}
    </div>
  );
}
