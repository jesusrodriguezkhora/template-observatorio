import { Box } from "@mui/material";
import { CHART_TYPES } from "../charts";
import FragmentSubtitle from "./FragmentSubtitle";

function ChartFragment({ fragment, entity, record }) {
  const { Chart } = CHART_TYPES[fragment.chart];

  return (
    <Box>
      {fragment.subtitle && (
        <FragmentSubtitle>{fragment.subtitle}</FragmentSubtitle>
      )}
      <Box sx={{ mt: fragment.subtitle ? 1 : 0 }}>
        <Chart chart={fragment} entity={entity} record={record} />
      </Box>
    </Box>
  );
}

export default ChartFragment;