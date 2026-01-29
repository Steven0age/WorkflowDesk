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
import type {
  TemplatePhase,
  TemplateTask,
  TicketPhaseDataTypes,
  TicketTaskDataTypes,
} from "../../types/types";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { useEditor } from "../../context/EditorContext";
import TaskDrawer from "./TaskDrawer";
import { useEffect, useState } from "react";
import { getPhaseIdByTaskId, getPhaseIndexByTaskId } from "./utils";

type PhaseProps = Pick<TicketPhaseDataTypes, "id" | "title"> & {
  activeItem?: string;
  onClick?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  tasks?: TaskProps[];
  phaseSelectedidentifier?: TemplatePhase["id"] | undefined;
};

export default function Phase({
  onDelete,
  onClick,
  onEdit,
  activeItem,
  title,
  tasks,
  id,
  phaseSelectedidentifier,
}: PhaseProps) {
  const {
    deleteTask,
    setPhasesDraft,
    selectedQuestionId,
    questionLabel,
    phasesDraft,
    setSelectedQuestionId,
    selectedPhaseId,
    resetDrawerStates,
    LoadTaskToEdit,
  } = useEditor();

  useEffect(() => {
    LoadTaskToEdit();
  }, [selectedQuestionId, phasesDraft]);

  const [open, setOpen] = useState<boolean>(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  function toggleTaskDrawer(taskId?: TemplateTask["id"]) {
    if (!taskId && selectedQuestionId) {
      const phaseIndex = getPhaseIndexByTaskId(phasesDraft, selectedQuestionId);
      const phaseId = getPhaseIdByTaskId(phasesDraft, selectedQuestionId);

      if (phaseIndex === undefined || phaseIndex === -1) {
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
      resetDrawerStates();
    }

    open === true ? setOpen(false) : setOpen(true);
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
          phaseSelectedidentifier === id
            ? "primary.main"
            : "background.default",
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
                onEdit={() => toggleTaskDrawer(i.id)}
                onDelete={() => deleteTask(i.id)}
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
