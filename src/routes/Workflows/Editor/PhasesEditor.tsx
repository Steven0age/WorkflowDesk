import { Box, CardContent, CardHeader } from "@mui/material";
import CardShell from "../../../components/CardShell";
import WorkflowHeader from "../../../components/WorkflowEditor/WorkflowHeader";
import { useEditor } from "../../../context/EditorContext";
import EditorAddButton from "../../../components/WorkflowEditor/EditorAddButton";

export default function PhasesEditor() {
  const { workflowTitle, workflowDescription } = useEditor();
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
            <CardHeader title={"Phasen und Todo's anlegen"}></CardHeader>
            <CardContent
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <EditorAddButton
                variant="phase"
                onClick={() => alert("new Phase added")}
              />
              <EditorAddButton
                variant="task"
                onClick={() => alert("new Task added")}
              />
            </CardContent>
          </CardShell>
        </Box>
      </Box>
    </>
  );
}
