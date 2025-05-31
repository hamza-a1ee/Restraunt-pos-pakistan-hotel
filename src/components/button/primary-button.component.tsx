import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ClipLoader } from "react-spinners";

type ShadcnButtonProps = React.ComponentProps<typeof Button>;

interface Props extends ShadcnButtonProps {
  children: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
}
export default function PrimaryButton({
  children,
  className,
  isLoading,
  disabled,
  ...props
}: Props) {
  return (
    <Button
      disabled={disabled}
      className={cn(
        "w-full bg-btn-primary hover:bg-bt placeholder:text-slate-100 text-black cursor-pointer",
        className
      )}
      {...props}
    >
      {isLoading ? <ClipLoader size={20} /> : children}
    </Button>
  );
}
