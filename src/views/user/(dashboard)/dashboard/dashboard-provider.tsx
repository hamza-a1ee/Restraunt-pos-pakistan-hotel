"use client";
import { pakistaniCuisines } from "@/constants";
import { DashboardViewEnum } from "@/shared/enums/dashboard-view.enum";
import { ICusine } from "@/shared/interface/user/cusines.interface";
import { IDashboardContext } from "@/shared/interface/user/dashboard.interface";
import { TTableOrder } from "@/shared/types/dashboard.types";
import {
  loadNestedMapFromStorage,
  saveNestedMapToStorage,
} from "@/utils/local-storage.util";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
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

  getSingleOrderQty: () => 1,
  handleAddOrderQuantity: () => {},
  handleSubtractOrderQuantity: () => {},
  handleUpdateOrderQtyManually: () => {},
  deleteAllSelectedDish: () => {},
  totalPrice: 0,

  getSingleTableTotalBill: () => 0,
});

export const useDashboardContext = () => useContext(DashboardContext);

export default function DashboardProvider({ children }: Props) {
  const tables = 6;
  // ================states====================
  const [view, setView] = useState<DashboardViewEnum>(DashboardViewEnum.TABLE);
  const [selectedTableId, setSelectedTableId] = useState<number>(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [tableOrder, setTableOrder] = useState<TTableOrder>(new Map());

  const isInitializedRef = useRef(true);

  // =============================memo=====================

  const selectedDishId = useMemo(() => {
    return [...(tableOrder.get(selectedTableId)?.keys() ?? [])];
  }, [tableOrder, selectedTableId]);

  const calculateTotalBill = useCallback(
    (order: Map<string, number> | undefined) => {
      if (order)
        return Array.from(order.entries()).reduce((total, [id, qty]) => {
          const dish = getDishInfo(id);
          const price = dish?.price ?? 0;
          return total + price * qty;
        }, 0);

      return 0;
    },
    []
  );

  const totalPrice: number = useMemo(() => {
    if (selectedTableId === 0) return 0;
    const currentOrder = tableOrder.get(selectedTableId);

    return calculateTotalBill(currentOrder);
  }, [selectedTableId, tableOrder, calculateTotalBill]);

  console.log({ tableOrder });

  // ========================effects============
  useEffect(() => {
    if (isInitializedRef.current) {
      isInitializedRef.current = false;
      return;
    }

    if (tableOrder) {
      saveNestedMapToStorage(tableOrder);
    }
  }, [tableOrder]);

  useEffect(() => {
    const loadedData = loadNestedMapFromStorage();
    setTableOrder(loadedData);
  }, []);

  // =======================handles=============

  const getSingleTableTotalBill = (tableId: number): number => {
    if (tableId === 0) return 0;
    const currentOrder = tableOrder.get(tableId);
    return calculateTotalBill(currentOrder);
  };

  const getSingleOrderQty = (dishId: string): number => {
    return tableOrder.get(selectedTableId)?.get(dishId) ?? 1;
  };

  const handleSelectDish = useCallback(
    (dishId: string) => {
      setTableOrder((prev) => {
        const updated = new Map(prev);
        const currentOrder = new Map(updated.get(selectedTableId) ?? new Map());

        if (currentOrder.has(dishId)) {
          currentOrder.delete(dishId); // remove if exists
        } else {
          currentOrder.set(dishId, 1); // add if not exists
        }

        updated.set(selectedTableId, currentOrder); // update table
        return updated;
      });
    },
    [selectedTableId]
  );
  const getDishInfo = (id: string): ICusine | undefined => {
    return pakistaniCuisines.find((dish) => id === dish.id);
  };

  const selectedCategoryDishes: ICusine[] = useMemo(
    () =>
      pakistaniCuisines.filter(
        (item) => selectedCategoryId === item.categoryId
      ),
    [selectedCategoryId]
  );

  const deleteSelectedDish = useCallback(
    (dishId: string) => {
      setTableOrder((prev) => {
        const updated = new Map(prev);
        updated.get(selectedTableId)?.delete(dishId);
        return updated;
      });
    },
    [selectedTableId]
  );

  const deleteAllSelectedDish = useCallback(() => {
    setTableOrder((prev) => {
      const updated = new Map(prev);
      updated.delete(selectedTableId);
      return updated;
    });
    setSelectedCategoryId("");
  }, [selectedTableId]);

  const handleAddOrderQuantity = useCallback(
    (dishId: string) => {
      setTableOrder((prev) => {
        const updated = new Map(prev);
        const currentOrder = new Map(updated.get(selectedTableId) ?? new Map());

        const currentQty = currentOrder.get(dishId) ?? 0;
        currentOrder.set(dishId, currentQty + 1);

        updated.set(selectedTableId, currentOrder);
        return updated;
      });
    },
    [selectedTableId]
  );

  const handleSubtractOrderQuantity = useCallback(
    (dishId: string) => {
      setTableOrder((prev) => {
        const updated = new Map(prev);
        const currentOrder = new Map(updated.get(selectedTableId) ?? new Map());

        const currentQty = currentOrder.get(dishId) ?? 0;

        if (currentQty <= 1) {
          currentOrder.delete(dishId);
        } else {
          currentOrder.set(dishId, currentQty - 1);
        }

        updated.set(selectedTableId, currentOrder);
        return updated;
      });
    },
    [selectedTableId]
  );

  const handleUpdateOrderQtyManually = useCallback(
    (dishId: string, qty: number) => {
      setTableOrder((prev) => {
        const updated = new Map(prev);
        const currentOrder = updated.get(selectedTableId);
        if (currentOrder) {
          if (qty < 0) currentOrder.delete(dishId);
          currentOrder.set(dishId, qty);
          updated.set(selectedTableId, currentOrder);
        }

        return updated;
      });
    },
    [selectedTableId]
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

    handleAddOrderQuantity,
    handleSubtractOrderQuantity,
    handleUpdateOrderQtyManually,
    deleteAllSelectedDish,
    totalPrice,

    getSingleOrderQty,

    getSingleTableTotalBill,
  };
  return (
    <DashboardContext.Provider value={values}>
      {children}
    </DashboardContext.Provider>
  );
}
