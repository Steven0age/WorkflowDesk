import { Button, Box, Typography } from "@mui/material";
import Header from "../../components/Header";
import AddIcon from "@mui/icons-material/Add";

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
          <Button startIcon={<AddIcon />} variant="create">
            Workflow starten
          </Button>
        </Box>
        <Box>
          <Typography>Contentarea</Typography>
        </Box>
      </Box>
    </Box>
  );
}
