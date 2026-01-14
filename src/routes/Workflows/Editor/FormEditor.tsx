import {
  Box,
  CardContent,
  CardHeader,
  duration,
  Typography,
} from "@mui/material";
import CardShell from "../../../components/CardShell";
import WorkflowHeader from "../../../components/WorkflowEditor/WorkflowHeader";
import { useEditor } from "../../../context/EditorContext";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import FormSelectItem from "../../../components/WorkflowEditor/FormSelectItem";
import FormDragItem from "../../../components/WorkflowEditor/FormDragItem";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type UniqueIdentifier,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";

export default function FormEditor() {
  const { workflowTitle, workflowDescription } = useEditor();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const [items, setItems] = useState([
    {
      id: 1,
      description: "Beispiel Frage 1",
      iconType: "textField",
    },
    {
      id: 2,
      description: "Beispiel Frage 2",
      iconType: "textField",
    },
    {
      id: 3,
      description: "Beispiel Frage 3",
      iconType: "textField",
    },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);

    const { active, over } = event;

    if (!over) return;

    setItems((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      return arrayMove(items, oldIndex, newIndex);
    });
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
              items={items}
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
                  //overflowX: "auto",
                }}
              >
                {items.map((i) => (
                  <FormDragItem
                    key={i.id}
                    order={i.id}
                    description={i.description}
                    iconType={i.iconType as "textField" | "upload"}
                    onClick={() => alert("klicked")}
                  />
                ))}
              </Box>
            </SortableContext>
            <DragOverlay>
              {activeId ? (
                <FormDragItem
                  key={items.find((item) => item.id === activeId).id}
                  order={items.find((item) => item.id === activeId).id}
                  description={
                    items.find((item) => item.id === activeId).description
                  }
                  iconType={
                    items.find((item) => item.id === activeId).iconType as
                      | "textField"
                      | "upload"
                  }
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
              <FormSelectItem description="Textfeld" iconType="textField" />
              <FormSelectItem description="Datei Upload" iconType="upload" />
            </CardContent>
          </CardShell>
        </Box>
      </Box>
    </>
  );
}
