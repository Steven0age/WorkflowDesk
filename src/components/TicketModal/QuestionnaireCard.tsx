import {
  Box,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import CardShell from "../CardShell";
import { questionnaireAnswers } from "../../MockData/questionaireAnswers";
import { files } from "../../MockData/files";

export default function QuestionnaireCard({ ticketID }) {
  // fetch questionnaire from DB according to TicketID //
  // currently missing since data are hardcoded

  const answers = questionnaireAnswers;

  const fetchFiles = answers.filter((i) => {
    return i.field_type === "upload" || i.ticket_id == ticketID;
  });

  console.log("fetchFiles =", fetchFiles);

  //   console.log("files =", files[0].ticket_questionnaire_answer_id);

  return (
    <CardShell elevation={1}>
      <CardHeader title={"Ausgefüllter Fragebogen"}></CardHeader>

      <CardContent>
        {answers.map((i) => {
          if (i.ticket_id === ticketID) {
            return (
              <Box key={i.id}>
                <Typography variant="h5">{i.question_label}</Typography>
                <TextField
                  sx={{ mb: 2 }}
                  fullWidth
                  multiline
                  id="outlined"
                  disabled
                  defaultValue={i.text_answer}
                ></TextField>
              </Box>
            );
          }
        })}
      </CardContent>
    </CardShell>
  );
}
