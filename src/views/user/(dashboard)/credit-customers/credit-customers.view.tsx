"use client";

import PrimaryButton from "@/components/button/primary-button.component";
import { BadgePlus } from "lucide-react";
import AddCustomerDialog from "./dialogs/add-customer.dialog";
import { useState } from "react";

export default function CredtiCustomersView() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <div className="w-full flex items-center justify-between">
        <h1 className="text-[32px] font-bold">Customers</h1>
        <PrimaryButton
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-x-2 w-max"
        >
          <BadgePlus size={18} />
          Add Customer
        </PrimaryButton>
      </div>

      <AddCustomerDialog onOpenChange={setOpen} open={open} />
    </>
  );
}
