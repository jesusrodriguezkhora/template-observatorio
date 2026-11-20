import { useState } from "react";
import {
  Avatar,
  Box,
  ButtonBase,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import UnfoldMoreOutlined from "@mui/icons-material/UnfoldMoreOutlined";
import { useAuth } from "../auth/AuthContext";
import { ROLE_LABELS } from "../config/roles";
import { USER_MENU_CONFIG } from "../config/userMenu";
import { useColorModeToggle } from "../hooks/useColorModeToggle";
import LogoutDialog from "./LogoutDialog";

const TEXT = USER_MENU_CONFIG;

function SidebarUser() {
  const { user, role, logout } = useAuth();
  const colorMode = useColorModeToggle();
  const [anchor, setAnchor] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const name = user?.nombre ?? TEXT.anonymousName;
  const roleLabel = role ? (ROLE_LABELS[role] ?? role) : "";
  const toDark = colorMode?.nextMode === "dark";

  function closeMenu() {
    setAnchor(null);
  }

  function handleToggleMode() {
    colorMode.toggle();
    closeMenu();
  }

  function handleLogoutClick() {
    closeMenu();
    setConfirmOpen(true);
  }

  function handleConfirmLogout() {
    setConfirmOpen(false);
    logout();
  }

  return (
    <Box sx={{ mt: "auto", p: 1 }}>
      <ButtonBase
        onClick={(event) => setAnchor(event.currentTarget)}
        aria-haspopup="menu"
        aria-expanded={Boolean(anchor)}
        aria-controls={anchor ? "user-menu" : undefined}
        sx={{
          width: "100%",
          p: 1,
          gap: 1.5,
          borderRadius: 1,
          justifyContent: "flex-start",
          textAlign: "left",
          "&:hover": { bgcolor: "action.hover" },
        }}
      >
        <Avatar sx={{ width: 36, height: 36, fontSize: 14 }}>
          {name.charAt(0)}
        </Avatar>
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography variant="body2" noWrap>
            {name}
          </Typography>
          <Typography
            variant="caption"
            noWrap
            component="p"
            sx={{ color: "text.secondary" }}
          >
            {roleLabel}
          </Typography>
        </Box>
        <UnfoldMoreOutlined fontSize="small" sx={{ color: "text.secondary" }} />
      </ButtonBase>

      <Menu
        id="user-menu"
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={closeMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "bottom", horizontal: "left" }}
        slotProps={{
          paper: { sx: { minWidth: anchor?.offsetWidth, mt: -0.5 } },
        }}
      >
        {colorMode && (
          <MenuItem onClick={handleToggleMode}>
            <ListItemIcon>
              {toDark ? (
                <DarkModeOutlined fontSize="small" />
              ) : (
                <LightModeOutlined fontSize="small" />
              )}
            </ListItemIcon>
            <ListItemText>
              {toDark ? TEXT.darkMode : TEXT.lightMode}
            </ListItemText>
          </MenuItem>
        )}
        {user && (
          <MenuItem onClick={handleLogoutClick}>
            <ListItemIcon>
              <LogoutOutlined fontSize="small" />
            </ListItemIcon>
            <ListItemText>{TEXT.logout}</ListItemText>
          </MenuItem>
        )}
      </Menu>

      <LogoutDialog
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </Box>
  );
}

export default SidebarUser;