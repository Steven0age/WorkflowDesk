import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type {
  QuestionnaireQuestionTypes,
  TemplatePhase,
  TicketPhaseDataTypes,
} from "../types/types";
import type { PhaseCardTypes } from "../components/TicketModal/PhaseCard";

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

  phasesDraft: TemplatePhase[];

  selectedPhaseId: TemplatePhase["id"] | undefined;
  ChangePhaseSelected: (input: string) => void;
  setPhasesDraft: React.Dispatch<React.SetStateAction<TemplatePhase[]>>;
  addPhase: () => void;
  deletePhase: (id: TemplatePhase["id"]) => void;

  addTask: () => void;
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
  const [phasesDraft, setPhasesDraft] = useState<TemplatePhase[]>([
    {
      title: "1. Phase",
      id: "1",
      tasks: [
        {
          label: "Todo 1.1 ",
          id: "1.1",
        },
        {
          label: "Todo 1.2 ",
          id: "1.2",
        },
      ],
    },
    {
      title: "2. Phase",
      id: "2",
      tasks: [
        {
          label: "Todo 2.1 ",
          id: "2.1",
        },
        {
          label: "Todo 2.2 ",
          id: "2.2",
        },
      ],
    },
    {
      title: "3. Phase",
      id: "3",
      tasks: [
        {
          label: "Todo 3.1 ",
          id: "3.1",
        },
        {
          label: "Todo 3.2 ",
          id: "3.2",
        },
      ],
    },
    {
      title: "4. Phase",
      id: "4",
      tasks: [
        {
          label: "Todo 4.1 ",
          id: "4.1",
        },
        {
          label: "Todo 4.2 ",
          id: "4.2",
        },
      ],
    },
  ]);

  const [selectedPhaseId, setSelectedPhaseId] = useState<
    TemplatePhase["id"] | undefined
  >();

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
      label: field_type === "textField" ? "Frage" : " Datei Upload",
      field_type: field_type,
      description: "",
      is_required: false,
    };

    setFormDraft((prev) => [...prev, newItem]);
  };

  const deleteFormItem = (id: QuestionnaireQuestionTypes["id"]) => {
    setFormDraft((prev) => prev.filter((i) => i.id !== id));
  };

  const ChangePhaseSelected = (input: string) => {
    setSelectedPhaseId(() => (input === selectedPhaseId ? undefined : input));
  };

  const addPhase = () => {
    const newPhase = {
      title: "Neue Phase",
      id: crypto.randomUUID(),
      tasks: [],
    };

    setPhasesDraft((prev) => [...prev, newPhase]);
  };

  const deletePhase = (id: TicketPhaseDataTypes["id"]) => {
    setPhasesDraft((prev) => prev.filter((i) => i.id !== id));
  };

  const addTask = () => {
    if (!selectedPhaseId) {
      return alert("Bitte erst eine Phase auswählen");
    }

    const newTask = {
      label: "Neues Todo",
      id: crypto.randomUUID(),
    };

    setPhasesDraft((prev) =>
      prev.map((phase) => {
        return phase.id === selectedPhaseId
          ? { ...phase, tasks: [...phase.tasks, newTask] }
          : phase;
      }),
    );
  };

  const value: EditorContextType = {
    workflowTitle,
    changeWorkflowTitle,
    workflowDescription,
    changeWorkflowDescription,
    formDraft,
    phasesDraft,
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
    selectedPhaseId,
    ChangePhaseSelected,
    setPhasesDraft,
    addPhase,
    deletePhase,
    addTask,
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
