import { createTheme } from "@mui/material/styles";
import { THEME_CONFIG } from "../config/theme";
import { CHART_CONFIG } from "../config/charts";

const { colors, fontFamily, buttonTextTransform, allowDarkMode } = THEME_CONFIG;

function chartPalette(colors) {
  return Object.fromEntries(
    colors.map((color, index) => [`series${index + 1}`, color]),
  );
}

function paletteFrom(schemeColors, chartColors) {
  return {
    palette: {
      primary: { main: schemeColors.primary },
      secondary: { main: schemeColors.secondary },
      chart: chartPalette(chartColors),
    },
  };
}

export const appTheme = createTheme({
  cssVariables: { colorSchemeSelector: "class" },
  colorSchemes: {
    light: paletteFrom(colors.light, CHART_CONFIG.palette.light),
    ...(allowDarkMode && {
      dark: paletteFrom(colors.dark, CHART_CONFIG.palette.dark),
    }),
  },
  typography: {
    fontFamily,
    button: { textTransform: buttonTextTransform },
  },
});