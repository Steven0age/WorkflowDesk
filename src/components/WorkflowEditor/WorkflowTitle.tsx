import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function WorkflowTitle() {
  return (
    <Box>
      <Typography sx={{ fontSize: "2rem" }}>Neuer Workflow</Typography>
      <Typography color="text.secondary" sx={{ fontSize: "0.9rem" }}>
        Workflow Beschreibung
      </Typography>
    </Box>
  );
}
