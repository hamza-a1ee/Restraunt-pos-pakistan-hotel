import DashboardLayout from "@/components/layouts/dashboard.layout";
interface Props {
  children: React.ReactNode;
}
export default function UserDashboardLayout({ children }: Props) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
