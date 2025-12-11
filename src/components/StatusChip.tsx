import { Chip } from "@mui/material";
import theme from "../theme";

type StatusChipTypes = {
  status: "open" | "inProgress" | "review" | "done";
  variant: "list" | "ticket";
  label?: string;
  labelPrefix?: string;
};

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

export default function StatusChip({
  status,
  variant,
  label,
  labelPrefix,
}: StatusChipTypes) {
  const listStyling = {
    width: 140,
    bgcolor: chipColor[status].main,
    color: chipColor[status].contrastText,
  };

  const ticketStyling = {
    px: 4,
    bgcolor: chipColor[status].background,
    color: chipColor[status].contrastText,
    border: `1px solid ${chipColor[status].border}`,
  };

  return (
    <Chip
      sx={variant === "list" ? listStyling : ticketStyling}
      label={`
        ${labelPrefix ? labelPrefix : ""} 
        ${label ? label : chipLabel[status]}`}
    />
  );
}
