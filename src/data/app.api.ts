import { supabase } from "../supabase-client";
import type {
  AnswersState,
  TemplateWorkflow,
  TicketDataTypes,
} from "../types/types";

type createTicketParams = {
  workflowList: TemplateWorkflow[];
  selectedWorkflowId: TemplateWorkflow["id"];
  answers: AnswersState;
};

export const getWorkflowList = async (): Promise<TemplateWorkflow[] | []> => {
  const { data, error } = await supabase.from("template_workflows").select("*");

  if (error) {
    console.error("Fetching workflows failed:", error);
    throw error;
  }

  if (!data) {
    return [];
  }

  return data;
};

export const getTicketList = (): TicketDataTypes[] | [] => {
  let ticketList;
  const list = localStorage.getItem("tickets");
  if (!list) {
    return [];
  }

  ticketList = JSON.parse(list);

  return ticketList;
};

export const fetchTicket = (
  id: TicketDataTypes["id"],
): TicketDataTypes | null => {
  let ticketList: TicketDataTypes[];

  const list = localStorage.getItem("tickets");
  if (!list) {
    return null;
  }

  ticketList = JSON.parse(list);
  const fetchedTicket = ticketList.find((t) => t.id === id);

  if (!fetchedTicket) return null;
  return fetchedTicket;
};

export const createTicket = ({
  workflowList,
  selectedWorkflowId,
  answers,
}: createTicketParams) => {
  const currentWorkflow = workflowList.find(
    (workflow) => workflow.id === selectedWorkflowId,
  );

  if (!currentWorkflow) {
    throw new Error("Workflow nicht gefunden");
  }

  const newTicketId = crypto.randomUUID();
  const now = new Date().toISOString();

  const newPhases = currentWorkflow.template_phases.map((p, index) => {
    const newPhaseID = crypto.randomUUID();
    const newTasks = p.template_tasks.map((t, index) => {
      return {
        id: t.id,
        ticket_phase_id: newPhaseID,
        template_task_id: t.id,
        label: t.label,
        is_required: t.is_required,
        is_done: false,
        order_index: index,
        created_at: now,
      };
    });

    return {
      id: newPhaseID,
      ticket_id: newTicketId,
      template_phase_id: p.id,
      title: p.title,
      order_index: p.order_index,
      status: index === 0 ? "inProgress" : "pending",
      proof_required: p.proof_required,
      approval_required: p.approval_required,
      started_at: index === 0 ? now : null,
      completed_at: null,
      approved_by: null,
      created_at: now,
      tasks: newTasks,
    };
  });

  const newTicket = {
    id: newTicketId,
    template_id: selectedWorkflowId,
    template_title: currentWorkflow.title,
    started_by: "Demo User",
    assigned_to: "Demo User",
    label: currentWorkflow.title,
    status: "open",
    created_at: now,
    completed_at: null,
    questionnaireAnswers: answers,
    questionnaireSnapshot: currentWorkflow.template_questions,
    phases: newPhases,
  };

  const storedTickets = localStorage.getItem("tickets");
  const parsedTickets = storedTickets ? JSON.parse(storedTickets) : [];

  const updatedTickets = [...parsedTickets, newTicket];

  localStorage.setItem("tickets", JSON.stringify(updatedTickets));
};

export const updateTicket = (updatedTicket: TicketDataTypes) => {
  const storedTickets = JSON.parse(localStorage.getItem("tickets") ?? "[]");

  const updatedTickets = storedTickets.map((ticket: TicketDataTypes) =>
    ticket.id === updatedTicket.id ? updatedTicket : ticket,
  );

  localStorage.setItem("tickets", JSON.stringify(updatedTickets));

  return updatedTicket;
};
