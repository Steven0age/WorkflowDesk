import { Box, CardHeader } from "@mui/material";
import CardShell from "../../../components/CardShell";
import WorkflowTitle from "../../../components/WorkflowEditor/WorkflowTitle";

export default function FormEditor() {
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
            <CardHeader title={"Formular anlegen"}></CardHeader>
          </CardShell>
        </Box>
      </Box>
    </>
  );
}
