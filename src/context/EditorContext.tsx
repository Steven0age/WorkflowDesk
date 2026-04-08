import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type {
  QuestionnaireQuestionTypes,
  TemplatePhase,
  TicketPhaseDataTypes,
  TicketTaskDataTypes,
} from "../types/types";

import {
  getPhaseIdByTaskId,
  getPhaseIndexByTaskId,
} from "../components/WorkflowEditor/utils";

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

  activeDrawerItemId: string | undefined;
  itemLabel: string;
  itemDescription: string;
  itemIsRequired: boolean;
  itemProofRequired: boolean;
  itemProofDescription: string;
  itemApprovalRequired: boolean;
  setActiveDrawerItemId: React.Dispatch<
    React.SetStateAction<QuestionnaireQuestionTypes["id"] | undefined>
  >;
  changeItemLabel: (input: string) => void;
  changeItemDescription: (input: string) => void;
  changeItemIsRequired: (input: boolean) => void;
  changeItemProofRequired: (input: boolean) => void;
  changeItemProofDescription: (input: string) => void;
  changeItemApprovalRequired: (input: boolean) => void;
  LoadQuestionToEdit: () => void;

  phasesDraft: TemplatePhase[];

  selectedPhaseId: TemplatePhase["id"] | undefined;
  ChangePhaseSelected: (input: string) => void;
  setPhasesDraft: React.Dispatch<React.SetStateAction<TemplatePhase[]>>;
  addPhase: () => void;
  deletePhase: (id: TemplatePhase["id"]) => void;

  addTask: () => void;
  deleteTask: (taskId: string) => void;

  LoadPhaseToEdit: () => void;
  resetDrawerStates: () => void;
  LoadTaskToEdit: () => void;
};

export const EditorContext = createContext<EditorContextType | undefined>(
  undefined,
);

export function EditorProvider({ children }: { children: ReactNode }) {
  const [workflowTitle, setWorkflowTitle] = useState("neuer Workflow");
  const [workflowDescription, setWorkflowDescription] = useState(
    "Beschreibung eingeben",
  );

  const [itemLabel, setItemLabel] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemIsRequired, setItemIsRequired] = useState(false);
  const [itemProofRequired, setItemProofRequired] = useState(false);
  const [itemProofDescription, setItemProofDescription] = useState("");
  const [itemApprovalRequired, setItemApprovalRequired] = useState(false);

  const [formDraft, setFormDraft] = useState<QuestionnaireQuestionTypes[]>([]);
  const [phasesDraft, setPhasesDraft] = useState<TemplatePhase[]>([]);

  const [selectedPhaseId, setSelectedPhaseId] = useState<
    TemplatePhase["id"] | undefined
  >();

  const [activeDrawerItemId, setActiveDrawerItemId] = useState<
    string | undefined
  >();

  const changeWorkflowTitle = (input: string) => {
    setWorkflowTitle(input);
  };

  const changeWorkflowDescription = (input: string) => {
    setWorkflowDescription(input);
  };

  const changeItemLabel = (input: string) => {
    setItemLabel(input);
  };
  const changeItemDescription = (input: string) => {
    setItemDescription(input);
  };
  const changeItemIsRequired = (input: boolean) => {
    setItemIsRequired(input);
  };
  const changeItemProofRequired = (input: boolean) => {
    setItemProofRequired(input);
  };
  const changeItemProofDescription = (input: string) => {
    setItemProofDescription(input);
  };
  const changeItemApprovalRequired = (input: boolean) => {
    setItemApprovalRequired(input);
  };

  useEffect(() => {
    console.log("phasesDraft =", phasesDraft);
  }, [phasesDraft]);

  const resetDrawerStates = () => {
    setItemLabel("");
    setItemDescription("");
    setItemIsRequired(false);
    setItemProofRequired(false);
    setItemProofDescription("");
    setItemApprovalRequired(false);
  };

  const LoadQuestionToEdit = () => {
    if (!activeDrawerItemId) {
      return;
    }
    const index = formDraft.findIndex((i) => i.id === activeDrawerItemId);
    if (index === -1) return;

    const { label, description, is_required } = formDraft[index];

    changeItemLabel(label);
    changeItemDescription(description);
    changeItemIsRequired(is_required);
  };

  const LoadPhaseToEdit = () => {
    if (!activeDrawerItemId) {
      return;
    }
    const index = phasesDraft.findIndex((i) => i.id === activeDrawerItemId);
    if (index === -1) return;

    const {
      title,
      description,
      proof_required,
      proof_description,
      approval_required,
    } = phasesDraft[index];

    changeItemLabel(title);
    changeItemDescription(description);
    changeItemProofRequired(proof_required);
    changeItemProofDescription(proof_description);
    changeItemApprovalRequired(approval_required);
  };

  const LoadTaskToEdit = () => {
    if (!activeDrawerItemId) {
      return;
    }
    const currentPhase = phasesDraft.find((phase) =>
      phase.template_tasks.some((task) => task.id === activeDrawerItemId),
    );
    if (!currentPhase) return;

    const phaseIndex = phasesDraft.findIndex((i) => i.id === currentPhase.id);
    if (phaseIndex === -1) return;

    const taskIndex = currentPhase.template_tasks.findIndex(
      (i) => i.id === activeDrawerItemId,
    );
    if (taskIndex === -1) return;

    const { label, description, is_required } =
      phasesDraft[phaseIndex].template_tasks[taskIndex];

    changeItemLabel(label);
    changeItemDescription(description);
    changeItemIsRequired(is_required);
  };

  const addFormItem = (
    field_type: QuestionnaireQuestionTypes["field_type"],
  ) => {
    const newItem = {
      id: crypto.randomUUID(),
      label: field_type === "textField" ? "Frage" : " Datei Upload",
      field_type: field_type,
      description: "",
      order_index: formDraft.length,
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
      description: "",
      proof_required: false,
      proof_description: "",
      approval_required: false,
      template_tasks: [],
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
      id: crypto.randomUUID(),
      label: "Neues Todo",
      description: "",
      is_required: false,
    };

    setPhasesDraft((prev) =>
      prev.map((phase) => {
        return phase.id === selectedPhaseId
          ? { ...phase, template_tasks: [...phase.template_tasks, newTask] }
          : phase;
      }),
    );
  };

  const deleteTask = (taskId: TicketTaskDataTypes["id"]) => {
    const phaseIndex = getPhaseIndexByTaskId(phasesDraft, taskId);
    const phaseId = getPhaseIdByTaskId(phasesDraft, taskId);

    if (phaseIndex === undefined || phaseIndex === -1) return;

    const newTasks = phasesDraft[phaseIndex].template_tasks.filter(
      (task) => task.id !== taskId,
    );

    setPhasesDraft((prev) =>
      prev.map((phase) => {
        return phase.id !== phaseId ? phase : { ...phase, tasks: newTasks };
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
    activeDrawerItemId,
    itemLabel,
    itemDescription,
    itemIsRequired,
    itemProofRequired,
    itemProofDescription,
    itemApprovalRequired,
    setActiveDrawerItemId,
    changeItemLabel,
    changeItemDescription,
    changeItemIsRequired,
    LoadQuestionToEdit,
    changeItemProofRequired,
    changeItemProofDescription,
    changeItemApprovalRequired,
    selectedPhaseId,
    ChangePhaseSelected,
    setPhasesDraft,
    addPhase,
    deletePhase,
    addTask,
    deleteTask,
    LoadPhaseToEdit,
    resetDrawerStates,
    LoadTaskToEdit,
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
