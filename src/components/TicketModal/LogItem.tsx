import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type {
  ActivityLogDataTypes,
  ActivityLogEventType,
} from "../../types/types";

type LogItemTypes = {
  item: ActivityLogDataTypes;
};

const getLogEventLabel = (input: ActivityLogEventType) => {
  switch (input) {
    case "ticket_created":
      return "Neues Ticket erstellt";
      break;

    case "ticket_assigned":
      return "Ticket zugewiesen";
      break;

    case "ticket_submitted_for_approval":
      return "Ticket zur Prüfung eingereicht";
      break;

    case "ticket_approval_rejected":
      return "Ticket-Freigabe abgelehnt";
      break;

    case "ticket_approval_approved":
      return "Ticket freigegeben und abgeschlossen";
      break;

    case "ticket_completed":
      return "Ticket abgeschlossen";
      break;

    case "phase_started":
      return "Phase gestartet";
      break;

    case "phase_submitted_for_approval":
      return "Phase zur Prüfung eingereicht";
      break;

    case "phase_file_uploaded":
      return "Datei zur Phase hinzugefügt";
      break;

    case "phase_approval_rejected":
      return "Phasen-Freigabe abgelehnt";
      break;

    case "phase_approval_approved":
      return "Phasen freigegeben und abgeschlossen";
      break;

    case "phase_completed":
      return "Phase abgeschlossen";
      break;

    default:
      return "";
  }
};

function logTime(dateValue: string) {
  const date = new Date(dateValue);

  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function LogItem({ item }: LogItemTypes) {
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>{item.user_id}</Typography>
          <Typography sx={{ fontSize: "0.8rem" }}>
            {logTime(item.created_at)}
          </Typography>
        </Box>
        <Typography
          sx={{
            mt: 1,
            textAlign: "left",
            hyphens: "auto",
            wordBreak: "normal",
            overflowWrap: "break-word",
          }}
        >
          {getLogEventLabel(item.event_type)}
          {item.message ? ` –  ${item.message}` : ""}
        </Typography>
      </Box>
    </>
  );
}
