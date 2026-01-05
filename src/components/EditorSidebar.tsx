import { Box } from "@mui/material";
import MenuItem from "./MenuItem";

export default function EditorSidebar() {
  return (
    <Box
      sx={{
        color: "text.contrast",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        p: 1,
      }}
    >
      <Box
        sx={{
          height: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></Box>

      <MenuItem
        lightMode
        linkAnchor="Grundeinstellungen"
        linkTarget="/workflows/editor/"
      />
      <MenuItem
        lightMode
        linkAnchor="Formular"
        linkTarget="/workflows/editor/form"
      />
      <MenuItem
        lightMode
        linkAnchor="Phasen / Todo's"
        linkTarget="/workflows/editor/phases"
      />
    </Box>
  );
}
