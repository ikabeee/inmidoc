import { getProcedureDetailModel, getProcedureStaticParams } from "@/src/application/public/getProcedureDetailModel";
import { ProcedureDetailView } from "@/src/presentation/public/ProcedureDetailView";

export function generateStaticParams() {
  return getProcedureStaticParams();
}

export default async function ProcedureDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const model = getProcedureDetailModel(id);

  return (
    <ProcedureDetailView
      procedure={model.procedure}
      documents={model.documents}
      relatedProcedures={model.relatedProcedures}
    />
  );
}
