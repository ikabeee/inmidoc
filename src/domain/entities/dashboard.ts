export type DashboardMetric = {
  label: string;
  value: string;
  note: string;
  tone: "gold" | "maroon" | "neutral";
  icon: "fileText" | "ticket" | "building";
};

export type ActivityRow = {
  folio: string;
  procedure: string;
  requester: string;
  status: string;
  date: string;
};
