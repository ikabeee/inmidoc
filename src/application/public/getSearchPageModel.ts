import { cookies } from "next/headers";

import type { Procedure } from "@/src/domain/entities/procedure";

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

function normalizeKeywords(value: unknown) {
  if (Array.isArray(value)) {
    return value.filter((keyword): keyword is string => typeof keyword === "string");
  }

  return [];
}

function buildProcedureModel(
  procedure: ProcedureRow,
  institutionName: string,
  isFeatured = false,
): Procedure {
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
    featured: isFeatured,
    icon: "fileText",
  };
}

export async function getSearchPageModel() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const [institutionsResponse, proceduresResponse] = await Promise.all([
    supabase.from("institutions").select("institution_id,name").order("name", { ascending: true }),
    supabase.from("procedures").select("procedure_id,institution_id,name,description,keywords").order("name", { ascending: true }),
  ]);

  if (institutionsResponse.error) {
    throw new Error(institutionsResponse.error.message);
  }

  if (proceduresResponse.error) {
    throw new Error(proceduresResponse.error.message);
  }

  const institutions = ((institutionsResponse.data ?? []) as InstitutionRow[]).map((institution) => institution.name);
  const procedures = ((proceduresResponse.data ?? []) as ProcedureRow[]).map((procedure, index) => {
    const institutionName =
      (institutionsResponse.data as InstitutionRow[] | undefined)?.find(
        (institution) => institution.institution_id === procedure.institution_id,
      )?.name ?? "Institución no registrada";

    return buildProcedureModel(procedure, institutionName, index === 0);
  });

  const frequentSearches = Array.from(
    new Set(
      procedures.flatMap((procedure) => [procedure.title, ...procedure.keywords]).filter(Boolean),
    ),
  ).slice(0, 8);

  return {
    frequentSearches,
    filters: {
      institutions: ["Todas las Instituciones", ...institutions],
      categories: ["Identidad y Ciudadanía", "Impuestos y Contribuciones", "Salud y Seguridad Social", "Educación"],
    },
    procedures,
  };
}
