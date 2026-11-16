import { IconButton, Tooltip } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import { THEME_CONFIG } from "../config/theme";

function ColorModeToggle() {
  const { mode, systemMode, setMode } = useColorScheme();

  if (!THEME_CONFIG.allowDarkMode || !mode) {
    return null;
  }

  const currentMode = mode === "system" ? systemMode : mode;
  const nextMode = currentMode === "dark" ? "light" : "dark";
  const label = nextMode === "dark" ? "Activar modo oscuro" : "Activar modo claro";

  return (
    <Tooltip title={label}>
      <IconButton onClick={() => setMode(nextMode)} aria-label={label}>
        {currentMode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
      </IconButton>
    </Tooltip>
  );
}

export default ColorModeToggle;