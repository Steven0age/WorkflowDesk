import {
  Box,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import CardShell from "../../../components/CardShell";
import WorkflowTitle from "../../../components/WorkflowEditor/WorkflowTitle";

export default function EditorSettings() {
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
            p: 3,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <WorkflowTitle />
        </Box>
        <Box
          component="aside"
          sx={{
            bgcolor: "background.default",
            width: 500,
            flexShrink: 0,
          }}
        >
          <CardShell elevation={1} sx={{ height: "100%" }}>
            <CardHeader title={"Grundeinstellungen"}></CardHeader>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <Box>
                <Typography variant="h5">Name eingeben</Typography>
                <TextField
                  sx={{ mb: 2 }}
                  fullWidth
                  multiline
                  placeholder="..."
                ></TextField>
              </Box>
              <Box>
                <Typography variant="h5">Beschreibung eingeben</Typography>
                <TextField
                  sx={{ mb: 2 }}
                  fullWidth
                  multiline
                  id="outlined"
                  placeholder="..."
                ></TextField>
              </Box>
            </CardContent>
          </CardShell>
        </Box>
      </Box>
    </>
  );
}
