import { Outlet } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function FullscreenLayout() {
  const navigate = useNavigate();
  return (
    <>
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
            px: 1,
            borderBottom: 1,
            borderColor: "border.main",
          }}
        >
          <Typography variant="h1" color="text.primary">
            Workflow erstellen
          </Typography>
          <IconButton onClick={() => navigate("/workflows")}>
            <CloseIcon />
          </IconButton>
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
      </Box>
    </>
  );
  //return <Outlet />;
}
