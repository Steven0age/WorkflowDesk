import { Button, Box } from "@mui/material";
import Header from "../../components/Header";
import AddIcon from "@mui/icons-material/Add";
import {
  DataGrid,
  type GridRenderCellParams,
  type GridRowParams,
} from "@mui/x-data-grid";
import { tickets } from "../../MockData/tickets";
import StatusChip from "../../components/StatusChip";
import TicketModal from "../../components/TicketModal";
import { useState } from "react";

const columns = [
  { width: 30, field: "id", headerName: "Nr." },
  {
    width: 180,
    field: "status",
    headerName: "Status",
    renderCell: (params: GridRenderCellParams) => (
      <StatusChip status={params.row.status} variant="list" />
    ),
  },
  { flex: 1, minWidth: 300, field: "label", headerName: "Titel" },
  { width: 200, field: "assigned_to", headerName: "Zuständig ist" },
  {
    width: 160,
    field: "created_at",
    headerName: "Gestartet am",
    valueFormatter: (value?: string) => {
      if (value == null) {
        return "";
      }
      const date = new Date(value);

      return date.toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
  },
  { width: 200, field: "started_by", headerName: "Erstellt von" },
];

export default function Dashboard() {
  const [modalState, setModalState] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<GridRowParams | null>(
    null
  );

  const openModal = (item: GridRowParams) => {
    setModalState(true);
    setSelectedTicket(item);
  };
  const closeModal = () => {
    setModalState(false);
    setSelectedTicket(null);
  };
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
          height: "5rem",
          display: "flex",
          alignItems: "center",
          py: "2rem",
          px: "1rem",
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
          px: "1rem",
        }}
      >
        <DataGrid
          sx={{
            fontSize: "1rem",
            "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
              outline: "none",
            },
            "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within":
              {
                outline: "none",
              },
          }}
          rows={tickets}
          onRowClick={openModal}
          columns={columns}
          disableColumnMenu
          disableRowSelectionOnClick
          hideFooter
        />
      </Box>
      {selectedTicket && (
        <TicketModal
          openModal={modalState}
          handleOnClose={closeModal}
          item={selectedTicket}
        />
      )}
    </Box>
  );
}
