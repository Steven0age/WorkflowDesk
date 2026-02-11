import {
  Box,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useEditor } from "../../context/EditorContext";
import CardShell from "../CardShell";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

type PhaseDrawerProps = {
  handleClose: () => void;
  itemId: string | undefined;
};

export default function PhaseDrawer({ handleClose }: PhaseDrawerProps) {
  const {
    phasesDraft,
    itemLabel,
    itemDescription,
    itemProofRequired,
    itemProofDescription,
    itemApprovalRequired,
    changeItemLabel,
    changeItemDescription,
    changeItemProofRequired,
    changeItemProofDescription,
    changeItemApprovalRequired,
  } = useEditor();

  if (!phasesDraft) {
    return;
  }

  return (
    <Box
      component="aside"
      sx={{
        display: "flex",
        flexDirection: "column",
        pt: 2,
        gap: 0,
        width: 500,
        height: "100%",
        flexShrink: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <EditIcon sx={{ color: "primary.main" }}></EditIcon>
          <Typography sx={{ fontWeight: "bold" }}>Phase bearbeiten</Typography>
        </Box>

        <Box>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>

      <CardShell elevation={1} sx={{ mx: 2, mb: 4, flexShrink: 0 }}>
        <CardHeader title={"Allgemeine Optionen"} />
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h5">Feldname</Typography>
          <TextField
            sx={{ mb: 2 }}
            fullWidth
            multiline
            placeholder={"Feldname eingeben"}
            value={itemLabel}
            onChange={(event) => {
              changeItemLabel(event.target.value);
            }}
          ></TextField>
          <Typography variant="h5">Beschreibung</Typography>
          <TextField
            sx={{ mb: 2 }}
            fullWidth
            multiline
            placeholder={"Beschreibung eingeben"}
            value={itemDescription}
            onChange={(event) => {
              changeItemDescription(event.target.value);
            }}
          ></TextField>
        </CardContent>
      </CardShell>
      <CardShell elevation={1} sx={{ mx: 2, mb: 4, flexShrink: 0 }}>
        <CardHeader title={"Einstellungen"} />
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <FormGroup sx={{ p: 1 }}>
            <FormControlLabel
              sx={{ display: "flex", gap: 1 }}
              control={
                <Checkbox
                  checked={itemProofRequired}
                  onChange={(event) =>
                    changeItemProofRequired(event.target.checked)
                  }
                  sx={{ color: "primary.main" }}
                />
              }
              label="Datei-Upload zum Phasenabschluss erforderlich"
            />
            {itemProofRequired && (
              <TextField
                sx={{ mb: 2 }}
                fullWidth
                multiline
                placeholder={"Was soll hochgeladen werden?"}
                value={itemProofDescription}
                onChange={(event) => {
                  changeItemProofDescription(event.target.value);
                }}
              />
            )}
            <FormControlLabel
              sx={{ display: "flex", gap: 1 }}
              control={
                <Checkbox
                  checked={itemApprovalRequired}
                  onChange={(event) =>
                    changeItemApprovalRequired(event.target.checked)
                  }
                  sx={{ color: "primary.main" }}
                />
              }
              label="Freigabe durch Workflow-Ersteller erforderlich"
            />
          </FormGroup>
        </CardContent>
      </CardShell>
    </Box>
  );
}
