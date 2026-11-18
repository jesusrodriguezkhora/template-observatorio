import { Typography } from "@mui/material";
import { WIDGET_CONFIG } from "../config/widgets";

function FragmentSubtitle({ children }) {
  return (
    <Typography
      variant="body2"
      sx={{ color: WIDGET_CONFIG.subtitleColor, fontWeight: 500, mb: 0.25 }}
    >
      {children}
    </Typography>
  );
}

export default FragmentSubtitle;