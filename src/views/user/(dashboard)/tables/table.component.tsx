import { cn } from "@/lib/utils";
import { TVoidCallback } from "@/shared/types/callbacks.types";
import { HTMLAttributes } from "react";
import EditPopover from "./edit-popover";

interface Props extends HTMLAttributes<HTMLDivElement> {
  label: string;
  onEdit?: TVoidCallback;
  onDelete?: TVoidCallback;
  currentBill?: number;
}
export default function TableComp({
  className,
  label,
  onEdit,
  onDelete,
  currentBill,
  ...props
}: Props) {
  console.log({ label, currentBill });
  return (
    <>
      <div
        className={cn(
          "min-w-[300px] h-[220px] flex justify-center p-1 rounded-xl hover:shadow-lg duration-200 cursor-pointer items-center text-lg capitalize border border-black  text-gray-700 font-bold object-contain bg-cover bg-no-repeat relative",
          className
        )}
        style={{
          backgroundImage: `url('/assets/images/dine2.jpg')`,
        }}
        {...props}
      >
        {label}
        {onEdit && onDelete ? (
          <EditPopover onDelete={onDelete} onEdit={onEdit} />
        ) : currentBill && currentBill > 0 ? (
          <>
            <div className="absolute text-white top-4 left-4">
              {currentBill}/-
            </div>
            <div className="absolute text-white bg-amber-500 p-1 rounded-full text-xs top-4 right-4">
              {"Occupied"}
            </div>
          </>
        ) : (
          <div className="absolute right-4 top-4 bg-green-400 rounded-full p-1 text-xs text-white">
            Free
          </div>
        )}
      </div>
    </>
  );
}
