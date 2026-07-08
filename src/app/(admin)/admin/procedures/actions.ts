"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { createClient } from "@/src/utils/supabase/server";

const proceduresPath = "/admin/procedures";

function requiredString(formData: FormData, name: string) {
  const value = formData.get(name);

  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`El campo ${name} es obligatorio.`);
  }

  return value.trim();
}

function requiredNumber(formData: FormData, name: string) {
  const value = Number(requiredString(formData, name));

  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`El campo ${name} no es válido.`);
  }

  return value;
}

function parseKeywords(formData: FormData) {
  return requiredString(formData, "keywords")
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);
}

function parseRemovedRequirementIds(formData: FormData) {
  const removedValue = formData.get("removed_requirement_ids");

  if (typeof removedValue !== "string") {
    return [];
  }

  return removedValue
    .split(",")
    .map((value) => Number(value.trim()))
    .filter((value) => Number.isInteger(value) && value > 0);
}

function parseRequirementRows(formData: FormData) {
  const requirementIds = formData.getAll("requirement_ids[]").map((value) => (typeof value === "string" ? value.trim() : ""));
  const requirementNames = formData.getAll("requirement_names[]").map((value) => (typeof value === "string" ? value.trim() : ""));

  return requirementNames
    .map((name, index) => ({
      documentId: requirementIds[index] ? Number(requirementIds[index]) : undefined,
      name,
    }))
    .filter((row) => row.name.length > 0);
}

async function getSupabase() {
  const cookieStore = await cookies();

  return createClient(cookieStore);
}

export async function createProcedure(formData: FormData) {
  const supabase = await getSupabase();
  const { data: procedure, error: procedureError } = await supabase
    .from("procedures")
    .insert({
      institution_id: requiredNumber(formData, "institution_id"),
      name: requiredString(formData, "name"),
      description: requiredString(formData, "description"),
      keywords: parseKeywords(formData),
    })
    .select("procedure_id")
    .single();

  if (procedureError) {
    throw new Error(procedureError.message);
  }

  const requirements = formData
    .getAll("requirements")
    .map((requirement) => (typeof requirement === "string" ? requirement.trim() : ""))
    .filter(Boolean);

  if (requirements.length > 0 && procedure?.procedure_id) {
    const { error: documentsError } = await supabase.from("requirement_documents").insert(
      requirements.map((name) => ({
        procedure_id: procedure.procedure_id,
        name,
      })),
    );

    if (documentsError) {
      throw new Error(documentsError.message);
    }
  }

  revalidatePath(proceduresPath);
}

export async function updateProcedure(formData: FormData) {
  const supabase = await getSupabase();
  const procedureId = requiredNumber(formData, "procedure_id");
  const { error } = await supabase
    .from("procedures")
    .update({
      institution_id: requiredNumber(formData, "institution_id"),
      name: requiredString(formData, "name"),
      description: requiredString(formData, "description"),
      keywords: parseKeywords(formData),
    })
    .eq("procedure_id", procedureId);

  if (error) {
    throw new Error(error.message);
  }

  const removedRequirementIds = parseRemovedRequirementIds(formData);

  if (removedRequirementIds.length > 0) {
    const { error: deleteError } = await supabase
      .from("requirement_documents")
      .delete()
      .in("document_id", removedRequirementIds);

    if (deleteError) {
      throw new Error(deleteError.message);
    }
  }

  const requirementRows = parseRequirementRows(formData);

  for (const requirement of requirementRows) {
    if (requirement.documentId) {
      const { error: updateRequirementError } = await supabase
        .from("requirement_documents")
        .update({ name: requirement.name })
        .eq("document_id", requirement.documentId);

      if (updateRequirementError) {
        throw new Error(updateRequirementError.message);
      }

      continue;
    }

    const { error: insertRequirementError } = await supabase.from("requirement_documents").insert({
      procedure_id: procedureId,
      name: requirement.name,
    });

    if (insertRequirementError) {
      throw new Error(insertRequirementError.message);
    }
  }

  revalidatePath(proceduresPath);
}

export async function deleteProcedure(formData: FormData) {
  const supabase = await getSupabase();
  const procedureId = requiredNumber(formData, "procedure_id");
  const { error } = await supabase.from("procedures").delete().eq("procedure_id", procedureId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(proceduresPath);
}
