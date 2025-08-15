import { DashboardLayoutClient } from "@/components/layout/dashboard-layout-client.tsx";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
