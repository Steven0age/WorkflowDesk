import {
  Box,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import CardShell from "../CardShell";
//import { questionnaireAnswers } from "../../MockData/questionaireAnswers";
//import { files } from "../../MockData/files";
import type { TicketDataTypes } from "../../types/types";

type QuestionnaireCardTypes = {
  item: TicketDataTypes | null;
};

export default function QuestionnaireCard({ item }: QuestionnaireCardTypes) {
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

  const questions = item?.questionnaireSnapshot ?? [];
  const answers = item?.questionnaireAnswers ?? {};

  return (
    <CardShell elevation={1}>
      <CardHeader title={"Ausgefüllter Fragebogen"}></CardHeader>

      <CardContent>
        {questions.map((i) => {
          const currentAnswer = answers[i.id];

          switch (i.field_type) {
            case "textField":
              return (
                <Box key={i.id}>
                  <Typography variant="h5">{i.label}</Typography>
                  <TextField
                    sx={{ mb: 2 }}
                    fullWidth
                    multiline
                    id="outlined"
                    disabled
                    defaultValue={currentAnswer}
                  ></TextField>
                </Box>
              );

            case "upload":
              return null;
            // <Box key={i.id}>
            //   <Typography variant="h5">{i.question_label}</Typography>
            //   {files.map((f) => {
            //     if (f.ticket_questionnaire_answer_id === i.id) {
            //       return (
            //         <Box
            //           onClick={() => {
            //             window.open(`${f.storage_path}`, "_blank");
            //           }}
            //           key={f.id}
            //           component="img"
            //           src={f.storage_path}
            //           sx={{ height: "70px", mb: 2 }}
            //         ></Box>
            //       );
            //     }
            //   })}
            // </Box>

            default:
              return null;
          }
        })}
      </CardContent>
    </CardShell>
  );
}
