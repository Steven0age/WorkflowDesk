import { createContext, useContext, useState, type ReactNode } from "react";
import type { TicketDataTypes } from "../types/types";

type AppContextType = {
  ticketList: TicketDataTypes[];
  setTicketList: React.Dispatch<React.SetStateAction<TicketDataTypes[] | []>>;
  selectedTicket: TicketDataTypes | null;
  setSelectedTicket: React.Dispatch<
    React.SetStateAction<TicketDataTypes | null>
  >;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [ticketList, setTicketList] = useState<TicketDataTypes[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<TicketDataTypes | null>(
    null,
  );

  const value: AppContextType = {
    ticketList,
    setTicketList,
    selectedTicket,
    setSelectedTicket,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within <UserProvider>");
  return ctx;
}
