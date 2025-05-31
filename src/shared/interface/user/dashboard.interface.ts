import { Dispatch, SetStateAction } from "react";
import { DashboardViewEnum } from "../../enums/dashboard-view.enum";

export interface IDashboardContext {
  view: DashboardViewEnum;
  setView: Dispatch<SetStateAction<DashboardViewEnum>>;
  tables: number;
  selectedTableId: number;
  setSelectedTableId: Dispatch<SetStateAction<number>>;
}
