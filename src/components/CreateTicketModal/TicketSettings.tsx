import {
  CardContent,
  CardHeader,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CardShell from "../CardShell";
import type { OrganizationMember } from "../../types/types";
import { useCreateTicket } from "../../context/CreateTicketContext";

type TicketSeetingsProps = {
  workflowTitle: string;
  organizationMembers: OrganizationMember[];
};

export default function TicketSettings({
  workflowTitle,
  organizationMembers,
}: TicketSeetingsProps) {
  const { ticketLabel, setTicketLabel, assignedTo, setAssignedTo } =
    useCreateTicket();

  return (
    <CardShell>
      <CardHeader title="Ticket-Einstellungen" />
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <FormControl fullWidth>
          <Typography sx={{ mt: 2, fontWeight: "bold" }}>Ticketname</Typography>
          <TextField
            fullWidth
            placeholder={workflowTitle}
            value={ticketLabel}
            onChange={(e) => setTicketLabel(e.target.value)}
          />
          <Typography sx={{ mt: 4, fontWeight: "bold" }}>
            Zuständige Person
          </Typography>
          <Select
            labelId="assigned-to-label"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          >
            {organizationMembers.map((u: OrganizationMember) => (
              <MenuItem key={u.id} value={u.id}>
                {u.first_name} {u.last_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CardContent>
    </CardShell>
  );
}
