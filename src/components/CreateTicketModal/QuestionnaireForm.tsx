import {
  Box,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import type { TemplateWorkflow } from "../../types/types";
import { useMemo, useEffect } from "react";
import CardShell from "../CardShell";
import FileUploadField from "../FileUploadField";
import { useCreateTicket } from "../../context/CreateTicketContext";
import RequiredMark from "../RequiredMark";

type Props = {
  workflow: TemplateWorkflow;
};

export default function QuestionnaireForm({ workflow }: Props) {
  const { answers, setAnswers } = useCreateTicket();

  const sortedQuestions = useMemo(() => {
    return [...workflow.questionnaire].sort((a, b) => {
      return a.order_index - b.order_index;
    });
  }, [workflow.questionnaire]);

  useEffect(() => {
    setAnswers({});
  }, [workflow.id]);

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
                  <Typography variant="h5">
                    {q.label}
                    {q.is_required && <RequiredMark />}
                  </Typography>
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
                  <Typography variant="h5">
                    {q.label}
                    {q.is_required && <RequiredMark />}
                  </Typography>
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
