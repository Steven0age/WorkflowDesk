import { Box, Typography } from "@mui/material";

type HeaderTypes = {
  title?: string;
};

export default function Header({ title }: HeaderTypes) {
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        height: "4rem",
        display: "flex",
        alignItems: "center",
        p: "2rem",
      }}
    >
      <Typography variant="h1">{title}</Typography>
    </Box>
  );
}
