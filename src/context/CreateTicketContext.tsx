import { createContext, useContext, useState, type ReactNode } from "react";
import type {
  AnswersState,
  TemplateWorkflow,
  TicketDataTypes,
} from "../types/types";

type CreateTicketContextType = {
  workflowList: TemplateWorkflow[];
  setWorkflowList: React.Dispatch<React.SetStateAction<TemplateWorkflow[]>>;
  selectedWorkflowId: TemplateWorkflow["id"];
  setSelectedWorkflowId: React.Dispatch<
    React.SetStateAction<TemplateWorkflow["id"]>
  >;
  answers: AnswersState;
  setAnswers: React.Dispatch<React.SetStateAction<AnswersState>>;
  hasMissingRequiredAnswers: () => boolean;
  ticketLabel: TicketDataTypes["label"];
  setTicketLabel: React.Dispatch<
    React.SetStateAction<TicketDataTypes["label"]>
  >;
  assignedTo: TicketDataTypes["assigned_to"];
  setAssignedTo: React.Dispatch<
    React.SetStateAction<TicketDataTypes["assigned_to"]>
  >;
  hasMissingAssignedTo: () => boolean;
};

export const CreateTicketContext = createContext<
  CreateTicketContextType | undefined
>(undefined);

export function CreateTicketProvider({ children }: { children: ReactNode }) {
  const [workflowList, setWorkflowList] = useState<TemplateWorkflow[]>([]);
  const [selectedWorkflowId, setSelectedWorkflowId] = useState("");
  const [answers, setAnswers] = useState<AnswersState>({});
  const [ticketLabel, setTicketLabel] = useState<TicketDataTypes["label"]>("");
  const [assignedTo, setAssignedTo] =
    useState<TicketDataTypes["assigned_to"]>("");

  const hasMissingRequiredAnswers = () => {
    const currentWorkflow = workflowList.find(
      (workflow) => workflow.id === selectedWorkflowId,
    );

    if (!currentWorkflow) {
      throw new Error("Workflow nicht gefunden");
    }

    const requiredQuestions = currentWorkflow.template_questions.filter(
      (question) => question.is_required,
    );

    const requiredQuestionIds = requiredQuestions.map(
      (question) => question.id,
    );

    const hasMissingRequiredAnswers = requiredQuestionIds.some((id) => {
      const answer = answers[id];
      return answer === null || answer === undefined || answer === "";
    });

    return hasMissingRequiredAnswers;
  };

  const hasMissingAssignedTo = () => {
    return assignedTo === "";
  };

  const value: CreateTicketContextType = {
    workflowList,
    setWorkflowList,
    selectedWorkflowId,
    setSelectedWorkflowId,
    answers,
    setAnswers,
    hasMissingRequiredAnswers,
    ticketLabel,
    setTicketLabel,
    assignedTo,
    setAssignedTo,
    hasMissingAssignedTo,
  };

  return (
    <CreateTicketContext.Provider value={value}>
      {children}
    </CreateTicketContext.Provider>
  );
}

export function useCreateTicket() {
  const ctx = useContext(CreateTicketContext);
  if (!ctx)
    throw new Error("useCreateTicket must be used within <UserProvider>");
  return ctx;
}
