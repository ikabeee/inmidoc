"use client";

import { Button } from "../components/Button";
import { Icon } from "../components/Icon";

type ReportCategory = {
  id: string;
  label: string;
  description: string;
};

type UserReportViewProps = {
  categories: ReportCategory[];
  createAction: (formData: FormData) => Promise<void>;
};

export function UserReportView({ categories, createAction }: UserReportViewProps) {
  // Show a compact info icon top-right of the form with the category descriptions
  // and center the form contents for a tighter, focused layout.
  return (
    <div className="bg-(--surface) flex-col">
      <section className="border-b border-(--surface-line) bg-white">
        <div className="shell-container grid gap-8 py-10 lg:grid-cols-[1fr_0px] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 border border-(--gold-light) bg-(--surface-muted) px-3 py-2 text-xs font-bold uppercase tracking-widest text-(--maroon-strong)">
              <Icon name="ticket" size={16} />
              Ticket ciudadano
            </div>
            <h1 className="brand-serif mt-5 max-w-4xl text-4xl font-bold leading-tight text-(--maroon) md:text-5xl">
              Levantar reporte
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-(--text-muted)">
              Reporta errores, inconsistencias o dudas sobre trámites. Tu reporte queda preparado como ticket para seguimiento administrativo.
            </p>
          </div>
        </div>
      </section>

      <section className="shell-container grid gap-6 py-8 lg:grid-cols-[1fr-350px] w-full">
        <form action={createAction} className="institutional-card grid gap-6 p-6 relative">
          <div className="absolute top-4 right-4">
            <div className="relative">
              <button
                type="button"
                aria-label="Información sobre tipos de reporte"
                onClick={(e) => {
                  const panel = (e.currentTarget.nextElementSibling as HTMLElement | null);
                  if (panel) panel.classList.toggle("hidden");
                }}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-(--surface-line) bg-white shadow-sm"
              >
                <Icon name="info" />
              </button>
              <div className="hidden absolute right-0 z-50 mt-2 w-72 rounded border bg-white p-3 text-sm shadow-lg">
                <p className="font-bold">Tipos de reporte</p>
                <div className="mt-2 space-y-2">
                  {categories.map((c) => (
                    <div key={c.id}>
                      <div className="font-medium text-(--maroon-strong)">{c.label}</div>
                      <div className="text-(--text-muted) text-sm">{c.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-[640px] w-full">
            <div>
              <h2 className="brand-serif text-3xl font-semibold text-(--maroon)">Datos del reporte</h2>
              <p className="mt-3 text-(--text-muted)">Completa la información base para clasificar el ticket.</p>
            </div>

            <fieldset className="grid gap-3 mt-4">
            </fieldset>

            <label className="grid gap-2 text-sm font-bold mt-4">
              Título del reporte
              <input
                className="focus-ring h-12 border border-(--gold-light) bg-white px-3 font-normal"
                placeholder="Ej. No puedo cargar comprobante de domicilio"
                name="title"
                required
              />
            </label>

            <label className="grid gap-2 text-sm font-bold mt-2">
              Descripción del problema
              <textarea
                className="focus-ring min-h-40 border border-(--gold-light) bg-white p-3 font-normal"
                placeholder="Describe qué intentabas hacer, qué ocurrió y en qué pantalla se presentó el problema..."
                name="description"
                required
              />
            </label>

            <input type="hidden" name="status" value="Pendiente" />

            <div className="flex flex-col gap-3 border-t border-(--surface-line) pt-6 sm:flex-row sm:justify-end">
              <Button variant="outline" type="reset">
                Cancelar
              </Button>
              <Button type="submit">
                Enviar reporte <Icon name="arrowRight" size={18} />
              </Button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
