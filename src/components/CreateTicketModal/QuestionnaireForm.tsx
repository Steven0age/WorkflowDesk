import {
  Box,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import type { TemplateWorkflow } from "../../types/types";
import { useState, useMemo, useEffect } from "react";
import CardShell from "../CardShell";
import FileUploadField from "../FileUploadField";

type Props = {
  workflow: TemplateWorkflow;
};

type AnswersState = Record<string, string | File | null>;

export default function QuestionnaireForm({ workflow }: Props) {
  const [answers, setAnswers] = useState<AnswersState>({});

  const sortedQuestions = useMemo(() => {
    return [...workflow.questionnaire].sort((a, b) => {
      return a.order_index - b.order_index;
    });
  }, [workflow.questionnaire]);

  useEffect(() => {
    setAnswers({});
  }, [workflow.id]);

  useEffect(() => {
    console.log("answers =", answers);
  }, [answers]);

  return (
    <CardShell elevation={0} sx={{ mt: 2 }}>
      <CardHeader
        title={
          workflow.questionnaire.length === 0
            ? "Keine Fragen vorhanden"
            : `Fragebogen zum Workflow ${workflow.title}`
        }
      />
      <CardContent sx={{ display: "grid", gap: 2 }}>
        {sortedQuestions.map((q) => {
          switch (q.field_type) {
            case "textField":
              return (
                <Box key={q.id}>
                  <Typography variant="h5">{q.label}</Typography>
                  <TextField
                    sx={{ mb: 2 }}
                    fullWidth
                    multiline
                    id="outlined"
                    onChange={(e) =>
                      setAnswers((prev) => ({
                        ...prev,
                        [q.id]: e.target.value,
                      }))
                    }
                  ></TextField>
                </Box>
              );
            case "upload":
              return (
                <Box key={q.id}>
                  <Typography variant="h5">{q.label}</Typography>
                  <FileUploadField
                    file={
                      answers[q.id] instanceof File
                        ? (answers[q.id] as File)
                        : null
                    }
                    onChange={(file) => {
                      setAnswers((prev) => ({
                        ...prev,
                        [q.id]: file,
                      }));
                    }}
                  />
                </Box>
              );

            default:
              return null;
          }
        })}
      </CardContent>
    </CardShell>
  );
}
