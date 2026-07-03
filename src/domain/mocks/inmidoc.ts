import type { ActivityRow, DashboardMetric } from "../entities/dashboard";
import type { Procedure, ProcedureDocument } from "../entities/procedure";
import type { ReportTicket } from "../entities/report";

export const featuredProcedures: Procedure[] = [
  {
    id: "curp",
    institution: "SEGOB",
    title: "Consulta e impresión de la CURP",
    description:
      "Obtén tu Clave Única de Registro de Población de manera gratuita y en línea. Documento indispensable para trámites oficiales en México.",
    featured: true,
    icon: "▣",
  },
  {
    id: "constancia-fiscal",
    institution: "SAT",
    title: "Constancia de Situación Fiscal",
    description:
      "Genera tu constancia con Cédula de Identificación Fiscal. Conoce tu régimen y obligaciones fiscales registradas.",
  },
  {
    id: "nss",
    institution: "IMSS",
    title: "Asignación de Número de Seguridad Social (NSS)",
    description:
      "Solicita o localiza tu NSS. Es único, permanente e intransferible. Necesario para cotizar en el seguro social.",
  },
  {
    id: "pasaporte",
    institution: "SRE",
    title: "Cita para Pasaporte",
    description:
      "Programa tu cita en línea para el trámite de expedición de pasaporte ordinario mexicano.",
  },
  {
    id: "cedula",
    institution: "SEP",
    title: "Consulta de Cédula Profesional",
    description:
      "Verifica la autenticidad y validez de las cédulas profesionales emitidas por la Dirección General de Profesiones.",
  },
];

export const procedureDocuments: ProcedureDocument[] = [
  {
    id: "official-id",
    name: "Identificación Oficial",
    type: "PDF (Original o Copia)",
    required: true,
  },
];

export const dashboardMetrics: DashboardMetric[] = [
  {
    label: "Total trámites",
    value: "14,592",
    note: "+12% desde el mes pasado",
    tone: "gold",
    icon: "□",
  },
  {
    label: "Tickets activos",
    value: "843",
    note: "45 requieren atención inmediata",
    tone: "maroon",
    icon: "▤",
  },
  {
    label: "Instituciones enlazadas",
    value: "128",
    note: "85% Cobertura Nacional",
    tone: "neutral",
    icon: "▥",
  },
];

export const activityRows: ActivityRow[] = [
  {
    folio: "FX-2024-0891",
    procedure: "Registro de Identidad",
    requester: "Juan Carlos Pérez",
    status: "En Revisión",
    date: "Hoy, 10:42 AM",
  },
  {
    folio: "FX-2024-0890",
    procedure: "Acreditación Legal",
    requester: "María López Sánchez",
    status: "Completado",
    date: "Ayer, 16:15 PM",
  },
  {
    folio: "FX-2024-0889",
    procedure: "Validación Documental",
    requester: "Empresa XYZ S.A.",
    status: "Rechazado",
    date: "Ayer, 09:30 AM",
  },
  {
    folio: "FX-2024-0888",
    procedure: "Registro de Identidad",
    requester: "Roberto Gómez Bolaños",
    status: "En Revisión",
    date: "12 Oct, 14:20 PM",
  },
];

export const reportTickets: ReportTicket[] = [
  {
    id: "#TK-2024-8901",
    title: "Falla en portal de validación",
    description:
      "Error 500 al intentar cargar documentos PDF dentro del módulo de validación C. Se requiere revisión urgente de logs del servidor.",
    status: "Pendiente",
    createdAt: "24/10/2024 09:30 AM",
    priority: "Alta",
    requester: "Mesa de Ayuda L1",
    department: "Sistemas Centrales",
  },
  {
    id: "#TK-2024-8895",
    title: "Actualización de datos cívicos",
    description: "Solicitud de corrección de domicilio en expediente ciudadano.",
    status: "En Progreso",
    createdAt: "23/10/2024 13:12 PM",
    priority: "Media",
    requester: "Atención Ciudadana",
    department: "Expedientes",
  },
  {
    id: "#TK-2024-8890",
    title: "Consulta sobre requisitos",
    description: "Ciudadano solicita listado actualizado para trámite de residencia.",
    status: "Resuelto",
    createdAt: "22/10/2024 11:05 AM",
    priority: "Baja",
    requester: "Portal Público",
    department: "Trámites",
  },
  {
    id: "#TK-2024-8888",
    title: "Lentitud en sistema central",
    description: "Reporte de tiempos de respuesta superiores al promedio.",
    status: "En Progreso",
    createdAt: "21/10/2024 18:45 PM",
    priority: "Media",
    requester: "Operaciones",
    department: "Infraestructura",
  },
  {
    id: "#TK-2024-8875",
    title: "Reinicio de contraseña administrativa",
    description: "Solicitud de acceso al portal departamental.",
    status: "Resuelto",
    createdAt: "20/10/2024 08:11 AM",
    priority: "Baja",
    requester: "Administración",
    department: "Usuarios",
  },
];
