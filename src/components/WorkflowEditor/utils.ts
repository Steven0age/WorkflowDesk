export function findPhaseIndexByTaskId(phases, taskId) {
  const currentPhase = phases.find((phase) =>
    phase.tasks.some((task) => task.id === taskId),
  );

  return currentPhase;
}

export function getPhaseIdAndIndexByTaskId() {
  const phaseId = 11;
  const phaseIndex = 111;
  return { phaseId, phaseIndex };
}
