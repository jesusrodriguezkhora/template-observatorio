import { Avatar, Box, IconButton, Tooltip, Typography } from "@mui/material";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import { useAuth } from "../auth/AuthContext";
import { ROLE_LABELS } from "../config/roles";
import ColorModeToggle from "../components/ColorModeToggle";

function SidebarUser() {
  const { user, role, logout } = useAuth();
  const name = user?.nombre ?? "Sin sesión";
  const roleLabel = role ? (ROLE_LABELS[role] ?? role) : "";

  return (
    <Box sx={{ mt: "auto", p: 2, display: "flex", alignItems: "center", gap: 1.5 }}>
      <Avatar sx={{ width: 36, height: 36, fontSize: 14 }}>{name.charAt(0)}</Avatar>
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography variant="body2" noWrap>
          {name}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {roleLabel}
        </Typography>
      </Box>
      <ColorModeToggle />
      {user && (
        <Tooltip title="Cerrar sesión">
          <IconButton onClick={logout} aria-label="Cerrar sesión">
            <LogoutOutlined />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
}

export default SidebarUser;