export type TicketStatus = "Pendiente" | "En Progreso" | "Resuelto" | "Rechazado" | "Completado" | "En Revisión";

export type ReportTicket = {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  createdAt?: string;
  priority?: "Alta" | "Media" | "Baja";
  requester?: string;
  department?: string;
};

export type UserReportCategory = {
  id: string;
  label: string;
  description: string;
};
