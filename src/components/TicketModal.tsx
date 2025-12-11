import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import type { GridRowParams } from "@mui/x-data-grid";
import StatusChip from "./StatusChip";
import theme from "../theme";

type TicketModalTypes = {
  openModal: boolean;
  handleOnClose: () => void;
  item: GridRowParams;
};

export default function TicketModal({
  openModal,
  handleOnClose,
  item,
}: TicketModalTypes) {
  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleOnClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            width: "1100px",
            height: "calc(100vh - 150px)",
            mx: "auto",
            mt: "100px",
            mb: "50px",
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
            bgcolor: "background.paper",
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              minHeight: 150,
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              justifyContent: "center",
              bgcolor: theme.palette.status[item.row.status].main,
              borderRadius: 10,
              mb: 4,
              px: 10,
              py: 4,
            }}
          >
            <Typography
              variant="h2"
              id="modal-modal-title"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "2rem",
                color: theme.palette.status[item.row.status].contrastText,
              }}
            >
              Ticket: {item.row.label}
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
                status={item.row.status}
                variant="ticket"
                labelPrefix="Status:"
              />
              <StatusChip
                status={item.row.status}
                variant="ticket"
                labelPrefix="Workflow:"
                label={item.row.label}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "2.5fr 1fr",
              gap: 4,
            }}
          >
            <Box
              sx={{
                backgroundColor: "error.main",
                borderRadius: 1,
                p: 1,
              }}
            >
              CONTENT-LINKS
            </Box>
            <Box
              sx={{
                backgroundColor: "error.main",
                borderRadius: 1,
                p: 1,
              }}
            >
              CONTENT-RECHTS
            </Box>
          </Box>

          <Typography
            id="modal-modal-title"
            sx={{ fontWeight: "bold", fontSize: "2rem" }}
          >
            Ticket: {item.row.label}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Status: {item.row.status}
          </Typography>
          <Typography id="modal-modal-description">
            Zuständig ist: {item.row.assigned_to}
          </Typography>
          <Typography id="modal-modal-description">
            Offen seit: {item.row.created_at}
          </Typography>
          <Typography id="modal-modal-description">
            Erstellt von: {item.row.started_by}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
