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
  selectedQuestionId: string;
  questionLabel: string;
  questionDescription: string;
  questionIsRequired: boolean;
  setSelectedQuestionId: React.Dispatch<
    React.SetStateAction<QuestionnaireQuestionTypes["id"]>
  >;
  changeQuestionLabel: (input: string) => void;
  changeQuestionDescription: (input: string) => void;
  changeQuestionIsRequired: (input: boolean) => void;
  LoadQuestionToEdit: () => void;
};

// export type QuestionnaireQuestionTypes = {
//   id: string;
//   label: string;
//   description: string;
//   is_required: boolean;
//   iconType: FormDragItemTypes["iconType"];
// };

export const EditorContext = createContext<EditorContextType | undefined>(
  undefined,
);

export function EditorProvider({ children }: { children: ReactNode }) {
  const [workflowTitle, setWorkflowTitle] = useState("neuer Workflow");
  const [workflowDescription, setWorkflowDescription] = useState(
    "Beschreibung eingeben",
  );

  const [questionLabel, setQuestionLabel] = useState();
  const [questionDescription, setQuestionDescription] = useState();
  const [questionIsRequired, setQuestionIsRequired] = useState(false);

  const [formDraft, setFormDraft] = useState<QuestionnaireQuestionTypes[]>([
    {
      id: "1",
      label: "TextFeld label",
      description: "TextFeld description",
      is_required: true,
      order_index: 0,
      field_type: "textField",
    },
  ]);

  const [selectedQuestionId, setSelectedQuestionId] = useState<
    QuestionnaireQuestionTypes["id"] | null
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
    let newLabel;

    switch (field_type) {
      case "upload":
        newLabel = "Datei Upload";
        break;

      case "textField":
        newLabel = "Textfeld";
        break;

      default:
        return;
    }
    const newItem = {
      id: crypto.randomUUID(),
      label: newLabel,
      field_type: field_type,
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
