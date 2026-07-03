import { featuredProcedures, userReportCategories } from "@/src/domain/mocks/inmidoc";

export function getUserReportModel() {
  return {
    categories: userReportCategories,
    procedures: featuredProcedures.map((procedure) => ({
      id: procedure.id,
      title: procedure.title,
      institution: procedure.institution,
    })),
  };
}
