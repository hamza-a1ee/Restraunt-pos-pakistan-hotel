"use client";
import { ISidebarContext } from "@/shared/interface/sidebar.interface";
import { createContext, useContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}
const SidebarContext = createContext<ISidebarContext>({
  onOpenChange: () => {},
  open: false,
});

export const useSidebarContext = () => useContext(SidebarContext);

export default function SidebarProvider({ children }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <SidebarContext.Provider value={{ onOpenChange: setOpen, open }}>
      {children}
    </SidebarContext.Provider>
  );
}
