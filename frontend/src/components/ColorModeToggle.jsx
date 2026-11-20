import { IconButton, Tooltip } from "@mui/material";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import { useColorModeToggle } from "../hooks/useColorModeToggle";
import { USER_MENU_CONFIG } from "../config/userMenu";

function ColorModeToggle() {
  const colorMode = useColorModeToggle();

  if (!colorMode) {
    return null;
  }

  const toDark = colorMode.nextMode === "dark";
  const label = toDark ? USER_MENU_CONFIG.darkMode : USER_MENU_CONFIG.lightMode;

  return (
    <Tooltip title={label}>
      <IconButton onClick={colorMode.toggle} aria-label={label}>
        {toDark ? <DarkModeOutlined /> : <LightModeOutlined />}
      </IconButton>
    </Tooltip>
  );
}

export default ColorModeToggle;