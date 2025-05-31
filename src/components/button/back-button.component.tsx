import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  backLink: string;
}

export default function BackBtnLink({ backLink }: Props) {
  return (
    <Link href={backLink}>
      <ArrowLeft className="hover:rounded-full hover:bg-placeholder p-1 w-8 h-8 duration-300" />
    </Link>
  );
}
