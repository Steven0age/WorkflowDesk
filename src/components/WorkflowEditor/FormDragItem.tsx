import { Box, Typography } from "@mui/material";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type FormSelectItemTypes = {
  iconType: "textField" | "upload";
  description: string;
  id: number;
};

export default function FormDragItem({
  iconType,
  description,
  id,
}: FormSelectItemTypes) {
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
      id={`${id}`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      sx={{
        bgcolor: "background.paper",
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
        <DragIndicatorIcon sx={{ color: "text.secondary", cursor: "grab" }} />
      </Box>
    </Box>
  );
}
