import { Box, Link, Typography } from "@mui/material";
import { MUNICIPALITY } from "../config/municipality";

function SidebarBrand() {
  const identity = MUNICIPALITY.logo ? (
    <Box
      component="img"
      src={MUNICIPALITY.logo}
      alt={MUNICIPALITY.name}
      sx={{ maxWidth: "100%", maxHeight: 64 }}
    />
  ) : (
    <Typography component="span" variant="subtitle1" sx={{ fontWeight: 700, color: "primary.main" }}>
      {MUNICIPALITY.name}
    </Typography>
  );

  return (
    <Box sx={{ px: 2, py: 3, textAlign: "center" }}>
      <Link href={MUNICIPALITY.website} target="_blank" rel="noopener noreferrer" underline="none">
        {identity}
      </Link>
      <Typography
        component="p"
        variant="caption"
        sx={{ mt: 1, color: "text.secondary" }}
      >
        {MUNICIPALITY.observatoryTitle}
      </Typography>
    </Box>
  );
}

export default SidebarBrand;