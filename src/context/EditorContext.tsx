import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { FormDragItemTypes } from "../components/WorkflowEditor/FormDragItem";
import type { FormSelectItemTypes } from "../components/WorkflowEditor/FormSelectItem";

type EditorContextType = {
  workflowTitle: string;
  changeWorkflowTitle: (input: string) => void;
  workflowDescription: string;
  changeWorkflowDescription: (input: string) => void;
  formDraft: EditorItemType[];
  setFormDraft: React.Dispatch<React.SetStateAction<EditorItemType[]>>;
  addFormItem: (input: FormSelectItemTypes["iconType"]) => void;
  deleteFormItem: (id: EditorItemType["id"]) => void;
  selectedQuestionId: string;
  questionLabel: string;
  questionDescription: string;
  questionIsRequired: boolean;
  setSelectedQuestionId: React.Dispatch<
    React.SetStateAction<EditorItemType["id"]>
  >;
  changeQuestionLabel: (input: string) => void;
  changeQuestionDescription: (input: string) => void;
  changeQuestionIsRequired: (input: boolean) => void;
};

export type EditorItemType = {
  id: string;
  label: string;
  description: string;
  is_required: boolean;
  iconType: FormDragItemTypes["iconType"];
};

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

  const [formDraft, setFormDraft] = useState<EditorItemType[]>([
    {
      id: "1",
      label: "TextFeld label",
      description: "TextFeld description",
      is_required: true,
      iconType: "textField",
    },
  ]);

  const [selectedQuestionId, setSelectedQuestionId] = useState<
    EditorItemType["id"] | null
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

  const addFormItem = (fieldType: FormSelectItemTypes["iconType"]) => {
    let newDescription;

    switch (fieldType) {
      case "upload":
        newDescription = "Datei Upload";
        break;

      case "textField":
        newDescription = "Textfeld";
        break;

      default:
        return;
    }
    const newItem = {
      id: crypto.randomUUID(),
      description: `${newDescription} - ${formDraft.length + 1}`,
      iconType: fieldType,
    };
    setFormDraft((prev) => [...prev, newItem]);
  };

  const deleteFormItem = (id: EditorItemType["id"]) => {
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
