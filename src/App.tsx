import { Box, Typography } from "@mui/material";
import "./App.css";

function App() {
  return (
    <>
      <Box sx={{ p: 2, bgcolor: "primary.main", color: "white" }}>
        <Typography variant="h1">
          Hello World with <i>WorkflowDesk</i>
        </Typography>
      </Box>
    </>
  );
}

export default App;
