import type { TicketDataTypes } from "../../types/types";
import theme from "../../theme";
import { Box, Typography, Modal, Button } from "@mui/material";
import StatusChip from "../StatusChip";
import ActivitiyLog from "./ActivityLog";
import PhaseCard from "./PhaseCard";

type TicketModalTypes = {
  openModal: boolean;
  handleOnClose: () => void;
  item: TicketDataTypes;
};

export default function TicketModal({
  openModal,
  handleOnClose,
  item,
}: TicketModalTypes) {
  if (!item) {
    return <Typography>Kein Ticket ausgewählt</Typography>;
  }

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
            bgcolor: theme.palette.status[item.status].main,
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
              color: theme.palette.status[item.status].contrastText,
              textAlign: "center",
              hyphens: "auto",
              wordBreak: "normal",
              overflowWrap: "break-word",
            }}
          >
            Ticket: {item.label}
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
              status={item.status}
              variant="ticket"
              labelPrefix="Status:"
            />
            <StatusChip
              status={item.status}
              variant="ticket"
              labelPrefix="Workflow:"
              label={item.template_title}
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
            {item.ticket_phase?.map((i) => {
              return <PhaseCard key={i.id} phaseItem={i} />;
            })}
            {!item.ticket_phase && (
              <Typography>Keine Phasen angelegt</Typography>
            )}
          </Box>
          <ActivitiyLog item={item} />
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
          <Button variant="contained">Speichern</Button>
          <Button variant="outlined" onClick={handleOnClose}>
            Schließen
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
