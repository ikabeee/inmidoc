import { featuredProcedures } from "@/src/domain/mocks/inmidoc";

export function getSearchPageModel() {
  return {
    frequentSearches: ["CURP", "Acta de Nacimiento", "Pasaporte"],
    filters: {
      institutions: ["Todas las Instituciones", "IMSS", "SAT", "ISSSTE", "SRE", "SEP"],
      categories: [
        "Identidad y Ciudadanía",
        "Impuestos y Contribuciones",
        "Salud y Seguridad Social",
        "Educación",
      ],
    },
    procedures: featuredProcedures,
  };
}
