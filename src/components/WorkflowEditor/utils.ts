import type { TemplatePhase, TemplateTask } from "../../types/types";

export function getPhaseIdByTaskId(
  phases: TemplatePhase[],
  taskId: TemplateTask["id"],
): TemplatePhase["id"] | undefined {
  const currentPhase = phases.find((phase) =>
    phase.template_tasks.some((task) => task.id === taskId),
  );

  if (!currentPhase) return;

  const phaseId = currentPhase.id;
  return phaseId;
}

export function getPhaseIndexByTaskId(
  phases: TemplatePhase[],
  taskId: TemplateTask["id"],
): number | undefined {
  const currentPhase = phases.find((phase) =>
    phase.template_tasks.some((task) => task.id === taskId),
  );

  if (!currentPhase) return;

  const phaseIndex = phases.findIndex((phase) => phase.id === currentPhase.id);
  return phaseIndex;
}
