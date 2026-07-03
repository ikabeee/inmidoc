import { getAdminProceduresModel } from "@/src/application/admin/getAdminProceduresModel";
import { ProceduresView } from "@/src/presentation/admin/ProceduresView";
import { AdminLayout } from "@/src/presentation/layouts/AdminLayout";

import { createProcedure, deleteProcedure, updateProcedure } from "./actions";

export const dynamic = "force-dynamic";

export default async function ProceduresPage() {
  const model = await getAdminProceduresModel();

  return (
    <AdminLayout active="Trámites">
      <ProceduresView
        createAction={createProcedure}
        deleteAction={deleteProcedure}
        institutions={model.institutions}
        procedures={model.procedures}
        updateAction={updateProcedure}
      />
    </AdminLayout>
  );
}
