import { Button, Box, IconButton } from "@mui/material";
import Header from "../../components/Header";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid, type GridRenderCellParams } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getWorkflowList } from "../../data/app.api";
import type { TemplateWorkflow } from "../../types/types";
import { deleteWorkflow } from "../../data/workflowEditor.api";

export default function Workflows() {
  const navigate = useNavigate();
  const [workflowList, setWorkflowList] = useState<TemplateWorkflow[]>([]);
  const columns = [
    { flex: 1, minWidth: 300, field: "title", headerName: "Titel" },
    {
      flex: 1,
      minWidth: 300,
      field: "description",
      headerName: "Beschreibung",
    },
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
              const id = String(params.id);
              navigate(`/workflows/editor/${id}`);
            }}
            sx={{
              "&:hover": { color: "primary.main" },
            }}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            onClick={async (e) => {
              e.stopPropagation();
              const id = String(params.id);
              await deleteWorkflow(id);
              setWorkflowList(await getWorkflowList());
            }}
            sx={{
              "&:hover": { color: "error.main" },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  useEffect(() => {
    const load = async () => {
      const workflows = await getWorkflowList();
      setWorkflowList(workflows);
    };
    load();
  }, []);

  const rows = workflowList.map((t) => ({
    id: t.id,
    title: t.title,
    description: t.description,
    created_from_user: t.created_from_user,
  }));

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
      <Header title="Workflows" />
      <Box
        sx={{
          height: "5rem",
          display: "flex",
          alignItems: "center",
          py: "2rem",
          px: "1rem",
        }}
      >
        <Button
          startIcon={<AddIcon />}
          variant="create"
          onClick={() => navigate("/workflows/editor")}
        >
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
          onRowClick={(params) => {
            const id = String(params.id);
            navigate(`/workflows/editor/${id}`);
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
