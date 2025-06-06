import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TVoidCallback } from "@/shared/types/callbacks.types";
import { Ellipsis, Pencil, Trash } from "lucide-react";

interface Props {
  onEdit: TVoidCallback;
  onDelete: TVoidCallback;
}

export default function EditPopover({ onDelete, onEdit }: Props) {
  return (
    <Popover>
      <PopoverTrigger className="absolute top-3 right-3">
        {" "}
        <button type="button">
          <Ellipsis
            className="bg-white text-black hover:bg-slate-200 rounded-full"
            size={24}
          />
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="bg-white w-40 rounded-xl shadow-xl p-2 space-y-1 "
        align="end"
      >
        <button
          onClick={onEdit}
          type="button"
          className="flex items-center w-full cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition rounded-md"
        >
          <Pencil size={18} className="mr-2 text-blue-500" />
          Edit
        </button>
        <button
          onClick={onDelete}
          type="button"
          className="flex items-center w-full cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition rounded-md"
        >
          <Trash size={18} className="mr-2 text-red-500" />
          Delete
        </button>
      </PopoverContent>
    </Popover>
  );
}
