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
import type {
  QuestionnaireAnswerDataTypes,
  TicketDataTypes,
} from "../../types/types";

type QuestionnaireCardTypes = {
  item: TicketDataTypes | null;
};

export default function QuestionnaireCard({ item }: QuestionnaireCardTypes) {
  const questions = item?.ticket_questions ?? [];
  const answers = item?.ticket_answers ?? [];

  return (
    <CardShell elevation={1}>
      <CardHeader title={"Ausgefüllter Fragebogen"}></CardHeader>

      <CardContent>
        {questions.map((question) => {
          const currentAnswer = answers.find(
            (answer: QuestionnaireAnswerDataTypes) =>
              answer.ticket_question_id === question.id,
          );

          switch (question.field_type) {
            case "textField":
              return (
                <Box key={question.id}>
                  <Typography variant="h5">{question.label}</Typography>
                  <TextField
                    sx={{ mb: 2 }}
                    fullWidth
                    multiline
                    disabled
                    value={currentAnswer?.text_answer ?? ""}
                  />
                </Box>
              );

              {
                /* {questions.map((i) => {
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
                    value={currentAnswer}
                  ></TextField>
                </Box>
              ); */
              }

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
