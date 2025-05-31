"use client";
import { Menu } from "lucide-react";
import { useSidebarContext } from "./sidebar/sidebar-provider";
import ProfileAvatar from "./avatar.component";

export default function Navbar() {
  const { onOpenChange } = useSidebarContext();
  return (
    <div className="w-full h-[80px] bg-slate-200 p-3 flex items-center justify-between sm:px-6">
      {}
      <Menu
        onClick={() => onOpenChange((prev) => !prev)}
        size={32}
        className="cursor-pointer"
      />

      <div className="flex gap-x-3 items-center">
        <label htmlFor="full name">Hamza Ali</label>
        <ProfileAvatar
          src="https://github.com/shadcn.png"
          onClick={() => console.log("helo")}
          className="cursor-pointer w-11 h-11"
        />
      </div>
    </div>
  );
}
