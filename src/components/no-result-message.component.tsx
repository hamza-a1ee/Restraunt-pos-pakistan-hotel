import { cn } from "@/lib/utils";

interface Props {
  message: string;
  className?: string;
}
export default function NoResultMessage({ message, className }: Props) {
  return (
    <div
      className={cn(
        "w-full p-20 flex items-center justify-center text-sm text-slate-400",
        className
      )}
    >
      {message}
    </div>
  );
}
