import Link from "next/link";

import type { Procedure, ProcedureDocument } from "@/src/domain/entities/procedure";

import { Button } from "../components/Button";
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
    <div className="bg-[var(--surface)]">
      <section className="border-b border-[var(--surface-line)] bg-white">
        <div className="shell-container py-8">
          <Link
            href="/"
            className="focus-ring inline-flex items-center gap-2 text-sm font-bold tracking-[0.05em] text-[var(--maroon-strong)] hover:underline"
          >
            <Icon name="arrowRight" className="rotate-180" size={16} />
            Volver al buscador
          </Link>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-2 border border-[var(--gold-light)] bg-[var(--surface-muted)] px-3 py-2 text-xs font-bold uppercase tracking-[0.1em] text-[var(--maroon-strong)]">
                <Icon name="landmark" size={16} />
                {procedure.institution}
              </div>
              <h1 className="brand-serif mt-5 max-w-4xl text-4xl font-bold leading-tight text-[var(--maroon)] md:text-5xl">
                {procedure.title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--text-muted)]">{procedure.detail}</p>
            </div>
            <aside className="institutional-card gold-rule-top p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center bg-[var(--surface-muted)] text-[var(--maroon-strong)]">
                  <Icon name={procedure.icon ?? "fileText"} size={34} strokeWidth={1.7} />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.08em] text-[var(--text-muted)]">Institución</p>
                  <p className="mt-1 font-bold">{procedure.institutionName}</p>
                </div>
              </div>
              <dl className="mt-6 grid gap-4 text-sm">
                <div className="flex items-start gap-3">
                  <Icon name="banknote" className="mt-0.5 text-[#795926]" size={18} />
                  <div>
                    <dt className="font-bold">Costo</dt>
                    <dd className="text-[var(--text-muted)]">{procedure.cost}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="clock" className="mt-0.5 text-[#795926]" size={18} />
                  <div>
                    <dt className="font-bold">Tiempo estimado</dt>
                    <dd className="text-[var(--text-muted)]">{procedure.estimatedTime}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="clipboardCheck" className="mt-0.5 text-[#795926]" size={18} />
                  <div>
                    <dt className="font-bold">Modalidad</dt>
                    <dd className="text-[var(--text-muted)]">{procedure.modality}</dd>
                  </div>
                </div>
              </dl>
              <Button className="mt-6 w-full">
                Iniciar Trámite <Icon name="arrowRight" size={18} />
              </Button>
            </aside>
          </div>
        </div>
      </section>

      <section className="shell-container grid gap-6 py-8 lg:grid-cols-[1fr_340px]">
        <div className="grid gap-6">
          <article className="institutional-card p-6">
            <h2 className="brand-serif text-3xl font-semibold text-[var(--maroon)]">Requisitos documentales</h2>
            <p className="mt-3 text-[var(--text-muted)]">
              Documentos base requeridos para iniciar revisión institucional del trámite.
            </p>
            <div className="mt-6 grid gap-3">
              {documents.map((document) => (
                <div
                  key={document.id}
                  className="grid gap-4 border border-[var(--surface-line)] bg-[var(--surface-muted)] p-4 sm:grid-cols-[auto_1fr_auto]"
                >
                  <Icon name="fileCheck" className="text-[var(--maroon-strong)]" />
                  <div>
                    <p className="font-bold">{document.name}</p>
                    <p className="mt-1 text-sm text-[var(--text-muted)]">{document.type}</p>
                  </div>
                  <span className="self-start bg-[var(--warning-soft)] px-3 py-1 text-xs font-bold text-[#795926]">
                    {document.required ? "Obligatorio" : "Opcional"}
                  </span>
                </div>
              ))}
            </div>
          </article>

          <article className="institutional-card p-6">
            <h2 className="brand-serif text-3xl font-semibold text-[var(--maroon)]">Proceso del trámite</h2>
            <ol className="mt-6 grid gap-4">
              {procedure.steps.map((step, index) => (
                <li key={step} className="grid gap-4 border-l-4 border-[var(--gold-light)] bg-white p-4 sm:grid-cols-[48px_1fr]">
                  <span className="flex h-12 w-12 items-center justify-center bg-[var(--maroon)] font-bold text-white">
                    {index + 1}
                  </span>
                  <p className="self-center leading-7 text-[var(--text-muted)]">{step}</p>
                </li>
              ))}
            </ol>
          </article>
        </div>

        <aside className="grid content-start gap-6">
          <section className="institutional-card p-6">
            <h2 className="brand-serif text-2xl font-semibold text-[var(--maroon)]">Disponibilidad</h2>
            <div className="mt-5 flex items-start gap-3">
              <Icon name="checkCircle" className="mt-0.5 text-[#795926]" />
              <p className="leading-7 text-[var(--text-muted)]">{procedure.availability}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {procedure.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="border border-[var(--surface-line)] bg-[var(--surface-muted)] px-3 py-1 text-xs font-bold text-[var(--maroon-strong)]"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </section>

          <section className="institutional-card p-6">
            <h2 className="brand-serif text-2xl font-semibold text-[var(--maroon)]">Trámites relacionados</h2>
            <div className="mt-5 grid gap-4">
              {relatedProcedures.map((related) => (
                <Link
                  key={related.id}
                  href={`/tramites/${related.id}`}
                  className="focus-ring group border border-[var(--surface-line)] p-4 hover:border-[var(--gold-light)] hover:bg-[var(--surface-muted)]"
                >
                  <span className="text-xs font-bold text-[var(--text-muted)]">{related.institution}</span>
                  <span className="mt-2 flex items-start justify-between gap-3">
                    <span className="brand-serif text-lg font-semibold text-[var(--text-main)] group-hover:text-[var(--maroon-strong)]">
                      {related.title}
                    </span>
                    <Icon name="chevronRight" className="mt-1 text-[var(--maroon-strong)]" size={18} />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </section>
    </div>
  );
}
