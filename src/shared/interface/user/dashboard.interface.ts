import { Dispatch, SetStateAction } from "react";
import { DashboardViewEnum } from "../../enums/dashboard-view.enum";
import {
  TOneParamCallback,
  TTwoParamCallback,
} from "@/shared/types/callbacks.types";
import { ICusine } from "./cusines.interface";

export interface IDashboardContext {
  view: DashboardViewEnum;
  setView: Dispatch<SetStateAction<DashboardViewEnum>>;
  tables: number;
  selectedTableId: number;
  setSelectedTableId: Dispatch<SetStateAction<number>>;

  selectedCategoryId: string;
  setSelectedCategoryId: Dispatch<SetStateAction<string>>;

  selectedDishId: string[];
  // setSelectedDishId: Dispatch<SetStateAction<string[]>>;

  handleSelectDish: TOneParamCallback<string>;

  getDishInfo: (id: string) => ICusine | undefined;

  selectedCategoryDishes: ICusine[];

  deleteSelectedDish: TOneParamCallback<string>;

  orderObj: Map<string, number>;
  setOrderObj: Dispatch<SetStateAction<Map<string, number>>>;
  handleAddOrderQuantity: TOneParamCallback<string>;
  handleSubtractOrderQuantity: TOneParamCallback<string>;

  handleUpdateOrderQtyManually: TTwoParamCallback<string, number>;
}
