import { getReportsModel } from "@/src/application/admin/getReportsModel";
import { ReportsView } from "@/src/presentation/admin/ReportsView";
import { AdminLayout } from "@/src/presentation/layouts/AdminLayout";

export default function ReportsPage() {
  const model = getReportsModel();

  return (
    <AdminLayout active="Reportes">
      <ReportsView tickets={model.tickets} selectedTicket={model.selectedTicket} />
    </AdminLayout>
  );
}
