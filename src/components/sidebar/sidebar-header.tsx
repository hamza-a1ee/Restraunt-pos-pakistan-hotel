import { X } from "lucide-react";
import { useSidebarContext } from "./sidebar-provider";

export default function SidebarHeader() {
  const { onOpenChange } = useSidebarContext();
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full flex justify-end items-center">
        <X
          className="text-white cursor-pointer"
          size={28}
          onClick={() => onOpenChange(false)}
        />
      </div>
      <div className="h-36 flex items-center justify-center">
        <h1 className="text-[32px]">Taste of Pakistan</h1>
      </div>
    </div>
  );
}
