import { Box, Typography } from "@mui/material";
import MenuItem from "./MenuItem";

export default function Sidebar() {
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
          border: "1px solid grey",
        }}
      >
        <Typography>L O G O</Typography>
      </Box>

      <MenuItem linkAnchor="Dashboard" />
      <MenuItem linkAnchor="Workflows" />
      <MenuItem linkAnchor="Einstellungen" />
    </Box>
  );
}
