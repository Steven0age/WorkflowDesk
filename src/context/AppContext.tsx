import {
  createContext,
  useContext,
  useState,
  type ChangeEvent,
  type ReactNode,
} from "react";
import type { TicketDataTypes } from "../types/types";

type AppContextType = {
  ticketList: TicketDataTypes[];
  setTicketList: React.Dispatch<React.SetStateAction<TicketDataTypes[] | []>>;
  selectedTicket: TicketDataTypes | null;
  setSelectedTicket: React.Dispatch<
    React.SetStateAction<TicketDataTypes | null>
  >;
  handleCheckboxChange: (
    event: ChangeEvent<HTMLInputElement>,
    phaseId: string,
    taskId: string,
  ) => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [ticketList, setTicketList] = useState<TicketDataTypes[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<TicketDataTypes | null>(
    null,
  );

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

  const value: AppContextType = {
    ticketList,
    setTicketList,
    selectedTicket,
    setSelectedTicket,
    handleCheckboxChange,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within <UserProvider>");
  return ctx;
}
