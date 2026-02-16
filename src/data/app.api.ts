import type { TemplateWorkflow } from "../types/types";

export const getWorkflowList = (): TemplateWorkflow[] | [] => {
  let workflowList;
  const list = localStorage.getItem("templateWorkflow");
  if (!list) {
    return [];
  }

  workflowList = JSON.parse(list);

  return workflowList;
};
