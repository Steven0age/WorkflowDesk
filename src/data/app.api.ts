import { supabase } from "../supabase-client";
import type {
  AnswersState,
  QuestionnaireQuestionTypes,
  TemplateTask,
  TemplateWorkflow,
  TicketDataTypes,
} from "../types/types";

type CreateTicketParams = {
  selectedWorkflowId: TemplateWorkflow["id"];
  answers: AnswersState;
  startedBy: TicketDataTypes["started_by"] | null;
  assignedTo: TicketDataTypes["assigned_to"] | null;
  organizationId: TicketDataTypes["organization_id"] | null;
};

export const getWorkflowList = async (): Promise<TemplateWorkflow[] | []> => {
  const { data, error } = await supabase
    .from("template_workflows")
    .select("*, template_questions(*)");

  if (error) {
    console.error("Fetching workflows failed:", error);
    throw error;
  }

  if (!data) {
    return [];
  }
  return data;
};

export const getTicketList = async (): Promise<TicketDataTypes[]> => {
  const { data, error } = await supabase.from("tickets").select("*");

  if (error) {
    console.error("Fetching tickets failed:", error);
    throw error;
  }

  return data ? data : [];
};

export const fetchTicket = async (
  id: TicketDataTypes["id"],
): Promise<TicketDataTypes | null> => {
  const { data, error } = await supabase
    .from("tickets")
    .select(
      `
      *,
      ticket_questions (*),
      ticket_answers (*),
      ticket_phases (
        *,
        ticket_tasks (*)
      )
    `,
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("Fetching ticket failed:", error);
    throw error;
  }

  if (!data) return null;
  console.log("data =", data);
  return data;
};

export const createTicket = async ({
  selectedWorkflowId,
  answers,
  startedBy,
  assignedTo,
  organizationId,
}: CreateTicketParams) => {
  if (!startedBy) {
    throw new Error("User not authenticated");
  }

  if (!organizationId) {
    throw new Error("No organization found");
  }

  if (!assignedTo) {
    throw new Error("No assigned user");
  }

  const { data: currentWorkflow, error } = await supabase
    .from("template_workflows")
    .select(
      `
    *,
    template_questions (*),
    template_phases (
      *,
      template_tasks (*)
    )
  `,
    )
    .eq("id", selectedWorkflowId)
    .single();

  if (error) {
    console.error("Fetching workflow failed:", error);
    throw error;
  }

  if (!currentWorkflow) {
    throw new Error("Workflow nicht gefunden");
  }

  if (!currentWorkflow) {
    throw new Error("Workflow nicht gefunden");
  }

  const now = new Date().toISOString();

  const { data: insertedTicket, error: ticketError } = await supabase
    .from("tickets")
    .insert({
      organization_id: organizationId,
      template_id: currentWorkflow.id,
      template_title: currentWorkflow.title,
      started_by: startedBy,
      assigned_to: assignedTo,
      label: currentWorkflow.title,
      status: "open",
      created_at: now,
      completed_at: null,
    })
    .select("id")
    .single();

  if (ticketError) {
    console.error("Creating ticket failed:", ticketError);
    throw ticketError;
  }

  const ticketId = insertedTicket.id;

  let insertedQuestions: {
    id: string;
    template_question_id: string | null;
  }[] = [];

  if (currentWorkflow.template_questions.length > 0) {
    const questionRows = currentWorkflow.template_questions.map(
      (question: QuestionnaireQuestionTypes, index: number) => ({
        ticket_id: ticketId,
        template_question_id: question.id,
        label: question.label,
        description: question.description,
        is_required: question.is_required,
        order_index: question.order_index ?? index,
        field_type: question.field_type,
        created_at: now,
      }),
    );

    const { data: savedQuestions, error: questionsError } = await supabase
      .from("ticket_questions")
      .insert(questionRows)
      .select("id, template_question_id");

    if (questionsError) {
      console.error("Creating ticket questions failed:", questionsError);
      throw questionsError;
    }

    insertedQuestions = savedQuestions ?? [];
  }

  if (insertedQuestions.length > 0) {
    const answerRows = insertedQuestions
      .map((savedQuestion) => {
        if (!savedQuestion.template_question_id) return null;
        const value = answers[savedQuestion.template_question_id ?? ""];

        if (typeof value !== "string") {
          return null;
        }

        return {
          ticket_id: ticketId,
          ticket_question_id: savedQuestion.id,
          text_answer: value,
          created_at: now,
        };
      })
      .filter(Boolean);

    if (answerRows.length > 0) {
      const { error: answersError } = await supabase
        .from("ticket_answers")
        .insert(answerRows);

      if (answersError) {
        console.error("Creating ticket answers failed:", answersError);
        throw answersError;
      }
    }
  }

  for (
    let phaseIndex = 0;
    phaseIndex < currentWorkflow.template_phases.length;
    phaseIndex++
  ) {
    const phase = currentWorkflow.template_phases[phaseIndex];

    const { data: insertedPhase, error: phaseError } = await supabase
      .from("ticket_phases")
      .insert({
        ticket_id: ticketId,
        template_phase_id: phase.id,
        title: phase.title,
        order_index: phase.order_index ?? phaseIndex,
        status: phaseIndex === 0 ? "in_progress" : "pending",
        proof_required: phase.proof_required,
        approval_required: phase.approval_required,
        started_at: phaseIndex === 0 ? now : null,
        completed_at: null,
        approved_by: null,
        created_at: now,
      })
      .select("id")
      .single();

    if (phaseError) {
      console.error("Creating ticket phase failed:", phaseError);
      throw phaseError;
    }

    const ticketPhaseId = insertedPhase.id;

    if (phase.template_tasks.length > 0) {
      const taskRows = phase.template_tasks.map(
        (task: TemplateTask, taskIndex: number) => ({
          ticket_phase_id: ticketPhaseId,
          template_task_id: task.id,
          label: task.label,
          description: task.description,
          is_required: task.is_required,
          is_done: false,
          order_index: task.order_index ?? taskIndex,
          created_at: now,
        }),
      );

      const { error: tasksError } = await supabase
        .from("ticket_tasks")
        .insert(taskRows);

      if (tasksError) {
        console.error("Creating ticket tasks failed:", tasksError);
        throw tasksError;
      }
    }
  }
};

