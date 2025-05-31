"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { cn } from "@/lib/utils";
import TableFoot from "./table-pagination";
import { IMetaData } from "@/shared/interface/meta.interface";

interface Props<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  results?: number;
  resultsText?: string;
  action?: React.ReactNode;
  total?: number;
  limit?: number;
  metaData?: IMetaData;
  setTotal?: (nextPage: number) => void;
  setCurrentPage?: (limit: number) => void;
  enableFoot?: boolean;
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  className,

  action,
  setTotal,
  metaData,
  setCurrentPage,

  enableFoot = true,
  ...props
}: Props<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  return (
    <div className={cn("rounded-md", className)} {...props}>
      <div className="flex text-[12.25px] justify-between items-center">
        {action}
      </div>
      <Table className="rounded-lg border border-slate-200">
        <TableHeader className="h-[46px]  bg-primary hover:bg-primary  w-full border-t border-b border-gray-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className="hover:bg-primary" key={headerGroup.id}>
              {headerGroup.headers.map((header, idx) => {
                return (
                  <TableHead
                    className={cn(
                      idx === 0 && "rounded-tl-lg",
                      idx === headerGroup.headers.length - 1 && "rounded-tr-lg"
                    )}
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="bg-white">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className={`text-sm h-[32px]`}
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    className="text-start whitespace-nowrap"
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {enableFoot && (
        <TableFoot
          rowsOption={[5, 10, 15, 20, 25]}
          setRowsPerPage={setTotal}
          rowsPerPage={metaData?.limit}
          currentPage={metaData?.currentPage}
          setCurrentPage={setCurrentPage}
          total={metaData?.total}
        />
      )}
    </div>
  );
}
