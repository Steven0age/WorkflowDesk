import { Box, CardContent, CardHeader, Drawer } from "@mui/material";
import CardShell from "../../../components/CardShell";
import WorkflowHeader from "../../../components/WorkflowEditor/WorkflowHeader";
import { useEditor } from "../../../context/EditorContext";
import EditorAddButton from "../../../components/WorkflowEditor/EditorAddButton";
import Question from "../../../components/WorkflowEditor/Question";
import {
  closestCenter,
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
import { useEffect, useState } from "react";
import QuestionDrawer from "../../../components/WorkflowEditor/QuestionDrawer";
import type { QuestionnaireQuestionTypes } from "../../../types/types";

export default function FormEditor() {
  const [activeItem, setActiveItem] =
    useState<QuestionnaireQuestionTypes | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const {
    workflowTitle,
    workflowDescription,
    formDraft,
    setFormDraft,
    addFormItem,
    deleteFormItem,
    selectedQuestionId,
    setSelectedQuestionId,
    questionLabel,
    questionDescription,
    questionIsRequired,
    LoadQuestionToEdit,
  } = useEditor();

  useEffect(() => {
    LoadQuestionToEdit();
  }, [selectedQuestionId, formDraft]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragStart(event: DragStartEvent) {
    const findItem = formDraft.find((item) => item.id === event.active.id);
    if (!findItem) return;
    setActiveItem(findItem);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveItem(null);

    const { active, over } = event;

    if (!over) return;

    setFormDraft((formDraft) => {
      const oldIndex = formDraft.findIndex((item) => item.id === active.id);
      const newIndex = formDraft.findIndex((item) => item.id === over.id);

      return arrayMove(formDraft, oldIndex, newIndex);
    });
  }

  function toggleQuestionDrawer(id = "close") {
    if (id == "close") {
      setFormDraft((draft) =>
        draft.map((q) =>
          q.id === selectedQuestionId
            ? {
                ...q,
                label: questionLabel,
                description: questionDescription,
                is_required: questionIsRequired,
              }
            : q,
        ),
      );
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
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={formDraft}
              strategy={verticalListSortingStrategy}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  height: "100%",
                  bgcolor: "background.default",
                  borderRadius: 3,
                  mt: 3,
                  p: 3,
                  overflowX: "auto",
                }}
              >
                {formDraft.map((i) => {
                  return (
                    <Question
                      activeItem={activeItem ? activeItem.id : undefined}
                      key={i.id}
                      id={i.id}
                      label={i.label}
                      field_type={i.field_type}
                      onClick={() => toggleQuestionDrawer(i.id)}
                      onDelete={() => deleteFormItem(i.id)}
                    />
                  );
                })}
              </Box>
            </SortableContext>

            <DragOverlay>
              {activeItem ? (
                <Question
                  key={activeItem.id}
                  id={activeItem.id}
                  label={activeItem.label}
                  field_type={activeItem.field_type as "textField" | "upload"}
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
            <CardHeader title={"Formular anlegen"}></CardHeader>
            <CardContent
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <EditorAddButton
                onClick={() => addFormItem("textField")}
                variant="textField"
              />
              <EditorAddButton
                onClick={() => addFormItem("upload")}
                variant="upload"
              />
            </CardContent>
          </CardShell>
        </Box>

        <Drawer
          open={open}
          anchor={"right"}
          onClose={() => toggleQuestionDrawer()}
        >
          <QuestionDrawer
            itemId={selectedQuestionId}
            handleClose={() => toggleQuestionDrawer()}
          />
        </Drawer>
      </Box>
    </>
  );
}
