import { Clear } from "@mui/icons-material";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { type ChangeEvent } from "react";

type FileUploadFieldProps = {
  file: File | null;
  onChange: (file: File | null) => void;
};

export default function FileUploadField({
  onChange,
  file,
}: FileUploadFieldProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    onChange(f);

    e.target.value = "";
  };

  const handleClear = () => {
    onChange(null);
  };

  return (
    <Box
      sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 1 }}
    >
      <Button variant="contained" component="label">
        Datei auswählen
        <input type="file" hidden onChange={handleChange} />
      </Button>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {file && (
          <Clear
            sx={{
              height: 20,
              cursor: "pointer",
              "&:hover": { color: "error.main" },
            }}
            onClick={handleClear}
          />
        )}
        <Typography variant="body2">
          {file
            ? `Ausgewählt: ${file.name} (${Math.round(file.size / 1024)} KB)`
            : "Keine Datei ausgewählt"}
        </Typography>
      </Box>
    </Box>
  );
}
