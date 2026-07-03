import type { ActivityRow, DashboardMetric } from "@/src/domain/entities/dashboard";

import { Button } from "../components/Button";
import { Icon } from "../components/Icon";

function metricTone(tone: DashboardMetric["tone"]) {
  if (tone === "maroon") return "border-t-[var(--maroon-strong)] bg-[#fff5f7]";
  if (tone === "gold") return "border-t-[var(--gold-light)] bg-white";
  return "border-t-[var(--surface-line)] bg-white";
}

function statusClass(status: string) {
  if (status === "Rechazado") return "status-pending";
  if (status === "Completado") return "status-resolved";
  return "status-progress";
}

export function DashboardView({ metrics, activityRows }: { metrics: DashboardMetric[]; activityRows: ActivityRow[] }) {
  return (
    <div className="mx-auto max-w-[1180px]">
      <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="brand-serif text-5xl font-bold text-[var(--maroon)]">Visión General</h1>
          <p className="mt-4 text-xl text-[var(--text-muted)]">Resumen del estado actual del sistema INMIDOC.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button variant="secondary">Ver Reportes</Button>
          <Button>
            <Icon name="circlePlus" />
            Agregar Trámite
          </Button>
        </div>
      </div>
      <section className="grid gap-6 lg:grid-cols-3">
        {metrics.map((metric) => (
          <article key={metric.label} className={`institutional-card border-t-4 p-7 ${metricTone(metric.tone)}`}>
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.08em]">{metric.label}</p>
                <p className="brand-serif mt-4 text-5xl font-bold">{metric.value}</p>
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--surface-muted)] text-3xl text-[var(--maroon-strong)]">
                <Icon name={metric.icon} size={30} />
              </div>
            </div>
            <p className="mt-7 text-sm font-bold text-[#6f4308]">{metric.note}</p>
          </article>
        ))}
      </section>
      <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="institutional-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-[var(--surface-line)] p-6">
            <h2 className="brand-serif text-3xl font-semibold text-[var(--maroon)]">Actividad Reciente</h2>
            <button className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.1em] text-[#6f4308]">
              Ver todo <Icon name="arrowRight" size={16} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead className="bg-[var(--surface-muted)] text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
                <tr>
                  <th className="p-5">Folio</th>
                  <th className="p-5">Trámite</th>
                  <th className="p-5">Solicitante</th>
                  <th className="p-5">Estado</th>
                  <th className="p-5">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {activityRows.map((row) => (
                  <tr key={row.folio} className="border-t border-[var(--surface-line)] even:bg-[var(--surface-muted)]/50">
                    <td className="p-5 font-bold text-[var(--maroon-strong)]">{row.folio}</td>
                    <td className="p-5">{row.procedure}</td>
                    <td className="p-5">{row.requester}</td>
                    <td className="p-5">
                      <span className={`inline-block px-3 py-1 text-sm ${statusClass(row.status)}`}>{row.status}</span>
                    </td>
                    <td className="p-5">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <aside className="institutional-card overflow-hidden">
          <div className="h-48 bg-[linear-gradient(135deg,#e8e8e8,#f9f9f9)] p-6">
            <h2 className="brand-serif mt-24 text-3xl font-semibold text-white drop-shadow">Eficiencia Operativa</h2>
          </div>
          <div className="grid gap-10 p-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.08em]">Tiempo promedio</p>
              <p className="brand-serif mt-2 text-3xl font-bold">2.4 Días</p>
            </div>
            <div className="border-t border-[var(--surface-line)] pt-8">
              <p className="text-sm font-bold uppercase tracking-[0.08em]">Tasa de aprobación</p>
              <p className="brand-serif mt-2 text-3xl font-bold">94.2%</p>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
