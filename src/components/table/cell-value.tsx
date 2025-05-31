import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export default function CellValue({ className, children, ...props }: Props) {
  return (
    <span
      className={cn(
        "text-base  text-primary-text items-center gap-x-[5px] px-3",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
