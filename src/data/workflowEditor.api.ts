import type { TemplateWorkflow } from "../types/types";

type SaveWorkflowFn = (
  id: TemplateWorkflow["id"] | undefined,
  workflowTitle: TemplateWorkflow["title"],
  workflowDescription: TemplateWorkflow["description"],
  formDraft: TemplateWorkflow["questionnaire"],
  phasesDraft: TemplateWorkflow["phases"],
) => void;

type EditWorkflowFn = (
  id: TemplateWorkflow["id"],
) => TemplateWorkflow | undefined;

type DeleteWorkflowFn = (id: TemplateWorkflow["id"]) => void;

export const saveWorkflow: SaveWorkflowFn = (
  id,
  workflowTitle,
  workflowDescription,
  formDraft,
  phasesDraft,
) => {
  const list = localStorage.getItem("templateWorkflow");

  const workflowList: TemplateWorkflow[] = list ? JSON.parse(list) : [];

  if (id) {
    const updatedList = workflowList.map((workflow) =>
      workflow.id === id
        ? {
            ...workflow,
            title: workflowTitle,
            description: workflowDescription,
            questionnaire: formDraft,
            phases: phasesDraft,
          }
        : workflow,
    );

    localStorage.setItem("templateWorkflow", JSON.stringify(updatedList));
  } else {
    const newWorkflow: TemplateWorkflow = {
      id: crypto.randomUUID(),
      title: workflowTitle,
      description: workflowDescription,
      questionnaire: formDraft,
      phases: phasesDraft,
    };

    localStorage.setItem(
      "templateWorkflow",
      JSON.stringify([...workflowList, newWorkflow]),
    );
  }
};

export const editWorkflow: EditWorkflowFn = (id) => {
  const list = localStorage.getItem("templateWorkflow");
  if (!list) return;

  const workflowList: TemplateWorkflow[] = JSON.parse(list);

  const workflow = workflowList.find((flow) => flow.id === id);

  return workflow;
};

export const deleteWorkflow: DeleteWorkflowFn = (id) => {
  const list = localStorage.getItem("templateWorkflow");

  if (!list) return;

  const workflowList: TemplateWorkflow[] = JSON.parse(list);

  const updatedList = workflowList.filter((workflow) => workflow.id !== id);

  localStorage.setItem("templateWorkflow", JSON.stringify(updatedList));
};
