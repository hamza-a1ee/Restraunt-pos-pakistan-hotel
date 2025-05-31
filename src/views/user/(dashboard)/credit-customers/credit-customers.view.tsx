"use client";

import PrimaryButton from "@/components/button/primary-button.component";
import { BadgePlus, SearchIcon } from "lucide-react";
import AddCustomerDialog from "./dialogs/add-customer.dialog";
import { useState } from "react";
import CustomerTable from "./customer-table";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";

export default function CredtiCustomersView() {
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string>("");

  const handleSearch = (val: string) => {
    setSearch(val);
    console.log({ selectedUser });
  };

  useEffect(() => {
    setPage(1);
  }, [search, limit]);

  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-col gap-y-6">
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
      <div className="flex flex-col gap-y-4 shadow-md rounded-lg border border-slate-10 p-4">
        <div className="relative max-w-lg">
          <SearchIcon className="absolute top-2 left-2" />
          <Input
            onClick={(e) => handleSearch(e.currentTarget.value)}
            placeholder="Search"
            className="text-base px-10"
          />
        </div>
        <CustomerTable
          limit={limit}
          page={page}
          setLimit={setLimit}
          setPage={setPage}
          onDetails={(id: string) => setSelectedUser(id)}
          customers={{
            customers: [
              {
                address: "cannt",
                contact: "234234234",
                email: "gamil.com",
                firstName: "hamza",
                gender: "male",
                id: "123123",
                lastName: "ali",
              },
              {
                address: "cannt",
                contact: "234234234",
                email: "gamil.com",
                firstName: "hamza",
                gender: "male",
                id: "123123",
                lastName: "ali",
              },
              {
                address: "cannt",
                contact: "234234234",
                email: "gamil.com",
                firstName: "hamza",
                gender: "male",
                id: "123123",
                lastName: "ali",
              },
            ],
            meta: {
              currentPage: 1,
              limit: 10,
              total: 10,
              totalPage: 4,
            },
          }}
        />
      </div>

      <AddCustomerDialog onOpenChange={setOpen} open={open} />
    </div>
  );
}
