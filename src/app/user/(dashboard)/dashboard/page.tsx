import DashboardProvider from "@/views/user/(dashboard)/dashboard/dashboard-provider";
import DashboardView from "@/views/user/(dashboard)/dashboard/dashboard.view";

export default function Page() {
  return (
    <DashboardProvider>
      <DashboardView />
    </DashboardProvider>
  );
}
