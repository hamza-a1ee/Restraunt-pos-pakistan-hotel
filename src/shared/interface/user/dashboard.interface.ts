import { Dispatch, SetStateAction } from "react";
import { DashboardViewEnum } from "../../enums/dashboard-view.enum";
import {
  TOneParamCallback,
  TTwoParamCallback,
  TVoidCallback,
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

  handleAddOrderQuantity: TOneParamCallback<string>;
  handleSubtractOrderQuantity: TOneParamCallback<string>;

  handleUpdateOrderQtyManually: TTwoParamCallback<string, number>;
  deleteAllSelectedDish: TVoidCallback;
  totalPrice: number;

  getSingleOrderQty: (dishId: string) => number;

  getSingleTableTotalBill:(tableId:number)=>number
}
