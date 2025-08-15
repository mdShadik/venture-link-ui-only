import { DashboardLayoutClient } from "@/components/layout/dashboard-layout-client.tsx";

export default function MyListingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
