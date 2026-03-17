import theme from "../../theme";
import { Box, Typography, Modal, Button } from "@mui/material";
import StatusChip from "../StatusChip";
import ActivitiyLog from "./ActivityLog";
import PhaseCard from "./PhaseCard";
import QuestionnaireCard from "./QuestionnaireCard";
import { updateTicket } from "../../data/app.api";
import { useApp } from "../../context/AppContext";

type TicketModalTypes = {
  openModal: boolean;
  handleOnClose: () => void;
};

export default function TicketModal({
  openModal,
  handleOnClose,
}: TicketModalTypes) {
  const { selectedTicket, handleCompleteTicket } = useApp();
  if (!selectedTicket) {
    return <Typography>Kein Ticket ausgewählt</Typography>;
  }

  const hasOpenPhases =
    selectedTicket?.phases?.some((phase) => phase.status !== "done") ?? false;

  const isTicketDone = selectedTicket?.status === "done";

  return (
    <Modal
      open={openModal}
      onClose={handleOnClose}
      aria-labelledby="modal-modal-title"
    >
      <Box
        sx={{
          width: "1100px",
          height: "calc(100vh - 40px)",
          mx: "auto",
          mt: "20px",
          mb: "20px",
          boxShadow: 24,
          borderRadius: 1,
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
        }}
      >
        <Box
          sx={{
            flex: "0 0 auto",
            minHeight: 150,
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            justifyContent: "center",
            bgcolor: theme.palette.status[selectedTicket.status].main,
            borderRadius: 10,
            mx: 4,
            my: 2,
            px: 12,
            py: 4,
          }}
        >
          <Typography
            variant="h2"
            id="modal-modal-title"
            sx={{
              fontWeight: "bold",
              fontSize: "2rem",
              mb: 2,
              color: theme.palette.status[selectedTicket.status].contrastText,
              textAlign: "center",
              hyphens: "auto",
              wordBreak: "normal",
              overflowWrap: "break-word",
            }}
          >
            Ticket: {selectedTicket.label}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 4,
              mt: 2,
            }}
          >
            <StatusChip
              status={selectedTicket.status}
              variant="ticket"
              labelPrefix="Status:"
            />
            <StatusChip
              status={selectedTicket.status}
              variant="ticket"
              labelPrefix="Workflow:"
              label={selectedTicket.template_title}
            />
          </Box>
        </Box>
        <Box
          sx={{
            flex: "1 1 auto",
            minHeight: 0,
            overflowY: "auto",
            display: "grid",
            gridTemplateColumns: "2fr 1.2fr",
            gap: 4,
            px: 4,
            py: 2,
            boxShadow:
              "inset 0  8px 6px -6px #0000001f,inset 0 -8px 6px -6px #0000001f",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <QuestionnaireCard item={selectedTicket} />
            {selectedTicket.phases?.map((i) => {
              return <PhaseCard key={i.id} phaseItem={i} />;
            })}
            {!selectedTicket.phases && (
              <Typography>Keine Phasen angelegt</Typography>
            )}
          </Box>
          <ActivitiyLog item={selectedTicket} />
        </Box>

        <Box
          sx={{
            flex: "0 0 auto",
            height: "4rem",
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            gap: 2,
            pr: 2,
          }}
        >
          {!hasOpenPhases && (
            <Button
              variant="contained"
              disabled={isTicketDone}
              onClick={handleCompleteTicket}
            >
              {isTicketDone ? "Ticket abgeschlossen" : "Ticket abschließen"}
            </Button>
          )}

          {hasOpenPhases && (
            <Button
              variant="contained"
              onClick={() => {
                if (selectedTicket === null) {
                  throw new Error("Kein Ticket ausgewählt");
                }
                updateTicket(selectedTicket);
              }}
            >
              Speichern
            </Button>
          )}

          <Button variant="outlined" onClick={handleOnClose}>
            Schließen
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
