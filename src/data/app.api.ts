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

  const newTicket = {
    id: crypto.randomUUID(),
    template_id: selectedWorkflowId,
    template_title: currentWorkflow.title,
    started_by: "Demo User",
    assigned_to: "Demo User",
    label: currentWorkflow.title,
    status: "open",
    created_at: new Date().toISOString(),
    completed_at: null,
    questionnaireAnswers: answers,
    questionnaireSnapshot: currentWorkflow.questionnaire,
    ticket_phase: currentWorkflow.phases,
  };

  const storedTickets = localStorage.getItem("tickets");
  const parsedTickets = storedTickets ? JSON.parse(storedTickets) : [];

  const updatedTickets = [...parsedTickets, newTicket];

  localStorage.setItem("tickets", JSON.stringify(updatedTickets));
};
