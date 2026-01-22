import { Box, IconButton, Typography } from "@mui/material";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { QuestionnaireQuestionTypes } from "../../types/types";

export type QuestionProps = Pick<
  QuestionnaireQuestionTypes,
  "label" | "field_type" | "id"
> & {
  activeItem?: string;
  onClick?: () => void;
  onDelete?: () => void;
};

export default function Question({
  activeItem,
  id,
  field_type,
  label,
  onClick,
  onDelete,
}: QuestionProps) {
  const Icons = {
    textField: <TextFieldsIcon sx={{ color: "primary.main" }}></TextFieldsIcon>,
    upload: <FileUploadIcon sx={{ color: "primary.main" }}></FileUploadIcon>,
  };

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

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
        p: 3,
        border: 2,
        borderColor: "border.main",
        borderRadius: 2,
        cursor: "pointer",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gap: 1 }}>
          {Icons[field_type]}

          <Typography sx={{ fontWeight: "bold" }}>{label}</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
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
