import { cookies } from "next/headers";

import { getUserReportModel } from "@/src/application/public/getUserReportModel";
import { createClient } from "@/src/utils/supabase/server";
import { UserReportView } from "@/src/presentation/public/UserReportView";

async function createReport(formData: FormData) {
  "use server";

  const title = formData.get("title");
  const description = formData.get("description");
  const status = formData.get("status") ?? "Pendiente";

  if (typeof title !== "string" || title.trim().length === 0) {
    throw new Error("El título del reporte es obligatorio.");
  }

  if (typeof description !== "string" || description.trim().length === 0) {
    throw new Error("La descripción del reporte es obligatoria.");
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.from("tickets").insert({
    title: title.trim(),
    description: description.trim(),
    status: typeof status === "string" ? status : "Pendiente",
  });

  if (error) {
    throw new Error(error.message);
  }
}

export default function UserReportPage() {
  const model = getUserReportModel();

  return <UserReportView categories={model.categories} createAction={createReport} />;
}
