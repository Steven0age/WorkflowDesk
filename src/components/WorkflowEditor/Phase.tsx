import {
  CardContent,
  CardHeader,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import CardShell from "../CardShell";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Task, { type TaskProps } from "./Task";
import type { TicketPhaseDataTypes } from "../../types/types";

type PhaseProps = Pick<TicketPhaseDataTypes, "id" | "title"> & {
  activeItem?: string;
  onClick?: () => void;
  onDelete?: () => void;
  tasks?: TaskProps[];
};

export default function Phase({
  onDelete,
  onClick,
  activeItem,
  title,
  tasks,
}: PhaseProps) {
  return (
    <CardShell elevation={1} onClick={onClick}>
      <CardHeader
        title={
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontWeight: "bold" }}>{title}</Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                sx={{
                  p: 0,
                  m: 0,
                  "&:hover": { color: "primary.main" },
                }}
              >
                <EditIcon />
              </IconButton>

              {/* <IconButton
            onClick={(e) => {
              e.stopPropagation();
              alert("Duplicate-Icon clicked");
            }}
            sx={{
              p: 0,
              m: 0,
              "&:hover": { color: "primary.main" },
            }}
          >
            <FileCopyIcon />
          </IconButton> */}

              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  if (onDelete) {
                    onDelete();
                  }
                }}
                sx={{
                  p: 0,
                  m: 0,
                  "&:hover": { color: "error.main" },
                }}
              >
                <DeleteIcon />
              </IconButton>

              <DragIndicatorIcon
                sx={{ color: "text.secondary", cursor: "grab", ml: 2 }}
              />
            </Box>
          </Box>
        }
      ></CardHeader>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {tasks
          ? tasks.map((i) => <Task key={i.id} id={i.id} label={i.label} />)
          : ""}
      </CardContent>
    </CardShell>
  );
}
