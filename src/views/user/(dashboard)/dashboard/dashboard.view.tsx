"use client";
import Badge from "@/components/badge.component";
import {
  ArrowLeft,
  Minus,
  Plus,
  Printer,
  ReceiptText,
  Trash2,
  X,
} from "lucide-react";
import { useDashboardContext } from "./dashboard-provider";
import { DashboardViewEnum } from "@/shared/enums/dashboard-view.enum";
import TableComp from "../tables/table.component";
import { cn } from "@/lib/utils";
import { cuisinesCategories } from "@/constants";
import MenuItem from "./menu-item";
import NoResultMessage from "@/components/no-result-message.component";
import { ICusineCategory } from "@/shared/interface/user/cusines.interface";
import { Input } from "@/components/ui/input";

export default function DashboardView() {
  const { tables, selectedTableId, setSelectedTableId, view, setView } =
    useDashboardContext();

  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex flex-col gap-y-6">
        <h1 className="text-[32px] font-bold">Dashboard</h1>
        <h1 className="text-[28px] font-medium">Dine In</h1>
      </div>
      <div className="rounded-lg flex flex-col lg:gap-y-0 gap-y-2">
        <div className="w-full flex flex-nowrap overflow-x-auto lg:flex-wrap lg:overflow-x-visible justify-start lg:justify-end h-[70px] rounded-t-lg items-center gap-3 px-2">
          <Badge
            label="Delete"
            icon={<Trash2 className="text-red-400" size={18} />}
          />
          <Badge
            label="Print Bill"
            icon={<Printer className="text-blue-400" size={18} />}
          />
          <Badge
            label="Generate Token"
            icon={<ReceiptText size={18} className="text-blue-400" />}
          />
        </div>

        {/* tables */}
        {/* <div className="w-full rounded-lg overflow-y-auto flex flex-wrap sm:justify-between justify-center gap-4 p-2  h-[500px] bg-slate-200 px-5 py-4 shadow-sm"> */}

        <div
          className={cn(
            " w-full  m-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 rounded-lg h-[700px] bg-slate-200 px-5 py-4 shadow-sm",
            selectedTableId !== 0 &&
              view !== DashboardViewEnum.TABLE &&
              "lg:grid-cols-1 md:grid-cols-1 grid-cols-1 w-full"
          )}
        >
          {selectedTableId === 0 && view === DashboardViewEnum.TABLE ? (
            new Array(tables).fill(null).map((_, index) => (
              <TableComp
                key={index}
                label={String(index + 1)}
                onClick={() => {
                  setSelectedTableId(index + 1);
                  setView(DashboardViewEnum.TABLE_MENU);
                }}
              />
            ))
          ) : (
            <div className="w-full flex flex-col gap-y-3">
              {" "}
              <div className=" w-full flex items-center gap-x-3">
                <ArrowLeft
                  onClick={() => {
                    setView(DashboardViewEnum.TABLE);
                    setSelectedTableId(0);
                  }}
                  className="hover:rounded-full hover:bg-placeholder p-1 w-8 h-8 duration-300 cursor-pointer"
                />
                <p>Table {selectedTableId}</p>
              </div>
              <div className="w-full h-full p-2 flex lg:flex-row flex-col gap-2 ">
                <div className=" w-full flex flex-col gap-y-3">
                  <h1 className="text-2xl font-bold">Dishes</h1>
                  <div className=" h-full border border-black overflow-y-auto max-h-[510px] rounded-lg">
                    <div className="w-full   flex flex-wrap p-4 gap-3 ">
                      <DishItems />
                    </div>
                  </div>
                </div>
                <div className="lg:w-[30%] flex flex-col gap-y-3">
                  <h1 className="text-2xl font-bold">Category</h1>
                  <div className="w-full h-full flex flex-col gap-y-2 p-4  border border-black rounded-lg overflow-y-auto max-h-[510px]">
                    <CategoryItems categories={cuisinesCategories} />
                  </div>
                </div>

                <div className="lg:w-[30%] flex flex-col gap-y-3">
                  <h1 className="text-2xl font-bold">Order</h1>
                  <div className="border border-black rounded-lg overflow-y-auto  flex flex-col gap-2 py-4 px-1 h-[510px]">
                    {/* {selectedDishId.length > 0 ? (
                      selectedDishId.map((id) => (
                        <MenuItem
                          key={id}
                          id={id}
                          name={getDishInfo(id)?.name ?? ""}
                          price={getDishInfo(id)?.price}
                          className=" bg-amber-500 text-white"
                        />
                      ))
                    ) : (
                      <NoResultMessage
                        message="No Orders to show"
                        className="w-full h-full flex items-center justify-center p-0"
                      />
                    )} */}

                    <OrderItems />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const DishItems = () => {
  const { handleSelectDish, selectedDishId, selectedCategoryDishes } =
    useDashboardContext();
  return selectedCategoryDishes.length > 0 ? (
    selectedCategoryDishes.map((item) => {
      const isSelected = selectedDishId.includes(item.id);
      return (
        <MenuItem
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.price}
          onClick={() => handleSelectDish(item.id)}
          checked={isSelected}
          className={cn(
            "w-max cursor-pointer hover:opacity-85 p-2 h-max",
            isSelected ? "bg-primary text-white" : "bg-white text-primary"
          )}
        />
      );
    })
  ) : (
    <NoResultMessage message="No Dishes to show" className="lg:p-54 md:p-24" />
  );
};

const CategoryItems = ({ categories }: { categories: ICusineCategory[] }) => {
  const { selectedCategoryId, setSelectedCategoryId } = useDashboardContext();
  return categories.map((item) => {
    const isSelected = selectedCategoryId === item.id;
    return (
      <MenuItem
        key={item.id}
        id={item.id}
        name={item.name}
        onClick={() => setSelectedCategoryId(item.id)}
        checked={isSelected}
        className={cn(
          "w-full duration-200 ease-in-out transition-all cursor-pointer hover:opacity-85 p-2 h-max",
          isSelected ? "bg-btn-hover text-white" : "bg-white text-btn-hover"
        )}
      />
    );
  });
};

const OrderItems = () => {
  const {
    getDishInfo,
    selectedDishId,
    deleteSelectedDish,
    orderObj,
    handleAddOrderQuantity,
    handleSubtractOrderQuantity,
    handleUpdateOrderQtyManually,
  } = useDashboardContext();

  return selectedDishId.length > 0 ? (
    selectedDishId.map((id) => (
      <div
        key={id}
        id={id}
        className=" bg-amber-500 text-white flex items-center justify-between min-h-11 px-2 rounded-lg  cursor-pointer"
      >
        <span className="font-bold flex items-center gap-x-2">
          <X onClick={() => deleteSelectedDish(id)} />
          {getDishInfo(id)?.name}
        </span>
        <div className="flex gap-x-1 items-center">
          <Plus
            onClick={() => handleAddOrderQuantity(id)}
            className="text-white bg-green-400 p-1 rounded-full"
          />
          <Input
            onChange={(e) => {
              handleUpdateOrderQtyManually(id, Number(e.target.value));
            }}
            value={orderObj.get(id) ?? 1}
            className="w-16   h-6 text-center bg-white text-black"
          />
          <Minus
            onClick={() => handleSubtractOrderQuantity(id)}
            className="bg-red-400 text-white rounded-full p-1 cursor-pointer"
          />
        </div>
      </div>
    ))
  ) : (
    <NoResultMessage
      message="No Orders to show"
      className="w-full h-full flex items-center justify-center p-0"
    />
  );
};
