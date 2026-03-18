import { Box, CardContent, CardHeader, Drawer } from "@mui/material";
import CardShell from "../../../components/CardShell";
import WorkflowHeader from "../../../components/WorkflowEditor/WorkflowHeader";
import { useEditor } from "../../../context/EditorContext";
import EditorAddButton from "../../../components/WorkflowEditor/EditorAddButton";
import Phase from "../../../components/WorkflowEditor/Phase";
import {
  closestCorners,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { TemplatePhase, TemplateTask } from "../../../types/types";
import { useEffect, useMemo, useState } from "react";
import TaskDrawer from "../../../components/WorkflowEditor/TaskDrawer";
import PhaseDrawer from "../../../components/WorkflowEditor/PhaseDrawer";
import {
  getPhaseIdByTaskId,
  getPhaseIndexByTaskId,
} from "../../../components/WorkflowEditor/utils";
import Task from "../../../components/WorkflowEditor/Task";

export default function PhasesEditor() {
  const {
    workflowTitle,
    workflowDescription,
    phasesDraft,
    ChangePhaseSelected,
    selectedPhaseId,
    setPhasesDraft,
    addPhase,
    deletePhase,
    activeDrawerItemId,
    setActiveDrawerItemId,
    itemLabel,
    itemDescription,
    itemIsRequired,
    itemProofRequired,
    itemProofDescription,
    itemApprovalRequired,
    addTask,
    LoadPhaseToEdit,
    resetDrawerStates,
  } = useEditor();

  useEffect(() => {
    LoadPhaseToEdit();
  }, [activeDrawerItemId]);

  const [open, setOpen] = useState<boolean>(false);
  const [drawerType, setDrawerType] = useState<"phase" | "task" | undefined>();
  const [draggingPhase, setDraggingPhase] = useState<TemplatePhase | null>(
    null,
  );
  const [draggingTask, setDraggingTask] = useState<TemplateTask | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const phaseIds = useMemo(() => {
    return phasesDraft.map((phase) => phase.id);
  }, [phasesDraft]);

  function handleDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Phase") {
      const findItem = phasesDraft.find(
        (phase) => phase.id === event.active.id,
      );

      if (findItem === undefined) return;

      setDraggingPhase(findItem);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      const currentPhase = getPhaseIndexByTaskId(
        phasesDraft,
        String(event.active.id),
      );
      if (currentPhase === undefined || currentPhase === -1) return;

      const findItem = phasesDraft[currentPhase].tasks.find(
        (task) => task.id === event.active.id,
      );

      if (findItem === undefined) return;

      setDraggingTask(findItem);
      return;
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    setDraggingPhase(null);
    setDraggingTask(null);

    const { active, over } = event;

    if (!over) return;
    if (
      active.data.current?.type !== "Phase" ||
      over.data.current?.type !== "Phase"
    )
      return;

    setPhasesDraft((phasesDraft) => {
      const oldIndex = phasesDraft.findIndex((item) => item.id === active.id);
      const newIndex = phasesDraft.findIndex((item) => item.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return phasesDraft;

      return arrayMove(phasesDraft, oldIndex, newIndex);
    });
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);
    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";
    const isOverAPhase = over.data.current?.type === "Phase";
    if (!isActiveATask) return;

    setPhasesDraft((phasesDraft) => {
      const currentPhaseId = getPhaseIdByTaskId(phasesDraft, activeId);
      if (!currentPhaseId) return phasesDraft;

      const currentPhaseIndex = phasesDraft.findIndex(
        (p) => p.id === currentPhaseId,
      );
      if (currentPhaseIndex === -1) return phasesDraft;

      const currentTasks = phasesDraft[currentPhaseIndex].tasks;
      const currentTaskIndex = currentTasks.findIndex((t) => t.id === activeId);
      if (currentTaskIndex === -1) return phasesDraft;

      const movingTask = currentTasks[currentTaskIndex];
      if (!movingTask) return phasesDraft;

      // Task over Task (different Phase)
      if (isOverATask) {
        const newPhaseId = getPhaseIdByTaskId(phasesDraft, overId);
        if (!newPhaseId) return phasesDraft;

        const newPhaseIndex = phasesDraft.findIndex((p) => p.id === newPhaseId);
        if (newPhaseIndex === -1) return phasesDraft;

        const newTasks = phasesDraft[newPhaseIndex].tasks;
        const newTaskIndex = newTasks.findIndex((t) => t.id === overId);
        if (newTaskIndex === -1) return phasesDraft;

        const isLast = newTaskIndex === newTasks.length - 1;
        const insertIndex = isLast ? newTasks.length : newTaskIndex;

        if (currentPhaseId === newPhaseId) {
          if (currentTaskIndex === newTaskIndex) return phasesDraft;
          const reorderedTasks = arrayMove(
            currentTasks,
            currentTaskIndex,
            newTaskIndex,
          );
          return phasesDraft.map((p) =>
            p.id === currentPhaseId ? { ...p, tasks: reorderedTasks } : p,
          );
        }

        const newSourceTasks = currentTasks.filter((t) => t.id !== activeId);
        const newTargetTasks = [
          ...newTasks.slice(0, insertIndex),
          movingTask,
          ...newTasks.slice(insertIndex),
        ];

        return phasesDraft.map((p) => {
          if (p.id === currentPhaseId) return { ...p, tasks: newSourceTasks };
          if (p.id === newPhaseId) return { ...p, tasks: newTargetTasks };
          return p;
        });
      }

      // Task over Phase (empty Phase)
      if (isOverAPhase) {
        const targetPhaseId = overId;

        if (targetPhaseId === currentPhaseId) return phasesDraft;

        const newSourceTasks = currentTasks.filter((t) => t.id !== activeId);

        return phasesDraft.map((p) => {
          if (p.id === currentPhaseId) return { ...p, tasks: newSourceTasks };
          if (p.id === targetPhaseId)
            return { ...p, tasks: [...p.tasks, movingTask] };
          return p;
        });
      }

      return phasesDraft;
    });
  }

  function togglePhaseDrawer(id = "close") {
    if (id == "close") {
      setPhasesDraft((draft) =>
        draft.map((q) =>
          q.id === activeDrawerItemId
            ? {
                ...q,
                title: itemLabel,
                description: itemDescription,
                is_required: itemIsRequired,
                proof_required: itemProofRequired,
                proof_description: itemProofDescription,
                approval_required: itemApprovalRequired,
              }
            : q,
        ),
      );
      resetDrawerStates();
    }

    open === true ? setOpen(false) : setOpen(true);
    drawerType ? setDrawerType(undefined) : setDrawerType("phase");

    setActiveDrawerItemId(id);
  }

  function toggleTaskDrawer(taskId?: TemplateTask["id"]) {
    if (!taskId && activeDrawerItemId) {
      const phaseIndex = getPhaseIndexByTaskId(phasesDraft, activeDrawerItemId);
      const phaseId = getPhaseIdByTaskId(phasesDraft, activeDrawerItemId);

      if (phaseIndex === undefined || phaseIndex === -1) {
        return;
      }

      const newTasks = phasesDraft[phaseIndex].tasks.map((q) =>
        q.id === activeDrawerItemId
          ? {
              ...q,
              label: itemLabel,
              description: itemDescription,
              is_required: itemIsRequired,
            }
          : q,
      );

      setPhasesDraft((draft) =>
        draft.map((phase) => {
          return phase.id !== phaseId ? phase : { ...phase, tasks: newTasks };
        }),
      );
      resetDrawerStates();
    }

    open === true ? setOpen(false) : setOpen(true);
    drawerType ? setDrawerType(undefined) : setDrawerType("task");

    setActiveDrawerItemId(taskId);
  }

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >
        <Box
          component="main"
          sx={{
            height: "calc(100vh - 60px)",
            minWidth: 0,
            minHeight: 0,
            py: 3,
            px: 7,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <WorkflowHeader
            title={workflowTitle}
            description={workflowDescription}
          />
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
          >
            <SortableContext
              items={phaseIds}
              strategy={verticalListSortingStrategy}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  height: "100%",
                  bgcolor: "background.default",
                  borderRadius: 3,
                  mt: 3,
                  p: 3,
                  overflowX: "auto",
                }}
              >
                {phasesDraft.map((phase) => {
                  return (
                    <Phase
                      draggingPhase={
                        draggingPhase ? draggingPhase.id : undefined
                      }
                      title={phase.title}
                      key={phase.id}
                      id={phase.id}
                      tasks={phase.tasks}
                      draggingTask={draggingTask ? draggingTask.id : undefined}
                      phaseSelectedidentifier={selectedPhaseId}
                      handleTaskEdit={(taskId) => {
                        toggleTaskDrawer(taskId);
                      }}
                      onClick={() => {
                        ChangePhaseSelected(phase.id);
                      }}
                      onDelete={() => deletePhase(phase.id)}
                      onEdit={() => togglePhaseDrawer(phase.id)}
                    />
                  );
                })}
              </Box>
            </SortableContext>

            <DragOverlay>
              {draggingPhase ? (
                <Phase
                  phaseSelectedidentifier={selectedPhaseId}
                  title={draggingPhase.title}
                  key={draggingPhase.id}
                  id={draggingPhase.id}
                  tasks={draggingPhase.tasks}
                />
              ) : null}

              {draggingTask ? (
                <Task
                  label={draggingTask.label}
                  key={draggingTask.id}
                  id={draggingTask.id}
                  is_required={draggingTask.is_required}
                />
              ) : null}
            </DragOverlay>
          </DndContext>
        </Box>
        <Box
          component="aside"
          sx={{
            bgcolor: "background.default",
            width: 500,
            flexShrink: 0,
          }}
        >
          <CardShell elevation={1} sx={{ height: "100%" }}>
            <CardHeader title={"Phasen und Todo's anlegen"}></CardHeader>
            <CardContent
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <EditorAddButton variant="phase" onClick={addPhase} />
              <EditorAddButton variant="task" onClick={addTask} />
            </CardContent>
          </CardShell>
        </Box>
        <Drawer
          open={open}
          anchor={"right"}
          onClose={() => {
            drawerType === "task" ? toggleTaskDrawer() : togglePhaseDrawer();
          }}
        >
          {drawerType === "phase" && (
            <PhaseDrawer
              itemId={activeDrawerItemId}
              handleClose={() => {
                togglePhaseDrawer();
              }}
            />
          )}
          {drawerType === "task" && (
            <TaskDrawer
              itemId={activeDrawerItemId}
              handleClose={() => {
                toggleTaskDrawer();
              }}
            />
          )}
        </Drawer>
      </Box>
    </>
  );
}
