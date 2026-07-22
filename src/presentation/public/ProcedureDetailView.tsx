import Link from "next/link";

import type { Procedure, ProcedureDocument } from "@/src/domain/entities/procedure";

import { Icon } from "../components/Icon";

export function ProcedureDetailView({
  procedure,
  documents,
  relatedProcedures,
}: {
  procedure: Procedure;
  documents: ProcedureDocument[];
  relatedProcedures: Procedure[];
}) {
  return (
    <div className="bg-(--surface)">
      <section className="border-b border-(--surface-line) bg-white">
        <div className="shell-container py-8">
          <div className="mt-2 grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-2 border border-(--gold-light) bg-(--surface-muted) px-3 py-2 text-xs font-bold uppercase tracking-widest text-(--maroon-strong)">
                <Icon name="landmark" size={16} />
                {procedure.institution}
              </div>
              <h1 className="brand-serif mt-5 max-w-4xl text-4xl font-bold leading-tight text-(--maroon) md:text-5xl">
                {procedure.title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-(--text-muted)">{procedure.detail}</p>
            </div>
            <aside className="institutional-card gold-rule-top p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center bg-(--surface-muted) text-(--maroon-strong)">
                  <Icon name={procedure.icon ?? "fileText"} size={34} strokeWidth={1.7} />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.08em] text-(--text-muted)">Institución</p>
                  <p className="mt-1 font-bold">{procedure.institutionName}</p>
                </div>
              </div>
              
            </aside>
          </div>
        </div>
      </section>

      <section className="shell-container grid gap-6 py-8 lg:grid-cols-[1fr_px]">
        <div className="grid gap-6">
          <article className="institutional-card p-6">
            <h2 className="brand-serif text-3xl font-semibold text-(--maroon)">Requisitos documentales</h2>
            <p className="mt-3 text-(--text-muted)">
              Documentos base requeridos para iniciar revisión institucional del trámite.
            </p>
            <div className="mt-6 grid gap-3">
              {documents.map((document) => (
                <div
                  key={document.id}
                  className="grid gap-4 border border-(--surface-line) bg-(--surface-muted) p-4 sm:grid-cols-[auto_1fr_auto]"
                >
                  <Icon name="fileCheck" className="text-(--maroon-strong)" />
                  <div>
                    <p className="font-bold">{document.name}</p>
                    
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>

        
      </section>
    </div>
  );
}
