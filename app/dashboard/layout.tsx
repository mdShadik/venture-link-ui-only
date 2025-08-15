import { DashboardLayoutClient } from "@/components/layout/dashboard-layout-client.tsx";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
