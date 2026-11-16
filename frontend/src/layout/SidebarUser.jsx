import { Avatar, Box, Typography } from "@mui/material";
import { useAuth } from "../auth/AuthContext";
import { ROLE_LABELS } from "../config/roles";
import ColorModeToggle from "../components/ColorModeToggle";

function SidebarUser() {
  const { role } = useAuth();
  const roleLabel = ROLE_LABELS[role] ?? role;

  return (
    <Box sx={{ mt: "auto", p: 2, display: "flex", alignItems: "center", gap: 1.5 }}>
      <Avatar sx={{ width: 36, height: 36, fontSize: 14 }}>{roleLabel.charAt(0)}</Avatar>
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography variant="body2" noWrap>
          {roleLabel}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          Rol actual
        </Typography>
      </Box>
      <ColorModeToggle />
    </Box>
  );
}

export default SidebarUser;