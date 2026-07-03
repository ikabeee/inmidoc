import { notFound } from "next/navigation";

import { featuredProcedures, procedureDocuments } from "@/src/domain/mocks/inmidoc";

export function getProcedureDetailModel(id: string) {
  const procedure = featuredProcedures.find((item) => item.id === id);

  if (!procedure) {
    notFound();
  }

  return {
    procedure,
    documents: procedureDocuments,
    relatedProcedures: featuredProcedures.filter((item) => item.id !== id).slice(0, 3),
  };
}

export function getProcedureStaticParams() {
  return featuredProcedures.map((procedure) => ({
    id: procedure.id,
  }));
}
