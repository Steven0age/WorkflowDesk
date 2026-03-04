import { Outlet, useParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditorSidebar from "../components/EditorSidebar";
import { EditorProvider, useEditor } from "../context/EditorContext";
import { createWorkflow, editWorkflow } from "../data/workflowEditor.api";
import { useEffect } from "react";

export default function EditorLayout() {
  return (
    <EditorProvider>
      <EditorLayoutInner />
    </EditorProvider>
  );
}
function EditorLayoutInner() {
  const { workflowId } = useParams();

  const navigate = useNavigate();

  const {
    workflowTitle,
    workflowDescription,
    formDraft,
    phasesDraft,
    changeWorkflowTitle,
    changeWorkflowDescription,
    setFormDraft,
    setPhasesDraft,
  } = useEditor();

  useEffect(() => {
    if (!workflowId) return;

    const wf = editWorkflow(workflowId);
    if (!wf) return;

    changeWorkflowTitle(wf.title);
    changeWorkflowDescription(wf.description);
    setFormDraft(wf.questionnaire);
    setPhasesDraft(wf.phases);
  }, [workflowId]);

  return (
    <Box
      sx={{
        //bgcolor: "secondary.light",
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
      }}
    >
      <Box
        sx={{
          bgcolor: "background.main",
          width: "100%",
          height: 60,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          borderBottom: 1,
          borderColor: "border.main",
        }}
      >
        <Typography variant="h1" color="text.primary">
          Neuen Workflow erstellen
        </Typography>
        <Typography>{`Folgende Params sind geladen: ${workflowId}`}</Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            onClick={() =>
              createWorkflow(
                workflowTitle,
                workflowDescription,
                formDraft,
                phasesDraft,
              )
            }
          >
            Speichern
          </Button>
          <Button variant="outlined" onClick={() => navigate("/workflows")}>
            Abbrechen
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >
        <Box
          component="aside"
          sx={{
            bgcolor: "background.default",
            width: 300,
            flexShrink: 0,
          }}
        >
          <EditorSidebar />
        </Box>
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
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
