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

    case "ticket_assigned":
      return "Ticket zugewiesen";

    case "ticket_submitted_for_approval":
      return "Ticket zur Prüfung eingereicht";

    case "ticket_approval_rejected":
      return "Ticket-Freigabe abgelehnt";

    case "ticket_approval_approved":
      return "Ticket freigegeben und abgeschlossen";

    case "ticket_completed":
      return "Ticket abgeschlossen";

    case "phase_started":
      return "Phase gestartet";

    case "phase_submitted_for_approval":
      return "Phase zur Prüfung eingereicht";

    case "phase_file_uploaded":
      return "Datei zur Phase hinzugefügt";

    case "phase_approval_rejected":
      return "Phasen-Freigabe abgelehnt";

    case "phase_approval_approved":
      return "Phasen freigegeben und abgeschlossen";

    case "phase_completed":
      return "Phase abgeschlossen";

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
