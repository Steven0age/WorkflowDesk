export type TicketStatus = "open" | "inProgress" | "review" | "done";

export type TicketTaskDataTypes = {
  id: string;
  ticket_phase_id: string;
  template_task_id: string;
  label: string;
  is_required: boolean;
  is_done: boolean;
  order_index: number;
  created_at: string;
};

export type TicketPhaseDataTypes = {
  id: string;
  ticket_id: number;
  template_phase_id: string;
  title: string;
  order_index: number;
  status: TicketStatus;
  proof_required: boolean;
  approval_required: boolean;
  completed_at: string | null;
  approved_by: string | null;
  created_at: string;
  ticket_task: TicketTaskDataTypes[];
};

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
  ticket_phase?: TicketPhaseDataTypes[];
};

export type ActivityLogEventType =
  | "ticket_created"
  | "ticket_assigned"
  | "ticket_submitted_for_approval"
  | "ticket_approval_rejected"
  | "ticket_approval_approved"
  | "ticket_completed"
  | "phase_started"
  | "phase_submitted_for_approval"
  | "phase_file_uploaded"
  | "phase_approval_rejected"
  | "phase_approval_approved"
  | "phase_completed";

export type ActivityLogDataTypes = {
  id: string;
  ticket_id: number;
  ticket_phase_id: string | null;
  event_type: ActivityLogEventType;
  message: string | null;
  user_id: string;
  created_at: string;
};
