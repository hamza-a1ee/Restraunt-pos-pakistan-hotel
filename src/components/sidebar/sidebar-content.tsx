import { userRoutes } from "@/routes/user-routes";
import { ISidebarItem } from "@/shared/interface/sidebar.interface";
import { LayoutDashboard, Table, UserRound } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSidebarContext } from "./sidebar-provider";

const navItems: ISidebarItem[] = [
  {
    icon: <LayoutDashboard />,
    label: "Dashboard",
    link: userRoutes.dashboard(),
  },
  {
    icon: <Table />,
    label: "Tables",
    link: userRoutes.tables(),
  },
  {
    icon: <UserRound />,
    label: "Credit Customers",
    link: userRoutes.creditCustomers  (),
  },
];
export default function SidebarCotent() {
  const { onOpenChange } = useSidebarContext();
  return (
    <div className="w-full flex flex-col p-3  gap-y-3">
      {navItems.map((btn) => (
        <Link
          href={btn.link}
          key={btn.label}
          onClick={() => onOpenChange(false)}
          className="flex items-center gap-x-3 rounded-xl hover:bg-slate-300 h-11 px-3 bg-slate-100"
        >
          {typeof btn.icon === "string" ? (
            <Image
              src={btn.icon}
              width={22}
              height={22}
              alt="icon"
              title={btn.label}
            />
          ) : (
            btn.icon
          )}
          {btn.label}
        </Link>
      ))}
    </div>
  );
}
