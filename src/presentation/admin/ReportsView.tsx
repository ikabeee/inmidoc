"use client";

import { useState } from "react";
import type { ReportTicket, TicketStatus } from "@/src/domain/entities/report";

import { Button } from "../components/Button";
import { Icon } from "../components/Icon";

const statusOptions: TicketStatus[] = ["Pendiente", "En Progreso", "Completado"];

function statusClass(status: string) {
  if (status === "Pendiente") return "status-pending";
  if (status === "En Progreso") return "status-progress";
  return "status-resolved";
}

const PAGE_SIZE = 10;

export function ReportsView({ tickets, selectedTicket }: { tickets: ReportTicket[]; selectedTicket: ReportTicket }) {
  const [visibleTickets, setVisibleTickets] = useState<ReportTicket[]>(tickets.filter((ticket) => ticket.status !== "Completado"));
  const [activeTicket, setActiveTicket] = useState<ReportTicket>(
    tickets.find((ticket) => ticket.id === selectedTicket.id && ticket.status !== "Completado") ?? visibleTickets[0] ?? selectedTicket,
  );
  const [pendingStatus, setPendingStatus] = useState<TicketStatus>(activeTicket.status);
  const [isSaving, setIsSaving] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(visibleTickets.length / PAGE_SIZE));
  const paginatedTickets = visibleTickets.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function goToPage(page: number) {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);
  }

  async function handleSaveStatus() {
    if (!activeTicket.id || activeTicket.id === "0") {
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(`/api/tickets?id=${activeTicket.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: pendingStatus }),
      });

      if (!response.ok) {
        throw new Error("No se pudo actualizar el estado del reporte");
      }

      if (pendingStatus === "Completado") {
        setVisibleTickets((currentTickets) => currentTickets.filter((ticket) => ticket.id !== activeTicket.id));
        setActiveTicket((currentTicket) => {
          const nextTicket = visibleTickets.find((ticket) => ticket.id !== currentTicket.id);
          return nextTicket ?? { ...currentTicket, status: pendingStatus };
        });
      } else {
        setVisibleTickets((currentTickets) =>
          currentTickets.map((ticket) => (ticket.id === activeTicket.id ? { ...ticket, status: pendingStatus } : ticket)),
        );
      }
    } catch {
      // noop for now
    } finally {
      setIsSaving(false);
    }
  }

  

  return (
    <div className="mx-auto max-w-[1180px]">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="brand-serif text-4xl font-bold text-(--text-main)">Bandeja de Reportes</h1>
          <p className="mt-3 text-lg text-(--text-muted)">Gestión y seguimiento de tickets ciudadanos e internos.</p>
        </div>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <section className="institutional-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-(--surface-line) p-5">
            <h2 className="brand-serif text-2xl font-semibold text-(--maroon)">Listado de Tickets</h2>
            <span className="bg-(--surface-muted) px-3 py-1 text-sm">Mostrando {visibleTickets.length} tickets</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left">
              <thead className="bg-(--surface-muted) text-sm font-bold tracking-[0.08em]">
                <tr>
                  <th className="p-5">ID Ticket</th>
                  <th className="p-5">Título</th>
                  <th className="p-5">Estado</th>
                  <th className="p-5 text-right">Acción</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className={`border-t border-(--surface-line) ${ticket.id === activeTicket.id ? "bg-[#fff0f3]" : "bg-white hover:bg-(--surface-muted)"}`}
                    onClick={() => setActiveTicket(ticket)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        setActiveTicket(ticket);
                      }
                    }}
                  >
                    <td className="p-5 font-bold text-(--maroon-strong)">{ticket.id}</td>
                    <td className="p-5">
                      <p className="font-bold">{ticket.title}</p>
                      <p className="mt-1 max-w-xs truncate text-sm text-(--text-muted)">{ticket.description}</p>
                    </td>
                    <td className="p-5">
                      <span className={`inline-block px-3 py-2 text-sm ${statusClass(ticket.status)}`}>{ticket.status}</span>
                    </td>
                    <td className="p-5 text-right">
                      <Icon name="chevronRight" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between gap-3 p-5">
            <button
              className={`border border-(--surface-line) px-4 py-2 text-sm ${currentPage === 1 ? "cursor-not-allowed text-slate-400" : "text-(--text-main)"}`}
              disabled={currentPage === 1}
              onClick={() => goToPage(currentPage - 1)}
              type="button"
            >
              Anterior
            </button>
            <div className="flex flex-wrap justify-center gap-2">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  className={`h-10 w-10 border text-sm font-bold ${page === currentPage ? "border-(--maroon) bg-(--maroon) text-white" : "border-(--surface-line) bg-white"}`}
                  onClick={() => goToPage(page)}
                  type="button"
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              className={`border border-(--surface-line) px-4 py-2 text-sm ${currentPage === totalPages ? "cursor-not-allowed text-slate-400" : "text-(--text-main)"}`}
              disabled={currentPage === totalPages}
              onClick={() => goToPage(currentPage + 1)}
              type="button"
            >
              Siguiente
            </button>
          </div>
        </section>
        <aside className="institutional-card overflow-hidden">
          <div className="p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm">Ticket Seleccionado</p>
                <h2 className="brand-serif mt-1 text-2xl font-bold text-(--maroon)">{activeTicket.id}</h2>
              </div>
              <span className={`px-3 py-2 text-sm ${statusClass(activeTicket.status)}`}>{activeTicket.status}</span>
            </div>
            <h3 className="mt-6 text-xl font-bold">{activeTicket.title}</h3>
          </div>
          <div className="border-t-4 border-(--gold-light) p-6">
            <h3 className="border-b border-(--surface-line) pb-3 text-lg font-bold">Descripción del Problema</h3>
            <p className="mt-4 leading-7 text-(--text-muted)">{activeTicket.description}</p>
            <div className="mt-6 grid grid-cols-2 gap-5 text-sm">
              
            </div>
            <label className="mt-7 grid gap-2 text-sm font-bold">
              Actualizar Estado
              <select
                className="focus-ring h-11 border border-(--surface-line) px-3 font-normal"
                onChange={(event) => setPendingStatus(event.target.value as TicketStatus)}
                value={pendingStatus}
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
            <div className="mt-7">
              <Button onClick={handleSaveStatus} disabled={isSaving}>
                {isSaving ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
