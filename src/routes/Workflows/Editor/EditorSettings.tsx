import {
  Box,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import CardShell from "../../../components/CardShell";
import WorkflowHeader from "../../../components/WorkflowEditor/WorkflowHeader";
import { useEditor } from "../../../context/EditorContext";

export default function EditorSettings() {
  const {
    workflowTitle,
    changeWorkflowTitle,
    workflowDescription,
    changeWorkflowDescription,
  } = useEditor();

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
            height: "calc(100vh - 60px)",
            minWidth: 0,
            minHeight: 0,
            py: 3,
            px: 7,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <WorkflowHeader
            title={workflowTitle}
            description={workflowDescription}
          />
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
                <Typography variant="h5">Name des Workflows</Typography>
                <TextField
                  sx={{ mb: 2 }}
                  fullWidth
                  multiline
                  placeholder={workflowTitle}
                  onChange={(event) => {
                    changeWorkflowTitle(event.target.value);
                  }}
                ></TextField>
              </Box>
              <Box>
                <Typography variant="h5">Workflow Beschreibung</Typography>
                <TextField
                  sx={{ mb: 2 }}
                  fullWidth
                  multiline
                  id="outlined"
                  placeholder={workflowDescription}
                  onChange={(event) =>
                    changeWorkflowDescription(event.target.value)
                  }
                ></TextField>
              </Box>
            </CardContent>
          </CardShell>
        </Box>
      </Box>
    </>
  );
}
