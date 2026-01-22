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

type EditorDrawerProps = {
  handleClose: () => void;
  itemId: string | undefined;
};

export default function EditorDrawer({ handleClose }: EditorDrawerProps) {
  const {
    formDraft,
    questionLabel,
    questionDescription,
    questionIsRequired,
    changeQuestionLabel,
    changeQuestionDescription,
    changeQuestionIsRequired,
  } = useEditor();

  if (!formDraft) {
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
          <Typography sx={{ fontWeight: "bold" }}>Feld bearbeiten</Typography>
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
            value={questionLabel}
            onChange={(event) => {
              changeQuestionLabel(event.target.value);
            }}
          ></TextField>
          <Typography variant="h5">Beschreibung</Typography>
          <TextField
            sx={{ mb: 2 }}
            fullWidth
            multiline
            placeholder={"Beschreibung eingeben"}
            value={questionDescription}
            onChange={(event) => {
              changeQuestionDescription(event.target.value);
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
                  checked={questionIsRequired}
                  onChange={(event) =>
                    changeQuestionIsRequired(event.target.checked)
                  }
                  sx={{ color: "primary.main" }}
                />
              }
              label="Verpflichtend"
            />
          </FormGroup>
        </CardContent>
      </CardShell>
    </Box>
  );
}
