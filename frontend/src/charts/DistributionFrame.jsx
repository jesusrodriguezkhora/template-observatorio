import { Alert, Stack, Typography } from "@mui/material";
import DistributionData from "./DistributionData";

function DistributionFrame({ chart, entity, record, children }) {
  return (
    <DistributionData chart={chart} entity={entity} record={record}>
      {(distribution) =>
        distribution === null ? (
          <Typography>—</Typography>
        ) : (
          <Stack spacing={1.5}>
            {distribution.overflow && (
              <Alert severity="warning" variant="outlined" sx={{ py: 0 }}>
                Las partes suman más que el total.
              </Alert>
            )}
            {children(distribution)}
          </Stack>
        )
      }
    </DistributionData>
  );
}

export default DistributionFrame;