import { Box, Typography } from "@mui/material";

function PageHeader({ title, actions = null }) {
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
      <Typography variant="h5" component="h1" sx={{ textTransform: "uppercase", fontWeight: 500 }}>
        {title}
      </Typography>
      {actions}
    </Box>
  );
}

export default PageHeader;