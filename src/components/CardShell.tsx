import { Card, type CardProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { ReactNode } from "react";

type CardShellProps = {
  children: ReactNode;
};

const CustomCard = styled(Card)<CardProps>(({ theme }) => ({
  background: theme.palette.background.default,
  "& .MuiCardHeader-root": {
    background: theme.palette.border.main,
  },
  "& .MuiCardHeader-title": {
    fontSize: "1rem",
    fontWeight: 600,
  },
}));

export default function CardShell({ children }: CardShellProps) {
  return <CustomCard>{children}</CustomCard>;
}
