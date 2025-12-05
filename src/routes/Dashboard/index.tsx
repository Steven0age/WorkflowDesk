import { Button, Box, Typography, Chip } from "@mui/material";
import Header from "../../components/Header";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid, type GridRenderCellParams } from "@mui/x-data-grid";
import { tickets } from "../../MockData/tickets";
import StatusChip from "../../components/StatusChip";

const columns = [
  { width: 60, field: "id", headerName: "Nr." },
  {
    width: 250,
    field: "status",
    headerName: "Status",
    renderCell: (params: GridRenderCellParams) => (
      <StatusChip status={params.row.status} />
    ),
  },
  { flex: 2, minWidth: 400, field: "label", headerName: "Titel" },
  { width: 200, field: "assigned_to", headerName: "zugewiesen an" },
  { width: 200, field: "created_at", headerName: "Erstellt am" },
  { width: 200, field: "started_by", headerName: "Erstellt von" },
];
export default function Dashboard() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        minHeight: 0,
        minWidth: 0,
      }}
    >
      <Header title="Dashboard" />
      <Box
        sx={{
          height: "4rem",
          display: "flex",
          alignItems: "center",
          p: "2rem",
        }}
      >
        <Button startIcon={<AddIcon />} variant="create">
          Workflow starten
        </Button>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          minHeight: 0,
          minWidth: 0,
          overflow: "auto",
        }}
      >
        <DataGrid
          rows={tickets}
          columns={columns}
          disableColumnMenu
          // initialState={{
          //   pagination: {
          //     paginationModel: {
          //       pageSize: 5,
          //     },
          //   },
          // }}
          // pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}
