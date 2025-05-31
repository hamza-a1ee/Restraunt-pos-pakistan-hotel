"use client";
import { DashboardViewEnum } from "@/shared/enums/dashboard-view.enum";
import { IDashboardContext } from "@/shared/interface/user/dashboard.interface";
import { createContext, useContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

const DashboardContext = createContext<IDashboardContext>({
  setView: () => {},
  view: DashboardViewEnum.TABLE,

  tables: 6,

  selectedTableId: 0,
  setSelectedTableId: () => {},
});

export const useDashboardContext = () => useContext(DashboardContext);

export default function DashboardProvider({ children }: Props) {
  const [view, setView] = useState<DashboardViewEnum>(DashboardViewEnum.TABLE);
  const [selectedTableId, setSelectedTableId] = useState<number>(0);
  const tables = 6;

  const values: IDashboardContext = {
    selectedTableId,
    setSelectedTableId,
    setView,
    tables,
    view,
  };
  return (
    <DashboardContext.Provider value={values}>
      {children}
    </DashboardContext.Provider>
  );
}
