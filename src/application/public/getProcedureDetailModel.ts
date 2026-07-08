import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import type { Procedure, ProcedureDocument } from "@/src/domain/entities/procedure";

import { createClient } from "@/src/utils/supabase/server";

type InstitutionRow = {
  institution_id: number;
  name: string;
};

type ProcedureRow = {
  procedure_id: number;
  institution_id: number;
  name: string;
  description: string;
  keywords: unknown;
};

type RequirementDocumentRow = {
  document_id: number;
  name: string;
};

function normalizeKeywords(value: unknown) {
  if (Array.isArray(value)) {
    return value.filter((keyword): keyword is string => typeof keyword === "string");
  }

  return [];
}

function buildProcedureModel(procedure: ProcedureRow, institutionName: string): Procedure {
  return {
    id: String(procedure.procedure_id),
    institution: institutionName,
    institutionName,
    title: procedure.name,
    description: procedure.description,
    detail: procedure.description,
    cost: "Consultar en la institución",
    estimatedTime: "Consultar en la institución",
    modality: "Presencial o en línea",
    availability: "Disponible conforme al calendario institucional",
    steps: [],
    keywords: normalizeKeywords(procedure.keywords),
    icon: "fileText",
  };
}

export async function getProcedureDetailModel(id: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const [procedureResponse, institutionsResponse, documentsResponse, relatedProceduresResponse] = await Promise.all([
    supabase.from("procedures").select("procedure_id,institution_id,name,description,keywords").eq("procedure_id", Number(id)).maybeSingle(),
    supabase.from("institutions").select("institution_id,name"),
    supabase.from("requirement_documents").select("document_id,name").eq("procedure_id", Number(id)).order("document_id", { ascending: true }),
    supabase.from("procedures").select("procedure_id,institution_id,name,description,keywords").order("name", { ascending: true }),
  ]);

  if (procedureResponse.error || !procedureResponse.data) {
    notFound();
  }

  const procedureData = procedureResponse.data as ProcedureRow;
  const institutionName =
    ((institutionsResponse.data ?? []) as InstitutionRow[]).find(
      (institution) => institution.institution_id === procedureData.institution_id,
    )?.name ?? "Institución no registrada";

  const procedure = buildProcedureModel(procedureData, institutionName);
  const documents = ((documentsResponse.data ?? []) as RequirementDocumentRow[]).map((document) => ({
    id: String(document.document_id),
    name: document.name,
    type: "Documento",
    required: true,
  })) satisfies ProcedureDocument[];

  const relatedProcedures = ((relatedProceduresResponse.data ?? []) as ProcedureRow[])
    .filter((item) => item.procedure_id !== procedureData.procedure_id)
    .slice(0, 3)
    .map((item) => {
      const relatedInstitutionName =
        ((institutionsResponse.data ?? []) as InstitutionRow[]).find(
          (institution) => institution.institution_id === item.institution_id,
        )?.name ?? "Institución no registrada";

      return buildProcedureModel(item, relatedInstitutionName);
    });

  return {
    procedure,
    documents,
    relatedProcedures,
  };
}

export async function getProcedureStaticParams() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.from("procedures").select("procedure_id");

  return (data ?? []).map((procedure: { procedure_id: number }) => ({
    id: String(procedure.procedure_id),
  }));
}
