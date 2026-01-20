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
import { useEditor, type EditorItemType } from "../../context/EditorContext";
import CardShell from "../CardShell";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CloseIcon from "@mui/icons-material/Close";
import { CheckBox } from "@mui/icons-material";

type EditorDrawerProps = {
  itemId?: EditorItemType["id"];
  handleClose: () => void;
};

export default function EditorDrawer({
  itemId,
  handleClose,
}: EditorDrawerProps) {
  const {
    formDraft,
    questionLabel,
    questionDescription,
    questionIsRequired,
    changeQuestionLabel,
    changeQuestionDescription,
    changeQuestionIsRequired,
    selectedQuestionId,
  } = useEditor();
  if (!formDraft) {
    return;
  }
  // --> const index = formDraft.findIndex((i) => i.id === selectedQuestionId);
  // --> console.log("formDraft[index].description=", formDraft[index].description);

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
          <FileUploadIcon sx={{ color: "primary.main" }}></FileUploadIcon>
          <Typography sx={{ fontWeight: "bold" }}>{"Upload Feld"}</Typography>
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
                  onClick={(event) =>
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
