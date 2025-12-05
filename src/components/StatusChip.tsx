import { Chip } from "@mui/material";
import theme from "../theme";

type StatusChipTypes = {
  status: "open" | "inProgress" | "review" | "done";
};

export default function StatusChip({ status }: StatusChipTypes) {
  const chipColor = {
    open: theme.palette.status.open,
    inProgress: theme.palette.status.inProgress,
    review: theme.palette.status.review,
    done: theme.palette.status.done,
  };
  const chipLabel = {
    open: "Offen",
    inProgress: "In Bearbeitung",
    review: "Wird geprüft",
    done: "Abgeschlossen",
  };

  return (
    <Chip
      sx={{
        width: 140,
        bgcolor: chipColor[status].main,
        color: chipColor[status].contrastText,
      }}
      label={chipLabel[status]}
    />
  );
}
