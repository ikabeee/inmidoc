import { getProcedureDetailModel } from "@/src/application/public/getProcedureDetailModel";
import { ProcedureDetailView } from "@/src/presentation/public/ProcedureDetailView";

export const dynamic = "force-dynamic";

export default async function ProcedureDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const model = await getProcedureDetailModel(id);

  return (
    <ProcedureDetailView
      procedure={model.procedure}
      documents={model.documents}
      relatedProcedures={model.relatedProcedures}
    />
  );
}
