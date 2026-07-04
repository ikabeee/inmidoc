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

      <section className="shell-container grid gap-6 py-8 lg:grid-cols-[1fr_340px] w-full">
        <form action={createAction} method="post" className="institutional-card grid gap-6 p-6">
          <div>
            <h2 className="brand-serif text-3xl font-semibold text-(--maroon)">Datos del reporte</h2>
            <p className="mt-3 text-(--text-muted)">Completa la información base para clasificar el ticket.</p>
          </div>

          <fieldset className="grid gap-3">
            <legend className="text-sm font-bold">Tipo de reporte</legend>
            <div className="grid gap-3 md:grid-cols-3">
              {categories.map((category) => (
                <label
                  key={category.id}
                  className="focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-(--maroon-strong) border border-(--surface-line) bg-(--surface-muted) p-4"
                >
                  <span className="flex items-center gap-2 font-bold text-(--maroon-strong)">
                    <Icon name="listChecks" size={18} />
                    {category.label}
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-(--text-muted)">{category.description}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="grid gap-2 text-sm font-bold">
            Título del reporte
            <input
              className="focus-ring h-12 border border-(--gold-light) bg-white px-3 font-normal"
              placeholder="Ej. No puedo cargar comprobante de domicilio"
              name="title"
              required
            />
          </label>

          <label className="grid gap-2 text-sm font-bold">
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
        </form>
      </section>
    </div>
  );
}
