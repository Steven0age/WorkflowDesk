import { Card, type CardProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { ReactNode } from "react";

type CardShellProps = CardProps & {
  children: ReactNode;
};

const CustomCard = styled(Card)<CardProps>(({ theme }) => ({
  background: theme.palette.background.default,
  "& .MuiCardHeader-root": {
    background: theme.palette.border.main,
  },
}));

export default function CardShell({ children, ...props }: CardShellProps) {
  return <CustomCard {...props}>{children}</CustomCard>;
}
