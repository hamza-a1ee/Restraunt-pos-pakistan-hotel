"use client";
import { Menu } from "lucide-react";
import { useSidebarContext } from "./sidebar/sidebar-provider";
import { useMe } from "@/queries/user.query";
import { Skeleton } from "./ui/skeleton";

export default function Navbar() {
  const { onOpenChange } = useSidebarContext();
  const { isLoading, me } = useMe();

  return (
    <div className="w-full h-[80px] bg-slate-200 p-3 flex items-center justify-between sm:px-6">
      {}
      <Menu
        onClick={() => onOpenChange((prev) => !prev)}
        size={32}
        className="cursor-pointer"
      />

      <div className="flex gap-x-3 items-center">
        {isLoading ? (
          <>
            <Skeleton className="w-36 h-3 rounded-md" />
            <Skeleton className="rounded-full w-11 h-11" />
          </>
        ) : (
          <>
            <label htmlFor="full name" className="capitalize">
              {me?.user.firstName + " " + me?.user?.lastName}
            </label>
            <div className="w-11 h-11 bg-btn-primary rounded-full uppercase flex items-center justify-center font-bold">
              {me?.user?.firstName[0] + "" + me?.user?.lastName[0]}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
