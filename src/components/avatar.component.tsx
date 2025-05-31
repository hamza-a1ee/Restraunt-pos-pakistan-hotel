import { AvatarProps } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

interface Props extends AvatarProps {
  src: string;
}
export default function ProfileAvatar({ className, src, ...props }: Props) {
  return (
    <Avatar className={cn("", className)} {...props}>
      {src ? (
        <AvatarImage src={src ?? ""} alt="@shadcn" width={64} height={64} />
      ) : (
        <AvatarFallback>CN</AvatarFallback>
      )}
    </Avatar>
  );
}
