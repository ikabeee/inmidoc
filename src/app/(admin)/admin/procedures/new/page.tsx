import { getProcedureFormModel } from "@/src/application/admin/getProcedureFormModel";
import { ProcedureFormView } from "@/src/presentation/admin/ProcedureFormView";
import { AdminLayout } from "@/src/presentation/layouts/AdminLayout";

export default function NewProcedurePage() {
  const model = getProcedureFormModel();

  return (
    <AdminLayout active="Dashboard">
      <ProcedureFormView institutions={model.institutions} documents={model.documents} />
    </AdminLayout>
  );
}
