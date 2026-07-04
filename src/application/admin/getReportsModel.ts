import { cookies } from "next/headers";

import { createClient } from "@/src/utils/supabase/server";
import type { ReportTicket, TicketStatus } from "@/src/domain/entities/report";

type TicketRow = {
  ticket_id: number;
  title: string;
  description: string;
  status: string;
};

const validStatuses: TicketStatus[] = [
  "Pendiente",
  "En Progreso",
  "Resuelto",
  "Rechazado",
  "Completado",
  "En Revisión",
];

export async function getReportsModel() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("tickets")
    .select("ticket_id,title,description,status")
    .order("ticket_id", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  const tickets = ((data ?? []) as TicketRow[]).map((ticket) => ({
    id: String(ticket.ticket_id),
    title: ticket.title,
    description: ticket.description,
    status: validStatuses.includes(ticket.status as TicketStatus)
      ? (ticket.status as TicketStatus)
      : "Pendiente",
  }));

  return {
    tickets,
    selectedTicket:
      tickets[0] ?? {
        id: "0",
        title: "Sin reportes",
        description: "No hay tickets registrados en la base de datos.",
        status: "Pendiente",
      },
  };
}
