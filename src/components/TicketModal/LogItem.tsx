import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { ActivityLogDataTypes } from "../../types/types";

export default function LogItem({ item }: any) {
  console.log("item =", item.id);
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>{item.user_id}</Typography>
          <Typography sx={{ fontSize: "0.8rem" }}>{item.created_at}</Typography>
        </Box>
        <Typography sx={{ mt: 1 }}>{item.message}</Typography>
      </Box>
    </>
  );
}
