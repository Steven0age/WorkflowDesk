import { Box } from "@mui/material";
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
          width: "100%",
        }}
      >
        <Box
          component="aside"
          sx={{ bgcolor: "secondary.main", width: 300, flexShrink: 0 }}
        >
          <Sidebar />
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
    </>
  );
}
