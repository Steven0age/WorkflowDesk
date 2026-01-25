import { Box, Typography } from "@mui/material";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CropFreeIcon from "@mui/icons-material/CropFree";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

export type EditorAddButtonProps = {
  variant: "textField" | "upload" | "phase" | "task";
  onClick: () => void;
};

export default function EditorAddButton({
  variant,
  onClick,
}: EditorAddButtonProps) {
  const variants = {
    textField: {
      icon: <TextFieldsIcon sx={{ color: "primary.main" }}></TextFieldsIcon>,
      label: "Frage hinzufügen",
    },
    upload: {
      icon: <FileUploadIcon sx={{ color: "primary.main" }}></FileUploadIcon>,
      label: "Datei Upload hinzufügen",
    },
    phase: {
      icon: <CropFreeIcon sx={{ color: "primary.main" }}></CropFreeIcon>,
      label: "Phase hinzufügen",
    },
    task: {
      icon: <CheckBoxIcon sx={{ color: "primary.main" }}></CheckBoxIcon>,
      label: "Todo hinzufügen",
    },
  };
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        p: 3,
        border: 2,
        borderColor: "border.main",
        borderRadius: 2,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <Box sx={{ display: "flex", gap: 1 }}>
        {variants[`${variant}`].icon}
        <Typography sx={{ fontWeight: "bold" }}>
          {variants[`${variant}`].label}
        </Typography>
      </Box>
    </Box>
  );
}
