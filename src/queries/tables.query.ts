import {
  addTable,
  deleteTable,
  editTable,
  getAllTables,
} from "@/services/tables.service";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { TableKeyFactory } from "./key-factory";
import { IGetAllTables } from "@/shared/interface/user/tables.interface";
import { useMemo } from "react";
import { throwError } from "@/utils/react-query.util";

export function usePaginatedTables(limit = 10, page = 1) {
  const { data, isLoading, hasNextPage, fetchNextPage } =
    useInfiniteQuery<IGetAllTables>({
      initialPageParam: page,
      queryFn: ({ pageParam }) => getAllTables(limit, pageParam as number),
      enabled: !!limit || !!page,
      queryKey: [TableKeyFactory.getAll, limit, page],
      getNextPageParam: (lastPage) => {
        const { meta } = lastPage;
        return meta.page < meta.totalPages ? meta.page + 1 : undefined;
      },
    });

  const paginatedWeeklyHappenings = useMemo(
    () => data?.pages.flatMap((page) => page.tables) ?? [],
    [data]
  );
  return {
    tables: paginatedWeeklyHappenings,
    isLoading,
    hasNextPage,
    fetchNextPage,
  };
}

export function useDeleteTable() {
  const { mutate, isPending } = useMutation({
    mutationFn: (id: number) => deleteTable(id),
    mutationKey: [TableKeyFactory.delete],
    onError: throwError("Delete Table"),
  });
  return {
    deleteTable: mutate,
    isLoading: isPending,
  };
}

export function useUpdateTable() {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) =>
      editTable(id, name),
    mutationKey: [TableKeyFactory.update],
    onError: throwError("Update Table"),
  });

  return {
    updateTable: mutate,
    isLoading: isPending,
  };
}
export function useAddTable() {
  const { mutate, isPending } = useMutation({
    mutationFn: (name: string) => addTable(name),
    mutationKey: [TableKeyFactory.add],
    onError: throwError("Add Table"),
  });
  return {
    addTable: mutate,
    isLoading: isPending,
  };
}

// export function usePaginatedWeeklyHappenings(limit = 20, page = 1) {
//   const { data, isLoading, hasNextPage, fetchNextPage } =
//     useInfiniteQuery<IGetAllWeeklyHappening>({
//       initialPageParam: page,
//       queryKey: [adminWeeklyHappeningFactory.getAll, limit, page],

//       queryFn: ({ pageParam }) => {
//         return getWeeklyHappenings(limit, pageParam as number);
//       },
//       getNextPageParam: (lastPage) => {
//         const { metadata } = lastPage;
//         return metadata.currentPage < metadata.totalPage
//           ? metadata.currentPage + 1
//           : undefined;
//       },
//     });

//   const paginatedWeeklyHappenings = useMemo(
//     () => data?.pages.flatMap((page) => page.weeklyHappenings) ?? [],
//     [data]
//   );

//   return {
//     paginatedWeeklyHappenings,
//     isLoading,
//     hasNextPage,
//     fetchNextPage,
//   };
// }
