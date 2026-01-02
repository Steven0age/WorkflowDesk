import { Box, Typography } from "@mui/material";

export default function QuestionnaireCard({ ticketID }) {
  console.log("ticketID=", ticketID);
  console.log("typeof ticketID=", typeof ticketID);

  // fetch questionnaire from DB according zo TicketID //
  // currently missing since data are hardcoded

  return (
    <>
      <Box sx={{ backgroundColor: "primary.main", height: "4rem" }}>
        <Typography variant="h1"> Hallo, Fragebogen Karte</Typography>
        <Typography>{String(ticketID)}</Typography>
      </Box>
    </>
  );
}
