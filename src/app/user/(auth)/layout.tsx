import UserAuthLayout from "@/components/layouts/auth.layout";

interface Props {
  children: React.ReactNode;
}
export default function AuthLayout({ children }: Props) {
  return <UserAuthLayout>{children}</UserAuthLayout>;
}
