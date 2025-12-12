export type TicketStatus = "open" | "inProgress" | "review" | "done";

export type TicketDataTypes = {
  id: number;
  template_id: string;
  template_title: string;
  started_by: string;
  assigned_to: string;
  label: string;
  status: TicketStatus;
  created_at: string;
  completed_at: string | null;
};
