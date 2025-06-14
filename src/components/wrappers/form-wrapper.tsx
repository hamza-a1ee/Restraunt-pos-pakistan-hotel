import { cn } from "@/lib/utils";
import { TVoidCallback } from "@/shared/types/callbacks.types";

interface Props {
  children: React.ReactNode;
  className?: string;
  onSubmit: TVoidCallback;
}
export default function FormWrapper({ children, className, onSubmit }: Props) {
  return (
    <form
      className={cn("w-full flex flex-col gap-y-4", className)}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}
