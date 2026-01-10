import { Box, Typography } from "@mui/material";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import FileUploadIcon from "@mui/icons-material/FileUpload";

type FormSelectItemTypes = {
  iconType: "textField" | "upload";
  description: string;
};

export default function FormSelectItem({
  iconType,
  description,
}: FormSelectItemTypes) {
  const Icons = {
    textField: <TextFieldsIcon sx={{ color: "primary.main" }}></TextFieldsIcon>,
    upload: <FileUploadIcon sx={{ color: "primary.main" }}></FileUploadIcon>,
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
    >
      <Box sx={{ display: "flex", gap: 1 }}>
        {Icons[iconType]}
        <Typography sx={{ fontWeight: "bold" }}>{description}</Typography>
      </Box>
    </Box>
  );
}
