import { Button, Box, IconButton } from "@mui/material";
import Header from "../../components/Header";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid, type GridRenderCellParams } from "@mui/x-data-grid";
import { templates } from "../../MockData/WorkflowTemplates";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const columns = [
  { width: 60, field: "id", headerName: "Nr." },
  { flex: 1, minWidth: 300, field: "title", headerName: "Titel" },
  { flex: 1, minWidth: 300, field: "description", headerName: "Beschreibung" },
  { width: 200, field: "created_from_user", headerName: "Erstellt von" },
  {
    width: 100,
    field: "settings",
    headerName: "",
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams) => (
      <>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            alert("Delete-Icon clicked");
          }}
        >
          <DeleteIcon />
        </IconButton>

        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            alert("Edit-Icon clicked");
          }}
        >
          <EditIcon />
        </IconButton>
      </>
    ),
  },
];

const rows = templates.map((t) => ({
  id: t.id,
  title: t.title,
  description: t.description,
  created_from_user: t.created_from_user,
}));

export default function Workflows() {
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
      <Header title="Worflows" />
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
          neuen Workflow anlegen
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
          rows={rows}
          columns={columns}
          disableColumnMenu
          disableRowSelectionOnClick
          hideFooter
        />
      </Box>
    </Box>
  );
}
