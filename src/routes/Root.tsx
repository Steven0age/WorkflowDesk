import { Box, Button, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <Box
        sx={{
          bgcolor: "secondary.light",
          //   bgcolor: "background.default",
          display: "flex",
          height: "100vh",
        }}
      >
        <Box component="aside" sx={{ bgcolor: "secondary.main", width: 300 }}>
          <Sidebar />
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
          }}
        >
          <Typography variant="h1">
            Hello World with <i>WorkflowDesk</i>
          </Typography>
          <Button variant="contained" color="success">
            Testbutton
          </Button>
          <Button variant="contained">Testbutton</Button>
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
