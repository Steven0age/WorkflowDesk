import type { TemplateWorkflow } from "../types/types";

type CreateWorkflowFn = (
  workflowTitle: TemplateWorkflow["title"],
  workflowDescription: TemplateWorkflow["description"],
  formDraft: TemplateWorkflow["questionnaire"],
  phasesDraft: TemplateWorkflow["phases"],
) => void;

type editWorkflowFn = (
  id: TemplateWorkflow["id"],
) => TemplateWorkflow | undefined;

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

  let workflowList;
  const list = localStorage.getItem("templateWorkflow");
  if (list) {
    workflowList = JSON.parse(list);

    localStorage.setItem(
      "templateWorkflow",
      JSON.stringify([...workflowList, newWorkflow]),
    );
  } else {
    localStorage.setItem("templateWorkflow", JSON.stringify([newWorkflow]));
  }
};

export const editWorkflow: editWorkflowFn = (id) => {
  const list = localStorage.getItem("templateWorkflow");
  if (!list) return;

  const workflowList: TemplateWorkflow[] = JSON.parse(list);

  const workflow = workflowList.find((flow) => flow.id === id);

  return workflow;
};
