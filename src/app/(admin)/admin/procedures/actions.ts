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

async function getSupabase() {
  const cookieStore = await cookies();

  return createClient(cookieStore);
}

export async function createProcedure(formData: FormData) {
  const supabase = await getSupabase();
  const { error } = await supabase.from("procedures").insert({
    institution_id: requiredNumber(formData, "institution_id"),
    name: requiredString(formData, "name"),
    description: requiredString(formData, "description"),
    keywords: parseKeywords(formData),
  });

  if (error) {
    throw new Error(error.message);
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
