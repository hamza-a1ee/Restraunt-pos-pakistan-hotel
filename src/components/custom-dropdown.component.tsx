import {
  DropdownMenu,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import { TOneParamCallback } from "@/shared/types/callbacks.types";

interface Props {
  open: boolean;
  onOpenChange: TOneParamCallback<boolean>;
  contentClassName?: string;
  children: React.ReactNode;
}

export default function CustomDropdown({
  onOpenChange,
  open,
  contentClassName,
  children,
}: Props) {
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuContent className={cn("bg-white", contentClassName)}>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
