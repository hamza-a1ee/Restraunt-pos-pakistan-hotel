import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  Icon?: React.ElementType<React.SVGProps<SVGSVGElement>>;
}

export default function TableHead({
  className,
  children,
  Icon,
  ...props
}: Props) {
  return (
    <div
      className={cn(
        "flex text-base text-white font-medium items-center gap-x-[5px]  xl:px-10 lg:px-3 ",
        className
      )}
      {...props}
    >
      {Icon && <Icon className="w-[13px]" />}
      <span>{children}</span>
    </div>
  );
}
