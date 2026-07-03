import type { Procedure } from "@/src/domain/entities/procedure";

import { Button } from "../components/Button";
import { Icon } from "../components/Icon";

export function ProcedureCatalog({
  filters,
  procedures,
}: {
  filters: { institutions: string[]; categories: string[] };
  procedures: Procedure[];
}) {
  const [featured, ...standard] = procedures;

  return (
    <section className="shell-container grid gap-6 py-10 md:grid-cols-12">
      <aside className="md:col-span-4">
        <div className="institutional-card p-5 md:sticky md:top-24">
          <h2 className="brand-serif border-b border-[var(--surface-line)] pb-3 text-2xl font-semibold text-[var(--maroon-strong)]">
            Filtros de Búsqueda
          </h2>
          <label className="mt-5 block text-sm font-bold tracking-[0.05em] text-[var(--text-main)]">
            Institución
            <select className="focus-ring mt-2 h-12 w-full border border-[var(--gold-light)] bg-white px-3 font-normal tracking-0">
              {filters.institutions.map((institution) => (
                <option key={institution}>{institution}</option>
              ))}
            </select>
          </label>
          <div className="mt-5">
            <p className="text-sm font-bold tracking-[0.05em]">Categoría</p>
            <div className="mt-3 grid gap-3">
              {filters.categories.map((category) => (
                <label key={category} className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
                  <input className="h-4 w-4 border-[var(--gold-light)]" type="checkbox" />
                  {category}
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>
      <div className="md:col-span-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="brand-serif text-3xl font-semibold text-[var(--text-main)]">Trámites Destacados</h2>
          <span className="text-sm text-[var(--text-muted)]">Mostrando 4 resultados</span>
        </div>
        <article className="institutional-card gold-rule-top flex flex-col gap-5 p-5 md:flex-row">
          <div className="flex-1">
            <div className="flex items-start justify-between gap-3">
              <span className="bg-[var(--gold)] px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-white">
                Destacado
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-[var(--text-muted)]">
                <Icon>▥</Icon>
                {featured.institution}
              </span>
            </div>
            <h3 className="brand-serif mt-5 text-3xl font-semibold text-[var(--maroon-strong)]">{featured.title}</h3>
            <p className="mt-3 line-clamp-2 text-[var(--text-muted)]">{featured.description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button>Iniciar Trámite</Button>
              <Button variant="outline">Ver Detalles</Button>
            </div>
          </div>
          <div className="hidden w-48 items-center justify-center bg-[var(--surface-muted)] text-6xl text-[var(--gold-light)] md:flex">
            {featured.icon}
          </div>
        </article>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {standard.map((procedure) => (
            <article key={procedure.id} className="institutional-card flex min-h-60 flex-col p-5">
              <span className="flex items-center gap-1 text-xs font-bold text-[var(--text-muted)]">
                <Icon>▥</Icon>
                {procedure.institution}
              </span>
              <h3 className="brand-serif mt-5 text-2xl font-semibold">{procedure.title}</h3>
              <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-[var(--text-muted)]">{procedure.description}</p>
              <div className="mt-5 border-t border-[var(--surface-line)] pt-4 text-right">
                <button className="focus-ring text-sm font-bold tracking-[0.05em] text-[var(--maroon-strong)] hover:underline">
                  Ir al trámite →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
