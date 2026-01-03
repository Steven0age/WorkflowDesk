import { Box, Typography } from "@mui/material";

export default function Create() {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >
        <Box
          component="main"
          sx={{
            minWidth: 0,
            minHeight: 0,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h2">Hallo Create page</Typography>
        </Box>
        <Box
          component="aside"
          sx={{
            bgcolor: "background.default",
            width: 300,
            flexShrink: 0,
          }}
        >
          <Typography>Einstellungen</Typography>
        </Box>
      </Box>
    </>
  );
}
