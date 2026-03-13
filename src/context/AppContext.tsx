import { createContext, useContext, useState, type ReactNode } from "react";
import type { TemplateWorkflow } from "../types/types";

type AppContextType = {
  ticketList: TemplateWorkflow[];
  setTicketList: any;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [ticketList, setTicketList] = useState<TemplateWorkflow[]>([]);

  const value: AppContextType = {
    ticketList,
    setTicketList,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within <UserProvider>");
  return ctx;
}
