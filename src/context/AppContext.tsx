import React, {
  createContext,
  useContext,
  useState,
  type ChangeEvent,
  type ReactNode,
} from "react";
import type {
  TicketDataTypes,
  TicketPhaseDataTypes,
  UserRole,
} from "../types/types";
import { updateTicket } from "../data/app.api";

type AppContextType = {
  ticketList: TicketDataTypes[];
  setTicketList: React.Dispatch<React.SetStateAction<TicketDataTypes[] | []>>;
  selectedTicket: TicketDataTypes | null;
  setSelectedTicket: React.Dispatch<
    React.SetStateAction<TicketDataTypes | null>
  >;
  organizationId: string | null;
  setOrganizationId: React.Dispatch<React.SetStateAction<string | null>>;
  userRole: UserRole | null;
  setUserRole: React.Dispatch<React.SetStateAction<UserRole | null>>;

  handleCheckboxChange: (
    event: ChangeEvent<HTMLInputElement>,
    phaseId: string,
    taskId: string,
  ) => void;
  handleCompletePhase: (phaseID: TicketPhaseDataTypes["id"]) => void;
  handleCompleteTicket: () => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [ticketList, setTicketList] = useState<TicketDataTypes[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<TicketDataTypes | null>(
    null,
  );
  const [organizationId, setOrganizationId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>,
    phaseId: string,
    taskId: string,
  ) => {
    const checked = event.target.checked;

    setSelectedTicket((prev) => {
      if (!prev || !prev.phases) return prev;

      return {
        ...prev,
        phases: prev.phases.map((phase) => {
          if (phase.id !== phaseId) return phase;

          return {
            ...phase,
            tasks: phase.tasks.map((task) => {
              if (task.id !== taskId) return task;

              return {
                ...task,
                is_done: checked,
              };
            }),
          };
        }),
      };
    });
  };

  const handleCompletePhase = (phaseId: TicketPhaseDataTypes["id"]) => {
    if (!selectedTicket || !selectedTicket.phases) return;

    const targetPhase = selectedTicket.phases.find(
      (phase) => phase.id === phaseId,
    );

    if (!targetPhase) {
      alert("Die Phase konnte nicht gefunden werden.");
      return;
    }

    if (targetPhase.status !== "inProgress") {
      alert("Diese Phase kann aktuell nicht abgeschlossen werden.");
      return;
    }

    const hasOpenRequiredTasks = targetPhase.tasks.some((task) => {
      return task.is_required && !task.is_done;
    });

    if (hasOpenRequiredTasks) {
      alert(
        "Die Phase kann noch nicht abgeschlossen werden, weil noch Pflichtaufgaben offen sind.",
      );
      return;
    }

    const nextStatus: TicketPhaseDataTypes["status"] =
      targetPhase.approval_required ? "review" : "done";

    const currentPhaseIndex = selectedTicket.phases.findIndex(
      (phase) => phase.id === phaseId,
    );

    const updatedTicket: TicketDataTypes = {
      ...selectedTicket,
      phases: selectedTicket.phases.map((phase, index) => {
        if (phase.id === phaseId) {
          return {
            ...phase,
            status: nextStatus,
            completed_at:
              nextStatus === "done" ? new Date().toISOString() : null,
          };
        }

        if (
          nextStatus === "done" &&
          index === currentPhaseIndex + 1 &&
          phase.status === "pending"
        ) {
          return {
            ...phase,
            status: "inProgress",
            started_at: phase.started_at ?? new Date().toISOString(),
          };
        }

        return phase;
      }),
    };

    setSelectedTicket(updatedTicket);
  };

  const handleCompleteTicket = () => {
    if (!selectedTicket || !selectedTicket.phases) return;

    const hasOpenPhases = selectedTicket.phases.some((phase) => {
      return phase.status !== "done";
    });

    if (hasOpenPhases) {
      alert(
        "Das Ticket kann noch nicht abgeschlossen werden, weil noch nicht alle Phasen abgeschlossen sind.",
      );
      return;
    }

    const updatedTicket: TicketDataTypes = {
      ...selectedTicket,
      status: "done",
      completed_at: new Date().toISOString(),
    };

    setSelectedTicket(updatedTicket);
    updateTicket(updatedTicket);
  };

  const value: AppContextType = {
    ticketList,
    setTicketList,
    selectedTicket,
    setSelectedTicket,
    handleCheckboxChange,
    handleCompletePhase,
    handleCompleteTicket,
    organizationId,
    setOrganizationId,
    userRole,
    setUserRole,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within <UserProvider>");
  return ctx;
}
