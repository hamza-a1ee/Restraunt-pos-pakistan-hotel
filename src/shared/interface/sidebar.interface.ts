import { Dispatch, JSX, SetStateAction } from "react";
import { TVoidCallback } from "../types/callbacks.types";

export interface ISidebarItem {
  label: string;
  link: string;
  icon: string | JSX.Element;
  action?: TVoidCallback;
}
export interface ISidebarContext {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}
