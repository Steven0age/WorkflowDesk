import LogItem from "./LogItem";

import { ticketLogs } from "../../MockData/activityLogs";
import { Box, Typography } from "@mui/material";

export default function ActivitiyLog() {
  return (
    <>
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
          .filter((i) => i.ticket_id === 3)
          .map((i) => {
            return <LogItem key={i.id} item={i}></LogItem>;
          })}
      </Box>
    </>
    //   <Box
    //     sx={{
    //       border: 1,
    //       borderColor: "border.main",
    //       borderRadius: 1,
    //       p: 2,
    //     }}
    //   >
    //     <Typography
    //       variant="h5"
    //       sx={{ pb: 2, mb: 2, borderBottom: 1, borderColor: "border.main" }}
    //     >
    //       Aktivitäten
    //     </Typography>
    //     <Box sx={{ mb: 4 }}>
    //       <Box
    //         sx={{
    //           display: "flex",
    //           justifyContent: "space-between",
    //           gap: 2,
    //         }}
    //       >
    //         <Typography sx={{ fontWeight: "bold" }}>
    //           Vorname Nachname
    //         </Typography>
    //         <Typography sx={{ fontSize: "0.8rem" }}>
    //           17.11.2025 16:42
    //         </Typography>
    //       </Box>
    //       <Typography sx={{ mt: 1 }}>Neues Ticket wurde eröffnet</Typography>
    //     </Box>
    //     <Box sx={{ mb: 4 }}>
    //       <Box
    //         sx={{
    //           display: "flex",
    //           justifyContent: "space-between",
    //           gap: 2,
    //         }}
    //       >
    //         <Typography sx={{ fontWeight: "bold" }}>
    //           Vorname Nachname
    //         </Typography>
    //         <Typography sx={{ fontSize: "0.8rem" }}>
    //           17.11.2025 16:42
    //         </Typography>
    //       </Box>
    //       <Typography sx={{ mt: 1 }}>
    //         Langer text: Neues Ticket wurde eröffnet, Neues Ticket wurde
    //         eröffnet, Neues Ticket wurde eröffnet, Neues Ticket wurde eröffnet,
    //         Neues Ticket wurde eröffnet, Neues Ticket wurde eröffnet
    //       </Typography>
    //     </Box>
    //     <Box sx={{ mb: 4 }}>
    //       <Box
    //         sx={{
    //           display: "flex",
    //           justifyContent: "space-between",
    //           gap: 2,
    //         }}
    //       >
    //         <Typography sx={{ fontWeight: "bold" }}>
    //           Vorname Nachname
    //         </Typography>
    //         <Typography sx={{ fontSize: "0.8rem" }}>
    //           17.11.2025 16:42
    //         </Typography>
    //       </Box>
    //       <Typography sx={{ mt: 1 }}>Neues Ticket wurde eröffnet</Typography>
    //     </Box>
    //   </Box>
  );
}
