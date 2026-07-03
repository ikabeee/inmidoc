import type { ReportTicket } from "@/src/domain/entities/report";

import { Button } from "../components/Button";
import { Icon } from "../components/Icon";

function statusClass(status: string) {
  if (status === "Pendiente") return "status-pending";
  if (status === "En Progreso") return "status-progress";
  return "status-resolved";
}

export function ReportsView({ tickets, selectedTicket }: { tickets: ReportTicket[]; selectedTicket: ReportTicket }) {
  return (
    <div className="mx-auto max-w-[1180px]">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="brand-serif text-4xl font-bold text-[var(--text-main)]">Bandeja de Reportes</h1>
          <p className="mt-3 text-lg text-[var(--text-muted)]">Gestión y seguimiento de tickets ciudadanos e internos.</p>
        </div>
        <label className="institutional-card flex h-14 items-center gap-3 px-5">
          <Icon>≡</Icon>
          <select className="focus-ring border-0 bg-transparent font-bold">
            <option>Todos los estados</option>
            <option>Pendiente</option>
            <option>En Progreso</option>
            <option>Resuelto</option>
          </select>
        </label>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <section className="institutional-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-[var(--surface-line)] p-5">
            <h2 className="brand-serif text-2xl font-semibold text-[var(--maroon)]">Listado de Tickets</h2>
            <span className="bg-[var(--surface-muted)] px-3 py-1 text-sm">Mostrando 5 de 142</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left">
              <thead className="bg-[var(--surface-muted)] text-sm font-bold tracking-[0.08em]">
                <tr>
                  <th className="p-5">ID Ticket</th>
                  <th className="p-5">Título</th>
                  <th className="p-5">Estado</th>
                  <th className="p-5 text-right">Acción</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket, index) => (
                  <tr
                    key={ticket.id}
                    className={`border-t border-[var(--surface-line)] ${index === 0 ? "bg-[#fff0f3]" : "bg-white hover:bg-[var(--surface-muted)]"}`}
                  >
                    <td className="p-5 font-bold text-[var(--maroon-strong)]">{ticket.id}</td>
                    <td className="p-5">
                      <p className="font-bold">{ticket.title}</p>
                      <p className="mt-1 max-w-xs truncate text-sm text-[var(--text-muted)]">{ticket.description}</p>
                    </td>
                    <td className="p-5">
                      <span className={`inline-block px-3 py-2 text-sm ${statusClass(ticket.status)}`}>{ticket.status}</span>
                    </td>
                    <td className="p-5 text-right">›</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between p-5">
            <button className="border border-[var(--surface-line)] px-4 py-2 text-sm text-slate-400">Anterior</button>
            <div className="flex gap-2">
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className={`h-10 w-10 border text-sm font-bold ${page === 1 ? "border-[var(--maroon)] bg-[var(--maroon)] text-white" : "border-[var(--surface-line)] bg-white"}`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button className="border border-[var(--surface-line)] px-4 py-2 text-sm">Siguiente</button>
          </div>
        </section>
        <aside className="institutional-card overflow-hidden">
          <div className="p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm">Ticket Seleccionado</p>
                <h2 className="brand-serif mt-1 text-2xl font-bold text-[var(--maroon)]">{selectedTicket.id}</h2>
              </div>
              <span className={`px-3 py-2 text-sm ${statusClass(selectedTicket.status)}`}>{selectedTicket.status}</span>
            </div>
            <h3 className="mt-6 text-xl font-bold">{selectedTicket.title}</h3>
          </div>
          <div className="border-t-4 border-[var(--gold-light)] p-6">
            <h3 className="border-b border-[var(--surface-line)] pb-3 text-lg font-bold">Descripción del Problema</h3>
            <p className="mt-4 leading-7 text-[var(--text-muted)]">{selectedTicket.description}</p>
            <div className="mt-6 grid grid-cols-2 gap-5 text-sm">
              <div>
                <p className="font-bold">Fecha de Creación</p>
                <p className="mt-2">{selectedTicket.createdAt}</p>
              </div>
              <div>
                <p className="font-bold">Prioridad</p>
                <p className="mt-2 font-bold text-[var(--danger)]">! {selectedTicket.priority}</p>
              </div>
              <div>
                <p className="font-bold">Reportado por</p>
                <p className="mt-2">{selectedTicket.requester}</p>
              </div>
              <div>
                <p className="font-bold">Departamento</p>
                <p className="mt-2">{selectedTicket.department}</p>
              </div>
            </div>
            <label className="mt-7 grid gap-2 text-sm font-bold">
              Actualizar Estado
              <select className="focus-ring h-11 border border-[var(--surface-line)] px-3 font-normal">
                <option>{selectedTicket.status}</option>
              </select>
            </label>
            <label className="mt-5 grid gap-2 text-sm font-bold">
              Añadir Nota Interna
              <textarea className="focus-ring min-h-28 border border-[var(--surface-line)] p-3 font-normal" placeholder="Escriba comentarios sobre la resolución..." />
            </label>
            <div className="mt-7 grid grid-cols-2 gap-3">
              <Button variant="outline">Reasignar</Button>
              <Button>Guardar Cambios</Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
