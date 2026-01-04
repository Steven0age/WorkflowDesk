import { Box } from "@mui/material";
import MenuItem from "./MenuItem";

export default function SidebarFullscreen() {
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
        linkTarget="/workflows/create"
      />
      <MenuItem
        lightMode
        linkAnchor="Formular"
        linkTarget="/workflows/create"
      />
      <MenuItem
        lightMode
        linkAnchor="Phasen / Todo's"
        linkTarget="/workflows/create"
      />
    </Box>
  );
}
