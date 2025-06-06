import { userRoutes } from "@/routes/user-routes";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { clearNestedMapStorage } from "@/utils/local-storage.util";

export default function SidebarFooter() {
  const router = useRouter();
  const handleLogout = async () => {
    deleteCookie("accessToken");
    clearNestedMapStorage();
    router.push(userRoutes.login());
    router.refresh();
  };
  return (
    <div className="flex flex-col gap-y-3">
      <Button
        type="button"
        onClick={handleLogout}
        className="shadow-0 h-11 flex  justify-start text-black cursor-pointer text-base font-normal shadow-none rounded-xl bg-slate-100 hover:bg-slate-300"
      >
        <LogOut />
        Logout
      </Button>
    </div>
  );
}
