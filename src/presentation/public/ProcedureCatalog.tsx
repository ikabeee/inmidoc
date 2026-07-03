import type { Procedure } from "@/src/domain/entities/procedure";
import Link from "next/link";

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
          <h2 className="brand-serif border-b border-(--surface-line) pb-3 text-2xl font-semibold text-(--maroon-strong)">
            Filtros de Búsqueda
          </h2>
          <label className="mt-5 block text-sm font-bold tracking-[0.05em] text-(--text-main)">
            Institución
            <select className="focus-ring mt-2 h-12 w-full border border-(--gold-light) bg-white px-3 font-normal tracking-0">
              {filters.institutions.map((institution) => (
                <option key={institution}>{institution}</option>
              ))}
            </select>
          </label>

        </div>
      </aside>
      <div className="md:col-span-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="brand-serif text-3xl font-semibold text-(--text-main)">Trámites Destacados</h2>
        </div>
        <article className="institutional-card gold-rule-top flex flex-col gap-5 p-5 md:flex-row">
          <div className="flex-1">
            <div className="flex items-start justify-between gap-3">
              <span className="flex items-center gap-1 text-xs font-bold text-(--text-muted)">
                <Icon name="landmark" size={16} />
                {featured.institution}
              </span>
            </div>
            <h3 className="brand-serif mt-5 text-3xl font-semibold text-(--maroon-strong)">{featured.title}</h3>
            <p className="mt-3 line-clamp-2 text-(--text-muted)">{featured.description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={`/tramites/${featured.id}`}
                className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 border border-(--gold-light) bg-transparent px-5 py-2 text-sm font-bold tracking-[0.05em] text-(--maroon-strong) transition-colors hover:bg-(--surface-muted)"
              >
                Ver Detalles <Icon name="arrowRight" size={18} />
              </Link>
            </div>
          </div>
          <div className="hidden w-48 items-center justify-center bg-(--surface-muted) text-6xl text-(--gold-light) md:flex">
            <Icon name={featured.icon ?? "fileText"} size={64} strokeWidth={1.5} />
          </div>
        </article>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {standard.map((procedure) => (
            <article key={procedure.id} className="institutional-card flex min-h-60 flex-col p-5">
              <span className="flex items-center gap-1 text-xs font-bold text-(--text-muted)">
                <Icon name="landmark" size={16} />
                {procedure.institution}
              </span>
              <h3 className="brand-serif mt-5 text-2xl font-semibold">{procedure.title}</h3>
              <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-(--text-muted)">{procedure.description}</p>
              <div className="mt-5 border-t border-(--surface-line) pt-4 text-right">
                <Link
                  href={`/tramites/${procedure.id}`}
                  className="focus-ring inline-flex items-center gap-2 text-sm font-bold tracking-[0.05em] text-(--maroon-strong) hover:underline"
                >
                  Ir al trámite <Icon name="arrowRight" size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
