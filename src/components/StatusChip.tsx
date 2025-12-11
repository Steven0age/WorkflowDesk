import { Chip } from "@mui/material";
import theme from "../theme";

type StatusChipTypes = {
  status: "open" | "inProgress" | "review" | "done";
  variant: "list" | "ticket";
};

export default function StatusChip({ status, variant }: StatusChipTypes) {
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

  const listStyling = {
    width: 140,
    bgcolor: chipColor[status].main,
    color: chipColor[status].contrastText,
  };

  const ticketStyling = {
    width: 140,
    bgcolor: chipColor[status].background,
    color: chipColor[status].contrastText,
    border: chipColor[status].border,
  };

  return (
    <Chip
      sx={variant === "list" ? listStyling : ticketStyling}
      label={chipLabel[status]}
    />
  );
}
