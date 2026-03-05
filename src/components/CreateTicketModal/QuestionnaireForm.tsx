// QuestionnaireForm.tsx

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import type { TemplateWorkflow } from "../../types/types";
import { useState, useMemo, useEffect, type ChangeEvent } from "react";
import CardShell from "../CardShell";
import { FileUpload } from "@mui/icons-material";
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

  // Reset local answers when a different workflow is passed in
  useEffect(() => {
    setAnswers({});
  }, [workflow.id]);

  useEffect(() => {
    console.log("answers =", answers);
  }, [answers]);

  return (
    <CardShell>
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

// <Box sx={{ display: "grid", gap: 2 }}>
//   {sortedQuestions.map((q) => {
//     if (q.field_type === "textField") {
//       const value = (answers[q.id] as string | undefined) ?? "";
//       return (
//         <TextField
//           key={q.id}
//           label={q.label}
//           helperText={q.description}
//           required={q.is_required}
//           value={value}
//           onChange={(e) =>
//             setAnswers((prev) => ({
//               ...prev,
//               [q.id]: e.target.value,
//             }))
//           }
//           fullWidth
//         />
//       );
//     }

//     // upload
//     const file = answers[q.id] instanceof File ? (answers[q.id] as File) : null;

//     return (
//       <Box key={q.id} sx={{ display: "grid", gap: 0.75 }}>
//         <Typography variant="body2" sx={{ fontWeight: 600 }}>
//           {q.label} {q.is_required ? "*" : ""}
//         </Typography>

//         {q.description ? (
//           <Typography variant="caption" sx={{ opacity: 0.75 }}>
//             {q.description}
//           </Typography>
//         ) : null}

//         <input
//           type="file"
//           onChange={(e) => {
//             const files = e.target.files;
//             setAnswers((prev) => ({
//               ...prev,
//               [q.id]: files && files.length > 0 ? files[0] : null,
//             }));
//           }}
//         />

//         <Typography variant="caption" sx={{ opacity: 0.75 }}>
//           {file ? `Ausgewählt: ${file.name}` : "Keine Datei ausgewählt."}
//         </Typography>
//       </Box>
//     );
//   })}
// </Box>;
