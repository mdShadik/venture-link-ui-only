import { DashboardLayoutClient } from "@/components/layout/dashboard-layout-client.tsx";

export default function InterestedBuyersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
