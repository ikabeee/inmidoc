import type { ProcedureDocument } from "@/src/domain/entities/procedure";

import { Button } from "../components/Button";
import { Icon } from "../components/Icon";

export function ProcedureFormView({
  institutions,
  documents,
}: {
  institutions: string[];
  documents: ProcedureDocument[];
}) {
  return (
    <div className="mx-auto max-w-[1100px]">
      <div className="mb-8">
        <h1 className="brand-serif text-4xl font-bold text-[var(--maroon)]">Registrar Nuevo Trámite</h1>
        <p className="mt-3 text-[var(--text-muted)]">
          Complete el formulario para dar de alta un nuevo procedimiento administrativo en el catálogo institucional.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="grid gap-8">
          <section className="institutional-card gold-rule-top p-6">
            <h2 className="brand-serif border-b border-[var(--surface-line)] pb-4 text-2xl font-semibold">
              Información General
            </h2>
            <div className="mt-5 grid gap-5">
              <label className="grid gap-2 text-sm font-bold">
                Nombre del Trámite <span className="text-[var(--maroon)]">*</span>
                <input className="focus-ring h-12 border border-[var(--gold-light)] px-3 font-normal" placeholder="Ej. Solicitud de Pasaporte Ordinario" />
              </label>
              <label className="grid gap-2 text-sm font-bold">
                Institución Responsable <span className="text-[var(--maroon)]">*</span>
                <select className="focus-ring h-12 border border-[var(--gold-light)] px-3 font-normal">
                  <option>Seleccione una institución</option>
                  {institutions.map((institution) => (
                    <option key={institution}>{institution}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-bold">
                Descripción del Procedimiento <span className="text-[var(--maroon)]">*</span>
                <textarea className="focus-ring min-h-32 border border-[var(--gold-light)] p-3 font-normal" placeholder="Describa el objetivo y alcance del trámite..." />
              </label>
            </div>
          </section>
          <section className="institutional-card p-6">
            <div className="flex items-center justify-between gap-4 border-b border-[var(--surface-line)] pb-4">
              <h2 className="brand-serif text-2xl font-semibold">Documentos Requeridos</h2>
              <button className="inline-flex items-center gap-2 text-sm font-bold text-[var(--maroon-strong)]">
                <Icon name="circlePlus" size={16} />
                Agregar Documento
              </button>
            </div>
            <p className="mt-5 text-sm text-[var(--text-muted)]">
              Añada los requisitos documentales necesarios para la ejecución de este trámite.
            </p>
            {documents.map((document) => (
              <div key={document.id} className="mt-5 grid gap-4 border border-[var(--surface-line)] bg-[var(--surface-muted)] p-4 md:grid-cols-[1fr_1fr_auto]">
                <label className="grid gap-2 text-sm font-bold">
                  Nombre del Documento
                  <input className="focus-ring h-11 border border-[var(--gold-light)] bg-white px-3 font-normal" defaultValue={document.name} />
                </label>
                <label className="grid gap-2 text-sm font-bold">
                  Tipo de Documento
                  <select className="focus-ring h-11 border border-[var(--gold-light)] bg-white px-3 font-normal" defaultValue={document.type}>
                    <option>PDF (Original o Copia)</option>
                    <option>Imagen</option>
                    <option>Formulario</option>
                  </select>
                </label>
                <button className="self-end text-2xl text-[var(--danger)]" aria-label="Eliminar documento">
                  <Icon name="trash" />
                </button>
                <label className="flex items-center gap-2 text-sm md:col-span-3">
                  <input type="checkbox" defaultChecked={document.required} />
                  Documento Obligatorio
                </label>
              </div>
            ))}
          </section>
        </div>
        <aside className="grid content-start gap-6">
          <section className="institutional-card p-6">
            <h2 className="brand-serif text-2xl font-semibold">Configuración Adicional</h2>
            <div className="mt-5 grid gap-5">
              <label className="grid gap-2 text-sm font-bold">
                Costo M.N. (Opcional)
                <input className="focus-ring h-11 border border-[var(--gold-light)] px-3 font-normal" placeholder="$ 0.00" />
              </label>
              <label className="grid gap-2 text-sm font-bold">
                Tiempo Estimado de Respuesta
                <div className="grid grid-cols-2 gap-2">
                  <input className="focus-ring h-11 border border-[var(--gold-light)] px-3 font-normal" placeholder="Ej. 15" />
                  <select className="focus-ring h-11 border border-[var(--gold-light)] px-3 font-normal">
                    <option>Días Hábiles</option>
                  </select>
                </div>
              </label>
              <div>
                <p className="text-sm font-bold">Estado del Trámite</p>
                <div className="mt-3 bg-[var(--warning-soft)] px-4 py-3 text-center text-sm font-bold text-[#795926]">● Borrador</div>
              </div>
            </div>
          </section>
          <Button>Guardar Trámite</Button>
          <Button variant="outline">Cancelar</Button>
        </aside>
      </div>
    </div>
  );
}
