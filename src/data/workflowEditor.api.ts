import { supabase } from "../supabase-client";
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

export const saveWorkflow: SaveWorkflowFn = async (
  id,
  workflowTitle,
  workflowDescription,
  formDraft,
  phasesDraft,
) => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    console.error("Failed to get current user:", authError);
    throw authError;
  }

  if (!user) {
    throw new Error("User is not authenticated.");
  }

  let workflowId = id;

  if (workflowId) {
    const { error: updateWorkflowError } = await supabase
      .from("template_workflows")
      .update({
        title: workflowTitle,
        description: workflowDescription,
      })
      .eq("id", workflowId);

    if (updateWorkflowError) {
      console.error("Workflow update failed:", updateWorkflowError);
      throw updateWorkflowError;
    }

    // delete existing questions
    const { error: deleteQuestionsError } = await supabase
      .from("template_questions")
      .delete()
      .eq("template_workflow_id", workflowId);

    if (deleteQuestionsError) {
      console.error(
        "Deleting template questions failed:",
        deleteQuestionsError,
      );
      throw deleteQuestionsError;
    }

    // load exisiting phases to delete their tasks
    const { data: existingPhases, error: fetchPhasesError } = await supabase
      .from("template_phases")
      .select("id")
      .eq("template_workflow_id", workflowId);

    if (fetchPhasesError) {
      console.error("Fetching existing phases failed:", fetchPhasesError);
      throw fetchPhasesError;
    }

    const phaseIds = existingPhases?.map((phase) => phase.id) ?? [];

    if (phaseIds.length > 0) {
      const { error: deleteTasksError } = await supabase
        .from("template_tasks")
        .delete()
        .in("template_phase_id", phaseIds);

      if (deleteTasksError) {
        console.error("Deleting template tasks failed:", deleteTasksError);
        throw deleteTasksError;
      }
    }

    const { error: deletePhasesError } = await supabase
      .from("template_phases")
      .delete()
      .eq("template_workflow_id", workflowId);

    if (deletePhasesError) {
      console.error("Deleting template phases failed:", deletePhasesError);
      throw deletePhasesError;
    }
  } else {
    const { data: insertedWorkflow, error: insertWorkflowError } =
      await supabase
        .from("template_workflows")
        .insert({
          title: workflowTitle,
          description: workflowDescription,
          created_from_user: user.id,
        })
        .select("id")
        .single();

    if (insertWorkflowError) {
      console.error("Workflow insert failed:", insertWorkflowError);
      throw insertWorkflowError;
    }

    workflowId = insertedWorkflow.id;
  }

  if (!workflowId) {
    throw new Error("workflowId is missing after workflow save.");
  }

  // save questions
  if (formDraft.length > 0) {
    const questionRows = formDraft.map((question, index) => ({
      template_workflow_id: workflowId,
      label: question.label,
      description: question.description,
      is_required: question.is_required,
      order_index: question.order_index ?? index,
      field_type: question.field_type,
    }));

    const { error: insertQuestionsError } = await supabase
      .from("template_questions")
      .insert(questionRows);

    if (insertQuestionsError) {
      console.error(
        "Inserting template questions failed:",
        insertQuestionsError,
      );
      throw insertQuestionsError;
    }
  }

  // save phases and tasks
  for (let phaseIndex = 0; phaseIndex < phasesDraft.length; phaseIndex++) {
    const phase = phasesDraft[phaseIndex];

    const { data: insertedPhase, error: insertPhaseError } = await supabase
      .from("template_phases")
      .insert({
        template_workflow_id: workflowId,
        order_index: phase.order_index ?? phaseIndex,
        title: phase.title,
        description: phase.description,
        proof_required: phase.proof_required,
        proof_description: phase.proof_description,
        approval_required: phase.approval_required,
      })
      .select("id")
      .single();

    if (insertPhaseError) {
      console.error("Inserting template phase failed:", insertPhaseError);
      throw insertPhaseError;
    }

    if (phase.tasks.length > 0) {
      const taskRows = phase.tasks.map((task, taskIndex) => ({
        template_phase_id: insertedPhase.id,
        order_index: task.order_index ?? taskIndex,
        label: task.label,
        description: task.description,
        is_required: task.is_required,
      }));

      const { error: insertTasksError } = await supabase
        .from("template_tasks")
        .insert(taskRows);

      if (insertTasksError) {
        console.error("Inserting template tasks failed:", insertTasksError);
        throw insertTasksError;
      }
    }
  }

  return workflowId;
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
