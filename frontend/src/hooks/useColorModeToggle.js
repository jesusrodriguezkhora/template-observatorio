import { useColorScheme } from "@mui/material/styles";
import { THEME_CONFIG } from "../config/theme";

export function useColorModeToggle() {
  const { mode, systemMode, setMode } = useColorScheme();

  if (!THEME_CONFIG.allowDarkMode || !mode) {
    return null;
  }

  const currentMode = mode === "system" ? systemMode : mode;
  const nextMode = currentMode === "dark" ? "light" : "dark";

  return {
    nextMode,
    toggle: () => setMode(nextMode),
  };
}