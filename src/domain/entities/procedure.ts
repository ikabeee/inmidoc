export type Procedure = {
  id: string;
  institution: string;
  title: string;
  description: string;
  featured?: boolean;
  icon?: string;
};

export type ProcedureDocument = {
  id: string;
  name: string;
  type: string;
  required: boolean;
};
