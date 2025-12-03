import { Button, Box, Typography } from "@mui/material";
import Header from "../../components/Header";

export default function Dashboard() {
  return (
    <Box>
      <Header title="Dashboard" />
      <Box>
        <Box
          sx={{
            height: "4rem",
            display: "flex",
            alignItems: "center",
            p: "2rem",
          }}
        >
          <Button variant="contained">Workflow starten</Button>
        </Box>
        <Box>
          <Typography>Contentarea</Typography>
        </Box>
      </Box>
    </Box>
  );
}
