import { Box, Typography } from "@mui/material";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { FormSelectItemTypes } from "./FormSelectItem";

export type FormDragItemTypes = {
  activeItem?: number;
  iconType: FormSelectItemTypes["iconType"];
  description: FormSelectItemTypes["description"];
  order: number;
  onClick?: () => void;
};

export default function FormDragItem({
  activeItem,
  iconType,
  description,
  order,
  onClick,
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

        <DragIndicatorIcon
          {...listeners}
          sx={{ color: "text.secondary", cursor: "grab" }}
        />
      </Box>
    </Box>
  );
}
