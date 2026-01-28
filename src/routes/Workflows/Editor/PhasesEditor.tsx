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
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { TemplatePhase } from "../../../types/types";
import { useEffect, useState } from "react";
import QuestionDrawer from "../../../components/WorkflowEditor/QuestionDrawer";

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
    selectedQuestionId,
    setSelectedQuestionId,
    questionLabel,
    addTask,
    LoadPhaseToEdit,
    resetDrawerStates,
  } = useEditor();

  useEffect(() => {
    LoadPhaseToEdit();
  }, [selectedQuestionId, phasesDraft]);

  const [open, setOpen] = useState<boolean>(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const [activeItem, setActiveItem] = useState<TemplatePhase | null>(null);

  function handleDragStart(event: DragStartEvent) {
    const findItem = phasesDraft.find((item) => item.id === event.active.id);
    if (!findItem) return;
    setActiveItem(findItem);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveItem(null);

    const { active, over } = event;

    if (!over) return;

    setPhasesDraft((phasesDraft) => {
      const oldIndex = phasesDraft.findIndex((item) => item.id === active.id);
      const newIndex = phasesDraft.findIndex((item) => item.id === over.id);

      return arrayMove(phasesDraft, oldIndex, newIndex);
    });
  }

  function togglePhaseDrawer(id = "close") {
    if (id == "close") {
      setPhasesDraft((draft) =>
        draft.map((q) =>
          q.id === selectedQuestionId
            ? {
                ...q,
                title: questionLabel,
                // description: questionDescription,
                // is_required: questionIsRequired,
              }
            : q,
        ),
      );
      resetDrawerStates();
    }

    open === true ? setOpen(false) : setOpen(true);
    setSelectedQuestionId(id);
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
          >
            <SortableContext
              items={phasesDraft}
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
                      activeItem={activeItem ? activeItem.id : undefined}
                      title={phase.title}
                      key={phase.id}
                      id={phase.id}
                      tasks={phase.tasks}
                      phaseSelectedidentifier={selectedPhaseId}
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
              {activeItem ? (
                <Phase
                  title={activeItem.title}
                  key={activeItem.id}
                  id={activeItem.id}
                  tasks={activeItem.tasks}
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
          onClose={() => togglePhaseDrawer()}
        >
          <QuestionDrawer
            itemId={selectedQuestionId}
            handleClose={() => togglePhaseDrawer()}
          />
        </Drawer>
      </Box>
    </>
  );
}
