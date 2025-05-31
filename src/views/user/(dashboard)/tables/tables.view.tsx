"use client";

import PrimaryButton from "@/components/button/primary-button.component";
import AddTableDialog from "./dialogs/add-table.dialog";
import { BadgePlus } from "lucide-react";
import { useState } from "react";
import TableComp from "./table.component";

export default function TablesView() {
  const [open, setOpen] = useState<boolean>(false);
  const handleEdit = () => {
    console.log("helo");
  };
  return (
    <div className="w-full flex flex-col gap-y-7">
      <div className=" w-full flex items-center justify-between">
        <h1 className="text-[32px] font-bold">Tables</h1>
        <PrimaryButton
          type="button"
          onClick={() => setOpen(true)}
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
              onEdit={handleEdit}
            />
          </div>
        ))}
      </div>
      <AddTableDialog onOpenChange={setOpen} open={open} />
    </div>
  );
}
