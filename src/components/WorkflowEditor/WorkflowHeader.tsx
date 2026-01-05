import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type WorkflowTitleTypes = {
  title: string;
  description: string;
};

export default function WorkflowHeader({
  title,
  description,
}: WorkflowTitleTypes) {
  return (
    <Box>
      <Typography sx={{ fontSize: "2rem" }}>{title}</Typography>
      <Typography color="text.secondary" sx={{ fontSize: "0.9rem" }}>
        {description}
      </Typography>
    </Box>
  );
}
