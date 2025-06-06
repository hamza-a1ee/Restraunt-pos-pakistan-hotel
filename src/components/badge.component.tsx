import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, JSX } from "react";
import { Button } from "./ui/button";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: JSX.Element;
}
export default function Badge({ className, label, icon, ...props }: Props) {
  return (
    <Button
      type="button"
      className={cn(
        "rounded-md cursor-pointer border border-slate-200 bg-transparent text-black p-2 h-9 flex whitespace-normal min-w-auto text-nowrap items-center gap-x-2 px-3 transition-colors duration-200 hover:bg-slate-100 hover:border-slate-300 hover:text-slate-900",
        className
      )}
      {...props}
    >
      <span>{icon}</span>
      <span className="text-sm">{label}</span>
    </Button>
  );
}
