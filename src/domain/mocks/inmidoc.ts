import type { ActivityRow, DashboardMetric } from "../entities/dashboard";
import type { Procedure, ProcedureDocument } from "../entities/procedure";
import type { ReportTicket, UserReportCategory } from "../entities/report";

export const featuredProcedures: Procedure[] = [
  {
    id: "curp",
    institution: "SEGOB",
    institutionName: "Secretaría de Gobernación",
    title: "Consulta e impresión de la CURP",
    description:
      "Obtén tu Clave Única de Registro de Población de manera gratuita y en línea. Documento indispensable para trámites oficiales en México.",
    detail:
      "Permite consultar, descargar e imprimir la constancia CURP certificada para usarla en trámites escolares, laborales, fiscales, migratorios y de identidad.",
    cost: "Gratuito",
    estimatedTime: "Entrega inmediata",
    modality: "En línea",
    availability: "Disponible 24/7",
    steps: ["Captura tus datos personales o CURP.", "Valida coincidencias en el registro nacional.", "Descarga la constancia en PDF."],
    keywords: ["CURP", "identidad", "registro", "constancia"],
    featured: true,
    icon: "idCard",
  },
  {
    id: "constancia-fiscal",
    institution: "SAT",
    institutionName: "Servicio de Administración Tributaria",
    title: "Constancia de Situación Fiscal",
    description:
      "Genera tu constancia con Cédula de Identificación Fiscal. Conoce tu régimen y obligaciones fiscales registradas.",
    detail:
      "Documento oficial que concentra RFC, domicilio fiscal, régimen tributario y obligaciones registradas ante la autoridad fiscal.",
    cost: "Gratuito",
    estimatedTime: "Entrega inmediata",
    modality: "En línea",
    availability: "Disponible con RFC activo",
    steps: ["Ingresa con RFC y credenciales fiscales.", "Confirma datos fiscales registrados.", "Genera y descarga la constancia."],
    keywords: ["RFC", "SAT", "constancia", "fiscal"],
    icon: "fileText",
  },
  {
    id: "nss",
    institution: "IMSS",
    institutionName: "Instituto Mexicano del Seguro Social",
    title: "Asignación de Número de Seguridad Social (NSS)",
    description:
      "Solicita o localiza tu NSS. Es único, permanente e intransferible. Necesario para cotizar en el seguro social.",
    detail:
      "Consulta o asigna el Número de Seguridad Social requerido para alta laboral, acceso a servicios médicos y registro de cotizaciones.",
    cost: "Gratuito",
    estimatedTime: "Entrega inmediata",
    modality: "En línea",
    availability: "Disponible con CURP y correo electrónico",
    steps: ["Captura CURP y correo electrónico.", "Verifica identidad del solicitante.", "Recibe NSS y comprobante digital."],
    keywords: ["IMSS", "NSS", "seguridad social", "empleo"],
    icon: "shield",
  },
  {
    id: "pasaporte",
    institution: "SRE",
    institutionName: "Secretaría de Relaciones Exteriores",
    title: "Cita para Pasaporte",
    description:
      "Programa tu cita en línea para el trámite de expedición de pasaporte ordinario mexicano.",
    detail:
      "Permite agendar atención presencial para expedición o renovación de pasaporte ordinario, con selección de oficina y horario disponible.",
    cost: "Variable según vigencia",
    estimatedTime: "De 1 a 3 días hábiles",
    modality: "Cita presencial",
    availability: "Sujeto a disponibilidad por oficina",
    steps: ["Selecciona oficina y horario.", "Registra datos del solicitante.", "Presenta documentos y pago el día de la cita."],
    keywords: ["SRE", "pasaporte", "cita", "viaje"],
    icon: "calendar",
  },
  {
    id: "cedula",
    institution: "SEP",
    institutionName: "Secretaría de Educación Pública",
    title: "Consulta de Cédula Profesional",
    description:
      "Verifica la autenticidad y validez de las cédulas profesionales emitidas por la Dirección General de Profesiones.",
    detail:
      "Consulta pública para verificar cédulas profesionales, nombre del titular, institución educativa y profesión registrada.",
    cost: "Gratuito",
    estimatedTime: "Entrega inmediata",
    modality: "En línea",
    availability: "Consulta pública",
    steps: ["Captura nombre o número de cédula.", "Revisa coincidencias oficiales.", "Consulta detalle de la cédula registrada."],
    keywords: ["SEP", "cédula", "profesional", "validación"],
    icon: "badgeCheck",
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
    icon: "fileText",
  },
  {
    label: "Tickets activos",
    value: "843",
    note: "45 requieren atención inmediata",
    tone: "maroon",
    icon: "ticket",
  },
  {
    label: "Instituciones enlazadas",
    value: "128",
    note: "85% Cobertura Nacional",
    tone: "neutral",
    icon: "building",
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

export const userReportCategories: UserReportCategory[] = [
  {
    id: "portal",
    label: "Problema con el portal",
    description: "Errores, lentitud, enlaces rotos o imposibilidad de cargar documentos.",
  },
  {
    id: "procedure",
    label: "Duda sobre un trámite",
    description: "Información incompleta, requisitos confusos o datos institucionales inconsistentes.",
  },
  {
    id: "document",
    label: "Validación documental",
    description: "Problemas para revisar, descargar o validar documentos requeridos.",
  },
];
