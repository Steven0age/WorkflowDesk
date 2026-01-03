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
import type { TicketDataTypes } from "../../types/types";

type QuestionnaireCardTypes = {
  ticketID: TicketDataTypes["id"];
};

export default function QuestionnaireCard({
  ticketID,
}: QuestionnaireCardTypes) {
  // fetch questionnaire from DB according to TicketID //
  // currently missing since data are hardcoded
  // const questionIDsWithUpload = () => {
  //   const uploadIds = answers
  //     .filter((i) => {
  //       return i.field_type === "upload" || i.ticket_id == ticketID;
  //     })
  //     .map((i) => {
  //       return i.id;
  //     });
  //   return uploadIds;
  // };
  // questionIDsWithUpload();

  const answers = questionnaireAnswers;

  return (
    <CardShell elevation={1}>
      <CardHeader title={"Ausgefüllter Fragebogen"}></CardHeader>

      <CardContent>
        {answers.map((i) => {
          if (i.ticket_id === ticketID) {
            switch (i.field_type) {
              case "text":
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

              case "upload":
                return (
                  <Box key={i.id}>
                    <Typography variant="h5">{i.question_label}</Typography>
                    {files.map((f) => {
                      if (f.ticket_questionnaire_answer_id === i.id) {
                        return (
                          <Box
                            key={f.id}
                            component="img"
                            src={f.storage_path}
                            sx={{ height: "70px", mb: 2 }}
                          ></Box>
                        );
                      }
                    })}
                  </Box>
                );

              default:
                return null;
            }
          }
        })}
      </CardContent>
    </CardShell>
  );
}
