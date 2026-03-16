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

export const getWorkflowList = (): TemplateWorkflow[] | [] => {
  let workflowList;
  const list = localStorage.getItem("templateWorkflow");
  if (!list) {
    return [];
  }

  workflowList = JSON.parse(list);

  return workflowList;
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

  const newPhases = currentWorkflow.phases.map((p, index) => {
    const newPhaseID = crypto.randomUUID();
    const newTasks = p.tasks.map((t, index) => {
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
      started_at: null,
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
    questionnaireSnapshot: currentWorkflow.questionnaire,
    ticket_phase: newPhases,
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
