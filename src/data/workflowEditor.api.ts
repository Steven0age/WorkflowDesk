import type { TemplateWorkflow } from "../types/types";

type CreateWorkflowFn = (
  workflowTitle: TemplateWorkflow["title"],
  workflowDescription: TemplateWorkflow["description"],
  formDraft: TemplateWorkflow["questionnaire"],
  phasesDraft: TemplateWorkflow["phases"],
) => void;

export const createWorkflow: CreateWorkflowFn = (
  workflowTitle,
  workflowDescription,
  formDraft,
  phasesDraft,
) => {
  const newWorkflow = {
    id: crypto.randomUUID(),
    title: workflowTitle,
    description: workflowDescription,
    questionnaire: formDraft,
    phases: phasesDraft,
  };
  localStorage.setItem("templateWorkflow", JSON.stringify(newWorkflow));
};
