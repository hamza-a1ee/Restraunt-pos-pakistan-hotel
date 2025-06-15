import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

interface Props {
  n: number;
  className?: string;
}
export default function GridSkeleton({ n, className }: Props) {
  return (
    <>
      {Array.from({ length: n }).map((_, i) => (
        <Skeleton key={i} className={cn("w-full", className)} />
      ))}
    </>
  );
}
