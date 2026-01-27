import {
  CardContent,
  CardHeader,
  Typography,
  Box,
  IconButton,
  Drawer,
} from "@mui/material";
import CardShell from "../CardShell";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Task, { type TaskProps } from "./Task";
import type { TemplatePhase, TicketPhaseDataTypes } from "../../types/types";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { useEditor } from "../../context/EditorContext";
import TaskDrawer from "./TaskDrawer";
import { useState } from "react";

type PhaseProps = Pick<TicketPhaseDataTypes, "id" | "title"> & {
  activeItem?: string;
  onClick?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  tasks?: TaskProps[];
  selectedPhaseId?: TemplatePhase["id"] | undefined;
};

export default function Phase({
  onDelete,
  onClick,
  onEdit,
  activeItem,
  title,
  tasks,
  id,
  selectedPhaseId,
}: PhaseProps) {
  const {
    deleteTask,
    setPhasesDraft,
    selectedQuestionId,
    questionLabel,
    phasesDraft,
    setSelectedQuestionId,
    selectedPhaseId: currentId,
    selectedTaskId,
    setSelectedTaskId,
    ChangePhaseSelected,
  } = useEditor();

  const [open, setOpen] = useState<boolean>(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  function toggleTaskDrawer(phaseId = "close", taskId) {
    if (phaseId == "close") {
      const phaseIndex = phasesDraft.findIndex((i) => i.id === currentId);

      if (phaseIndex === -1) {
        return;
      }

      const newTasks = phasesDraft[phaseIndex].tasks.map((q) =>
        q.id === selectedQuestionId
          ? {
              ...q,
              label: questionLabel,
              // description: questionDescription,
              // is_required: questionIsRequired,
            }
          : q,
      );

      setPhasesDraft((draft) =>
        draft.map((phase) => {
          return phase.id !== phaseId ? phase : { ...phase, tasks: newTasks };
        }),
      );
    }

    open === true ? setOpen(false) : setOpen(true);
    ChangePhaseSelected(phaseId);
    setSelectedQuestionId(taskId);
  }

  return (
    <CardShell
      id={id}
      ref={setNodeRef}
      style={style}
      {...attributes}
      sx={{
        backgroundColor:
          selectedPhaseId === id ? "primary.main" : "background.default",
        flexShrink: 0,
      }}
      elevation={1}
      onClick={onClick}
    >
      <CardHeader
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
        {tasks
          ? tasks.map((i) => (
              <Task
                key={i.id}
                id={i.id}
                label={i.label}
                onEdit={() => toggleTaskDrawer(id, i.id)}
                onDelete={() => deleteTask(id, i.id)}
              />
            ))
          : ""}
      </CardContent>
      <Drawer open={open} anchor={"right"} onClose={() => toggleTaskDrawer()}>
        <TaskDrawer
          itemId={selectedQuestionId}
          handleClose={() => toggleTaskDrawer()}
        />
      </Drawer>
    </CardShell>
  );
}
