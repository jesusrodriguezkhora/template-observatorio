export function resolveThemeColor(theme, color) {
  if (
    typeof color !== "string" ||
    !/^[a-zA-Z]+(\.[a-zA-Z0-9]+)+$/.test(color)
  ) {
    return color;
  }
  const palette = theme.vars?.palette ?? theme.palette;
  const resolved = color.split(".").reduce((node, key) => node?.[key], palette);
  return typeof resolved === "string" ? resolved : color;
}