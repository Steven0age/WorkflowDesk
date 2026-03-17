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
import { useApp } from "../../context/AppContext";

export type PhaseCardTypes = {
  phaseItem: TicketPhaseDataTypes | undefined;
};

export default function PhaseCard({ phaseItem }: PhaseCardTypes) {
  if (!phaseItem) {
    return;
  }

  const { handleCheckboxChange, handleCompletePhase } = useApp();

  const setDisabled = {
    pending: true,
    inProgress: false,
    review: true,
    done: true,
  };

  const getButtonLabel = {
    pending: "Phase noch nicht gestartet",
    inProgress: "Phase abschließen",
    review: "Phase zur Prüfung eingereicht",
    done: "Phase abgeschlossen",
  };

  return (
    <>
      <CardShell disabled={setDisabled[phaseItem.status]}>
        <CardHeader title={phaseItem.title}></CardHeader>
        <CardContent>
          <FormGroup>
            {phaseItem.tasks.map((i) => {
              return (
                <FormControlLabel
                  key={i.id}
                  control={
                    <Checkbox
                      onChange={(event) => {
                        handleCheckboxChange(event, phaseItem.id, i.id);
                      }}
                      checked={i.is_done}
                      required={i.is_required}
                      disabled={setDisabled[phaseItem.status]}
                    />
                  }
                  label={i.label}
                />
              );
            })}
          </FormGroup>
        </CardContent>
        <CardActions>
          {
            <Button
              variant="contained"
              color="primary"
              disabled={setDisabled[phaseItem.status]}
              onClick={() => {
                handleCompletePhase(phaseItem.id);
              }}
            >
              {getButtonLabel[phaseItem.status]}
            </Button>
          }
        </CardActions>
      </CardShell>
    </>
  );
}
