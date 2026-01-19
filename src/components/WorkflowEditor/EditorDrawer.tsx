import {
  Box,
  CardContent,
  CardHeader,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useEditor, type EditorItemType } from "../../context/EditorContext";
import FormDragItem from "./FormDragItem";
import CardShell from "../CardShell";
import FormSelectItem from "./FormSelectItem";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CloseIcon from "@mui/icons-material/Close";
import { CheckBox } from "@mui/icons-material";

type EditorDrawerProps = {
  itemId?: EditorItemType["id"];
};

export default function EditorDrawer({ itemId }: EditorDrawerProps) {
  const { formDraft } = useEditor();
  if (!formDraft) {
    return;
  }
  //const index = formDraft.findIndex((i) => i.id === itemId);
  //const newDescription = formDraft[index].description;
  const example = {
    id: 1,
    description: "Example Description",
    iconType: "upload",
  };
  return (
    <Box
      component="aside"
      sx={{
        display: "flex",
        flexDirection: "column",
        pt: 2,
        gap: 4,
        width: 500,
        height: "100%",
        flexShrink: 0,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", px: 2 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <FileUploadIcon sx={{ color: "primary.main" }}></FileUploadIcon>
          <Typography sx={{ fontWeight: "bold" }}>
            {example.description}
          </Typography>
        </Box>

        <Box>
          <CloseIcon sx={{ width: "20px" }}></CloseIcon>
        </Box>
      </Box>

      <CardShell elevation={1} sx={{ mx: 2 }}>
        <CardHeader title={"Allgemeine Optionen"} />
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h5">Feldname</Typography>
          <TextField
            sx={{ mb: 2 }}
            fullWidth
            multiline
            placeholder={"Feldname eingeben"}
            onChange={(event) => {
              console.log(event.target.value);
            }}
          ></TextField>
          <Typography variant="h5">Beschreibung</Typography>
          <TextField
            sx={{ mb: 2 }}
            fullWidth
            multiline
            placeholder={"Beschreibung eingeben"}
            onChange={(event) => {
              console.log(event.target.value);
            }}
          ></TextField>
        </CardContent>
      </CardShell>
      <CardShell elevation={1} sx={{ mx: 2 }}>
        <CardHeader title={"Einstellungen"} />
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <FormGroup sx={{ p: 1 }}>
            <FormControlLabel
              sx={{ display: "flex", gap: 1 }}
              control={<CheckBox sx={{ color: "primary.main" }} />}
              label="Verpflichtend"
            />
          </FormGroup>
        </CardContent>
      </CardShell>
    </Box>
  );
}
