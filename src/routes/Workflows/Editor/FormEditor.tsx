import { Box, CardContent, CardHeader, Typography } from "@mui/material";
import CardShell from "../../../components/CardShell";
import WorkflowHeader from "../../../components/WorkflowEditor/WorkflowHeader";
import { useEditor } from "../../../context/EditorContext";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import FormSelectItem from "../../../components/WorkflowEditor/FormSelectItem";
import FormDragItem from "../../../components/WorkflowEditor/FormDragItem";

export default function FormEditor() {
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              height: "100%",
              bgcolor: "background.default",
              borderRadius: 3,
              mt: 3,
              p: 3,
              overflow: "auto",
            }}
          >
            <FormDragItem description="Beispiel Frage 1" iconType="textField" />
            <FormDragItem description="Beispiel Frage 2" iconType="textField" />
            <FormDragItem description="Beispiel Upload 1" iconType="upload" />
            <FormDragItem description="Beispiel Frage 3" iconType="textField" />
          </Box>
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
            <CardHeader title={"Formular anlegen"}></CardHeader>
            <CardContent
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <FormSelectItem description="Textfeld" iconType="textField" />
              <FormSelectItem description="Datei Upload" iconType="upload" />
            </CardContent>
          </CardShell>
        </Box>
      </Box>
    </>
  );
}
