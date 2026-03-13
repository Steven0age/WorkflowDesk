import { useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Modal,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { createTicket, getWorkflowList } from "../../data/app.api";
import QuestionnaireForm from "./QuestionnaireForm";
import { useCreateTicket } from "../../context/CreateTicketContext";

type TicketModalTypes = {
  openModal: boolean;
  handleOnClose: () => void;
};

export default function CreateTicketModal({
  openModal,
  handleOnClose,
}: TicketModalTypes) {
  const {
    workflowList,
    setWorkflowList,
    selectedWorkflowId,
    setSelectedWorkflowId,
    answers,
  } = useCreateTicket();

  useEffect(() => {
    const workflows = getWorkflowList();
    setWorkflowList(workflows);
  }, []);

  const selectedWorkflow = useMemo(
    () => workflowList.find((w) => w.id === selectedWorkflowId) ?? null,
    [workflowList, selectedWorkflowId],
  );

  const handleChange = (event: any) => {
    setSelectedWorkflowId(event.target.value);
  };

  return (
    <Modal
      open={openModal}
      onClose={handleOnClose}
      aria-labelledby="modal-modal-title"
    >
      <Box
        sx={{
          width: "1100px",
          height: "calc(100vh - 40px)",
          mx: "auto",
          mt: "20px",
          mb: "20px",
          boxShadow: 24,
          borderRadius: 1,
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
        }}
      >
        <Box
          sx={{
            flex: "0 0 auto",
            minHeight: 150,
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            justifyContent: "center",
            borderRadius: 10,
            bgcolor: "background.default",
            mx: 4,
            my: 4,
            px: 12,
            py: 4,
          }}
        >
          <Typography
            variant="h2"
            id="modal-modal-title"
            sx={{
              fontWeight: "bold",
              fontSize: "2rem",
              mb: 2,
              textAlign: "center",
              hyphens: "auto",
              wordBreak: "normal",
              overflowWrap: "break-word",
            }}
          >
            Neuen Workflow starten
          </Typography>
          <Typography sx={{ mt: 2, fontWeight: "bold" }}>
            Wähle einen Workflow aus:
          </Typography>
          <Select value={selectedWorkflowId} onChange={handleChange}>
            {workflowList.map((workflow) => (
              <MenuItem key={workflow.id} value={workflow.id}>
                {workflow.title}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box
          sx={{
            flex: "1 1 auto",
            minHeight: 0,
            overflowY: "auto",
            gap: 4,
            px: 4,
            py: 2,
            bgcolor: "primary.main",
            boxShadow:
              "inset 0  8px 6px -6px #0000001f,inset 0 -8px 6px -6px #0000001f",
          }}
        >
          {selectedWorkflow && (
            <QuestionnaireForm workflow={selectedWorkflow} />
          )}
        </Box>

        <Box
          sx={{
            flex: "0 0 auto",
            height: "4rem",
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            gap: 2,
            pr: 2,
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              createTicket({ workflowList, selectedWorkflowId, answers });
              handleOnClose();
            }}
          >
            Workflow starten
          </Button>
          <Button variant="outlined" onClick={handleOnClose}>
            Abbrechen
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
