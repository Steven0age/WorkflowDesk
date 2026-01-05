import { Box, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import InboxIcon from "@mui/icons-material/Inbox";
import type { JSX } from "react";

type MenuItemType = {
  linkAnchor:
    | "Dashboard"
    | "Workflows"
    | "Einstellungen"
    | "Grundeinstellungen"
    | "Formular"
    | "Phasen / Todo's";
  linkTarget: string;
  lightMode?: boolean;
};

export default function MenuItem({
  linkAnchor,
  linkTarget,
  lightMode,
}: MenuItemType) {
  const getIcon: Record<MenuItemType["linkAnchor"], JSX.Element> = {
    Dashboard: <HomeIcon sx={{ height: "1.25rem" }} />,
    Workflows: <AccountTreeIcon sx={{ height: "1.25rem" }} />,
    Einstellungen: <SettingsIcon sx={{ height: "1.25rem" }} />,
    Grundeinstellungen: <SettingsIcon sx={{ height: "1.25rem" }} />,
    Formular: <InboxIcon sx={{ height: "1.25rem" }} />,
    "Phasen / Todo's": <CheckBoxIcon sx={{ height: "1.25rem" }} />,
  };

  return (
    <Link
      sx={{
        display: "flex",
        alignItems: "center",
        p: 1,
        color: lightMode ? "primary.main" : "text.contrast",
        bgcolor: lightMode ? "background.default" : "primary.dark",
        borderRadius: 1,
        "&:hover": {
          bgcolor: lightMode ? "background.paper" : "secondary.light",
        },
      }}
      underline="none"
      component={RouterLink}
      to={linkTarget}
    >
      <Box sx={{ display: "flex", pr: 1 }}>
        {getIcon[linkAnchor] ?? <HomeIcon />}
      </Box>
      <Box>
        <Typography fontSize={"0.8rem"} fontWeight={"bold"}>
          {linkAnchor}
        </Typography>
      </Box>
    </Link>
  );
}
