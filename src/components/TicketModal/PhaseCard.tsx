import {
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import CardShell from "../CardShell";
import type { TicketPhaseDataTypes } from "../../types/types";

type PhaseCardTypes = {
  phaseItem: TicketPhaseDataTypes | undefined;
};

export default function PhaseCard({ phaseItem }: PhaseCardTypes) {
  if (!phaseItem) {
    return;
  }

  const setDisabled = {
    open: true,
    inProgress: false,
    review: true,
    done: true,
  };

  const getButtonLabel = {
    open: "open-Phase abschließen",
    inProgress: "IP-Phase abschließen",
    review: "rew-Phase zur Prüfung eingereicht",
    done: "done-Phase abgeschlossen",
  };

  return (
    <>
      <CardShell disabled={setDisabled[phaseItem.status]}>
        <CardHeader title={phaseItem.title}></CardHeader>
        <CardContent>
          <FormGroup>
            {phaseItem.ticket_task.map((i) => (
              <FormControlLabel
                key={i.id}
                control={
                  <Checkbox
                    checked={i.is_done}
                    required={i.is_required}
                    disabled={setDisabled[phaseItem.status]}
                  />
                }
                label={i.label}
              />
            ))}
          </FormGroup>
        </CardContent>
        <CardActions>
          {
            <Button
              variant="contained"
              color="primary"
              disabled={setDisabled[phaseItem.status]}
            >
              {getButtonLabel[phaseItem.status]}
            </Button>
          }
        </CardActions>
      </CardShell>
    </>
  );
}