export const updateTicket = async (
  updatedTicket: TicketDataTypes,
): Promise<TicketDataTypes> => {
  const { error: ticketError } = await supabase
    .from("tickets")
    .update({
      label: updatedTicket.label,
      status: updatedTicket.status,
      completed_at: updatedTicket.completed_at,
      assigned_to: updatedTicket.assigned_to,
    })
    .eq("id", updatedTicket.id);

  if (ticketError) {
    console.error("Updating ticket failed:", ticketError);
    throw ticketError;
  }

  if (updatedTicket.ticket_phases && updatedTicket.ticket_phases.length > 0) {
    for (const phase of updatedTicket.ticket_phases) {
      const { error: phaseError } = await supabase
        .from("ticket_phases")
        .update({
          status: phase.status,
          started_at: phase.started_at,
          completed_at: phase.completed_at,
          approved_by: phase.approved_by,
        })
        .eq("id", phase.id);

      if (phaseError) {
        console.error("Updating ticket phase failed:", phaseError);
        throw phaseError;
      }

      if (phase.ticket_tasks && phase.ticket_tasks.length > 0) {
        for (const task of phase.ticket_tasks) {
          const { error: taskError } = await supabase
            .from("ticket_tasks")
            .update({
              is_done: task.is_done,
            })
            .eq("id", task.id);

          if (taskError) {
            console.error("Updating ticket task failed:", taskError);
            throw taskError;
          }
        }
      }
    }
  }

  return updatedTicket;
};

// export const updateTicket = (updatedTicket: TicketDataTypes) => {
//   const storedTickets = JSON.parse(localStorage.getItem("tickets") ?? "[]");

//   const updatedTickets = storedTickets.map((ticket: TicketDataTypes) =>
//     ticket.id === updatedTicket.id ? updatedTicket : ticket,
//   );

//   localStorage.setItem("tickets", JSON.stringify(updatedTickets));

//   return updatedTicket;
// };
