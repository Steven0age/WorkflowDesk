import { Box, IconButton, Typography } from "@mui/material";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { FormSelectItemTypes } from "./FormSelectItem";

export type FormDragItemTypes = {
  activeItem?: number;
  iconType: FormSelectItemTypes["iconType"];
  description: FormSelectItemTypes["description"];
  order: number;
  onClick?: () => void;
  handleDelete?: () => void;
};

export default function FormDragItem({
  activeItem,
  iconType,
  description,
  order,
  onClick,
  handleDelete,
}: FormDragItemTypes) {
  const Icons = {
    textField: <TextFieldsIcon sx={{ color: "primary.main" }}></TextFieldsIcon>,
    upload: <FileUploadIcon sx={{ color: "primary.main" }}></FileUploadIcon>,
  };

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: order });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Box
      id={`${order}`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      onClick={onClick}
      sx={{
        bgcolor:
          activeItem === order ? "background.default" : "background.paper",
        p: 3,
        border: 2,
        borderColor: "border.main",
        borderRadius: 2,
        cursor: "pointer",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gap: 1 }}>
          {Icons[iconType]}

          <Typography sx={{ fontWeight: "bold" }}>{description}</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              alert("Edit-Icon clicked");
            }}
            sx={{
              p: 0,
              m: 0,
              "&:hover": { color: "primary.main" },
            }}
          >
            <EditIcon />
          </IconButton>

          <IconButton
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
          </IconButton>

          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              if (handleDelete) {
                handleDelete();
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
