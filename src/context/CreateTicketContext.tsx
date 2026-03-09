import { createContext, useContext, useState, type ReactNode } from "react";
import type { AnswersState, TemplateWorkflow } from "../types/types";

type CreateTicketContextType = {
  workflowList: TemplateWorkflow[];
  setWorkflowList: React.Dispatch<React.SetStateAction<TemplateWorkflow[]>>;
  selectedWorkflowId: TemplateWorkflow["id"];
  setSelectedWorkflowId: React.Dispatch<
    React.SetStateAction<TemplateWorkflow["id"]>
  >;
  answers: AnswersState;
  setAnswers: React.Dispatch<React.SetStateAction<AnswersState>>;
};

export const CreateTicketContext = createContext<
  CreateTicketContextType | undefined
>(undefined);

export function CreateTicketProvider({ children }: { children: ReactNode }) {
  const [workflowList, setWorkflowList] = useState<TemplateWorkflow[]>([]);
  const [selectedWorkflowId, setSelectedWorkflowId] = useState("");
  const [answers, setAnswers] = useState<AnswersState>({});

  const value: CreateTicketContextType = {
    workflowList,
    setWorkflowList,
    selectedWorkflowId,
    setSelectedWorkflowId,
    answers,
    setAnswers,
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
