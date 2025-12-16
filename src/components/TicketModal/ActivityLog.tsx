import LogItem from "./LogItem";
import { ticketLogs } from "../../MockData/activityLogs";
import { Box, Typography } from "@mui/material";
import type { TicketDataTypes } from "../../types/types";

type ActivitiyLogTypes = {
  item: TicketDataTypes;
};

export default function ActivitiyLog({ item }: ActivitiyLogTypes) {
  return (
    <Box
      sx={{
        border: 1,
        borderColor: "border.main",
        borderRadius: 1,
        p: 2,
      }}
    >
      <Typography
        variant="h5"
        sx={{ pb: 2, mb: 2, borderBottom: 1, borderColor: "border.main" }}
      >
        Aktivitäten
      </Typography>
      {ticketLogs
        .filter((i) => i.ticket_id === item.id)
        .map((i) => {
          return <LogItem key={i.id} item={i}></LogItem>;
        })}
    </Box>
  );
}
