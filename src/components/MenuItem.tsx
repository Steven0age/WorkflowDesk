import { Box, Link, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import type { JSX } from "react";

type MenuItemType = {
  linkAnchor: "Dashboard" | "Workflows" | "Einstellungen";
};

export default function MenuItem({ linkAnchor }: MenuItemType) {
  const getIcon: Record<MenuItemType["linkAnchor"], JSX.Element> = {
    Dashboard: <HomeIcon sx={{ height: "20px" }} />,
    Workflows: <SettingsIcon sx={{ height: "20px" }} />,
    Einstellungen: <AccountTreeIcon sx={{ height: "20px" }} />,
  };

  return (
    <Link
      sx={{
        display: "flex",
        alignItems: "center",
        p: 1,
        color: "text.contrast",
        bgcolor: "primary.dark",
        borderRadius: 1,
        "&:hover": { bgcolor: "secondary.light" },
      }}
      href="/"
      underline="none"
    >
      <Box sx={{ display: "flex", pr: 1 }}>
        {getIcon[linkAnchor] ?? <HomeIcon />}
      </Box>
      <Box>
        <Typography fontSize={12} fontWeight={"bold"}>
          {linkAnchor}
        </Typography>
      </Box>
    </Link>
  );
}
