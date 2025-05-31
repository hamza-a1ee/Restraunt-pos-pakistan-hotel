"use client";

import { cn } from "@/lib/utils";
import SidebarCotent from "./sidebar-content";
import SidebarHeader from "./sidebar-header";
import SidebarFooter from "./footer-sidebar";
import { useSidebarContext } from "./sidebar-provider";

export default function Sidebar() {
  const { open } = useSidebarContext();
  return (
    <div
      className={cn(
        "w-[280px] flex flex-col justify-between fixed left-0 top-0 h-screen bg-primary p-3 transition-transform duration-300 ease-in-out z-50",
        open ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex flex-col gap-y-4">
        <SidebarHeader />
        <SidebarCotent />
      </div>

      <SidebarFooter />
    </div>
  );
}
