"use client";
import PrimaryButton from "@/components/button/primary-button.component";
import AddTableDialog from "./dialogs/add-table.dialog";
import { BadgePlus } from "lucide-react";
import { useState } from "react";
import TableComp from "./table.component";
import {
  useAddTable,
  useDeleteTable,
  usePaginatedTables,
  useUpdateTable,
} from "@/queries/tables.query";
import NoResultMessage from "@/components/no-result-message.component";
import InfiniteScroll from "@/components/infinite-scroll.components";
import GridSkeleton from "@/components/grid-skeleton";
import { cn } from "@/lib/utils";
import DeleteDialog from "@/components/delete.dialog";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { TableKeyFactory } from "@/queries/key-factory";
import { TVoidCallback } from "@/shared/axios.shared.types";

export default function TablesView() {
  const queryClient = useQueryClient();
  // ====================States=========================
  const [open, setOpen] = useState<{
    purpose: "edit" | "delete" | "add";
    id: number;
  } | null>(null);

  // ================React Query Hooks====================
  const { fetchNextPage, hasNextPage, isLoading, tables } =
    usePaginatedTables();

  const { deleteTable, isLoading: deleteLoading } = useDeleteTable();
  const { addTable, isLoading: addTableLoading } = useAddTable();
  const { updateTable, isLoading: updateTableLoading } = useUpdateTable();

  // ===================Handles=================
  const invalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: [TableKeyFactory.getAll, 10, 1],
    });
  };
  const handleAdd = (name: string, cb?: TVoidCallback) => {
    addTable(name, {
      onSuccess: (res) => {
        toast.success(res?.message);
        invalidateQuery();
        setOpen(null);
        cb?.();
      },
    });
  };
  const handleEdit = (name: string, cb?: TVoidCallback) => {
    updateTable(
      { id: open?.id ?? 0, name },
      {
        onSuccess: (res) => {
          toast.success(res?.message);
          cb?.();
          invalidateQuery();
          setOpen(null);
        },
      }
    );
  };

  const handleDelete = (tableId: number) => {
    deleteTable(tableId, {
      onSuccess: (res) => {
        toast.success(res?.message);
        setOpen(null);
        invalidateQuery();
      },
    });
  };
  return (
    <div className="w-full flex flex-col gap-y-7">
      <div className=" w-full flex items-center justify-between">
        <h1 className="text-[32px] font-bold">Tables</h1>
        <PrimaryButton
          // type="button"
          onClick={() => setOpen({ purpose: "add", id: 0 })}
          className="w-max h-11"
        >
          <BadgePlus /> Add Table
        </PrimaryButton>
      </div>

      {isLoading ? (
        <div className=" w-full container m-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          <GridSkeleton n={6} className="min-w-[300px] h-[220px] rounded-lg" />
        </div>
      ) : tables.length === 0 ? (
        <NoResultMessage message="No Tables to show" />
      ) : (
        <InfiniteScroll
          hasMore={hasNextPage}
          next={fetchNextPage}
          loader={
            <div className=" w-full container m-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
              <GridSkeleton
                n={6}
                className="min-w-[300px] h-[220px] rounded-lg"
              />
            </div>
          }
          dataLength={tables.length}
        >
          <div
            className={cn(
              " w-full container m-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4",
              tables.length === 1 && "grid-cols-1 lg:grid-cols-1 md:grid-cols-1"
            )}
          >
            {tables.map((table) => (
              <div key={table.id}>
                <TableComp
                  label={table.name}
                  className="relative"
                  onEdit={() => setOpen({ id: table.id, purpose: "edit" })}
                  onDelete={() => setOpen({ id: table.id, purpose: "delete" })}
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      )}
      <AddTableDialog
        onOpenChange={() => {
          setOpen(null);
        }}
        open={open?.purpose === "add" || open?.purpose === "edit"}
        onSubmit={open?.purpose === "edit" ? handleEdit : handleAdd}
        isLoading={addTableLoading || updateTableLoading}
        values={tables.find((table) => table.id === open?.id)}
      />
      <DeleteDialog
        open={open?.purpose === "delete"}
        setOpen={() => setOpen(null)}
        handleDelete={() => handleDelete(open?.id ?? 0)}
        isLoading={deleteLoading}
      />
    </div>
  );
}
