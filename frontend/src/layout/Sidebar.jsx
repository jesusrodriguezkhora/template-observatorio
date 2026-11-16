import { Box, List, ListItem, ListItemButton, Typography } from "@mui/material";
import { NavLink } from "react-router";
import { NAV_ITEMS } from "../config/navigation";
import { useAuth } from "../auth/AuthContext";
import SidebarBrand from "./SidebarBrand";
import SidebarUser from "./SidebarUser";

const SIDEBAR_WIDTH = 220;

const navItemSx = (theme) => ({
  borderRadius: 1,
  mb: 0.5,
  textTransform: "uppercase",
  color: "text.primary",
  "&.active": {
    bgcolor: `rgba(${theme.vars.palette.primary.mainChannel} / 0.1)`,
    color: "primary.main",
    fontWeight: 600,
  },
});

function Sidebar() {
  const { canAccess } = useAuth();
  const visibleItems = NAV_ITEMS.filter((item) => item.enabled && canAccess(item.roles));

  return (
    <Box
      component="aside"
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        height: "100vh",
        position: "sticky",
        top: 0,
        display: "flex",
        flexDirection: "column",
        borderRight: 1,
        borderColor: "divider",
      }}
    >
      <SidebarBrand />
      <Box component="nav" aria-label="Navegación principal">
        <List sx={{ px: 1 }}>
          {visibleItems.map((item) => (
            <ListItem key={item.key} disablePadding>
              <ListItemButton component={NavLink} to={item.path} sx={navItemSx}>
                <Typography variant="body2" component="span" sx={{ fontWeight: "inherit" }}>
                  {item.label}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <SidebarUser />
    </Box>
  );
}

export default Sidebar;