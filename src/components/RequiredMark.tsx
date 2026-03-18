import { Typography } from "@mui/material";
import { red } from "@mui/material/colors";

export default function RequiredMark() {
  return (
    <Typography
      component="span"
      sx={{ color: red[900], fontSize: "1.3rem", fontWeight: "800", ml: "2px" }}
    >
      *
    </Typography>
  );
}
