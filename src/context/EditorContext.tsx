import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type { QuestionnaireQuestionTypes } from "../types/types";

type EditorContextType = {
  workflowTitle: string;
  changeWorkflowTitle: (input: string) => void;

  workflowDescription: string;
  changeWorkflowDescription: (input: string) => void;

  formDraft: QuestionnaireQuestionTypes[];
  setFormDraft: React.Dispatch<
    React.SetStateAction<QuestionnaireQuestionTypes[]>
  >;

  addFormItem: (input: QuestionnaireQuestionTypes["field_type"]) => void;
  deleteFormItem: (id: QuestionnaireQuestionTypes["id"]) => void;

  selectedQuestionId: string | undefined;
  questionLabel: string;
  questionDescription: string;
  questionIsRequired: boolean;
  setSelectedQuestionId: React.Dispatch<
    React.SetStateAction<QuestionnaireQuestionTypes["id"] | undefined>
  >;
  changeQuestionLabel: (input: string) => void;
  changeQuestionDescription: (input: string) => void;
  changeQuestionIsRequired: (input: boolean) => void;
  LoadQuestionToEdit: () => void;
};

export const EditorContext = createContext<EditorContextType | undefined>(
  undefined,
);

export function EditorProvider({ children }: { children: ReactNode }) {
  const [workflowTitle, setWorkflowTitle] = useState("neuer Workflow");
  const [workflowDescription, setWorkflowDescription] = useState(
    "Beschreibung eingeben",
  );

  const [questionLabel, setQuestionLabel] = useState("");
  const [questionDescription, setQuestionDescription] = useState("");
  const [questionIsRequired, setQuestionIsRequired] = useState(false);

  const [formDraft, setFormDraft] = useState<QuestionnaireQuestionTypes[]>([]);

  const [selectedQuestionId, setSelectedQuestionId] = useState<
    QuestionnaireQuestionTypes["id"] | undefined
  >();

  const changeWorkflowTitle = (input: string) => {
    setWorkflowTitle(input);
  };

  const changeWorkflowDescription = (input: string) => {
    setWorkflowDescription(input);
  };

  const changeQuestionLabel = (input: string) => {
    setQuestionLabel(input);
  };
  const changeQuestionDescription = (input: string) => {
    setQuestionDescription(input);
  };
  const changeQuestionIsRequired = (input: boolean) => {
    setQuestionIsRequired(input);
  };

  const LoadQuestionToEdit = () => {
    if (!selectedQuestionId || !formDraft) {
      return;
    }
    const index = formDraft.findIndex((i) => i.id === selectedQuestionId);
    if (index === -1) return;

    const { label, description, is_required } = formDraft[index];

    changeQuestionLabel(label);
    changeQuestionDescription(description);
    changeQuestionIsRequired(is_required);
  };

  const addFormItem = (
    field_type: QuestionnaireQuestionTypes["field_type"],
  ) => {
    const newItem = {
      id: crypto.randomUUID(),
      label: "",
      field_type: field_type,
      description: "",
      is_required: false,
      order_index: -1,
    };

    setFormDraft((prev) => [...prev, newItem]);
  };

  const deleteFormItem = (id: QuestionnaireQuestionTypes["id"]) => {
    setFormDraft((prev) => prev.filter((i) => i.id !== id));
  };

  const value: EditorContextType = {
    workflowTitle,
    changeWorkflowTitle,
    workflowDescription,
    changeWorkflowDescription,
    formDraft,
    addFormItem,
    setFormDraft,
    deleteFormItem,
    selectedQuestionId,
    questionLabel,
    questionDescription,
    questionIsRequired,
    setSelectedQuestionId,
    changeQuestionLabel,
    changeQuestionDescription,
    changeQuestionIsRequired,
    LoadQuestionToEdit,
  };

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
}

export function useEditor() {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error("useEditor must be used within <UserProvider>");
  return ctx;
}
