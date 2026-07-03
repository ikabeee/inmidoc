import { getAdminDashboardModel } from "@/src/application/admin/getAdminDashboardModel";
import { DashboardView } from "@/src/presentation/admin/DashboardView";
import { AdminLayout } from "@/src/presentation/layouts/AdminLayout";

export default function AdminPage() {
  const model = getAdminDashboardModel();

  return (
    <AdminLayout active="Dashboard">
      <DashboardView metrics={model.metrics} activityRows={model.activityRows} />
    </AdminLayout>
  );
}
