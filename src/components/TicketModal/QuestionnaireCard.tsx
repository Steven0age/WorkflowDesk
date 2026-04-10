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
import { supabase } from "../../supabase-client";

type QuestionnaireCardTypes = {
  item: TicketDataTypes | null;
};

export default function QuestionnaireCard({ item }: QuestionnaireCardTypes) {
  const questions = item?.ticket_questions ?? [];
  const answers = item?.ticket_answers ?? [];
  const uploads = item?.uploads ?? [];

  const handleOpenFile = async (filePath: string) => {
    const { data, error } = await supabase.storage
      .from("uploads")
      .createSignedUrl(filePath, 60);

    if (error) {
      console.error("Creating signed URL failed:", error);
      return;
    }

    if (data?.signedUrl) {
      window.open(data.signedUrl, "_blank");
    }
  };

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

            case "upload": {
              const matchingUploads = uploads.filter(
                (upload) => upload.ticket_answer_id === currentAnswer?.id,
              );

              return (
                <Box key={question.id}>
                  <Typography variant="h5">{question.label}</Typography>

                  {matchingUploads.length > 0 ? (
                    matchingUploads.map((file) => (
                      <Typography
                        key={file.id}
                        sx={{
                          mb: 1,
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                        onClick={() => handleOpenFile(file.file_path)}
                      >
                        {file.file_name}
                      </Typography>
                    ))
                  ) : (
                    <Typography sx={{ mb: 2 }}>
                      Keine Datei hochgeladen
                    </Typography>
                  )}
                </Box>
              );
            }

            default:
              return null;
          }
        })}
      </CardContent>
    </CardShell>
  );
}
