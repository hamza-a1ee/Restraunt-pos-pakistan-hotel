import Navbar from "../nav.component";
import Sidebar from "../sidebar";
import SidebarProvider from "../sidebar/sidebar-provider";
interface Props {
  children: React.ReactNode;
}
export default function DashboardLayout({ children }: Props) {
  return (
    <SidebarProvider>
      <div className="w-full min-h-[100dvh] flex">
        {/* sidebar */}
        <Sidebar />

        <div className="w-full h-full flex flex-col">
          <Navbar />
          <div className="w-full sm:px-7 py-10 p-5 h-full">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}
