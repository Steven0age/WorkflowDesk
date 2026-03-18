import {
  CardContent,
  CardHeader,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import CardShell from "../CardShell";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Task, { type TaskProps } from "./Task";
import type {
  TemplatePhase,
  TemplateTask,
  TicketPhaseDataTypes,
} from "../../types/types";
import { CSS } from "@dnd-kit/utilities";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEditor } from "../../context/EditorContext";
import { useEffect, useMemo } from "react";

type PhaseProps = Pick<TicketPhaseDataTypes, "id" | "title"> & {
  draggingPhase?: string;
  draggingTask?: string;
  onClick?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  tasks?: TaskProps[];
  phaseSelectedidentifier?: TemplatePhase["id"] | undefined;
  handleTaskEdit?: (taskId: TemplateTask["id"]) => void;
};

export default function Phase({
  onDelete,
  onClick,
  onEdit,
  draggingPhase,
  draggingTask,
  title,
  tasks,
  id,
  phaseSelectedidentifier,
  handleTaskEdit,
}: PhaseProps) {
  const { deleteTask, activeDrawerItemId, phasesDraft, LoadTaskToEdit } =
    useEditor();

  const taskIds = useMemo(() => {
    return phasesDraft.map((phase) => phase.tasks.map((t) => t.id)).flat();
  }, [phasesDraft]);

  useEffect(() => {
    LoadTaskToEdit();
  }, [activeDrawerItemId, phasesDraft]);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
      data: {
        type: "Phase",
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const customStyles = {
    cardShell: {
      default: { backgroundColor: "background.paper", flexShrink: 0 },
      dragging: {
        backgroundColor: "background.default",
        border: 1,
        borderColor: "border.main",
      },
      selected: { backgroundColor: "primary.main" },
      SelectedAndDragging: { backgroundColor: "primary.main" },
    },
    cardHeader: {
      default: {},
      dragging: {
        "&.MuiCardHeader-root": {
          backgroundColor: "background.default",
          borderBottom: 1,
          borderColor: "border.main",
        },
      },
      selected: {},
      SelectedAndDragging: {},
    },
  };

  const isDragging = draggingPhase === id;
  const isSelected = phaseSelectedidentifier === id;
  const isSelectedAndDragging =
    draggingPhase === id && phaseSelectedidentifier === id;

  return (
    <CardShell
      id={id}
      ref={setNodeRef}
      style={style}
      {...attributes}
      sx={[
        customStyles.cardShell.default,
        isDragging && customStyles.cardShell.dragging,
        isSelected && customStyles.cardShell.selected,
        isSelectedAndDragging && customStyles.cardShell.SelectedAndDragging,
      ]}
      elevation={1}
      onClick={onClick}
    >
      <CardHeader
        sx={[
          customStyles.cardHeader.default,
          isDragging && customStyles.cardHeader.dragging,
          isSelected && customStyles.cardHeader.selected,
          isSelectedAndDragging && customStyles.cardHeader.SelectedAndDragging,
        ]}
        title={
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>{title}</Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  if (onEdit) {
                    onEdit();
                  }
                }}
                sx={{
                  p: 0,
                  m: 0,
                  "&:hover": { color: "primary.main" },
                }}
              >
                <EditIcon />
              </IconButton>

              {/* <IconButton
            onClick={(e) => {
              e.stopPropagation();
              alert("Duplicate-Icon clicked");
            }}
            sx={{
              p: 0,
              m: 0,
              "&:hover": { color: "primary.main" },
            }}
          >
            <FileCopyIcon />
          </IconButton> */}

              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  if (onDelete) {
                    onDelete();
                  }
                }}
                sx={{
                  p: 0,
                  m: 0,
                  "&:hover": { color: "error.main" },
                }}
              >
                <DeleteIcon />
              </IconButton>

              <DragIndicatorIcon
                {...listeners}
                sx={{ color: "text.secondary", cursor: "grab", ml: 2 }}
              />
            </Box>
          </Box>
        }
      ></CardHeader>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {tasks
            ? tasks.map((i) => (
                <Task
                  draggingTask={draggingTask ? draggingTask : undefined}
                  key={i.id}
                  id={i.id}
                  label={i.label}
                  is_required={i.is_required}
                  onEdit={() => handleTaskEdit?.(i.id)}
                  onDelete={() => deleteTask(i.id)}
                />
              ))
            : ""}
        </SortableContext>
      </CardContent>
    </CardShell>
  );
}
