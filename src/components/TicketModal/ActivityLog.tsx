//import LogItem from "./LogItem";
import { Box, Typography } from "@mui/material";
import type { ActivityLogDataTypes, TicketDataTypes } from "../../types/types";

type ActivitiyLogTypes = {
  item: TicketDataTypes;
};

export default function ActivitiyLog({ item }: ActivitiyLogTypes) {
  //const ticketLogs: ActivityLogDataTypes[] = [];
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
      <Typography>
        Coomin soon - Log aller Aktivitäten ist in Planung
      </Typography>
      {/* {ticketLogs
        .filter((i) => i.ticket_id === item.id)
        .map((i) => {
          return <LogItem key={i.id} item={i}></LogItem>;
        })} */}
    </Box>
  );
}
