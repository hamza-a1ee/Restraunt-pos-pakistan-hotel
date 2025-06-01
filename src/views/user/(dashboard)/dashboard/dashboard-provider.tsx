"use client";
import { pakistaniCuisines } from "@/constants";
import { DashboardViewEnum } from "@/shared/enums/dashboard-view.enum";
import { ICusine } from "@/shared/interface/user/cusines.interface";
import { IDashboardContext } from "@/shared/interface/user/dashboard.interface";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface Props {
  children: React.ReactNode;
}

const DashboardContext = createContext<IDashboardContext>({
  setView: () => {},
  view: DashboardViewEnum.TABLE,

  tables: 6,

  selectedTableId: 0,
  setSelectedTableId: () => {},

  selectedCategoryId: "",
  setSelectedCategoryId: () => {},

  handleSelectDish: () => {},

  selectedDishId: [],
  // setSelectedDishId: () => {},

  selectedCategoryDishes: [],

  getDishInfo: () => undefined,
  deleteSelectedDish: () => {},

  orderObj: new Map<string, number>(),

  setOrderObj: () => {},
  handleAddOrderQuantity: () => {},
  handleSubtractOrderQuantity: () => {},
  handleUpdateOrderQtyManually: () => {},
});

export const useDashboardContext = () => useContext(DashboardContext);

export default function DashboardProvider({ children }: Props) {
  // ================states====================
  const [view, setView] = useState<DashboardViewEnum>(DashboardViewEnum.TABLE);
  const [selectedTableId, setSelectedTableId] = useState<number>(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  // const [selectedDishId, setSelectedDishId] = useState<string[]>([]);
  const tables = 6;
  const [orderObj, setOrderObj] = useState<Map<string, number>>(
    new Map(new Map())
  );

  const selectedDishId = useMemo(() => [...orderObj.keys()], [orderObj]);

  // =======================handles=============
  const handleSelectDish = useCallback(
    (dishId: string) => {
      // setSelectedDishId(() => selectedDishId.filter((dish) => dish !== dishId));

      if (selectedDishId.includes(dishId)) {
        setOrderObj((prev) => {
          prev.delete(dishId);
          return prev;
        });
      } else {
        setOrderObj((prev) => {
          const updated = new Map(prev);
          updated.set(dishId, 1);
          return updated;
        });
      }
    },
    [selectedDishId]
  );

  const getDishInfo = (id: string): ICusine | undefined => {
    return pakistaniCuisines.find((dishId) => id === dishId.id);
  };

  const selectedCategoryDishes: ICusine[] = useMemo(
    () =>
      pakistaniCuisines.filter(
        (item) => selectedCategoryId === item.categoryId
      ),
    [selectedCategoryId]
  );

  const deleteSelectedDish = useCallback((id: string) => {
    // setSelectedDishId(selectedDishId.filter((dish) => dish !== id));
    setOrderObj((prev) => {
      const updated = new Map(prev);
      updated.delete(id);
      return updated;
    });
  }, []);

  const handleAddOrderQuantity = useCallback((id: string) => {
    setOrderObj((prev) => {
      const updated = new Map(prev);
      const currentQty = updated.get(id);
      if (currentQty === undefined) {
        updated.set(id, 1); // first time adding
      } else {
        updated.set(id, currentQty + 1); // increment existing
      }
      return updated;
    });
  }, []);

  const handleSubtractOrderQuantity = useCallback(
    (id: string) => {
      const quantity = orderObj.get(id) ?? 0;
      if (quantity <= 0) return; // don't go below zero

      setOrderObj((prev) => {
        const updated = new Map(prev);
        const currentQty = updated.get(id) ?? 0;
        if (currentQty <= 1) {
          updated.delete(id); // optionally remove if zero or less
        } else {
          updated.set(id, currentQty - 1);
        }
        return updated;
      });
    },
    [orderObj]
  );

  const handleUpdateOrderQtyManually = useCallback(
    (id: string, qty: number) => {
      setOrderObj((prev) => {
        const updated = new Map(prev);
        if (qty <= 0) {
          updated.delete(id);
        } else {
          updated.set(id, qty);
        }
        return updated;
      });
    },
    []
  );
  // ==============values==================
  const values: IDashboardContext = {
    tables,

    selectedTableId,
    setSelectedTableId,

    view,
    setView,

    selectedCategoryId,
    setSelectedCategoryId,

    selectedDishId,
    // setSelectedDishId,

    handleSelectDish,

    getDishInfo,

    selectedCategoryDishes,
    deleteSelectedDish,

    orderObj,
    setOrderObj,
    handleAddOrderQuantity,
    handleSubtractOrderQuantity,
    handleUpdateOrderQtyManually,
  };
  return (
    <DashboardContext.Provider value={values}>
      {children}
    </DashboardContext.Provider>
  );
}
