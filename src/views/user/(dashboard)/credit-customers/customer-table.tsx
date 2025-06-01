import CellValue from "@/components/table/cell-value";
import DataTable from "@/components/table/data-table";
import TableHead from "@/components/table/table-head";
import {
  IAllCustomers,
  ICustomer,
} from "@/shared/interface/user/customer.interface";
import { TOneParamCallback } from "@/shared/types/callbacks.types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowRight } from "lucide-react";
interface Props {
  customers: IAllCustomers | undefined;
  page: number;
  limit: number;
  setPage: TOneParamCallback<number>;
  setLimit: TOneParamCallback<number>;
  onDetails: TOneParamCallback<string>;
}
export default function CustomerTable({
  customers,
  limit,
  page,
  setLimit,
  setPage,
  onDetails,
}: Props) {
  const columns: ColumnDef<ICustomer>[] = [
    {
      header: () => <TableHead>Name</TableHead>,
      accessorKey: "name",
      cell: ({ row }) => (
        <CellValue>
          <span> {row.original.firstName + " " + row.original.lastName}</span>
        </CellValue>
      ),
    },
    {
      header: () => <TableHead>Email</TableHead>,
      accessorKey: "email",
      cell: ({ row }) => (
        <CellValue className="w-full">{row.original.email}</CellValue>
      ),
    },
    {
      header: () => <TableHead>Gender</TableHead>,
      accessorKey: "gender",
      cell: ({ row }) => <CellValue>{row.original.gender}</CellValue>,
    },

    {
      header: () => <TableHead>Contact</TableHead>,
      accessorKey: "contact",
      cell: ({ row }) => <CellValue>{row.original.contact}</CellValue>,
    },
    {
      header: () => <TableHead />,
      accessorKey: "details",
      cell: ({ row }) => (
        <ArrowRight
          className="hover:bg-slate-200 rounded-full p-1 cursor-pointer w-8 h-8"
          onClick={() => onDetails(row.original.id)}
        />
      ),
    },
  ];
  return (
    <div className="flex w-full">
      <DataTable
        columns={columns}
        data={customers?.customers as ICustomer[]}
        metaData={customers?.meta}
        limit={limit}
        total={page}
        setTotal={setLimit}
        setCurrentPage={setPage}
        className="w-full"
      />
    </div>
  );
}
