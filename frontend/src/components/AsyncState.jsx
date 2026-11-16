import { Alert, Box, CircularProgress } from "@mui/material";
import { NotFoundError } from "../services/errors";

function AsyncState({ loading, error, notFoundMessage = "El elemento solicitado no existe.", children }) {
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress aria-label="Cargando" />
      </Box>
    );
  }

  if (error) {
    const isNotFound = error instanceof NotFoundError;
    return (
      <Alert severity={isNotFound ? "warning" : "error"}>
        {isNotFound
          ? notFoundMessage
          : "No se han podido cargar los datos. Inténtalo de nuevo."}
        {import.meta.env.DEV && ` (${error.message})`}
      </Alert>
    );
  }

  return children();
}

export default AsyncState;