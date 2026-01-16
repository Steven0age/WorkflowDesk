import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { FormDragItemTypes } from "../components/WorkflowEditor/FormDragItem";

type EditorContextType = {
  workflowTitle: string;
  changeWorkflowTitle: (input: string) => void;
  workflowDescription: string;
  changeWorkflowDescription: (input: string) => void;
  formDraft: EditorItemType[];
  setFormDraft: React.Dispatch<React.SetStateAction<EditorItemType[]>>;
  addFormItem: (input: string) => void;
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
  const [formDraft, setFormDraft] = useState<EditorItemType[]>([
    {
      id: 1,
      description: "Datei Upload 1",
      iconType: "upload",
    },
    {
      id: 2,
      description: "Beispiel Frage 2",
      iconType: "textField",
    },
    {
      id: 3,
      description: "Beispiel Frage 3",
      iconType: "textField",
    },
  ]);

  const changeWorkflowTitle = (input: string) => {
    setWorkflowTitle(input);
  };

  const changeWorkflowDescription = (input: string) => {
    setWorkflowDescription(input);
  };

  const addFormItem = (fieldType) => {
    let newItem;

    switch (fieldType) {
      case "upload":
        (newItem = {
          id: 4,
          description: "Datei Upload 4",
          iconType: "upload",
        }),
          setFormDraft((prev) => [...prev, newItem]);
        break;

      case "textField":
        (newItem = {
          id: 4,
          description: "Beispiel Frage 4",
          iconType: "upload",
        }),
          setFormDraft((prev) => [...prev, newItem]);
        break;

      default:
        return;
        break;
    }
  };

  const value: EditorContextType = {
    workflowTitle,
    changeWorkflowTitle,
    workflowDescription,
    changeWorkflowDescription,
    formDraft,
    addFormItem,
    setFormDraft,
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
