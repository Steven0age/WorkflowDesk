import { Box } from "@mui/material";
import RootSidebar from "../components/RootSidebar";
import { Outlet } from "react-router-dom";
import { CreateTicketProvider } from "../context/CreateTicketContext";
import { AppProvider } from "../context/AppContext";

export default function Root() {
  return (
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
        <RootSidebar />
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
        <AppProvider>
          <CreateTicketProvider>
            <Outlet />
          </CreateTicketProvider>
        </AppProvider>
      </Box>
    </Box>
  );
}
