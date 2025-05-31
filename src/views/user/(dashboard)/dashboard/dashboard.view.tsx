"use client";
import Badge from "@/components/badge.component";
import { ArrowLeft, Printer, ReceiptText, Trash2 } from "lucide-react";
import { useDashboardContext } from "./dashboard-provider";
import { DashboardViewEnum } from "@/shared/enums/dashboard-view.enum";
import TableComp from "../tables/table.component";
import { cn } from "@/lib/utils";

export default function DashboardView() {
  const { tables, selectedTableId, setSelectedTableId, view, setView } =
    useDashboardContext();
  return (
    <div className="flex flex-col gap-y-1 overflow-auto">
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
            " w-full  m-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 rounded-lg overflow-y-auto h-[500px] bg-slate-200 px-5 py-4 shadow-sm",
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
                  className="hover:rounded-full hover:bg-placeholder p-1 w-8 h-8 duration-300"
                />
                <p>Table {selectedTableId}</p>
              </div>
              <div className="w-full h-full p-2 flex lg:flex-row flex-col gap-2 ">
                <div className="w-full border border-black overflow-y-auto"></div>
                <div className="lg:w-[30%] border border-black overflow-y-auto"></div>
                <div className="lg:w-[30%] border border-black overflow-y-auto"></div>
              </div>
            </div>
          )}

          {}
        </div>
      </div>
    </div>
  );
}
