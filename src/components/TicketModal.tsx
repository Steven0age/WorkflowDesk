import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import type { GridRowParams } from "@mui/x-data-grid";

type TicketModalTypes = {
  openModal: boolean;
  handleOnClose: () => void;
  item: GridRowParams;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
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
        <Box sx={style}>
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
