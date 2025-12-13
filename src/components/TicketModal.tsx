import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import StatusChip from "./StatusChip";
import theme from "../theme";
import type { TicketDataTypes } from "../types/types";
import CardShell from "./CardShell";
import {
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";

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
              bgcolor: theme.palette.status[item.status].main,
              borderRadius: 10,
              mb: 4,
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
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <CardShell>
                <CardHeader title="Phase: Erster Todo-Abschnitt"></CardHeader>
              </CardShell>
              <>
                <CardShell>
                  <CardHeader title="Phase: Erster Todo-Abschnitt"></CardHeader>
                  <CardContent>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked disabled />}
                        label="Schritt 1"
                      />
                      <FormControlLabel
                        control={<Checkbox checked disabled />}
                        label="Schritt 2"
                      />
                      <FormControlLabel
                        control={<Checkbox checked disabled />}
                        label="Schritt 3"
                      />
                      <FormControlLabel
                        control={<Checkbox checked disabled />}
                        label="Schritt 4"
                      />
                      <FormControlLabel
                        control={<Checkbox checked disabled />}
                        label="Schritt 5"
                      />
                    </FormGroup>
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" color="primary" disabled>
                      Phase abgeschlossen
                    </Button>
                  </CardActions>
                </CardShell>
                <CardShell>
                  <CardHeader title="Phase: Zweiter Todo-Abschnitt"></CardHeader>
                  <CardContent>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Schritt 1"
                      />
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Schritt 2"
                      />
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Schritt 3"
                      />
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Schritt 4"
                      />
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Schritt 5"
                      />
                    </FormGroup>
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" color="primary">
                      Phase abschließen
                    </Button>
                  </CardActions>
                </CardShell>
                <CardShell>
                  <CardHeader title="Phase: Dritter TODO-Abschnitt"></CardHeader>
                  <CardContent>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox disabled />}
                        label="Schritt 1"
                      />
                      <FormControlLabel
                        control={<Checkbox disabled />}
                        label="Schritt 2"
                      />
                      <FormControlLabel
                        control={<Checkbox disabled />}
                        label="Schritt 3"
                      />
                      <FormControlLabel
                        control={<Checkbox disabled />}
                        label="Schritt 4"
                      />
                      <FormControlLabel
                        control={<Checkbox disabled />}
                        label="Schritt 5"
                      />
                    </FormGroup>
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" color="primary" disabled>
                      Phase abschließen
                    </Button>
                  </CardActions>
                </CardShell>
              </>
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
            Ticket: {item.label}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Status: {item.status}
          </Typography>
          <Typography id="modal-modal-description">
            Vorlagen ID: {item.template_id}
          </Typography>
          <Typography id="modal-modal-description">
            Vorlagen-Name: {item.template_title}
          </Typography>
          <Typography id="modal-modal-description">
            Zuständig ist: {item.assigned_to}
          </Typography>
          <Typography id="modal-modal-description">
            Offen seit: {item.created_at}
          </Typography>
          <Typography id="modal-modal-description">
            Erstellt von: {item.started_by}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
