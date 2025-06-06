"use client";

import PrimaryButton from "@/components/button/primary-button.component";
import AddTableDialog from "./dialogs/add-table.dialog";
import { BadgePlus } from "lucide-react";
import { useState } from "react";
import TableComp from "./table.component";
import { NEW_ID } from "@/constants";

export default function TablesView() {
  const [open, setOpen] = useState<string>('');
  const handleEdit = (tableId:string) => {
    setOpen(tableId)
  };
   const handleDelete = (tableId:string) => {
    setOpen(tableId)
  };
  return (
    <div className="w-full flex flex-col gap-y-7">
      <div className=" w-full flex items-center justify-between">
        <h1 className="text-[32px] font-bold">Tables</h1>
        <PrimaryButton
          type="button"
          onClick={() => setOpen(NEW_ID)}
          className="w-max h-11"
        >
          <BadgePlus /> Add Table
        </PrimaryButton>
      </div>

      {/* <NoResultMessage message="No Tables to show" /> */}
      <div className=" w-full container m-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {new Array(7).fill(null).map((_, index) => (
          <div key={index}>
            <TableComp
              label={String(index + 1)}
              className="relative"
              onEdit={()=>handleEdit(String(index+1))}
              onDelete={()=>handleDelete(String(index+1))}
            />
          </div>
        ))}
      </div>
      <AddTableDialog onOpenChange={()=>{setOpen('')}} open={!!open} />
    </div>
  );
}
