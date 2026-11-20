import { Box, CircularProgress } from "@mui/material";

function FullScreenLoader() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress aria-label="Cargando" />
    </Box>
  );
}

export default FullScreenLoader;