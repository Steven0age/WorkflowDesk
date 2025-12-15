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
  Paper,
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
            <CardShell>
              <CardHeader
                sx={{ color: "text.disabled" }}
                title="Phase: Erster Todo-Abschnitt"
              ></CardHeader>
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
            <CardShell raised>
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
              <CardHeader
                sx={{ color: "text.disabled" }}
                title="Phase: Dritter TODO-Abschnitt"
              ></CardHeader>
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
            <Box>
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
          </Box>
          <Box
            sx={{
              border: 1,
              borderColor: "border.main",
              borderRadius: 1,
              p: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{ pb: 2, mb: 2, borderBottom: 1, borderColor: "border.main" }}
            >
              Aktivitäten
            </Typography>
            <Box sx={{ mb: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  Vorname Nachname
                </Typography>
                <Typography sx={{ fontSize: "0.8rem" }}>
                  17.11.2025 16:42
                </Typography>
              </Box>
              <Typography sx={{ mt: 1 }}>
                Neues Ticket wurde eröffnet
              </Typography>
            </Box>
            <Box sx={{ mb: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  Vorname Nachname
                </Typography>
                <Typography sx={{ fontSize: "0.8rem" }}>
                  17.11.2025 16:42
                </Typography>
              </Box>
              <Typography sx={{ mt: 1 }}>
                Langer text: Neues Ticket wurde eröffnet, Neues Ticket wurde
                eröffnet, Neues Ticket wurde eröffnet, Neues Ticket wurde
                eröffnet, Neues Ticket wurde eröffnet, Neues Ticket wurde
                eröffnet
              </Typography>
            </Box>
            <Box sx={{ mb: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  Vorname Nachname
                </Typography>
                <Typography sx={{ fontSize: "0.8rem" }}>
                  17.11.2025 16:42
                </Typography>
              </Box>
              <Typography sx={{ mt: 1 }}>
                Neues Ticket wurde eröffnet
              </Typography>
            </Box>
          </Box>
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
