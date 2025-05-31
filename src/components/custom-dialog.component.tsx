import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { TOneParamCallback } from "@/shared/types/callbacks.types";

interface Props {
  children: React.ReactNode;
  contentClassName?: string;
  open: boolean;
  onOpenChange: TOneParamCallback<boolean>;
}
export default function CustomDialog({
  children,
  contentClassName,
  onOpenChange,
  open,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          " bg-white sm:w-xl w-full h-full sm:h-auto",
          contentClassName
        )}
      >
        <DialogHeader className="hidden">
          <DialogTitle className="hidden">xasdf</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
