import { procedureDocuments } from "@/src/domain/mocks/inmidoc";

export function getProcedureFormModel() {
  return {
    institutions: [
      "Instituto Nacional de Migración",
      "Secretaría de Relaciones Exteriores",
      "Registro Civil",
      "Servicio de Administración Tributaria",
    ],
    documents: procedureDocuments,
  };
}
