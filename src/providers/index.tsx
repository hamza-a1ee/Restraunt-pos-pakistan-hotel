import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "./react-query.provider";

interface Props {
  children: React.ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <>
      <ReactQueryProvider>
        {children} <Toaster />
      </ReactQueryProvider>
    </>
  );
}
