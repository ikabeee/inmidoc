import { cookies } from "next/headers";

import { createClient } from "@/src/utils/supabase/server";

export type AdminInstitution = {
  institutionId: number;
  name: string;
};

export type AdminProcedure = {
  procedureId: number;
  institutionId: number;
  institutionName: string;
  name: string;
  description: string;
  keywords: string[];
};

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

export async function getAdminProceduresModel() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const [institutionsResponse, proceduresResponse] = await Promise.all([
    supabase.from("institutions").select("institution_id,name").order("name", { ascending: true }),
    supabase.from("procedures").select("procedure_id,institution_id,name,description,keywords").order("procedure_id", { ascending: true }),
  ]);

  if (institutionsResponse.error) {
    throw new Error(institutionsResponse.error.message);
  }

  if (proceduresResponse.error) {
    throw new Error(proceduresResponse.error.message);
  }

  const institutions = ((institutionsResponse.data ?? []) as InstitutionRow[]).map((institution) => ({
    institutionId: institution.institution_id,
    name: institution.name,
  }));

  const institutionById = new Map(institutions.map((institution) => [institution.institutionId, institution.name]));
  const procedures = ((proceduresResponse.data ?? []) as ProcedureRow[]).map((procedure) => ({
    procedureId: procedure.procedure_id,
    institutionId: procedure.institution_id,
    institutionName: institutionById.get(procedure.institution_id) ?? "Institución no registrada",
    name: procedure.name,
    description: procedure.description,
    keywords: normalizeKeywords(procedure.keywords),
  }));

  return {
    institutions,
    procedures,
  };
}
