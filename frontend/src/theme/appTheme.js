import { createTheme } from "@mui/material/styles";
import { THEME_CONFIG } from "../config/theme";

const { colors, fontFamily, allowDarkMode } = THEME_CONFIG;

function paletteFrom(schemeColors) {
  return {
    palette: {
      primary: { main: schemeColors.primary },
      secondary: { main: schemeColors.secondary },
    },
  };
}

export const appTheme = createTheme({
  cssVariables: { colorSchemeSelector: "class" },
  colorSchemes: {
    light: paletteFrom(colors.light),
    ...(allowDarkMode && { dark: paletteFrom(colors.dark) }),
  },
  typography: { fontFamily },
});