import { Box, Paper, Typography } from "@mui/material";
import { LOGIN_CONFIG } from "../config/login";
import { MUNICIPALITY } from "../config/municipality";

const CONFIG = LOGIN_CONFIG;

function pageBackground(theme) {
  const { background, primary } = theme.vars.palette;
  return `linear-gradient(160deg, ${background.default} 0%, rgba(${primary.mainChannel} / ${CONFIG.backgroundTint}) 100%)`;
}

function AuthLayout({ title, subtitle, children }) {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        p: 2,
        background: pageBackground,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: CONFIG.cardWidth,
          p: { xs: 3, sm: 5 },
          borderRadius: 4,
          border: 1,
          borderColor: "divider",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.08)",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 3 }}>
          {MUNICIPALITY.logo && (
            <Box
              component="img"
              src={MUNICIPALITY.logo}
              alt={MUNICIPALITY.name}
              sx={{
                width: CONFIG.imageWidth,
                height: CONFIG.imageHeight,
                objectFit: "cover",
                borderRadius: CONFIG.imageRadius,
                mb: 2,
              }}
            />
          )}
          <Typography component="h1" variant="h5" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
              {subtitle}
            </Typography>
          )}
        </Box>
        {children}
      </Paper>
      {CONFIG.footer && (
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {CONFIG.footer}
        </Typography>
      )}
    </Box>
  );
}

export default AuthLayout;