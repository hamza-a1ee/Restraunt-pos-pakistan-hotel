import CellValue from "@/components/table/cell-value";
import DataTable from "@/components/table/data-table";
import TableHead from "@/components/table/table-head";
import {
  IAllCuisineCategoryTable,
  ICuisineCategoryTable,
} from "@/shared/interface/user/cusines.interface";

import { TOneParamCallback } from "@/shared/types/callbacks.types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowRight } from "lucide-react";
interface Props {
  categories: IAllCuisineCategoryTable | undefined;
  page: number;
  limit: number;
  setPage: TOneParamCallback<number>;
  setLimit: TOneParamCallback<number>;
  onDetails: TOneParamCallback<string>;
}
export default function CategoryTable({
  categories,
  limit,
  page,
  setLimit,
  setPage,
  onDetails,
}: Props) {
  const columns: ColumnDef<ICuisineCategoryTable>[] = [
    {
      header: () => <TableHead>Name</TableHead>,
      accessorKey: "name",
      cell: ({ row }) => (
        <CellValue>
          <span> {row.original.name}</span>
        </CellValue>
      ),
    },
    {
      header: () => <TableHead>Dish</TableHead>,
      accessorKey: "totalDishes",
      cell: ({ row }) => <CellValue>{row.original.totalDishes}</CellValue>,
    },

    {
      header: () => <TableHead />,
      accessorKey: "details",
      cell: ({ row }) => (
        <div className=" flex justify-center">
          <ArrowRight
            className="hover:bg-slate-200 rounded-full p-1 cursor-pointer w-8 h-8"
            onClick={() => onDetails(row.original.id)}
          />
        </div>
      ),
    },
  ];
  return (
    <div className="flex w-full">
      <DataTable
        columns={columns}
        data={categories?.categories as ICuisineCategoryTable[]}
        metaData={categories?.meta}
        limit={limit}
        total={page}
        setTotal={setLimit}
        setCurrentPage={setPage}
        className="w-full"
      />
    </div>
  );
}
