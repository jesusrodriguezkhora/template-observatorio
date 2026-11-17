import { Box, Typography } from "@mui/material";

function PageHeader({ title, leading = null, actions = null, uppercase = true }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        pb: 2,
        mb: 3,
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}>
        {leading}
        <Typography
          variant="h5"
          component="h1"
          sx={{ fontWeight: 500 }}
        >
          {title}
        </Typography>
      </Box>
      {actions}
    </Box>
  );
}

export default PageHeader;