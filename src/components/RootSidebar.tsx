import { Box, Button, Typography } from "@mui/material";
import MenuItem from "./MenuItem";
import { supabase } from "../supabase-client";

export default function RootSidebar() {
  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <Box
      sx={{
        color: "text.contrast",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        p: 1,
        height: "100%",
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

      <Box
        sx={{
          color: "text.contrast",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 3,
          height: "100%",
          flex: 1,
        }}
      >
        <Box
          sx={{
            color: "text.contrast",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <MenuItem linkAnchor="Dashboard" linkTarget="/" />
          <MenuItem linkAnchor="Workflows" linkTarget="/workflows" />
          <MenuItem linkAnchor="Einstellungen" linkTarget="settings" />
        </Box>

        <Button
          variant="outlined"
          color="inherit"
          sx={{ mb: 2 }}
          onClick={() => logout()}
        >
          Log Out
        </Button>
      </Box>
    </Box>
  );
}
