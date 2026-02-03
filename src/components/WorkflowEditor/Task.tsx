import { Box, IconButton, Typography } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { TicketTaskDataTypes } from "../../types/types";

export type TaskProps = Pick<TicketTaskDataTypes, "label" | "id"> & {
  activeItem?: string;
  onClick?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
};

export default function Task({
  activeItem,
  id,
  onClick,
  onEdit,
  onDelete,
  label,
}: TaskProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
      data: {
        type: "Task",
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Box
      id={id}
      ref={setNodeRef}
      style={style}
      {...attributes}
      onClick={onClick}
      sx={{
        bgcolor: activeItem === id ? "background.default" : "background.paper",
        px: 2,
        py: 1,
        border: 2,
        borderColor: "border.main",
        borderRadius: 2,
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 1,
            mr: 1,
            minWidth: 0,
            alignItems: "center",
          }}
        >
          <CheckBoxIcon sx={{ color: "primary.main" }}></CheckBoxIcon>
          <Typography
            noWrap
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: "0.9rem",
            }}
          >
            {label}
          </Typography>
        </Box>
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
    </Box>
  );
}
