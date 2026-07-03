export type ProcedureIcon = "idCard" | "fileText" | "shield" | "calendar" | "badgeCheck";

export type Procedure = {
  id: string;
  institution: string;
  institutionName: string;
  title: string;
  description: string;
  detail: string;
  cost: string;
  estimatedTime: string;
  modality: string;
  availability: string;
  steps: string[];
  keywords: string[];
  featured?: boolean;
  icon?: ProcedureIcon;
};

export type ProcedureDocument = {
  id: string;
  name: string;
  type: string;
  required: boolean;
};
