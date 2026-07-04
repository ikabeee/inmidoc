import { getReportsModel } from "@/src/application/admin/getReportsModel";
import { ReportsView } from "@/src/presentation/admin/ReportsView";
import { AdminLayout } from "@/src/presentation/layouts/AdminLayout";

export default async function ReportsPage() {
  const model = await getReportsModel();

  return (
    <AdminLayout active="Reportes">
      <ReportsView tickets={model.tickets} selectedTicket={model.selectedTicket} />
    </AdminLayout>
  );
}
