import { TOneParamCallback } from "@/shared/types/callbacks.types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { TVoidCallback } from "@/shared/axios.shared.types";
import ClipLoader from "react-spinners/ClipLoader";

interface Props {
  open: boolean;
  setOpen: TOneParamCallback<boolean>;
  handleDelete: TVoidCallback;
  isLoading: boolean;
}
export default function DeleteDialog({
  open,
  setOpen,
  handleDelete,
  isLoading,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-screen-md bg-white flex flex-col items-center justify-center gap-y-3">
        <DialogHeader>
          <DialogTitle className="text-2xl capitalize">
            Are you sure you want to delete?
          </DialogTitle>
        </DialogHeader>

        <div className="w-full flex items-center justify-center gap-x-3">
          <Button
            type="button"
            className="rounded-lg w-24 h-11 border border-btn-primary bg-white hover:text-white hover:bg-btn-primary cursor-pointer text-center text-black text-lg"
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={isLoading}
            onClick={handleDelete}
            className="rounded-lg w-24 h-11 bg-primary text-white text-center text-lg cursor-p"
          >
            {isLoading ? <ClipLoader size={20} /> : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
