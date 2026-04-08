export type fileDataTypes = {
  id: string;
  ticket_id: string;
  ticket_phase_id: string | null;
  ticket_questionnaire_answer_id: string | null;
  storage_path: string;
  uploaded_by: string;
  created_at: string;
};

export type QuestionnaireAnswerDataTypes = {
  id: string;
  ticket_id: string;
  ticket_question_id: string;
  text_answer: string | null;
};

export type AnswersState = Record<string, string | File | null>;

export type QuestionnaireQuestionTypes = {
  id: string;
  label: string;
  description: string;
  is_required: boolean;
  order_index: number;
  field_type: "textField" | "upload";
};

export type QuestionnaireSnapshotDataTypes = {
  id: string;
  ticket_id: string;
  template_question_id: string;
  label: string;
  description: string;
  is_required: boolean;
  order_index: number;
  field_type: "textField" | "upload";
};

export type CheckboxStateTypes = {
  key: TicketTaskDataTypes["id"];
  checked: TicketTaskDataTypes["is_done"];
};

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
  ticket_id: string;
  template_phase_id: string;
  title: string;
  order_index: number;
  status: PhaseStatus;
  proof_required: boolean;
  approval_required: boolean;
  started_at: string | null;
  completed_at: string | null;
  approved_by: string | null;
  created_at: string;
  ticket_tasks: TicketTaskDataTypes[];
};

export type TicketDataTypes = {
  id: string;
  template_id: string;
  template_title: string;
  started_by: string;
  assigned_to: string;
  label: string;
  status: TicketStatus;
  created_at: string;
  completed_at: string | null;
  organization_id: string;
  ticket_phases?: TicketPhaseDataTypes[];
  ticket_questions: QuestionnaireSnapshotDataTypes[];
  ticket_answers: QuestionnaireAnswerDataTypes[];
};

export type TicketStatus = "open" | "inProgress" | "review" | "done";

export type PhaseStatus = "pending" | "in_progress" | "review" | "done";

export type UserRole = "admin" | "member" | null;

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
  ticket_id: string;
  ticket_phase_id: string | null;
  event_type: ActivityLogEventType;
  message: string | null;
  user_id: string;
  created_at: string;
};

export type TemplateWorkflow = {
  id: string;
  title: string;
  description: string;
  template_questions: QuestionnaireQuestionTypes[];
  template_phases: TemplatePhase[];
};

export type TemplatePhase = {
  id: string;
  template_id?: string;
  order_index?: number;
  title: string;
  description: string;
  proof_required: boolean;
  proof_description: string;
  approval_required: boolean;
  template_tasks: TemplateTask[];
};

export type TemplateTask = {
  id: string;
  template_phase_id?: string;
  order_index?: number;
  label: string;
  description: string;
  is_required: boolean;
};
