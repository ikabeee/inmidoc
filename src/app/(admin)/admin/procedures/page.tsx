import { getAdminProceduresModel } from "@/src/application/admin/getAdminProceduresModel";
import { ProceduresView } from "@/src/presentation/admin/ProceduresView";
import { AdminLayout } from "@/src/presentation/layouts/AdminLayout";

import { createInstitution, createProcedure, deleteInstitution, deleteProcedure, updateInstitution, updateProcedure } from "./actions";

export const dynamic = "force-dynamic";

export default async function ProceduresPage() {
  const model = await getAdminProceduresModel();

  return (
    <AdminLayout active="Trámites">
      <ProceduresView
        createAction={createProcedure}
        createInstitutionAction={createInstitution}
        deleteAction={deleteProcedure}
        deleteInstitutionAction={deleteInstitution}
        institutions={model.institutions}
        procedures={model.procedures}
        updateAction={updateProcedure}
        updateInstitutionAction={updateInstitution}
      />
    </AdminLayout>
  );
}
