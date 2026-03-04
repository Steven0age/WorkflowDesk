import { Box } from "@mui/material";
import MenuItem from "./MenuItem";
import { useParams } from "react-router-dom";

export default function EditorSidebar() {
  const { workflowId } = useParams();

  const base = workflowId
    ? `/workflows/editor/${workflowId}`
    : `/workflows/editor/new`;
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

      <MenuItem lightMode linkAnchor="Grundeinstellungen" linkTarget={base} />
      <MenuItem lightMode linkAnchor="Formular" linkTarget={`${base}/form`} />
      <MenuItem
        lightMode
        linkAnchor="Phasen / Todo's"
        linkTarget={`${base}/phases`}
      />
    </Box>
  );
}
