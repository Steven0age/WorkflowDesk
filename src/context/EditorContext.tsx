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
};

type EditorItemType = {
  id: number;
  description: string;
  iconType: FormDragItemTypes["iconType"];
};

export const EditorContext = createContext<EditorContextType | undefined>(
  undefined
);

export function EditorProvider({ children }: { children: ReactNode }) {
  const [workflowTitle, setWorkflowTitle] = useState("neuer Workflow");
  const [workflowDescription, setWorkflowDescription] = useState(
    "Beschreibung eingeben"
  );
  const [formDraft, setFormDraft] = useState<EditorItemType[]>([]);

  const changeWorkflowTitle = (input: string) => {
    setWorkflowTitle(input);
  };

  const changeWorkflowDescription = (input: string) => {
    setWorkflowDescription(input);
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
      id: formDraft.length + 1,
      description: `${newDescription}  ${formDraft.length + 1}`,
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
