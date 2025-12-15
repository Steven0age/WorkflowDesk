import { Card, type CardProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { ReactNode } from "react";

type CardShellProps = CardProps & {
  children: ReactNode;
  disabled?: boolean;
};

const CustomCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "disabled",
})<CardShellProps>(({ theme, disabled }) => ({
  background: theme.palette.background.default,

  "& .MuiCardHeader-root": {
    background: theme.palette.border.main,
  },
  "& .MuiCardHeader-title, & .MuiCardHeader-subheader": {
    color: disabled ? theme.palette.text.disabled : theme.palette.text.primary,
  },
}));

export default function CardShell({
  children,
  disabled = false,
  ...props
}: CardShellProps) {
  const elevationStatus = disabled ? 1 : 20;
  return (
    <CustomCard disabled={disabled} elevation={elevationStatus} {...props}>
      {children}
    </CustomCard>
  );
}
