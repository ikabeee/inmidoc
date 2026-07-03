import type { AdminInstitution, AdminProcedure } from "@/src/application/admin/getAdminProceduresModel";

import { Button } from "../components/Button";
import { Icon } from "../components/Icon";

type ProcedureAction = (formData: FormData) => Promise<void>;

type ProceduresViewProps = {
  institutions: AdminInstitution[];
  procedures: AdminProcedure[];
  createAction: ProcedureAction;
  updateAction: ProcedureAction;
  deleteAction: ProcedureAction;
};

function keywordsText(keywords: string[]) {
  return keywords.join(", ");
}

function InstitutionSelect({
  institutions,
  defaultValue,
}: {
  institutions: AdminInstitution[];
  defaultValue?: number;
}) {
  return (
    <select
      className="focus-ring h-11 w-full border border-(--surface-line) bg-white px-3 text-sm"
      defaultValue={defaultValue}
      name="institution_id"
      required
    >
      <option value="">Selecciona institución</option>
      {institutions.map((institution) => (
        <option key={institution.institutionId} value={institution.institutionId}>
          {institution.name}
        </option>
      ))}
    </select>
  );
}

export function ProceduresView({
  institutions,
  procedures,
  createAction,
  updateAction,
  deleteAction,
}: ProceduresViewProps) {
  return (
    <div className="mx-auto grid max-w-[1180px] gap-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="brand-serif text-4xl font-bold text-(--text-main)">Trámites</h1>
          <p className="mt-3 text-lg text-(--text-muted)">
            Administración del catálogo de trámites registrado en la base de datos.
          </p>
        </div>
        <div className="institutional-card flex min-h-14 items-center gap-3 px-5">
          <Icon name="fileText" />
          <span className="text-sm font-bold">{procedures.length} trámites registrados</span>
        </div>
      </div>

      <section className="institutional-card gold-rule-top p-6">
        <div className="flex flex-col gap-2 border-b border-(--surface-line) pb-5">
          <h2 className="brand-serif text-2xl font-semibold text-(--maroon)">Nuevo trámite</h2>
          <p className="text-sm text-(--text-muted)">Alta directa en la tabla de procedimientos.</p>
        </div>
        <form action={createAction} className="mt-6 grid gap-5 lg:grid-cols-[1fr_1fr]">
          <label className="grid gap-2 text-sm font-bold">
            Nombre
            <input
              className="focus-ring h-11 border border-(--surface-line) px-3 font-normal"
              name="name"
              placeholder="Ej. Renovación de residencia temporal"
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Institución
            <InstitutionSelect institutions={institutions} />
          </label>
          <label className="grid gap-2 text-sm font-bold lg:col-span-2">
            Descripción
            <textarea
              className="focus-ring min-h-24 border border-(--surface-line) p-3 font-normal"
              name="description"
              placeholder="Describe el objetivo del trámite."
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-bold lg:col-span-2">
            Palabras clave
            <input
              className="focus-ring h-11 border border-(--surface-line) px-3 font-normal"
              name="keywords"
              placeholder="residencia, renovacion, temporal"
              required
            />
          </label>
          <div className="lg:col-span-2">
            <Button type="submit">
              <Icon name="circlePlus" size={18} />
              Crear trámite
            </Button>
          </div>
        </form>
      </section>

      <section className="institutional-card overflow-hidden">
        <div className="flex items-center justify-between border-b border-(--surface-line) p-5">
          <h2 className="brand-serif text-2xl font-semibold text-(--maroon)">Listado de trámites</h2>
          <span className="bg-(--surface-muted) px-3 py-1 text-sm">CRUD completo</span>
        </div>

        {procedures.length === 0 ? (
          <div className="grid min-h-56 place-items-center p-8 text-center">
            <div>
              <Icon name="folder" className="mx-auto text-(--maroon-strong)" size={34} />
              <p className="mt-4 font-bold">No hay trámites registrados.</p>
              <p className="mt-2 text-sm text-(--text-muted)">Crea el primer trámite desde el formulario superior.</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] text-left">
              <thead className="bg-(--surface-muted) text-sm font-bold tracking-[0.06em]">
                <tr>
                  <th className="p-5">ID</th>
                  <th className="p-5">Trámite</th>
                  <th className="p-5">Institución</th>
                  <th className="p-5">Palabras clave</th>
                  <th className="p-5 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {procedures.map((procedure) => (
                  <tr key={procedure.procedureId} className="border-t border-(--surface-line) align-top">
                    <td className="p-5 font-bold text-(--maroon-strong)">#{procedure.procedureId}</td>
                    <td className="p-5">
                      <p className="font-bold">{procedure.name}</p>
                      <p className="mt-2 max-w-xl text-sm leading-6 text-(--text-muted)">{procedure.description}</p>
                    </td>
                    <td className="p-5">{procedure.institutionName}</td>
                    <td className="p-5">
                      <div className="flex max-w-xs flex-wrap gap-2">
                        {procedure.keywords.map((keyword) => (
                          <span key={keyword} className="border border-(--surface-line) bg-(--surface-muted) px-2 py-1 text-xs">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-5 text-right">
                      <details className="group inline-block text-left">
                        <summary className="focus-ring inline-flex min-h-10 cursor-pointer list-none items-center gap-2 border border-(--gold-light) px-3 text-sm font-bold text-(--maroon-strong)">
                          <Icon name="settings" size={16} />
                          Gestionar
                        </summary>
                        <div className="mt-3 w-[520px] max-w-[calc(100vw-3rem)] border border-(--surface-line) bg-white p-4 shadow-lg">
                          <form action={updateAction} className="grid gap-4">
                            <input name="procedure_id" type="hidden" value={procedure.procedureId} />
                            <label className="grid gap-2 text-sm font-bold">
                              Nombre
                              <input
                                className="focus-ring h-10 border border-(--surface-line) px-3 font-normal"
                                defaultValue={procedure.name}
                                name="name"
                                required
                              />
                            </label>
                            <label className="grid gap-2 text-sm font-bold">
                              Institución
                              <InstitutionSelect defaultValue={procedure.institutionId} institutions={institutions} />
                            </label>
                            <label className="grid gap-2 text-sm font-bold">
                              Descripción
                              <textarea
                                className="focus-ring min-h-24 border border-(--surface-line) p-3 font-normal"
                                defaultValue={procedure.description}
                                name="description"
                                required
                              />
                            </label>
                            <label className="grid gap-2 text-sm font-bold">
                              Palabras clave
                              <input
                                className="focus-ring h-10 border border-(--surface-line) px-3 font-normal"
                                defaultValue={keywordsText(procedure.keywords)}
                                name="keywords"
                                required
                              />
                            </label>
                            <Button type="submit" variant="secondary">
                              <Icon name="checkCircle" size={18} />
                              Guardar cambios
                            </Button>
                          </form>
                          <form action={deleteAction} className="mt-3 border-t border-(--surface-line) pt-3">
                            <input name="procedure_id" type="hidden" value={procedure.procedureId} />
                            <Button
                              className="w-full border-(--danger) bg-(--danger) hover:bg-[#93000a]"
                              type="submit"
                            >
                              <Icon name="trash" size={18} />
                              Eliminar trámite
                            </Button>
                          </form>
                        </div>
                      </details>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
